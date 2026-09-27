import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadPublishedSourceMap } from "./lib/published_source_contract.mjs";
import { validateDailyIntelligenceLedger } from "./lib/daily_intelligence_ledger.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_FEED = path.join(ROOT, "dashboard", "data", "weekly-ai-risk-feed.json");

function parseArgs(argv) {
  const options = { input: DEFAULT_FEED };
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
  const feed = JSON.parse(fs.readFileSync(options.input, "utf8"));
  const result = validateDailyIntelligenceLedger(feed, {
    sourceMap: loadPublishedSourceMap(),
    entryLabel: "weekly AI risk entry",
    allowedSourceTiers: ["primary", "research"],
    allowedSourceTypes: ["primary", "research"],
  });
  if (result.errors.length) {
    console.error("Weekly AI risk feed validation failed:");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Weekly AI risk feed validation passed: ${feed.entries.length} entries, ${result.approved.length} approved for candidate review.`);
  for (const warning of result.warnings) console.log(`Warning: ${warning}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
