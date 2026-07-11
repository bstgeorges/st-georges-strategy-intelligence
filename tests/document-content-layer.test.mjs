import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { generateEditorialDocuments } from "../scripts/generate-editorial-documents.mjs";
import { authoredEditorialRegistry } from "../src/content/editorial/authored-registry.ts";
import { capturedEditorialDocuments } from "../src/content/generated/editorial-documents.ts";
import {
  editorialDocumentAllowlist,
  parseEditorialDocument,
  projectEditorialSemantics,
} from "../src/content/editorial/document-parser.ts";
import {
  editorialDocumentRegistry,
  getEditorialDocument,
  getEditorialDocumentEvidence,
} from "../src/content/editorial/document-registry.ts";
import {
  assertEditorialDocumentParity,
  validateEditorialDocumentRegistry,
} from "../src/content/editorial/document-validation.ts";

const projectRoot = path.resolve(import.meta.dirname, "..");

const ignoredAuthoredKeys = new Set([
  "archetype",
  "dateTime",
  "featured",
  "href",
  "kind",
  "purpose",
  "rel",
  "role",
  "target",
]);

function authoredBodyAtoms(value, key = "") {
  if (ignoredAuthoredKeys.has(key) || value === undefined || value === null) return [];
  if (typeof value === "string")
    return value.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu) ?? [];
  if (Array.isArray(value)) return value.flatMap((item) => authoredBodyAtoms(item));
  if (typeof value === "object") {
    return Object.entries(value).flatMap(([entryKey, entryValue]) =>
      authoredBodyAtoms(entryValue, entryKey),
    );
  }
  return [];
}

function authoredHrefs(value) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(authoredHrefs);
  return [
    ...(typeof value.href === "string" ? [value.href] : []),
    ...Object.values(value).flatMap(authoredHrefs),
  ];
}

function fixtureBodyAtoms(node) {
  if (node.type === "text") {
    return node.value.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu) ?? [];
  }
  return node.children.flatMap(fixtureBodyAtoms);
}

async function readCorpus(directory) {
  const root = path.join(projectRoot, "src/content", directory);
  const files = (await readdir(root)).filter((file) => /^\d+\.json$/.test(file)).sort();
  return Promise.all(
    files.map(async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"))),
  );
}

test("the generated registry is the unique successful route union with live precedence", () => {
  assert.deepEqual(
    validateEditorialDocumentRegistry(capturedEditorialDocuments, editorialDocumentRegistry),
    {
      captures: 75,
      frozenCaptures: 42,
      liveCaptures: 33,
      routes: 51,
      liveSelectedRoutes: 33,
      frozenHistoricalRoutes: 18,
    },
  );
  assert.equal(new Set(editorialDocumentRegistry.map(({ route }) => route)).size, 51);
});

test("Committee resolves to live 200 while the frozen 404 remains evidence", () => {
  const route = "/committee-questions/";
  assert.equal(getEditorialDocument(route)?.corpus, "live");
  assert.equal(getEditorialDocument(route)?.status, 200);
  assert.deepEqual(
    getEditorialDocumentEvidence(route).map(({ corpus, status }) => [corpus, status]),
    [
      ["frozen", 404],
      ["live", 200],
    ],
  );
});

test("frozen-only historical archives remain addressable while current aliases prefer live", () => {
  assert.equal(getEditorialDocument("/archive/brief/")?.corpus, "live");
  assert.equal(getEditorialDocument("/archive/brief/2026-07-06/")?.corpus, "live");
  assert.equal(getEditorialDocument("/archive/brief/2026-07-09/")?.corpus, "frozen");
  assert.equal(getEditorialDocument("/signals/ai/archive/2026-07-08/")?.corpus, "frozen");
});

test("authored production records cover the 50 non-Home routes with selected-fixture provenance", () => {
  const fixtures = new Map(
    editorialDocumentRegistry
      .filter(({ route }) => route !== "/")
      .map((entry) => [entry.route, entry]),
  );
  assert.equal(authoredEditorialRegistry.length, 50);
  assert.equal(new Set(authoredEditorialRegistry.map(({ route }) => route)).size, 50);
  for (const record of authoredEditorialRegistry) {
    const fixture = fixtures.get(record.route);
    assert.ok(fixture, `missing selected fixture for ${record.route}`);
    assert.equal(record.sourceSha256, fixture.document.sourceSha256, record.route);
    assert.equal(record.selectionReason, fixture.selectionReason, record.route);
    assert.deepEqual(record.metadata, fixture.document.metadata, record.route);
    assert.deepEqual(record.evidence, fixture.evidence, record.route);
  }
});

test("authored data preserves every selected body token and href without carrying a markup AST", () => {
  const fixtures = new Map(editorialDocumentRegistry.map((entry) => [entry.route, entry.document]));
  for (const record of authoredEditorialRegistry) {
    const fixture = fixtures.get(record.route);
    assert.ok(fixture, record.route);
    const semantics = projectEditorialSemantics(fixture.content);
    assert.deepEqual(
      authoredBodyAtoms(record.content).sort(),
      fixtureBodyAtoms(fixture.content).sort(),
      `body tokens changed for ${record.route}`,
    );
    assert.deepEqual(
      authoredHrefs(record.content).sort(),
      semantics.links.map(({ href }) => href).sort(),
      `links changed for ${record.route}`,
    );
    assert.equal("tag" in record.content, false, record.route);
    assert.equal("attributes" in record.content, false, record.route);
    assert.equal("children" in record.content, false, record.route);
  }
});

test("same-series archive comparisons use exact URL identity and expose first-observed editions", () => {
  const comparisons = authoredEditorialRegistry.flatMap((record) =>
    record.archiveComparison ? [[record.route, record.archiveComparison]] : [],
  );
  assert.equal(comparisons.length, 27);
  assert.equal(
    comparisons.filter(([, comparison]) => comparison.state === "first-observed").length,
    9,
  );
  assert.equal(comparisons.filter(([, comparison]) => comparison.state === "available").length, 18);
  for (const [route, comparison] of comparisons) {
    if (comparison.state !== "available") continue;
    const sourceUrls = new Map(comparison.sources.map((source) => [source.id, source.url]));
    assert.equal(sourceUrls.size, comparison.sources.length, route);
    for (const revision of [...comparison.previousRevisions, ...comparison.currentRevisions]) {
      assert.equal(revision.sourceIds.length, 1, route);
      assert.ok(sourceUrls.has(revision.sourceIds[0]), route);
      assert.match(revision.signalId, /^signal:archive-url-[a-f0-9]{24}$/);
    }
  }
});

test("every generated semantic tree preserves normalized source text and links", async () => {
  const snapshots = [
    ...(await readCorpus("reference")).map((snapshot) => ["frozen", snapshot]),
    ...(await readCorpus("live-reference")).map((snapshot) => ["live", snapshot]),
  ];
  const documents = new Map(capturedEditorialDocuments.map((document) => [document.key, document]));
  assert.equal(snapshots.length, documents.size);
  for (const [corpus, snapshot] of snapshots) {
    const key = `${corpus}:${snapshot.sha256}:${snapshot.route}`;
    assertEditorialDocumentParity(snapshot, documents.get(key));
  }
});

test("the sanitizer keeps one main root and rejects executable markup, styles, and unsafe URLs", () => {
  const snapshot = {
    route: "/about/",
    sourceUrl: "https://stgeorgesstrategy.com/about/",
    capturedAt: "2026-07-11T00:00:00Z",
    status: 200,
    bodyClass: "captured",
    bodyHtml: `<header onclick="alert(1)">Global header</header>
      <main id="main-content" style="color:red" onclick="alert(1)">
        <p style="color:red" onmouseover="alert(1)">Safe <marquee>wording</marquee></p>
        <script>alert(1)</script><iframe src="https://evil.example/">bad frame</iframe>
        <a href="javascript:alert(1)" style="color:red">Unsafe link</a>
        <a href="https://www.fca.org.uk/">Safe link</a>
        <img src="data:text/html,bad" onerror="alert(1)" alt="Rejected image source">
        <img src="/assets/hero.svg" alt="Safe image source">
      </main>
      <footer>Global footer</footer><style>body{display:none}</style><script>alert(1)</script>`,
    metadata: { title: "Fixture", description: "Fixture only" },
    sha256: "a".repeat(64),
  };
  const document = parseEditorialDocument(snapshot, "live");
  assert.equal(document.content.tag, "main");
  const serialized = JSON.stringify(document.content);
  assert.doesNotMatch(
    serialized,
    /Global header|Global footer|alert\(1\)|bad frame|javascript:|data:text|style|onclick|onerror/,
  );
  assert.match(projectEditorialSemantics(document.content).text, /Safe wording.*Safe link/);
  assert.match(serialized, /Safe image source/);
  assert.deepEqual(projectEditorialSemantics(document.content).links, [
    { label: "Safe link", href: "https://www.fca.org.uk/" },
  ]);
  assert.deepEqual(Object.keys(document.content.attributes), ["id"]);
  assert.ok(editorialDocumentAllowlist.tags.includes("main"));
});

test("generation is deterministic and matches the checked-in typed records", async () => {
  const first = await generateEditorialDocuments({ write: false });
  const second = await generateEditorialDocuments({ write: false });
  const checkedIn = await readFile(first.outputPath, "utf8");
  assert.equal(first.output, second.output);
  assert.equal(first.output, checkedIn);
  assert.deepEqual(first.documents, capturedEditorialDocuments);
});
