import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FEEDS = path.join(ROOT, "dashboard", "data", "signals-feed-registry.json");
const SOURCES = path.join(ROOT, "dashboard", "data", "source-registry.json");

// These are operating-perimeter floors, not candidate-yield targets. A quiet
// week is valid; an absent primary-source route for a core Signals theme is not.
const TOPIC_MINIMUMS = {
  "market-structure": 10,
  "third-party": 12,
  resilience: 30,
  "technology-failure": 12,
  "financial-crime": 9,
  data: 9,
};
const ALLOWED_FETCH_TYPES = new Set(["rss", "atom", "sitemap"]);

function validateFeedRegistry(feedRegistry, sourceRegistry) {
  const errors = [];
  const feeds = feedRegistry.sources || [];
  const sourceById = new Map((sourceRegistry.sources || []).map((source) => [source.id, source]));
  const ids = new Set();

  if (feeds.length < 80) errors.push(`Signals intake has ${feeds.length} sources; minimum is 80.`);
  for (const feed of feeds) {
    if (!feed.id || ids.has(feed.id)) errors.push(`Duplicate or missing Signals source id: ${feed.id || "<missing>"}.`);
    ids.add(feed.id);
    if (!ALLOWED_FETCH_TYPES.has(feed.fetchType)) errors.push(`${feed.id} has unsupported fetch type ${feed.fetchType || "<missing>"}.`);
    if (!/^https:\/\//.test(feed.fetchUrl || "")) errors.push(`${feed.id} must use a direct HTTPS source URL.`);
    if (!Array.isArray(feed.topics) || !feed.topics.length) errors.push(`${feed.id} must serve at least one Signals topic.`);
    if (feed.tags?.includes("service-status")) {
      if (!Array.isArray(feed.titleKeywordHints) || !feed.titleKeywordHints.length) {
        errors.push(`${feed.id} must use headline-level materiality hints for service-status intake.`);
      }
      if (feed.dedupeTitles !== true) errors.push(`${feed.id} must deduplicate recurring service-status incident titles.`);
    }
    const source = sourceById.get(feed.sourceRegistryId);
    if (!source) errors.push(`${feed.id} references an unknown source-registry entry ${feed.sourceRegistryId || "<missing>"}.`);
    else if (source.tier !== "primary") errors.push(`${feed.id} must be primary, not ${source.tier}.`);
  }
  for (const [topic, minimum] of Object.entries(TOPIC_MINIMUMS)) {
    const count = feeds.filter((feed) => feed.topics?.includes(topic)).length;
    if (count < minimum) errors.push(`${topic} has ${count} direct sources; minimum is ${minimum}.`);
  }
  return errors;
}

function main() {
  const feedRegistry = JSON.parse(fs.readFileSync(FEEDS, "utf8"));
  const sourceRegistry = JSON.parse(fs.readFileSync(SOURCES, "utf8"));
  const errors = validateFeedRegistry(feedRegistry, sourceRegistry);
  if (errors.length) {
    console.error("Signals feed-registry validation failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  const coverage = Object.fromEntries(Object.keys(TOPIC_MINIMUMS).map((topic) => [topic, feedRegistry.sources.filter((feed) => feed.topics?.includes(topic)).length]));
  console.log(`Signals feed-registry validation passed: ${feedRegistry.sources.length} direct primary sources.`, coverage);
}

if (import.meta.url === `file://${process.argv[1]}`) main();

export { TOPIC_MINIMUMS, validateFeedRegistry };
