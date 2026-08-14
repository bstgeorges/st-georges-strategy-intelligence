import assert from "node:assert/strict";
import test from "node:test";

import { canonicaliseUrl, createEstate } from "./build_source_estate.mjs";

test("source estate keeps a source route once while preserving its operating roles", () => {
  const estate = createEstate({
    universe: {
      authorities: [{ id: "authority-a", name: "Authority A", jurisdictions: ["UK"], homepage: "https://example.com/", provenance: { url: "https://directory.example/a" } }],
      endpoints: [{ id: "authority-a-home", authorityId: "authority-a", url: "https://example.com/", primary: true }],
    },
    registry: { sources: [{ id: "source-a", name: "Authority A publications", tier: "primary", category: "regulation", jurisdictions: ["UK"], url: "https://example.com/" }] },
    signalsFeeds: { sources: [{ id: "source-a-rss", sourceRegistryId: "source-a" }] },
  });
  assert.equal(estate.metrics.uniqueSourceRoutes, 1);
  assert.equal(estate.metrics.cataloguedRegulatoryAuthorities, 1);
  assert.deepEqual(estate.routes[0].roles, ["catalogued-regulatory-authority", "governed-source-registry"]);
  assert.deepEqual(estate.routes[0].activeSignalsFeedIds, ["source-a-rss"]);
});

test("source URL canonicalisation removes incidental query and trailing slash variation", () => {
  assert.equal(canonicaliseUrl("https://example.com/news/?utm_source=weekly#top"), "https://example.com/news");
});
