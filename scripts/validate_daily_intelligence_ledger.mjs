import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadPublishedSourceMap } from "./lib/published_source_contract.mjs";
import { validateDailyIntelligenceLedger } from "./lib/daily_intelligence_ledger.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_LEDGER = path.join(ROOT, "dashboard", "data", "daily-intelligence-ledger.json");

function parseArgs(argv) {
  const options = { input: DEFAULT_LEDGER };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") options.input = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--input=")) options.input = path.resolve(arg.slice("--input=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

try {
  const options = parseArgs(process.argv.slice(2));
  const ledger = JSON.parse(fs.readFileSync(options.input, "utf8"));
  const result = validateDailyIntelligenceLedger(ledger, { sourceMap: loadPublishedSourceMap() });
  if (result.errors.length) {
    console.error("Daily intelligence ledger validation failed:");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Daily intelligence ledger validation passed: ${ledger.entries.length} entries, ${result.approved.length} approved for candidate review.`);
  for (const warning of result.warnings) console.log(`Warning: ${warning}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
