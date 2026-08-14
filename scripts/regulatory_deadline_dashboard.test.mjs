import assert from "node:assert/strict";
import test from "node:test";

import { renderDashboard } from "./render_regulatory_deadline_dashboard.mjs";

test("private dashboard renders the cumulative register and never turns review into confirmation", () => {
  const html = renderDashboard({
    register: {
      asOf: "2026-08-14",
      sourceEdition: "2026-08-14",
      items: [{
        title: "Consultation on <script>unsafe</script> controls",
        url: "https://example.test/consultation",
        deadline: "2026-09-30",
        stage: "consultation",
        status: "ready-for-review",
        authority: { name: "Example Authority" },
        themes: ["digital-resilience"],
        confidence: { band: "high" },
        ownerGuidance: { owners: ["Operations"], prepare: ["Assess impact"] },
      }],
    },
    review: { items: [] },
    health: { sourceHealth: [{ status: "ok" }, { status: "blocked" }] },
    qa: { readiness: { score: 43, relaunchEligible: false, metrics: { confirmedAuthorities: 0, confirmedOpenDeadlines: 0, stableCoreAuthorities: 0, sourceAgeDays: 0 }, relaunchReasons: ["not ready"] } },
  });

  assert.match(html, /Private operating dashboard/);
  assert.match(html, /Ready for review/);
  assert.match(html, /0<\/strong><p>1 cumulative record/);
  assert.match(html, /Consultation on \\u003cscript\\u003eunsafe\\u003c\/script\\u003e controls/);
  assert.doesNotMatch(html, /<script>unsafe<\/script>/);
  assert.match(html, /Export filtered CSV/);
});
