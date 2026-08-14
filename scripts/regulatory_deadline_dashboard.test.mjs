import assert from "node:assert/strict";
import test from "node:test";

import { renderDashboard } from "./render_regulatory_deadline_dashboard.mjs";

test("private dashboard renders the cumulative register and never turns review into confirmation", () => {
  const html = renderDashboard({
    register: {
      asOf: "2026-08-14",
      sourceEdition: "2026-08-14",
      items: [{
        id: "example-record",
        title: "Consultation on <script>unsafe</script> controls",
        url: "https://example.test/consultation",
        deadline: "2026-09-30",
        stage: "consultation",
        status: "ready-for-review",
        authority: { name: "Example Authority" },
        themes: ["digital-resilience"],
        confidence: { band: "high", components: { authority: 1, detail: 1 } },
        evidence: { change: "Official wording confirms the consultation close.", detailChecked: true, deadlineCue: "Responses must be received by 30 September." },
        sourcePublishedAt: "2026-08-12",
        firstSeen: "2026-08-14",
        lastSeen: "2026-08-14",
        ownerGuidance: { owners: ["Operations"], prepare: ["Assess impact"] },
      }],
    },
    review: { items: [] },
    health: { sourceHealth: [{ status: "ok" }, { status: "blocked" }] },
    qa: { readiness: { score: 43, relaunchEligible: false, metrics: { confirmedAuthorities: 0, confirmedOpenDeadlines: 0, stableCoreAuthorities: 0, sourceAgeDays: 0 }, relaunchReasons: ["not ready"] } },
    changes: { baseline: true, additions: [], revisedDates: [], statusChanges: [], reconfirmed: [], notReconfirmed: [] },
  });

  assert.match(html, /Private operating dashboard/);
  assert.match(html, /Ready for review/);
  assert.match(html, /0<\/strong><p>1 cumulative record/);
  assert.match(html, /Consultation on \\u003cscript\\u003eunsafe\\u003c\/script\\u003e controls/);
  assert.doesNotMatch(html, /<script>unsafe<\/script>/);
  assert.match(html, /Export filtered CSV/);
  assert.match(html, /What changed since the last scan/);
  assert.match(html, /This is the first tracked run/);
  assert.match(html, /Evidence &amp; decision/);
  assert.match(html, /Copy decision template/);
});
