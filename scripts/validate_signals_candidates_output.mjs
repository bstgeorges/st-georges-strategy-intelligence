import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isSpecificPublishedSourceUrl, resolvePublishedSource } from "./lib/published_source_contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = path.join(ROOT, "dashboard", "data", "signals-candidates.generated.json");
const FEED_REGISTRY_PATH = path.join(ROOT, "dashboard", "data", "signals-feed-registry.json");
const SOURCE_REGISTRY_PATH = path.join(ROOT, "dashboard", "data", "source-registry.json");
const TOPICS = new Set([
  "ai",
  "market-structure",
  "third-party",
  "resilience",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
]);
const ALLOWED_MODES = new Set(["live", "offline", "seed"]);
const ALLOWED_SOURCE_STATUSES = new Set(["ok", "quiet", "failed", "skipped"]);
const ALLOWED_DATE_SOURCES = new Set(["feed", "url-inference", "sitemap-lastmod", "page-published", "reviewed-reg-horizon"]);
const HORIZON_BRIDGE_IDS = new Set([
  "reg-horizon-market-bridge",
  "reg-horizon-third-party-bridge",
  "reg-horizon-resilience-bridge",
  "reg-horizon-financial-crime-bridge",
  "reg-horizon-cyber-bridge",
  "reg-horizon-technology-failure-bridge",
  "reg-horizon-data-bridge",
]);

function fail(message, failures) {
  failures.push(message);
}

function isIsoTimestamp(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value) && !Number.isNaN(Date.parse(value));
}

function parseArgs(argv) {
  const options = { input: OUTPUT_PATH };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") options.input = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--input=")) options.input = path.resolve(arg.slice("--input=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const data = JSON.parse(fs.readFileSync(options.input, "utf8"));
  const feedRegistry = JSON.parse(fs.readFileSync(FEED_REGISTRY_PATH, "utf8"));
  const sourceRegistry = new Set((JSON.parse(fs.readFileSync(SOURCE_REGISTRY_PATH, "utf8")).sources || []).map((source) => source.id));
  const failures = [];
  const requiresRankingMetadata = String(data.version || "") >= "2026-07-18";
  const requiresProvenance = String(data.version || "") >= "2026-08-14";

  if (!ALLOWED_MODES.has(data.mode)) fail(`signals-candidates.generated.json has unsupported mode: ${data.mode || "<missing>"}.`, failures);
  if (data.mode !== "seed" && !isIsoTimestamp(data.generatedAt)) fail("signals-candidates.generated.json generatedAt must be an ISO timestamp.", failures);
  if (!Array.isArray(data.topics)) fail("signals-candidates.generated.json must contain topics[].", failures);
  if (!Array.isArray(data.sourceStats)) fail("signals-candidates.generated.json must contain sourceStats[].", failures);

  const configuredHorizonBridges = new Map(
    (feedRegistry.sources || [])
      .filter((source) => HORIZON_BRIDGE_IDS.has(source.id))
      .map((source) => [source.id, source]),
  );
  for (const id of HORIZON_BRIDGE_IDS) {
    const source = configuredHorizonBridges.get(id);
    if (!source) fail(`Signals feed registry is missing required withheld-Horizon bridge ${id}.`, failures);
    else if (source.fetchType !== "reg_horizon_json") fail(`${id} must use reg_horizon_json ingestion.`, failures);
  }
  const ownerCap = feedRegistry.settings?.perSourceOwnerTopicCap;
  if (!Number.isInteger(ownerCap) || ownerCap < 1 || ownerCap > 5) {
    fail("Signals feed registry perSourceOwnerTopicCap must be an integer between 1 and 5.", failures);
  }
  for (const source of feedRegistry.sources || []) {
    if (source.fetchType === "reg_horizon_json") continue;
    if (!source.sourceRegistryId) fail(`${source.id} must declare a canonical sourceRegistryId for owner concentration control.`, failures);
    else if (!sourceRegistry.has(source.sourceRegistryId)) fail(`${source.id} references unknown sourceRegistryId ${source.sourceRegistryId}.`, failures);
  }

  const topicIds = new Set();

  for (const topic of data.topics || []) {
    if (!TOPICS.has(topic.id)) fail(`Unexpected topic id: ${topic.id}`, failures);
    if (topicIds.has(topic.id)) fail(`Duplicate topic id: ${topic.id}`, failures);
    topicIds.add(topic.id);
    if (!Array.isArray(topic.candidates)) fail(`${topic.id} must contain candidates[].`, failures);
    const urls = new Set();
    for (const [index, candidate] of (topic.candidates || []).entries()) {
      if (!candidate.title) fail(`${topic.id} candidate ${index + 1} missing title.`, failures);
      if (!candidate.url) fail(`${topic.id} candidate ${index + 1} missing url.`, failures);
      if (!candidate.sourceRegistryId) fail(`${topic.id} candidate ${index + 1} missing sourceRegistryId.`, failures);
      if (!candidate.ingestSourceId) fail(`${topic.id} candidate ${index + 1} missing ingestSourceId.`, failures);
      if (!candidate.reviewStatus) fail(`${topic.id} candidate ${index + 1} missing reviewStatus.`, failures);
      if (requiresRankingMetadata && (!Number.isFinite(candidate.relevanceScore) || candidate.relevanceScore < 0 || candidate.relevanceScore > 100)) {
        fail(`${topic.id} candidate ${index + 1} has an invalid relevanceScore.`, failures);
      }
      if (requiresRankingMetadata && !Array.isArray(candidate.matchedKeywords)) fail(`${topic.id} candidate ${index + 1} missing matchedKeywords[].`, failures);
      if (requiresProvenance && !isIsoTimestamp(candidate.publishedAt)) fail(`${topic.id} candidate ${index + 1} must have a dated source publication timestamp.`, failures);
      if (requiresProvenance && !ALLOWED_DATE_SOURCES.has(candidate.dateSource)) fail(`${topic.id} candidate ${index + 1} has an unsupported or missing dateSource.`, failures);
      if (candidate.url && urls.has(candidate.url)) fail(`${topic.id} contains duplicate candidate URL: ${candidate.url}`, failures);
      if (candidate.url) urls.add(candidate.url);
      if (candidate.url && !isSpecificPublishedSourceUrl(candidate.url)) {
        fail(`${topic.id} candidate ${index + 1} uses a generic or unsupported source URL: ${candidate.url}`, failures);
      }
      if (candidate.url && !resolvePublishedSource(candidate.url)) {
        fail(`${topic.id} candidate ${index + 1} uses an unregistered citation host: ${candidate.url}`, failures);
      }
    }
  }
  for (const topicId of TOPICS) {
    if (!topicIds.has(topicId)) fail(`Missing topic id: ${topicId}`, failures);
  }
  for (const [index, stat] of (data.sourceStats || []).entries()) {
    const label = `sourceStats row ${index + 1}`;
    if (!stat.sourceId || !stat.fetchType) fail(`${label} is missing source identity.`, failures);
    if (!ALLOWED_SOURCE_STATUSES.has(stat.status)) fail(`${label} has unsupported status: ${stat.status || "<missing>"}.`, failures);
    if (!Number.isInteger(stat.fetchedEntries) || stat.fetchedEntries < 0) fail(`${label} has invalid fetchedEntries.`, failures);
    if (!Number.isInteger(stat.acceptedCandidates) || stat.acceptedCandidates < 0) fail(`${label} has invalid acceptedCandidates.`, failures);
    if (stat.status === "failed" && !stat.error) fail(`${label} failed without an error message.`, failures);
    if (stat.status === "skipped" && !stat.reason) fail(`${label} skipped without a reason.`, failures);
    if (stat.status === "quiet" && !stat.reason) fail(`${label} is quiet without a reason.`, failures);
  }

  const emittedHorizonBridges = (data.sourceStats || []).filter((stat) => HORIZON_BRIDGE_IDS.has(stat.sourceId));
  if (emittedHorizonBridges.length) {
    if (emittedHorizonBridges.length !== HORIZON_BRIDGE_IDS.size) fail("Candidate output must report every configured Horizon bridge when it reports any Horizon bridge.", failures);
    for (const stat of emittedHorizonBridges) {
      if (stat.status !== "skipped" || stat.reason !== "horizon-withheld") {
        fail(`${stat.sourceId} must be skipped with reason horizon-withheld while Reg Horizon is withheld.`, failures);
      }
    }
  }

  if (failures.length) {
    console.error("Signals candidate output validation failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("Signals candidate output validation passed.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
