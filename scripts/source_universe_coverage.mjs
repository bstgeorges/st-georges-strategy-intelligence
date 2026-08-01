import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, "dashboard/data/source-registry.json"), "utf8"));

// Coverage targets are deliberately broad: they describe the minimum useful
// global perimeter, not a claim that every regulator is equally relevant.
const targets = [
  ["UK", 3], ["EU", 5], ["US", 4], ["Canada", 2], ["Australia", 2],
  ["Japan", 2], ["Hong Kong", 2], ["Singapore", 2], ["India", 2],
  ["Brazil", 2], ["South Korea", 2], ["Switzerland", 2], ["Saudi Arabia", 1],
  ["United Arab Emirates", 1], ["South Africa", 1], ["Mexico", 1],
];

const rows = targets.map(([jurisdiction, target]) => {
  const sources = registry.sources.filter((source) => source.jurisdictions?.includes(jurisdiction));
  const primary = sources.filter((source) => source.tier === "primary");
  const languages = new Set(
    sources.flatMap((source) => (source.useFor || []).filter((tag) => /-language$/.test(tag))),
  );
  return {
    jurisdiction,
    target,
    sources: sources.length,
    primary: primary.length,
    languages: [...languages].sort(),
    status: primary.length >= target ? "covered" : primary.length ? "thin" : "gap",
    sourceIds: sources.map((source) => source.id),
  };
});

const categories = [...new Set(registry.sources.map((source) => source.category))].sort();
const report = {
  generatedAt: new Date().toISOString(),
  registryVersion: registry.version,
  totals: {
    sources: registry.sources.length,
    primary: registry.sources.filter((source) => source.tier === "primary").length,
    jurisdictions: new Set(registry.sources.flatMap((source) => source.jurisdictions || [])).size,
    categories: categories.length,
  },
  coverage: rows,
  priorities: rows.filter((row) => row.status !== "covered").sort((a, b) => (b.target - b.primary) - (a.target - a.primary)),
};

const output = process.env.SOURCE_COVERAGE_OUTPUT || path.join(ROOT, "dashboard/data/source-universe-coverage.generated.json");
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Source universe coverage: ${report.totals.sources} sources, ${report.totals.primary} primary, ${report.totals.jurisdictions} jurisdictions.`);
for (const row of report.priorities) console.log(`${row.status.toUpperCase()} ${row.jurisdiction}: ${row.primary}/${row.target} primary sources`);
