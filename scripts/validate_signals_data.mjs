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
const CURRENT_EDITION_PATH = path.join(ROOT, "site", "data", "current-edition.json");

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
// Keep a wider window for retained control signals; editorial review decides
// whether an older item still materially changes a live decision.
const TOP5_MAX_AGE_DAYS = 90;
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
const EDITORIAL_PLACEHOLDER = /editorial_review_required|replace with a specific|auto[- ]promoted/i;

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

function validateCurrentEditionSummaries(signalsData, failures) {
  if (!fs.existsSync(CURRENT_EDITION_PATH)) return;
  const currentEdition = JSON.parse(fs.readFileSync(CURRENT_EDITION_PATH, "utf8"));
  const topicsById = new Map((signalsData.topics || []).map((topic) => [topic.id, topic]));

  for (const [index, summary] of (currentEdition.topSignals || []).entries()) {
    const label = `current-edition topSignals row ${index + 1}`;
    const topic = topicsById.get(summary.topic);
    if (!topic) {
      fail(`${label} references unknown topic: ${summary.topic}`, failures);
      continue;
    }

    const signalRow = (topic.top5 || []).find((row) => row.title === summary.title);
    if (!signalRow) {
      fail(`${label} does not match a top5 signal row in ${summary.topic}: ${summary.title}`, failures);
      continue;
    }

    const summaryDate = extractExactDate(summary.source || "");
    const signalDate = extractExactDate(signalRow.source || "");
    if (!summaryDate) fail(`${label} source must include an exact YYYY-MM-DD date.`, failures);
    if (summaryDate && signalDate && summaryDate !== signalDate) {
      fail(`${label} source date ${summaryDate} must match ${summary.topic} signal source date ${signalDate}.`, failures);
    }
  }
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
  if (evidence.sourceDateVerification?.status === "evergreen") {
    if (!parseIsoDate(evidence.sourceDateVerification.reviewedDate)) {
      fail(`${rowLabel} evergreen sourceDateVerification.reviewedDate must be YYYY-MM-DD.`, failures);
    }
    if (!evidence.sourceDateVerification.reason) {
      fail(`${rowLabel} evergreen sourceDateVerification.reason is required.`, failures);
    }
  }
  if (evidence.sourceType && !ALLOWED_SOURCE_TYPES.has(evidence.sourceType)) {
    fail(`${rowLabel} evidence.sourceType is unsupported: ${evidence.sourceType}`, failures);
  }
  if (EDITORIAL_PLACEHOLDER.test(evidence.significance || "")) {
    fail(`${rowLabel} evidence.significance contains an unresolved editorial placeholder.`, failures);
  }
  if (VAGUE_SOURCE_LABELS.test(row.source || "")) {
    fail(`${rowLabel} source label is vague; use organisation, source type, and exact date in evidence instead.`, failures);
  }
}

function validateTop5Freshness(row, rowLabel, editionDate, failures) {
  if (!editionDate) return;
  const sourceDate = parseIsoDate(row.evidence?.publishedDate || extractExactDate(row.source));
  if (!sourceDate) return;
  const ageDays = Math.floor((editionDate.getTime() - sourceDate.getTime()) / 86400000);
  if (ageDays < 0) {
    fail(`${rowLabel} source date cannot be after the Signals edition date.`, failures);
  } else if (ageDays > TOP5_MAX_AGE_DAYS) {
    fail(
      `${rowLabel} is ${ageDays} days old; Top 5 rows must be no older than ${TOP5_MAX_AGE_DAYS} days. Move it to still-material or replace it with a fresh signal.`,
      failures,
    );
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

  validateCurrentEditionSummaries(data, failures);

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
    (topic.top5 || []).forEach((row, index) => {
      const rowLabel = `${topicId} Top 5 row ${index + 1}`;
      if (!row.title) fail(`${topicId} Top 5 row ${index + 1} is missing title.`, failures);
      if (!row.source) fail(`${topicId} Top 5 row ${index + 1} is missing source label.`, failures);
      if (!row.url) fail(`${topicId} Top 5 row ${index + 1} is missing citation URL.`, failures);
      validateEvidence(row, rowLabel, failures);
      validateTop5Freshness(row, rowLabel, editionDate, failures);
    });
    retainedRows.forEach((row, index) => {
      const rowLabel = `${topicId} row ${index + 1}`;
      if (!row.title) fail(`${topicId} row ${index + 1} is missing title.`, failures);
      if (!row.source) fail(`${topicId} row ${index + 1} is missing source label.`, failures);
      if (!row.url) fail(`${topicId} row ${index + 1} is missing citation URL.`, failures);
      validateEvidence(row, rowLabel, failures);
    });

    const publishedValidation = validatePublishedRows(topic.top5 || [], {
      label: topicId,
      resolveRowUrl: (row) => row.url,
      resolveRowSourceLabel: (row) => row.source,
      maxExactReusePerTopic: 1,
    });
    failures.push(...publishedValidation.failures);
    warnings.push(...publishedValidation.warnings);
    const retainedValidation = validatePublishedRows(retainedRows, {
      label: `${topicId} still-material`,
      resolveRowUrl: (row) => row.url,
      resolveRowSourceLabel: (row) => row.source,
      maxExactReusePerTopic: 1,
    });
    failures.push(...retainedValidation.failures);
    warnings.push(...retainedValidation.warnings);

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
