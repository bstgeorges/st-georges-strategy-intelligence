import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validatePublishedRows, validatePublishedRowsLiveness } from "./lib/published_source_contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = path.join(ROOT, "site", "data", "signals.json");

const topics = [
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
const ADDITIONAL_COUNT = 5;

function parseArgs(argv) {
  const options = { checkLive: false };
  for (const arg of argv) {
    if (arg === "--check-live") options.checkLive = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function fail(message, failures) {
  failures.push(message);
}

function additionalRows(topic) {
  return Array.isArray(topic.additional5) ? topic.additional5.slice(0, ADDITIONAL_COUNT) : [];
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const failures = [];
  const warnings = [];

  if (!Array.isArray(data.topics)) {
    throw new Error("site/data/signals.json must contain topics[].");
  }

  const byId = new Map(data.topics.map((topic) => [topic.id, topic]));

  for (const topicId of topics) {
    const topic = byId.get(topicId);
    if (!topic) {
      fail(`Missing topic: ${topicId}`, failures);
      continue;
    }
    if (topic.route !== `/signals/${topicId}/`) fail(`${topicId} route mismatch: ${topic.route}`, failures);
    if (!Array.isArray(topic.top5) || topic.top5.length !== TOP5_COUNT) {
      fail(`${topicId} must contain exactly ${TOP5_COUNT} Top 5 rows.`, failures);
    }
    if (additionalRows(topic).length !== ADDITIONAL_COUNT) {
      fail(`${topicId} must contain exactly ${ADDITIONAL_COUNT} additional rows.`, failures);
    }

    const rows = [...(topic.top5 || []), ...additionalRows(topic)];
    rows.forEach((row, index) => {
      if (!row.title) fail(`${topicId} row ${index + 1} is missing title.`, failures);
      if (!row.source) fail(`${topicId} row ${index + 1} is missing source label.`, failures);
      if (!row.url) fail(`${topicId} row ${index + 1} is missing citation URL.`, failures);
    });

    const publishedValidation = validatePublishedRows(rows, {
      label: topicId,
      resolveRowUrl: (row) => row.url,
      resolveRowSourceLabel: (row) => row.source,
      maxExactReusePerTopic: 2,
    });
    failures.push(...publishedValidation.failures);
    warnings.push(...publishedValidation.warnings);

    if (options.checkLive) {
      const liveValidation = await validatePublishedRowsLiveness(rows, {
        label: topicId,
        resolveRowUrl: (row) => row.url,
      });
      failures.push(...liveValidation.failures);
      warnings.push(...liveValidation.warnings);
    }
  }

  if (failures.length) {
    console.error("Signals data validation failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Signals data validation passed: ${data.topics.length} topics.`);
  for (const warning of warnings) console.log(`Warning: ${warning}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
