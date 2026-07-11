import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { generateEditorialDocuments } from "../scripts/generate-editorial-documents.mjs";
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
