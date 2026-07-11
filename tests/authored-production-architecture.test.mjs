import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "..");

async function sourceFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(root, entry.name);
      if (entry.isDirectory()) return sourceFiles(target);
      return /\.(?:ts|tsx)$/.test(entry.name) ? [target] : [];
    }),
  );
  return nested.flat();
}

test("production routes and components never import capture AST fixtures", async () => {
  const files = [
    ...(await sourceFiles(path.join(projectRoot, "src/app"))),
    ...(await sourceFiles(path.join(projectRoot, "src/components"))),
    path.join(projectRoot, "scripts/verify-release.mjs"),
    path.join(projectRoot, "scripts/verify-archetypes.mjs"),
  ];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    assert.doesNotMatch(source, /content\/generated|editorial\/document-registry/, file);
  }
});

test("public discovery and release gates share the authored route registry", async () => {
  for (const file of [
    "src/app/sitemap.ts",
    "scripts/verify-release.mjs",
    "scripts/verify-archetypes.mjs",
  ]) {
    const source = await readFile(path.join(projectRoot, file), "utf8");
    assert.match(source, /publicEditorialRegistry/, file);
  }
});

test("the production editorial boundary dispatches seven named schemas without raw markup recursion", async () => {
  const renderer = await readFile(
    path.join(projectRoot, "src/components/site/editorial-document-page.tsx"),
    "utf8",
  );
  for (const component of [
    "BriefArchetype",
    "SignalsIndexArchetype",
    "TopicDossierArchetype",
    "RegulatoryHorizonArchetype",
    "CommitteeQuestionsArchetype",
    "ArchiveArchetype",
    "AboutArchetype",
  ]) {
    assert.match(renderer, new RegExp(component));
  }
  assert.doesNotMatch(renderer, /renderNode|EditorialNode|createElement|attributes\s*:/);

  const route = await readFile(path.join(projectRoot, "src/app/[...slug]/page.tsx"), "utf8");
  assert.match(route, /authoredEditorialRegistry/);
  assert.match(route, /getAuthoredEditorialRecord/);
  assert.match(route, /editorialStructuredData/);
});
