import assert from "node:assert/strict";
import test from "node:test";

import { publicEditorialRegistry } from "../src/content/editorial/public-registry.ts";
import {
  editorialCanonical,
  editorialStructuredData,
  toEditorialMetadata,
} from "../src/lib/editorial-metadata.ts";

test("all selected routes have unique self canonicals, Open Graph URLs, and JSON-LD IDs", () => {
  const canonicals = new Set();
  assert.equal(publicEditorialRegistry.length, 51);

  for (const record of publicEditorialRegistry) {
    const { route } = record;
    const expected = new URL(route, "https://stgeorgesstrategy.com").href;
    const canonical = editorialCanonical(record);
    const metadata = toEditorialMetadata(record);
    const structuredData = editorialStructuredData(record);

    assert.equal(canonical, expected, route);
    assert.equal(metadata.alternates?.canonical, expected, route);
    assert.equal(metadata.openGraph?.url, expected, route);
    assert.equal(structuredData["@id"], expected, route);
    assert.equal(structuredData.url, expected, route);
    assert.equal(structuredData.mainEntityOfPage["@id"], expected, route);
    assert.equal(new URL(canonical).origin, "https://stgeorgesstrategy.com", route);
    assert.equal(new URL(canonical).pathname, route, route);
    assert.ok(!canonicals.has(canonical), `duplicate canonical: ${canonical}`);
    canonicals.add(canonical);
  }

  assert.equal(canonicals.size, publicEditorialRegistry.length);
});

test("archive indexes without captured schema receive route-specific CollectionPage data", () => {
  const archiveIndex = publicEditorialRegistry.find(
    ({ route }) => route === "/signals/ai/archive/",
  );
  assert.ok(archiveIndex);
  assert.equal(archiveIndex.metadata.structuredData, undefined);

  const structuredData = editorialStructuredData(archiveIndex);
  assert.equal(structuredData["@type"], "CollectionPage");
  assert.equal(structuredData.url, "https://stgeorgesstrategy.com/signals/ai/archive/");
});
