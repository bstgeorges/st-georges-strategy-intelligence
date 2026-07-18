import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATES_PATH = path.join(ROOT, "dashboard", "data", "signals-candidates.generated.json");
const OUTPUT_PATH = path.join(ROOT, "dashboard", "data", "signals-promotion-review.generated.json");

const candidates = JSON.parse(fs.readFileSync(CANDIDATES_PATH, "utf8"));
if (!candidates.generatedAt || !Array.isArray(candidates.topics)) {
  throw new Error("Candidate output is missing generatedAt or topics[].");
}

const review = {
  version: candidates.version,
  reviewStatus: "pending",
  candidateGeneratedAt: candidates.generatedAt,
  preparedAt: new Date().toISOString(),
  instructions: "Review the proposed candidates, copy approved URLs into signals-promotion-shortlist.json, add editorial rationales, set reviewStatus to approved, and preserve candidateGeneratedAt exactly.",
  criteria: ["materiality", "specificity", "decision value", "source authority", "duplication control"],
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

fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(review, null, 2)}\n`);
console.log(`Prepared editorial shortlist review for ${candidates.generatedAt}.`);
