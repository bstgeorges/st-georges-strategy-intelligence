import assert from "node:assert/strict";
import test from "node:test";

import { appendHealthRun, buildEditorialReview, buildSourceHealth, classifyDecisionType } from "./lib/signals_editorial_review.mjs";

test("decision types separate rules, enforcement, threats, outages and research", () => {
  assert.equal(classifyDecisionType({ title: "Authority opens consultation on reporting rules" }), "rule-change");
  assert.equal(classifyDecisionType({ title: "Firm receives a penalty for control failings" }), "enforcement");
  assert.equal(classifyDecisionType({ title: "Millions forfeited in sanctions-evasion case" }), "enforcement");
  assert.equal(classifyDecisionType({ title: "Known exploited vulnerability added to catalog" }), "active-threat");
  assert.equal(classifyDecisionType({ title: "Regional cloud outage disrupts services" }), "outage");
  assert.equal(classifyDecisionType({ title: "New working paper on AI controls" }), "research");
  assert.equal(classifyDecisionType({ title: "NVIDIA Announces Jetson Orin Nano 2 Robotics Computer to Redefine Entry-Level Edge AI" }), "context");
  assert.equal(classifyDecisionType({ title: "FLARE: A Systematic, Uncertainty-Aware Framework for Evidence-Based Adoption of Artificial Intelligence in Healthcare", tags: ["research"] }), "research");
  assert.equal(classifyDecisionType({ title: "New efficiency standard for AI agents" }), "context");
});

test("two consecutive quiet or failed runs trigger an investigation for monitored feeds", () => {
  const history = [
    { generatedAt: "2026-08-09T00:00:00.000Z", sourceStats: [{ sourceId: "finma", status: "failed" }] },
    { generatedAt: "2026-08-16T00:00:00.000Z", sourceStats: [{ sourceId: "finma", status: "quiet" }, { sourceId: "arxiv", status: "quiet" }] },
  ];
  const health = buildSourceHealth(history[1].sourceStats, history, {
    sources: [{ id: "finma" }, { id: "arxiv", healthMonitoring: false }],
  });
  assert.equal(health.entries.find((entry) => entry.sourceId === "finma").action, "investigate");
  assert.equal(health.entries.find((entry) => entry.sourceId === "arxiv").monitoring, "supplementary");
  assert.equal(health.entries.find((entry) => entry.sourceId === "arxiv").action, "none");
});

test("editorial review collapses cross-theme duplicates and reports source and regional balance", () => {
  const candidates = {
    topics: [
      { id: "third-party", candidates: [{ topicId: "third-party", title: "Cloud outage", url: "https://example.test/outage", sourceRegistryId: "uk", sourceName: "UK Source", publishedAt: "2026-08-16T00:00:00.000Z", relevanceScore: 90 }] },
      { id: "technology-failure", candidates: [{ topicId: "technology-failure", title: "Cloud outage", url: "https://example.test/outage", sourceRegistryId: "uk", sourceName: "UK Source", publishedAt: "2026-08-16T00:00:00.000Z", relevanceScore: 90 }] },
      { id: "market-structure", candidates: [{ topicId: "market-structure", title: "US rule consultation", url: "https://example.test/rule", sourceRegistryId: "us", sourceName: "US Source", publishedAt: "2026-08-16T00:00:00.000Z", relevanceScore: 80 }] },
    ],
    sourceStats: [],
  };
  const review = buildEditorialReview({
    candidates,
    currentSignals: { topics: [{ top5: [], stillMaterial: [] }] },
    sourceRegistry: new Map([["uk", { jurisdictions: ["UK"] }], ["us", { jurisdictions: ["US"] }]]),
    feedRegistry: { sources: [] },
    historyRuns: [],
  });
  assert.equal(review.diversity.uniqueCandidateEvents, 2);
  assert.equal(review.diversity.crossThemeDuplicatesCollapsed, 1);
  assert.deepEqual(review.diversity.regionalBalance, [
    { region: "UK/EMEA", count: 1, share: 50 },
    { region: "US", count: 1, share: 50 },
    { region: "Global/other", count: 0, share: 0 },
  ]);
  assert.equal(review.decisionTypeCounts.outage, 1);
  assert.equal(review.decisionTypeCounts["rule-change"], 1);
});

test("health history adds each generated candidate run only once", () => {
  const candidates = { generatedAt: "2026-08-16T00:00:00.000Z", mode: "live", sourceStats: [{ sourceId: "a", status: "ok" }] };
  const once = appendHealthRun({ runs: [] }, candidates);
  assert.equal(once.runs.length, 1);
  assert.equal(appendHealthRun(once, candidates).runs.length, 1);
});
