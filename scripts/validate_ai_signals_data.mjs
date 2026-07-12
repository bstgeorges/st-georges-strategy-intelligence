import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  isSpecificPublishedSourceUrl,
  validatePublishedRows,
  validatePublishedRowsLiveness,
} from "./lib/published_source_contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = path.join(ROOT, "dashboard/data/ai-signals.json");

const requiredSections = ["model", "feature", "industry"];
const allowedSourceTypes = new Set(["dated", "evergreen"]);
const allowedEvergreenClassifications = new Set(["framework", "guidance", "product-page"]);
const fullDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function parseArgs(argv) {
  const options = { date: "", checkLive: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--date") {
      options.date = argv[++index] || "";
    } else if (arg.startsWith("--date=")) {
      options.date = arg.slice("--date=".length);
    } else if (arg === "--check-live") {
      options.checkLive = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.date && !/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("--date must use YYYY-MM-DD.");
  }

  return options;
}

function flattenAnchors(sourceUniverse) {
  return Object.values(sourceUniverse || {}).flatMap((value) => (Array.isArray(value) ? value : []));
}

function fail(message, failures) {
  failures.push(message);
}

function sourceContractLabel(card) {
  if (card.sourceType === "dated") {
    return `Other reporting / ${card.sourceName || card.source?.label || "AI Signals source"} / ${card.date || ""}`;
  }
  if (card.evergreenClassification === "framework") {
    return `Primary / ${card.sourceName || card.source?.label || "AI Signals framework"}`;
  }
  if (card.evergreenClassification === "guidance") {
    return `Official guidance / ${card.sourceName || card.source?.label || "AI Signals guidance"}`;
  }
  if (card.evergreenClassification === "product-page") {
    return `Official source / ${card.sourceName || card.source?.label || "AI Signals product page"}`;
  }
  return card.source?.label || "";
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const failures = [];
  const sections = Array.isArray(data.sections) ? data.sections : [];
  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const anchors = flattenAnchors(data.sourceUniverse);

  if (!data.generatedAt) fail("generatedAt is required.", failures);
  if (options.date && data.generatedAt !== options.date) {
    fail(`generatedAt must match ${options.date}.`, failures);
  }
  if (!data.edition || !data.edition.line || !data.edition.displayDate) {
    fail("edition.displayDate and edition.line are required.", failures);
  }
  if (!data.archiveDedupe || !data.archiveDedupe.rule) {
    fail("archiveDedupe.rule is required.", failures);
  }

  const allCards = [];
  for (const id of requiredSections) {
    const section = sectionById.get(id);
    if (!section) {
      fail(`Missing section: ${id}.`, failures);
      continue;
    }
    const cards = Array.isArray(section.cards) ? section.cards : [];
    if (cards.length !== 5) fail(`${id} section must contain exactly 5 cards.`, failures);
    for (const [index, card] of cards.entries()) {
      if (!card.title || !card.body || !card.badge || !card.sourceName) {
        fail(`${id} card ${index + 1} is missing required display fields.`, failures);
      }
      if (!allowedSourceTypes.has(card.sourceType)) {
        fail(`${id} card ${index + 1} must use sourceType dated or evergreen.`, failures);
      } else if (card.sourceType === "dated") {
        if (!fullDatePattern.test(card.date || "")) {
          fail(`${id} card ${index + 1} must use a full YYYY-MM-DD date.`, failures);
        }
        if (card.evergreenClassification) {
          fail(`${id} card ${index + 1} must not set evergreenClassification on a dated source.`, failures);
        }
      } else if (card.sourceType === "evergreen") {
        if (card.date) {
          fail(`${id} card ${index + 1} must not set date on an evergreen source.`, failures);
        }
        if (!allowedEvergreenClassifications.has(card.evergreenClassification)) {
          fail(`${id} card ${index + 1} uses an unsupported evergreenClassification.`, failures);
        }
      }
      if (!card.source || !/^https:\/\//.test(card.source.url || "") || !card.source.label) {
        fail(`${id} card ${index + 1} must include a source label and https URL.`, failures);
      }
      if (card.source?.url && !isSpecificPublishedSourceUrl(card.source.url)) {
        fail(`${id} card ${index + 1} uses a generic or unsupported source URL: ${card.source.url}`, failures);
      }
      allCards.push(card);
    }
  }

  for (const [index, url] of anchors.entries()) {
    if (!/^https:\/\//.test(url || "")) {
      fail(`sourceUniverse entry ${index + 1} must be an https URL.`, failures);
      continue;
    }
    if (!isSpecificPublishedSourceUrl(url)) {
      fail(`sourceUniverse entry ${index + 1} is too generic to support a published signal: ${url}`, failures);
    }
  }

  const publishedValidation = validatePublishedRows(allCards, {
    label: "AI Signals",
    resolveRowUrl: (card) => card.source?.url,
    resolveRowSourceLabel: sourceContractLabel,
    maxExactReusePerTopic: 2,
  });
  failures.push(...publishedValidation.failures);

  if (options.checkLive) {
    const liveValidation = await validatePublishedRowsLiveness(allCards, {
      label: "AI Signals",
      resolveRowUrl: (card) => card.source?.url,
    });
    failures.push(...liveValidation.failures);
  }

  if (failures.length) {
    console.error("AI Signals data validation failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`AI Signals data validation passed: ${sections.length} sections, 15 cards.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
