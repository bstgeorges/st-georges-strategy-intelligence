import assert from "node:assert/strict";
import test from "node:test";

import { validateFeedRegistry } from "./validate_signals_feed_registry.mjs";

const primary = (id) => ({ id, tier: "primary" });

test("requires direct primary intake and adequate coverage of the historically thin Signals topics", () => {
  const topics = ["market-structure", "third-party", "technology-failure", "financial-crime", "data"];
  const feeds = Array.from({ length: 35 }, (_, index) => ({
    id: `source-${index}`,
    sourceRegistryId: `registry-${index}`,
    fetchType: "rss",
    fetchUrl: `https://example.test/${index}.xml`,
    topics,
  }));
  const registry = { sources: feeds.map((feed) => primary(feed.sourceRegistryId)) };
  assert.deepEqual(validateFeedRegistry({ sources: feeds }, registry), []);
  const broken = validateFeedRegistry({ sources: feeds.slice(0, 34) }, registry);
  assert.ok(broken.some((error) => error.includes("minimum is 35")));
  const bridge = validateFeedRegistry({ sources: [{ ...feeds[0], fetchType: "reg_horizon_json" }, ...feeds.slice(1)] }, registry);
  assert.ok(bridge.some((error) => error.includes("unsupported fetch type")));
});
