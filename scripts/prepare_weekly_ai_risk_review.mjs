import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadPublishedSourceMap } from "./lib/published_source_contract.mjs";
import { buildDailyIntelligenceReview, validateDailyIntelligenceLedger } from "./lib/daily_intelligence_ledger.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_PATH = path.join(ROOT, "dashboard", "data", "weekly-ai-risk-feed.json");
const OUTPUT_PATH = path.join(ROOT, "dashboard", "data", "weekly-ai-risk-review.generated.json");

const feed = JSON.parse(fs.readFileSync(INPUT_PATH, "utf8"));
const validation = validateDailyIntelligenceLedger(feed, {
  sourceMap: loadPublishedSourceMap(),
  entryLabel: "weekly AI risk entry",
  allowedSourceTiers: ["primary", "research"],
  allowedSourceTypes: ["primary", "research"],
});
if (validation.errors.length) throw new Error(`Weekly AI risk feed validation failed:\n${validation.errors.join("\n")}`);

const review = buildDailyIntelligenceReview(feed);
const output = {
  version: feed.version,
  generatedAt: new Date().toISOString(),
  purpose: "Private editorial review of the Weekly AI Risk Feed. It is not public-site content.",
  entriesByStatus: Object.fromEntries(
    [...new Set((feed.entries || []).map((entry) => entry.reviewStatus))]
      .sort()
      .map((status) => [status, (feed.entries || []).filter((entry) => entry.reviewStatus === status).map((entry) => entry.id)]),
  ),
  warnings: validation.warnings,
  ...review,
};
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Prepared Weekly AI risk review: ${review.concepts.length} concepts, ${review.deepDiveLeads.length} Deep Dive leads.`);
