import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDailyIntelligenceCandidates,
  validateDailyIntelligenceLedger,
} from "./lib/daily_intelligence_ledger.mjs";

const sourceMap = {
  sources: [{ id: "openai", label: "OpenAI", tier: "primary", hosts: ["openai.com"] }],
};

function entry(overrides = {}) {
  return {
    id: "2026-09-26-approval-integrity",
    briefingDate: "2026-09-26",
    title: "Approval must be bound to the action that executes",
    summary: "A materially different action can execute after a human has approved an earlier workflow state.",
    whyItMatters: "A nominal human-in-the-loop check does not prove effective human control.",
    controlImplication: "Bind the approved parameters to the execution record.",
    topics: ["ai", "cyber"],
    concepts: ["approval-to-execution-integrity"],
    reviewStatus: "approved",
    sources: [{
      title: "Model misalignment reporting framework",
      organisation: "OpenAI",
      primary: true,
      sourceType: "primary",
      url: "https://openai.com/index/model-misalignment-reporting-framework/",
      publishedDate: "2026-09-16",
    }],
    ...overrides,
  };
}

test("unverified daily leads remain valid but do not enter the promotion queue", () => {
  const ledger = { entries: [entry({ reviewStatus: "needs-source-review", sources: [] })] };
  const validation = validateDailyIntelligenceLedger(ledger, { sourceMap });
  assert.deepEqual(validation.errors, []);
  assert.equal(validation.approved.length, 0);
  assert.ok(validation.warnings.some((warning) => warning.includes("held for exact-source review")));
});

test("approved daily intelligence becomes attributed candidates for each selected topic", () => {
  const candidates = buildDailyIntelligenceCandidates({ entries: [entry()] }, { sourceMap });
  assert.equal(candidates.approvedCount, 1);
  assert.equal(candidates.byTopic.get("ai").length, 1);
  assert.equal(candidates.byTopic.get("cyber").length, 1);
  const candidate = candidates.byTopic.get("ai")[0];
  assert.equal(candidate.sourceRegistryId, "openai");
  assert.equal(candidate.dateSource, "daily-intelligence-verified");
  assert.equal(candidate.dailyIntelligence.entryId, "2026-09-26-approval-integrity");
});

test("weekly AI risk intake may promote a registered research source after review", () => {
  const researchMap = { sources: [{ id: "arxiv", label: "arXiv", tier: "research", hosts: ["arxiv.org"] }] };
  const candidates = buildDailyIntelligenceCandidates({ entries: [entry({
    sources: [{
      title: "Loopjacking",
      organisation: "arXiv",
      primary: true,
      sourceType: "research",
      url: "https://arxiv.org/abs/2609.21081",
      publishedDate: "2026-09-17",
    }],
  })] }, {
    sourceMap: researchMap,
    allowedSourceTiers: ["primary", "research"],
    allowedSourceTypes: ["primary", "research"],
    candidateDateSource: "weekly-ai-risk-verified",
    ingestSourceId: "weekly-ai-risk-feed",
  });
  assert.equal(candidates.byTopic.get("ai")[0].dateSource, "weekly-ai-risk-verified");
  assert.equal(candidates.byTopic.get("ai")[0].ingestSourceId, "weekly-ai-risk-feed");
});

test("approved daily intelligence is rejected without an exact registered primary source", () => {
  const validation = validateDailyIntelligenceLedger({
    entries: [entry({ sources: [{ primary: true, sourceType: "reporting", url: "https://example.com/", publishedDate: "2026-09-16" }] })],
  }, { sourceMap });
  assert.ok(validation.errors.some((error) => error.includes("exact publication URL")));
  assert.ok(validation.errors.some((error) => error.includes("unregistered citation host")));
  assert.ok(validation.errors.some((error) => error.includes("must be primary")));
});
