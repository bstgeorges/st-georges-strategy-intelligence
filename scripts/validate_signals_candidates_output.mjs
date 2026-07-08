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

  if (!data.generatedAt && data.mode !== "seed") fail("signals-candidates.generated.json missing generatedAt.", failures);
  if (!Array.isArray(data.topics)) fail("signals-candidates.generated.json must contain topics[].", failures);

  for (const topic of data.topics || []) {
    if (!TOPICS.has(topic.id)) fail(`Unexpected topic id: ${topic.id}`, failures);
    if (!Array.isArray(topic.candidates)) fail(`${topic.id} must contain candidates[].`, failures);
    for (const [index, candidate] of (topic.candidates || []).entries()) {
      if (!candidate.title) fail(`${topic.id} candidate ${index + 1} missing title.`, failures);
      if (!candidate.url) fail(`${topic.id} candidate ${index + 1} missing url.`, failures);
      if (!candidate.sourceRegistryId) fail(`${topic.id} candidate ${index + 1} missing sourceRegistryId.`, failures);
      if (!candidate.ingestSourceId) fail(`${topic.id} candidate ${index + 1} missing ingestSourceId.`, failures);
      if (!candidate.reviewStatus) fail(`${topic.id} candidate ${index + 1} missing reviewStatus.`, failures);
      if (candidate.url && !isSpecificPublishedSourceUrl(candidate.url)) {
        fail(`${topic.id} candidate ${index + 1} uses a generic or unsupported source URL: ${candidate.url}`, failures);
      }
      if (candidate.url && !resolvePublishedSource(candidate.url)) {
        fail(`${topic.id} candidate ${index + 1} uses an unregistered citation host: ${candidate.url}`, failures);
      }
    }
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
