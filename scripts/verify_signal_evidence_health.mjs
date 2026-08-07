import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_AUDIT = path.join(ROOT, "dashboard/data/signal-source-date-audit.generated.json");

function parseArgs(argv) {
  const options = { audit: DEFAULT_AUDIT, maxManualAgeDays: 28 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--audit") options.audit = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--audit=")) options.audit = path.resolve(arg.slice("--audit=".length));
    else if (arg === "--max-manual-age-days") options.maxManualAgeDays = Number(argv[++index]);
    else if (arg.startsWith("--max-manual-age-days=")) options.maxManualAgeDays = Number(arg.slice("--max-manual-age-days=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function daysBetween(from, to) {
  return Math.floor((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
}

const options = parseArgs(process.argv.slice(2));
const audit = JSON.parse(fs.readFileSync(options.audit, "utf8"));
const failures = [];
const edition = audit.edition;

for (const item of audit.results || []) {
  for (const row of item.rows || []) {
    const isTopFive = row.section === "top5";
    const verification = row.manualVerification;
    const manuallyVerified = verification?.status === "manual-verified";
    if (isTopFive && !["verified", "candidate-match", "evergreen"].includes(item.confidence) && !manuallyVerified) {
      failures.push(`Top 5 source lacks verified evidence: ${row.topic} / ${row.title}`);
    }
    if (!manuallyVerified) continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(verification.verifiedDate || "")) {
      failures.push(`Manual verification needs a dated record: ${row.topic} / ${row.title}`);
      continue;
    }
    if (daysBetween(verification.verifiedDate, edition) > options.maxManualAgeDays) {
      failures.push(`Manual verification is older than ${options.maxManualAgeDays} days: ${row.topic} / ${row.title}`);
    }
    if (!verification.reason?.trim()) failures.push(`Manual verification needs a reason: ${row.topic} / ${row.title}`);
  }
}

if (failures.length) {
  console.error("Signals evidence health failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Signals evidence health passed (${edition}; manual verification maximum ${options.maxManualAgeDays} days).`);
