import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { appendHealthRun, buildEditorialReview } from "./lib/signals_editorial_review.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATES_PATH = path.join(ROOT, "dashboard", "data", "signals-candidates.generated.json");
const OUTPUT_PATH = path.join(ROOT, "dashboard", "data", "signals-promotion-review.generated.json");
const HISTORY_PATH = path.join(ROOT, "dashboard", "data", "signals-source-health-history.json");
const CURRENT_SIGNALS_PATH = path.join(ROOT, "site", "data", "signals.json");
const SOURCE_REGISTRY_PATH = path.join(ROOT, "dashboard", "data", "source-registry.json");
const FEED_REGISTRY_PATH = path.join(ROOT, "dashboard", "data", "signals-feed-registry.json");

const candidates = JSON.parse(fs.readFileSync(CANDIDATES_PATH, "utf8"));
if (!candidates.generatedAt || !Array.isArray(candidates.topics)) {
  throw new Error("Candidate output is missing generatedAt or topics[].");
}

const history = fs.existsSync(HISTORY_PATH) ? JSON.parse(fs.readFileSync(HISTORY_PATH, "utf8")) : { runs: [] };
const nextHistory = appendHealthRun(history, candidates);
const sourceRegistry = new Map(JSON.parse(fs.readFileSync(SOURCE_REGISTRY_PATH, "utf8")).sources.map((source) => [source.id, source]));
const editorial = buildEditorialReview({
  candidates,
  currentSignals: JSON.parse(fs.readFileSync(CURRENT_SIGNALS_PATH, "utf8")),
  sourceRegistry,
  feedRegistry: JSON.parse(fs.readFileSync(FEED_REGISTRY_PATH, "utf8")),
  historyRuns: nextHistory.runs,
});

const review = {
  version: candidates.version,
  reviewStatus: "pending",
  candidateGeneratedAt: candidates.generatedAt,
  preparedAt: new Date().toISOString(),
  instructions: "Start with decision-type groups and diversity controls, then review the proposed candidates by theme. Copy approved URLs into signals-promotion-shortlist.json, add editorial rationales, set reviewStatus to approved, and preserve candidateGeneratedAt exactly.",
  criteria: ["materiality", "specificity", "decision value", "source authority", "duplication control", "source diversity", "regional balance", "new versus continuing"],
  editorial,
  topics: candidates.topics.map((topic) => ({
    id: topic.id,
    selectedUrls: [],
    editorialRationale: "",
    proposedCandidates: (topic.candidates || []).slice(0, 5).map((candidate) => ({
      title: candidate.title,
      url: candidate.url,
      sourceName: candidate.sourceName,
      publishedAt: candidate.publishedAt,
      relevanceScore: candidate.relevanceScore,
    })),
  })),
};

fs.writeFileSync(HISTORY_PATH, `${JSON.stringify(nextHistory, null, 2)}\n`);
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(review, null, 2)}\n`);
console.log(`Prepared editorial shortlist review for ${candidates.generatedAt}.`);
