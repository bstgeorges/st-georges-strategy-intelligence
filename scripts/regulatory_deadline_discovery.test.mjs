import assert from "node:assert/strict";
import test from "node:test";

import { buildDiscovery } from "./build_regulatory_deadline_discovery.mjs";

test("separates the discovery catalogue from active deadline intake and makes scan gaps visible", () => {
  const discovery = buildDiscovery({
    universe: { metrics: { authorities: 135, jurisdictions: 139, endpoints: 184 } },
    registry: { sources: [
      { id: "uk-fca", name: "Financial Conduct Authority", tier: "primary", category: "regulation", jurisdictions: ["UK"] },
      { id: "eba", name: "European Banking Authority", tier: "primary", category: "regulation", jurisdictions: ["EU"] },
    ] },
    policy: { activeIntake: { deadlineLookbackDays: 90, sourceIds: ["uk-fca", "eba", "missing"] } },
    latest: { edition: "2026-08-14", runMetrics: { sourcesConfigured: 2 }, coverage: { state: "limited" }, sourceHealth: [{ sourceId: "uk-fca", status: "ok" }] },
  });

  assert.equal(discovery.catalogue.authorities, 135);
  assert.equal(discovery.activeIntake.sources, 2);
  assert.deepEqual(discovery.activeIntake.missingRegistrySources, ["missing"]);
  assert.equal(discovery.latestScan.activeSourcesChecked, 1);
  assert.deepEqual(discovery.latestScan.unscannedActiveSources.sort(), ["eba", "missing"]);
  assert.ok(discovery.nextActions.some((action) => action.includes("full active intake")));
});
