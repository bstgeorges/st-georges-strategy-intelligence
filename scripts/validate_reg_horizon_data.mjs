import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_FILE = path.join(ROOT, "dashboard", "regulatory-horizon", "latest.json");
const ALLOWED_TYPES = new Set(["consultation", "final-rule", "guidance", "enforcement", "statement", "other"]);
const KNOWN_RISK_AREAS = new Set([
  "balance-sheet",
  "customer-outcomes",
  "boardroom-and-accountability",
  "crime-and-sanctions",
  "digital-resilience",
  "ai-and-models",
  "digital-money",
  "market-plumbing",
]);

function parseArgs(argv) {
  let file = DEFAULT_FILE;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--file") file = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--file=")) file = path.resolve(arg.slice("--file=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return { file };
}

function validate(data) {
  const failures = [];
  const assert = (condition, message) => {
    if (!condition) failures.push(message);
  };

  assert(/^\d{4}-\d{2}-\d{2}$/.test(data.edition || ""), "edition must use YYYY-MM-DD");
  assert(Array.isArray(data.signals), "signals[] is required");
  assert(Array.isArray(data.horizon), "horizon[] is required");
  assert(Array.isArray(data.warnings), "warnings[] is required");

  const signals = Array.isArray(data.signals) ? data.signals : [];
  const horizon = Array.isArray(data.horizon) ? data.horizon : [];
  const warnings = Array.isArray(data.warnings) ? data.warnings : [];

  if (data.status === "withheld") {
    assert(signals.length === 0, "withheld editions must not publish material signals");
    assert(horizon.length === 0, "withheld editions must not publish deadlines");
    assert(data.kpis?.material === 0, "withheld editions must report zero material signals");
    assert(data.kpis?.themes === 0, "withheld editions must report zero active themes");
    assert(data.kpis?.sources === 0, "withheld editions must report zero published sources");
    assert(warnings.some((warning) => warning.severity === "high"), "withheld editions need a high-severity public warning");
    return failures;
  }

  assert(data.status === "published", "status must be published or withheld");
  assert(signals.length > 0 && signals.length <= 15, "published editions must contain 1–15 material signals");

  const urls = new Set();
  const typeCounts = new Map();
  const sources = new Set();
  const riskAreas = new Set();
  for (const [index, signal] of signals.entries()) {
    const label = `signal ${index + 1}`;
    assert(Boolean(signal.title), `${label} missing title`);
    assert(/^https:\/\//.test(signal.url || ""), `${label} missing specific https URL`);
    assert(!urls.has(signal.url), `${label} repeats URL ${signal.url}`);
    urls.add(signal.url);
    assert(Boolean(signal.source), `${label} missing source`);
    assert(signal.sourceStatus === "approved", `${label} source is not approved`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(signal.date || ""), `${label} date must use YYYY-MM-DD`);
    assert(ALLOWED_TYPES.has(signal.type), `${label} has unsupported type ${signal.type || "<missing>"}`);
    assert(!/review before \d{4}-\d{2}-\d{2}/i.test(signal.why || ""), `${label} contains a synthetic review deadline`);
    typeCounts.set(signal.type, (typeCounts.get(signal.type) || 0) + 1);
    sources.add(signal.source);
    for (const area of signal.riskAreas || []) {
      assert(KNOWN_RISK_AREAS.has(area), `${label} has unsupported risk area ${area}`);
      if (KNOWN_RISK_AREAS.has(area)) riskAreas.add(area);
    }
  }

  const dominantTypeCount = Math.max(0, ...typeCounts.values());
  if (signals.length >= 5) {
    assert(dominantTypeCount / signals.length <= 0.8, "more than 80% of material signals share one classification");
  }

  assert(data.kpis?.material === signals.length, "kpis.material must match signals[] length");
  assert(data.kpis?.themes === riskAreas.size, "kpis.themes must match active risk areas");
  assert(data.kpis?.sources === sources.size, "kpis.sources must match distinct published sources");
  const coverage = String(data.kpis?.coverage || "").match(/^(\d+) of (\d+)$/);
  assert(Boolean(coverage), "kpis.coverage must use 'N of N'");
  if (coverage) {
    assert(Number(coverage[1]) === sources.size, "coverage numerator must match distinct published sources");
    if (Number(coverage[2]) > 0 && Number(coverage[1]) / Number(coverage[2]) < 0.5) {
      assert(
        warnings.some((warning) => warning.type === "source-health" && ["medium", "high"].includes(warning.severity)),
        "coverage below 50% needs a medium- or high-severity source-health warning",
      );
    }
  }

  for (const [index, entry] of horizon.entries()) {
    const label = `deadline ${index + 1}`;
    assert(/^\d{4}-\d{2}-\d{2}$/.test(entry.date || ""), `${label} date must use YYYY-MM-DD`);
    assert(entry.date > data.edition, `${label} must fall after the edition date`);
    assert(Boolean(entry.title), `${label} missing title`);
    assert(/^https:\/\//.test(entry.url || ""), `${label} missing specific https URL`);
    assert(Boolean(entry.prompts?.owner), `${label} missing owner prompt`);
  }

  return failures;
}

const options = parseArgs(process.argv.slice(2));
const data = JSON.parse(fs.readFileSync(options.file, "utf8"));
const failures = validate(data);
if (failures.length) {
  console.error("Reg Horizon validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Reg Horizon validation passed (${data.status}, ${data.edition}).`);
