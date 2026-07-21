import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AUDIT_PATH = path.join(ROOT, "dashboard/data/signal-source-date-audit.generated.json");
const OUTPUT_PATH = path.join(ROOT, "dashboard/data/signals-health.generated.json");

const audit = JSON.parse(fs.readFileSync(AUDIT_PATH, "utf8"));
const rows = audit.results || [];
const counts = rows.reduce((summary, row) => {
  summary[row.confidence || "unknown"] = (summary[row.confidence || "unknown"] || 0) + 1;
  return summary;
}, {});
const top5 = rows
  .flatMap((row) => (row.rows || []).filter((item) => item.section === "top5").map((item) => ({ ...item, confidence: row.confidence, result: row.result })))
  .filter((row) => !["verified", "candidate-match"].includes(row.confidence));

const report = {
  generatedAt: audit.generatedAt,
  edition: audit.edition,
  rowCount: audit.rowCount,
  uniqueUrlCount: audit.uniqueUrlCount,
  confidenceCounts: counts,
  top5Unresolved: top5,
  status: top5.some((row) => ["mismatch", "fetch-failed", "undated"].includes(row.confidence)) ? "attention-required" : "ready",
};

fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ output: path.relative(ROOT, OUTPUT_PATH), status: report.status, confidenceCounts: counts, top5Unresolved: top5.length }, null, 2));
