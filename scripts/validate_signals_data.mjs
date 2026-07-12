import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  isSpecificPublishedSourceUrl,
  validatePublishedRows,
  validatePublishedRowsLiveness,
} from "./lib/published_source_contract.mjs";

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
const STILL_MATERIAL_MIN = 3;
const STILL_MATERIAL_MAX = 7;
const DEFAULT_RETENTION_DAYS = 90;
const EXTENDED_RETENTION_DAYS = 180;
const REQUIRED_EVIDENCE_FIELDS = [
  "sourceTitle",
  "organisation",
  "publishedDate",
  "sourceUrl",
  "sourceType",
  "significance",
];
const ALLOWED_SOURCE_TYPES = new Set([
  "regulator",
  "company announcement",
  "research",
  "financial reporting",
  "other reporting",
]);
const VAGUE_SOURCE_LABELS = /\b(recent reporting|this month|according to)\b|monitoring\s*\/\s*[^/]+?\s*\/\s*20\d{2}(?:-\d{2})?(?!-\d{2})\b/i;

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

function stillMaterialRows(topic) {
  return Array.isArray(topic.stillMaterial) ? topic.stillMaterial.slice(0, STILL_MATERIAL_MAX) : [];
}

function parseIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function extractExactDate(sourceLabel) {
  const match = String(sourceLabel || "").match(/\b(\d{4}-\d{2}-\d{2})\b/);
  return match ? match[1] : "";
}

function validateEvidence(row, rowLabel, failures) {
  const evidence = row.evidence || {};
  for (const field of REQUIRED_EVIDENCE_FIELDS) {
    if (!evidence[field]) fail(`${rowLabel} evidence.${field} is required.`, failures);
  }
  if (evidence.sourceUrl && evidence.sourceUrl !== row.url) {
    fail(`${rowLabel} evidence.sourceUrl must match the row URL.`, failures);
  }
  if (evidence.sourceUrl && !isSpecificPublishedSourceUrl(evidence.sourceUrl)) {
    fail(`${rowLabel} evidence.sourceUrl is generic or unsupported: ${evidence.sourceUrl}`, failures);
  }
  if (!parseIsoDate(evidence.publishedDate)) {
    fail(`${rowLabel} evidence.publishedDate must be YYYY-MM-DD.`, failures);
  }
  if (evidence.accessedDate && !parseIsoDate(evidence.accessedDate)) {
    fail(`${rowLabel} evidence.accessedDate must be YYYY-MM-DD when present.`, failures);
  }
  if (evidence.sourceType && !ALLOWED_SOURCE_TYPES.has(evidence.sourceType)) {
    fail(`${rowLabel} evidence.sourceType is unsupported: ${evidence.sourceType}`, failures);
  }
  if (VAGUE_SOURCE_LABELS.test(row.source || "")) {
    fail(`${rowLabel} source label is vague; use organisation, source type, and exact date in evidence instead.`, failures);
  }
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
  const editionDate = parseIsoDate(data.edition);
  if (!editionDate) fail(`signals.json edition must be YYYY-MM-DD; received ${data.edition}`, failures);

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
    const retainedRows = stillMaterialRows(topic);
    if (retainedRows.length < STILL_MATERIAL_MIN || retainedRows.length > STILL_MATERIAL_MAX) {
      fail(
        `${topicId} must contain between ${STILL_MATERIAL_MIN} and ${STILL_MATERIAL_MAX} still-material rows.`,
        failures,
      );
    }
    if (!parseIsoDate(topic.stillMaterialReviewedAt)) {
      fail(`${topicId} stillMaterialReviewedAt must be YYYY-MM-DD.`, failures);
    }

    const rows = [...(topic.top5 || []), ...retainedRows];
    rows.forEach((row, index) => {
      const rowLabel = `${topicId} row ${index + 1}`;
      if (!row.title) fail(`${topicId} row ${index + 1} is missing title.`, failures);
      if (!row.source) fail(`${topicId} row ${index + 1} is missing source label.`, failures);
      if (!row.url) fail(`${topicId} row ${index + 1} is missing citation URL.`, failures);
      validateEvidence(row, rowLabel, failures);
    });

    const publishedValidation = validatePublishedRows(rows, {
      label: topicId,
      resolveRowUrl: (row) => row.url,
      resolveRowSourceLabel: (row) => row.source,
      maxExactReusePerTopic: 1,
    });
    failures.push(...publishedValidation.failures);
    warnings.push(...publishedValidation.warnings);

    if (editionDate) {
      retainedRows.forEach((row, index) => {
        const sourceDate = parseIsoDate(extractExactDate(row.source));
        if (!sourceDate) return;
        const ageDays = Math.floor((editionDate.getTime() - sourceDate.getTime()) / 86400000);
        if (ageDays > EXTENDED_RETENTION_DAYS) {
          fail(
            `${topicId} still-material row ${index + 1} is ${ageDays} days old; retained rows with exact dates must be <= ${EXTENDED_RETENTION_DAYS} days old.`,
            failures,
          );
        } else if (ageDays > DEFAULT_RETENTION_DAYS) {
          if (row.retention !== "six-month-anchor" || !row.retentionReason) {
            fail(
              `${topicId} still-material row ${index + 1} is older than ${DEFAULT_RETENTION_DAYS} days and needs retention "six-month-anchor" plus retentionReason.`,
              failures,
            );
          }
        }
      });
    }

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
