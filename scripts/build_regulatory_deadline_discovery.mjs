import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT = path.join(ROOT, "dashboard", "regulatory-deadline-register", "discovery.json");
const UNIVERSE = path.join(ROOT, "dashboard", "data", "regulatory-source-universe.generated.json");
const REGISTRY = path.join(ROOT, "dashboard", "data", "source-registry.json");
const POLICY = path.join(ROOT, "dashboard", "data", "regulatory-deadline-intake-policy.json");
const LATEST = path.join(ROOT, "tools", "reg-scan", "docs", "latest.json");

function readJson(file, fallback) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fallback;
}

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function countBy(values, field) {
  return values.reduce((counts, value) => {
    const key = value[field] || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function buildDiscovery({ universe, registry, policy, latest }) {
  const sources = registry.sources || [];
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const activeIds = [...new Set(policy.activeIntake?.sourceIds || [])];
  const activeSources = activeIds.map((id) => sourceById.get(id)).filter(Boolean);
  const missingRegistrySources = activeIds.filter((id) => !sourceById.has(id));
  const health = latest.sourceHealth || [];
  const healthById = new Map(health.map((item) => [item.sourceId, item]));
  const healthCounts = countBy(health, "status");
  const scanSourceIds = new Set(health.map((item) => item.sourceId));
  const activeJurisdictions = new Set(activeSources.flatMap((source) => source.jurisdictions || []));

  return {
    version: "regulatory-deadline-discovery.v1",
    visibility: "private",
    generatedAt: new Date().toISOString(),
    purpose: "Make the regulated-source estate visible without treating a catalogue listing or a scanner result as an approved deadline.",
    catalogue: {
      authorities: universe.metrics?.authorities || (universe.authorities || []).length,
      jurisdictions: universe.metrics?.jurisdictions || 0,
      endpoints: universe.metrics?.endpoints || (universe.endpoints || []).length,
      status: "discovery-only",
      note: "Catalogue membership is a research perimeter, not automated deadline coverage.",
    },
    activeIntake: {
      sources: activeSources.length,
      primarySources: activeSources.filter((source) => source.tier === "primary").length,
      jurisdictions: activeJurisdictions.size,
      deadlineLookbackDays: policy.activeIntake?.deadlineLookbackDays || null,
      sourceIds: activeIds,
      sourceCategories: countBy(activeSources, "category"),
      missingRegistrySources,
      status: missingRegistrySources.length ? "configuration-gap" : "configured",
      note: policy.activeIntake?.description || "Primary sources may create private review candidates only.",
    },
    latestScan: {
      edition: latest.edition || null,
      configuredSources: latest.runMetrics?.sourcesConfigured ?? health.length,
      activeSourcesChecked: [...scanSourceIds].filter((id) => activeIds.includes(id)).length,
      health: healthCounts,
      unscannedActiveSources: activeIds.filter((id) => !scanSourceIds.has(id)),
      coverageState: latest.coverage?.state || "not-run",
      note: latest.edition
        ? "This is the last completed scanner run. It is separate from the broader discovery catalogue."
        : "No scanner run has been recorded yet.",
    },
    nextActions: [
      ...(missingRegistrySources.length ? ["Repair active intake IDs missing from the source registry before the next run."] : []),
      ...(activeIds.filter((id) => !scanSourceIds.has(id)).length ? ["Run the full active intake before judging source-health coverage; the recorded scan predates part of the configured estate."] : []),
      ...Object.entries(healthCounts).filter(([status]) => !["ok"].includes(status)).map(([status, count]) => `Review ${count} ${status} source${count === 1 ? "" : "s"} from the latest scan.`),
      "Assess catalogue authorities in priority jurisdictions one at a time; promote a source only after its official publication page and date extraction are proven.",
    ],
    sourceStatus: activeSources.map((source) => ({
      id: source.id,
      name: source.name,
      jurisdictions: source.jurisdictions || [],
      category: source.category || "unknown",
      tier: source.tier || "unknown",
      latestStatus: healthById.get(source.id)?.status || "not-yet-scanned",
    })).sort((a, b) => a.name.localeCompare(b.name)),
  };
}

function main() {
  const out = path.resolve(argValue("--out", DEFAULT_OUT));
  const discovery = buildDiscovery({
    universe: readJson(UNIVERSE, {}),
    registry: readJson(REGISTRY, { sources: [] }),
    policy: readJson(POLICY, { activeIntake: { sourceIds: [] } }),
    latest: readJson(LATEST, {}),
  });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(discovery, null, 2)}\n`);
  console.log(JSON.stringify({ catalogueAuthorities: discovery.catalogue.authorities, activeIntakeSources: discovery.activeIntake.sources, lastScanSources: discovery.latestScan.configuredSources, output: path.relative(ROOT, out) }, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main();

export { buildDiscovery };
