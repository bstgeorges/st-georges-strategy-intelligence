import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CURRENT_EDITION = path.join(ROOT, "site/data/current-edition.json");
const SIGNALS = path.join(ROOT, "site/data/signals.json");
const PROMOTION = path.join(ROOT, "dashboard/data/signals-promotion-summary.json");
const SIGNALS_HEALTH = path.join(ROOT, "dashboard/data/signals-health.generated.json");

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

function hasDefaultAssuranceBundle(text) {
  const action = String(text || "").toLowerCase();
  const tropes = [
    /\bowners?\b|\baccountab(?:le|ility)\b/,
    /\bmaps?\b|\bmapping\b/,
    /\bdependenc(?:y|ies)\b/,
    /\btests?(?:ed|ing)?\b/,
    /\bintervention\b|\brollback\b/,
    /\bexceptions?\b/,
    /\bclosure\b/,
  ];
  return tropes.filter((trope) => trope.test(action)).length >= 4;
}

const options = parseArgs(process.argv.slice(2));
const edition = readJson(CURRENT_EDITION);
const signals = readJson(SIGNALS);
const promotion = readJson(PROMOTION);
const signalsHealth = fs.existsSync(SIGNALS_HEALTH) ? readJson(SIGNALS_HEALTH) : null;
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(/^\d{4}-\d{2}-\d{2}$/.test(options.asOf), "--as-of must use YYYY-MM-DD");
assert(Number.isFinite(options.maxAgeDays) && options.maxAgeDays >= 1, "--max-age-days must be a positive number");
assert(/^\d{4}-\d{2}-\d{2}$/.test(edition.publicationDate || ""), "current-edition publicationDate must use YYYY-MM-DD");
assert(signals.edition === edition.publicationDate, "Signals edition must match current-edition publicationDate");
assert(promotion.date === edition.publicationDate, "approved Signals promotion summary must match current-edition publicationDate");
assert(Boolean(signalsHealth), "Signals evidence-health report is missing. Run npm run signals:health:verify before release:readiness.");
if (signalsHealth) {
  assert(signalsHealth.edition === edition.publicationDate, "Signals evidence-health report must match current-edition publicationDate");
  assert(signalsHealth.status === "ready", "Signals evidence-health report must have status ready");
  assert(Array.isArray(signalsHealth.top5Unresolved) && signalsHealth.top5Unresolved.length === 0, "Signals evidence-health report must have no unresolved Top 5 sources");
  const healthDate = String(signalsHealth.generatedAt || "").slice(0, 10);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(healthDate), "Signals evidence-health report must include generatedAt");
  if (/^\d{4}-\d{2}-\d{2}$/.test(healthDate)) {
    const healthAge = ageInDays(healthDate, options.asOf);
    assert(healthAge >= 0 && healthAge <= 1, "Signals evidence-health report must be generated no more than one UTC day before release readiness");
  }
}
assert(Boolean(edition.committeeQuestion?.question && edition.committeeQuestion?.why && edition.committeeQuestion?.evidence), "current-edition must include a complete featured Committee Question");
const editorialAngle = String(edition.judgement?.editorialAngle || "").trim();
const distinctFromPrevious = String(edition.judgement?.distinctFromPrevious || "").trim();
const nextMove = String(edition.judgement?.implication || "").trim();
assert(editorialAngle.length >= 12, "current-edition judgement must record a meaningful distinct editorial angle");
assert(distinctFromPrevious.length >= 24, "current-edition judgement must explain how it differs from the preceding edition");
assert(distinctFromPrevious.toLowerCase() !== editorialAngle.toLowerCase(), "current-edition editorial distinctness must not repeat the editorial angle");
assert(!hasDefaultAssuranceBundle(nextMove), "current-edition What to do repeats the default assurance bundle; prescribe one concrete next move instead");
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
