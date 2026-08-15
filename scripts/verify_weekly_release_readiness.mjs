import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CURRENT_EDITION = path.join(ROOT, "site/data/current-edition.json");
const SIGNALS = path.join(ROOT, "site/data/signals.json");
const PROMOTION = path.join(ROOT, "dashboard/data/signals-promotion-summary.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function parseArgs(argv) {
  const options = { asOf: new Date().toISOString().slice(0, 10), maxAgeDays: 8 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--as-of") options.asOf = argv[++index] || "";
    else if (arg.startsWith("--as-of=")) options.asOf = arg.slice("--as-of=".length);
    else if (arg === "--max-age-days") options.maxAgeDays = Number(argv[++index]);
    else if (arg.startsWith("--max-age-days=")) options.maxAgeDays = Number(arg.slice("--max-age-days=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function ageInDays(edition, asOf) {
  return Math.floor((Date.parse(`${asOf}T00:00:00Z`) - Date.parse(`${edition}T00:00:00Z`)) / 86400000);
}

const options = parseArgs(process.argv.slice(2));
const edition = readJson(CURRENT_EDITION);
const signals = readJson(SIGNALS);
const promotion = readJson(PROMOTION);
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(/^\d{4}-\d{2}-\d{2}$/.test(options.asOf), "--as-of must use YYYY-MM-DD");
assert(Number.isFinite(options.maxAgeDays) && options.maxAgeDays >= 1, "--max-age-days must be a positive number");
assert(/^\d{4}-\d{2}-\d{2}$/.test(edition.publicationDate || ""), "current-edition publicationDate must use YYYY-MM-DD");
assert(signals.edition === edition.publicationDate, "Signals edition must match current-edition publicationDate");
assert(promotion.date === edition.publicationDate, "approved Signals promotion summary must match current-edition publicationDate");
assert(Boolean(edition.committeeQuestion?.question && edition.committeeQuestion?.why && edition.committeeQuestion?.evidence), "current-edition must include a complete featured Committee Question");
assert(Array.isArray(edition.committeeQuestions) && edition.committeeQuestions.length === 3, "current-edition must include exactly three Committee Questions");
for (const [index, question] of (edition.committeeQuestions || []).entries()) {
  assert(Boolean(question?.question && question?.why && question?.evidence), `current-edition Committee Question ${index + 1} must be complete`);
}
assert(Array.isArray(edition.topSignals) && edition.topSignals.length === 5, "current-edition must contain exactly five cross-site signals");
assert(ageInDays(edition.publicationDate, options.asOf) >= 0, "current-edition publicationDate cannot be in the future");
assert(ageInDays(edition.publicationDate, options.asOf) <= options.maxAgeDays, "current-edition is overdue for its next weekly refresh");
if (failures.length) {
  console.error("Weekly release readiness failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Weekly release readiness passed (${edition.publicationDate}; as of ${options.asOf}).`);
