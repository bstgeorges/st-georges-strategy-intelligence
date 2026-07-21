import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadPublishedSourceMap, resolvePublishedSource } from "./lib/published_source_contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SIGNALS_PATH = path.join(ROOT, "site", "data", "signals.json");
const CANDIDATES_PATH = path.join(ROOT, "dashboard", "data", "signals-candidates.generated.json");
const SHORTLIST_PATH = path.join(ROOT, "dashboard", "data", "signals-promotion-shortlist.json");
const LOG_PATH = path.join(ROOT, "dashboard", "data", "signals-promotion-log.md");
const SUMMARY_PATH = path.join(ROOT, "dashboard", "data", "signals-promotion-summary.json");

const TOPICS = [
  "ai",
  "resilience",
  "third-party",
  "market-structure",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
];
const TOP5_COUNT = 5;
const MAX_FRESH_PROMOTIONS_PER_TOPIC = 3;
const TOP5_MAX_AGE_DAYS = 60;

function parseArgs(argv) {
  const options = { date: "", dryRun: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--date") options.date = argv[++index] || "";
    else if (arg.startsWith("--date=")) options.date = arg.slice("--date=".length);
    else if (arg === "--dry-run") options.dryRun = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!options.date) options.date = new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("Pass the promotion run date as --date YYYY-MM-DD.");
  }
  return options;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function formatSourceLabel(candidate) {
  const tier = candidate.sourceTier
    ? candidate.sourceTier.charAt(0).toUpperCase() + candidate.sourceTier.slice(1)
    : "Monitoring";
  const name = candidate.sourceName || candidate.sourceRegistryId || "Unknown source";
  const date = candidate.publishedAt ? candidate.publishedAt.slice(0, 10) : "";
  return date ? `${tier} / ${name} / ${date}` : `${tier} / ${name}`;
}

function isFreshTop5Row(row, editionDate) {
  const value = row.evidence?.publishedDate || String(row.source || "").match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const sourceTime = Date.parse(`${value}T00:00:00Z`);
  const editionTime = Date.parse(`${editionDate}T00:00:00Z`);
  const ageDays = Math.floor((editionTime - sourceTime) / 86400000);
  return ageDays >= 0 && ageDays <= TOP5_MAX_AGE_DAYS;
}

// source IDs from published-source-map.json that are commercial AI companies
const TECH_COMPANY_SOURCE_IDS = new Set([
  "openai", "anthropic", "google-deepmind", "meta-ai", "mistral-ai", "xai", "microsoft-ai", "nvidia",
]);

function inferSourceType(publishedSource) {
  if (!publishedSource) return "other reporting";
  const { id = "", tier = "" } = publishedSource;
  if (tier === "research") return "research";
  if (tier === "press" || tier === "specialist") return "other reporting";
  if (TECH_COMPANY_SOURCE_IDS.has(id)) return "company announcement";
  return "regulator";
}

// Promotion remains a draft workflow. The explicit review marker is intentionally
// rejected by the public-copy contract if an editor tries to merge it unchanged.
function buildEvidence(candidate, publishedSource, promotionDate) {
  return {
    sourceTitle: candidate.title,
    organisation: candidate.sourceName || publishedSource?.id || "Unknown",
    publishedDate: candidate.publishedAt ? candidate.publishedAt.slice(0, 10) : promotionDate,
    sourceType: inferSourceType(publishedSource),
    significance: "EDITORIAL_REVIEW_REQUIRED: state the decision, control, or governance significance before publication.",
    sourceUrl: candidate.url,
    accessedDate: promotionDate,
  };
}

// Promote up to MAX_FRESH_PROMOTIONS_PER_TOPIC fresh, allowlisted, not-already-published
// candidates into the front of Top 5, then backfill the remaining slots from the topic's
// existing top5/stillMaterial rows so a quiet week never leaves a topic with fewer than
// 5 rows. The retained set is reviewed separately and is never rewritten here.
function promoteTopic(topic, candidates, sourceMap, log, promotionDate) {
  const existingTop5 = Array.isArray(topic.top5) ? topic.top5 : [];
  const existingStillMaterial = Array.isArray(topic.stillMaterial) ? topic.stillMaterial : [];
  const existingUrls = new Set([...existingTop5, ...existingStillMaterial].map((row) => row.url));

  const seenFresh = new Set();
  const freshRows = [];
  const skipped = [];

  for (const candidate of candidates) {
    if (freshRows.length >= MAX_FRESH_PROMOTIONS_PER_TOPIC) break;
    if (!candidate.title || !candidate.url) continue;
    if (existingUrls.has(candidate.url)) continue;
    if (seenFresh.has(candidate.url)) continue;
    const publishedSource = resolvePublishedSource(candidate.url, sourceMap);
    if (!publishedSource) {
      skipped.push(`unregistered host: ${candidate.url}`);
      continue;
    }
    if (!isFreshTop5Row({ evidence: { publishedDate: candidate.publishedAt?.slice(0, 10) } }, promotionDate)) {
      skipped.push(`stale candidate excluded: ${candidate.url}`);
      continue;
    }
    seenFresh.add(candidate.url);
    freshRows.push({
      title: candidate.title,
      url: candidate.url,
      source: formatSourceLabel(candidate),
      evidence: buildEvidence(candidate, publishedSource, promotionDate),
    });
  }

  const usedUrls = new Set(freshRows.map((row) => row.url));
  const backfillRows = [];
  for (const row of [...existingTop5, ...existingStillMaterial]) {
    if (freshRows.length + backfillRows.length >= TOP5_COUNT) break;
    if (usedUrls.has(row.url)) continue;
    if (!isFreshTop5Row(row, promotionDate)) {
      skipped.push(`stale backfill excluded: ${row.url}`);
      continue;
    }
    backfillRows.push(row);
    usedUrls.add(row.url);
  }

  const newTop5 = [...freshRows, ...backfillRows].slice(0, TOP5_COUNT);
  if (newTop5.length < TOP5_COUNT) {
    throw new Error(
      `${topic.id}: could not fill Top 5 (only found ${newTop5.length} unique rows). Aborting without writing signals.json.`,
    );
  }

  log.push(
    `- ${topic.id}: promoted ${freshRows.length} fresh candidate(s), kept ${newTop5.length - freshRows.length} existing row(s)` +
      (skipped.length ? `; skipped ${skipped.length} (${skipped.join("; ")})` : ""),
  );
  for (const row of freshRows) {
    log.push(`    + "${row.title}" — ${row.source} — ${row.url}`);
  }

  return { updatedTopic: { ...topic, top5: newTop5 }, freshRows };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const signalsData = readJson(SIGNALS_PATH);
  const candidatesData = fs.existsSync(CANDIDATES_PATH) ? readJson(CANDIDATES_PATH) : { topics: [] };
  if (!fs.existsSync(SHORTLIST_PATH)) {
    throw new Error("Missing dashboard/data/signals-promotion-shortlist.json; editorial review is required before promotion.");
  }
  const shortlistData = readJson(SHORTLIST_PATH);
  if (shortlistData.reviewStatus !== "approved") {
    throw new Error("Signals promotion shortlist must have reviewStatus=approved after an editorial review.");
  }
  if (shortlistData.candidateGeneratedAt !== candidatesData.generatedAt) {
    throw new Error(
      `Signals promotion shortlist was reviewed for ${shortlistData.candidateGeneratedAt || "an unknown candidate run"}, ` +
      `not the current candidate run ${candidatesData.generatedAt || "<missing>"}.`,
    );
  }
  const selectedByTopic = new Map(
    (shortlistData.topics || []).map((topic) => [topic.id, new Set(topic.selectedUrls || [])]),
  );
  const candidatesByTopic = new Map(
    (candidatesData.topics || []).map((topic) => {
      const selected = selectedByTopic.get(topic.id) || new Set();
      return [topic.id, (topic.candidates || []).filter((candidate) => selected.has(candidate.url))];
    }),
  );
  const sourceMap = loadPublishedSourceMap();

  const log = [`# Signals promotion log — ${options.date}`, ""];

  if (!Array.isArray(signalsData.topics)) {
    throw new Error("site/data/signals.json must contain topics[].");
  }

  const byId = new Map(signalsData.topics.map((topic) => [topic.id, topic]));
  const summaryTopics = [];
  const updatedTopics = TOPICS.map((topicId) => {
    const topic = byId.get(topicId);
    if (!topic) throw new Error(`Missing topic in site/data/signals.json: ${topicId}`);
    const candidates = candidatesByTopic.get(topicId) || [];
    const { updatedTopic, freshRows } = promoteTopic(topic, candidates, sourceMap, log, options.date);
    summaryTopics.push({
      id: topicId,
      freshCount: freshRows.length,
      leadRow: updatedTopic.top5[0] || null,
    });
    return updatedTopic;
  });

  const output = {
    ...signalsData,
    edition: options.date,
    generatedAt: `${options.date}T00:00:00.000Z`,
    topics: updatedTopics,
  };

  console.log(log.join("\n"));

  if (options.dryRun) {
    console.log("\nDry run — no files written.");
    return;
  }

  writeJson(SIGNALS_PATH, output);
  fs.writeFileSync(LOG_PATH, `${log.join("\n")}\n`);
  writeJson(SUMMARY_PATH, { date: options.date, topics: summaryTopics });
  console.log(
    `\nWrote ${path.relative(ROOT, SIGNALS_PATH)}, ${path.relative(ROOT, LOG_PATH)}, and ${path.relative(ROOT, SUMMARY_PATH)}`,
  );
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
