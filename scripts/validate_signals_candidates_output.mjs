import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isSpecificPublishedSourceUrl, resolvePublishedSource } from "./lib/published_source_contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = path.join(ROOT, "dashboard", "data", "signals-candidates.generated.json");
const TOPICS = new Set([
  "ai",
  "market-structure",
  "third-party",
  "resilience",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
]);

function fail(message, failures) {
  failures.push(message);
}

function main() {
  const data = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"));
  const failures = [];
  const requiresRankingMetadata = String(data.version || "") >= "2026-07-18";

  if (!data.generatedAt && data.mode !== "seed") fail("signals-candidates.generated.json missing generatedAt.", failures);
  if (!Array.isArray(data.topics)) fail("signals-candidates.generated.json must contain topics[].", failures);

  const topicIds = new Set();

  for (const topic of data.topics || []) {
    if (!TOPICS.has(topic.id)) fail(`Unexpected topic id: ${topic.id}`, failures);
    if (topicIds.has(topic.id)) fail(`Duplicate topic id: ${topic.id}`, failures);
    topicIds.add(topic.id);
    if (!Array.isArray(topic.candidates)) fail(`${topic.id} must contain candidates[].`, failures);
    const urls = new Set();
    for (const [index, candidate] of (topic.candidates || []).entries()) {
      if (!candidate.title) fail(`${topic.id} candidate ${index + 1} missing title.`, failures);
      if (!candidate.url) fail(`${topic.id} candidate ${index + 1} missing url.`, failures);
      if (!candidate.sourceRegistryId) fail(`${topic.id} candidate ${index + 1} missing sourceRegistryId.`, failures);
      if (!candidate.ingestSourceId) fail(`${topic.id} candidate ${index + 1} missing ingestSourceId.`, failures);
      if (!candidate.reviewStatus) fail(`${topic.id} candidate ${index + 1} missing reviewStatus.`, failures);
      if (requiresRankingMetadata && (!Number.isFinite(candidate.relevanceScore) || candidate.relevanceScore < 0 || candidate.relevanceScore > 100)) {
        fail(`${topic.id} candidate ${index + 1} has an invalid relevanceScore.`, failures);
      }
      if (requiresRankingMetadata && !Array.isArray(candidate.matchedKeywords)) fail(`${topic.id} candidate ${index + 1} missing matchedKeywords[].`, failures);
      if (candidate.url && urls.has(candidate.url)) fail(`${topic.id} contains duplicate candidate URL: ${candidate.url}`, failures);
      if (candidate.url) urls.add(candidate.url);
      if (candidate.url && !isSpecificPublishedSourceUrl(candidate.url)) {
        fail(`${topic.id} candidate ${index + 1} uses a generic or unsupported source URL: ${candidate.url}`, failures);
      }
      if (candidate.url && !resolvePublishedSource(candidate.url)) {
        fail(`${topic.id} candidate ${index + 1} uses an unregistered citation host: ${candidate.url}`, failures);
      }
    }
  }
  for (const topicId of TOPICS) {
    if (!topicIds.has(topicId)) fail(`Missing topic id: ${topicId}`, failures);
  }

  if (failures.length) {
    console.error("Signals candidate output validation failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("Signals candidate output validation passed.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
