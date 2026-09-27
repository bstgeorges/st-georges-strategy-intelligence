import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadPublishedSourceMap } from "./lib/published_source_contract.mjs";
import { buildDailyIntelligenceReview, validateDailyIntelligenceLedger } from "./lib/daily_intelligence_ledger.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_PATH = path.join(ROOT, "dashboard", "data", "daily-intelligence-ledger.json");
const OUTPUT_PATH = path.join(ROOT, "dashboard", "data", "daily-intelligence-review.generated.json");

const ledger = JSON.parse(fs.readFileSync(INPUT_PATH, "utf8"));
const validation = validateDailyIntelligenceLedger(ledger, { sourceMap: loadPublishedSourceMap() });
if (validation.errors.length) throw new Error(`Daily intelligence ledger validation failed:\n${validation.errors.join("\n")}`);
const review = buildDailyIntelligenceReview(ledger);
const output = {
  version: ledger.version,
  generatedAt: new Date().toISOString(),
  purpose: "Private editorial review of daily intelligence. It is not public-site content.",
  entriesByStatus: Object.fromEntries(
    [...new Set((ledger.entries || []).map((entry) => entry.reviewStatus))]
      .sort()
      .map((status) => [status, (ledger.entries || []).filter((entry) => entry.reviewStatus === status).map((entry) => entry.id)]),
  ),
  warnings: validation.warnings,
  ...review,
};
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Prepared daily intelligence review: ${review.concepts.length} concepts, ${review.deepDiveLeads.length} Deep Dive leads.`);
