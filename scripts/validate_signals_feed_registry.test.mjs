import assert from "node:assert/strict";
import test from "node:test";

import { validateFeedRegistry } from "./validate_signals_feed_registry.mjs";

const primary = (id) => ({ id, tier: "primary" });

test("requires direct primary intake and adequate coverage of the historically thin Signals topics", () => {
  const topics = ["market-structure", "third-party", "resilience", "technology-failure", "financial-crime", "data"];
  const feeds = Array.from({ length: 80 }, (_, index) => ({
    id: `source-${index}`,
    sourceRegistryId: `registry-${index}`,
    fetchType: "rss",
    fetchUrl: `https://example.test/${index}.xml`,
    topics,
  }));
  const registry = { sources: feeds.map((feed) => primary(feed.sourceRegistryId)) };
  assert.deepEqual(validateFeedRegistry({ sources: feeds }, registry), []);
  const broken = validateFeedRegistry({ sources: feeds.slice(0, 79) }, registry);
  assert.ok(broken.some((error) => error.includes("minimum is 80")));
  const horizonBridge = { id: "reg-horizon-test-bridge", fetchType: "reg_horizon_json", fetchUrl: "site/regulatory-horizon/latest.json", topics: ["resilience"] };
  const bridge = validateFeedRegistry({ sources: [...feeds, horizonBridge] }, registry);
  assert.deepEqual(bridge, []);
  const malformedBridge = validateFeedRegistry({ sources: [...feeds, { ...horizonBridge, fetchUrl: "https://example.test/bridge.json" }] }, registry);
  assert.ok(malformedBridge.some((error) => error.includes("withheld Reg Horizon route")));
  const statusWithoutMaterialityGate = validateFeedRegistry({ sources: [{ ...feeds[0], tags: ["service-status"] }, ...feeds.slice(1)] }, registry);
  assert.ok(statusWithoutMaterialityGate.some((error) => error.includes("headline-level materiality")));
  assert.ok(statusWithoutMaterialityGate.some((error) => error.includes("deduplicate recurring")));
});
