import crypto from "node:crypto";

import { isSpecificPublishedSourceUrl, resolvePublishedSource } from "./published_source_contract.mjs";

export const DAILY_INTELLIGENCE_TOPICS = new Set([
  "ai",
  "market-structure",
  "third-party",
  "resilience",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
]);

export const DAILY_INTELLIGENCE_STATUSES = new Set([
  "needs-source-review",
  "editorial-review",
  "approved",
  "held",
  "archived",
  "rejected",
]);

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function slug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isoTimestamp(date) {
  return `${date}T00:00:00.000Z`;
}

function sourceForPromotion(entry) {
  return (entry.sources || []).find((source) => source.primary === true) || null;
}

function candidateId(entryId, topicId, url) {
  return crypto.createHash("sha256").update(`${entryId}:${topicId}:${url}`).digest("hex").slice(0, 16);
}

/**
 * Daily material is a private editorial ledger. It may contain unverified leads,
 * but only explicitly approved items with an exact, registered primary source may
 * enter the existing Signals candidate queue.
 */
export function validateDailyIntelligenceLedger(ledger, options = {}) {
  const errors = [];
  const warnings = [];
  const sourceMap = options.sourceMap;
  const entryLabel = options.entryLabel || "daily intelligence entry";
  const allowedSourceTiers = new Set(options.allowedSourceTiers || ["primary"]);
  const allowedSourceTypes = new Set(options.allowedSourceTypes || ["primary"]);

  if (!ledger || typeof ledger !== "object") return { errors: ["Daily intelligence ledger must be a JSON object."], warnings, approved: [] };
  if (!Array.isArray(ledger.entries)) return { errors: ["Daily intelligence ledger must contain entries[]."], warnings, approved: [] };

  const ids = new Set();
  const approved = [];
  for (const [index, entry] of ledger.entries.entries()) {
    const label = `${entryLabel} ${index + 1}`;
    if (!entry?.id || !slug(entry.id)) errors.push(`${label} is missing a stable id.`);
    if (ids.has(entry?.id)) errors.push(`${label} repeats id ${entry.id}.`);
    ids.add(entry?.id);
    if (!isIsoDate(entry?.briefingDate)) errors.push(`${label} must have briefingDate YYYY-MM-DD.`);
    for (const field of ["title", "summary", "whyItMatters", "controlImplication"]) {
      if (!String(entry?.[field] || "").trim()) errors.push(`${label} is missing ${field}.`);
    }
    if (!DAILY_INTELLIGENCE_STATUSES.has(entry?.reviewStatus)) {
      errors.push(`${label} has unsupported reviewStatus ${entry?.reviewStatus || "<missing>"}.`);
    }
    if (!Array.isArray(entry?.topics) || entry.topics.length === 0) {
      errors.push(`${label} must identify at least one Signals topic.`);
    } else {
      for (const topic of entry.topics) {
        if (!DAILY_INTELLIGENCE_TOPICS.has(topic)) errors.push(`${label} has unsupported topic ${topic}.`);
      }
    }
    if (!Array.isArray(entry?.concepts)) errors.push(`${label} must contain concepts[].`);

    if (entry?.reviewStatus !== "approved") continue;
    const source = sourceForPromotion(entry);
    if (!source) {
      errors.push(`${label} is approved but has no sources[] row marked primary=true.`);
      continue;
    }
    if (!isIsoDate(source.publishedDate)) errors.push(`${label} approved source must have publishedDate YYYY-MM-DD.`);
    if (!isSpecificPublishedSourceUrl(source.url)) errors.push(`${label} approved source must use one exact publication URL.`);
    const publishedSource = resolvePublishedSource(source.url || "", sourceMap);
    if (!publishedSource) errors.push(`${label} approved source uses an unregistered citation host: ${source.url || "<missing>"}.`);
    if (publishedSource && !allowedSourceTiers.has(publishedSource.tier)) {
      errors.push(`${label} approved source must resolve to ${[...allowedSourceTiers].join(" or ")} evidence, not ${publishedSource.tier}.`);
    }
    if (!allowedSourceTypes.has(source.sourceType)) {
      errors.push(`${label} approved source must be ${[...allowedSourceTypes].join(" or ")}; received ${source.sourceType}.`);
    }
    if (source && allowedSourceTiers.has(publishedSource?.tier) && isIsoDate(source.publishedDate) && isSpecificPublishedSourceUrl(source.url) && allowedSourceTypes.has(source.sourceType)) {
      approved.push({ entry, source, publishedSource });
    }
  }

  for (const entry of ledger.entries || []) {
    if (entry?.reviewStatus === "needs-source-review") warnings.push(`${entry.id}: held for exact-source review.`);
  }
  return { errors, warnings, approved };
}

export function buildDailyIntelligenceCandidates(ledger, options = {}) {
  const validation = validateDailyIntelligenceLedger(ledger, options);
  if (validation.errors.length) {
    const error = new Error(validation.errors.join("\n"));
    error.validation = validation;
    throw error;
  }

  const byTopic = new Map([...DAILY_INTELLIGENCE_TOPICS].map((topic) => [topic, []]));
  const candidateDateSource = options.candidateDateSource || "daily-intelligence-verified";
  const ingestSourceId = options.ingestSourceId || "daily-intelligence-ledger";
  const sourceCategory = options.sourceCategory || "daily-intelligence";
  const originLabel = options.originLabel || "Daily intelligence";
  for (const { entry, source, publishedSource } of validation.approved) {
    for (const topicId of entry.topics) {
      const candidate = {
        id: candidateId(entry.id, topicId, source.url),
        topicId,
        title: entry.title,
        url: source.url,
        publishedAt: isoTimestamp(source.publishedDate),
        dateSource: candidateDateSource,
        sourceRegistryId: publishedSource.id,
        sourceName: source.organisation || publishedSource.label || publishedSource.id,
        sourceTier: "primary",
        sourceCategory,
        ingestSourceId,
        riskAreas: entry.riskAreas || [],
        tags: [...new Set([...(entry.tags || []), "daily-intelligence"])],
        matchedKeywords: [],
        titleMatchedKeywords: [],
        summaryMatchedKeywords: [],
        relevanceScore: Number.isFinite(entry.relevanceScore) ? entry.relevanceScore : 75,
        reviewStatus: "candidate",
        sourceType: ingestSourceId,
        whyCandidate: `Editorially approved ${originLabel.toLowerCase()} item from ${entry.briefingDate}: ${entry.whyItMatters}`,
        dailyIntelligence: {
          entryId: entry.id,
          briefingDate: entry.briefingDate,
          controlImplication: entry.controlImplication,
          concepts: entry.concepts || [],
        },
      };
      byTopic.get(topicId)?.push(candidate);
    }
  }
  return { byTopic, warnings: validation.warnings, approvedCount: validation.approved.length };
}

export function buildDailyIntelligenceReview(ledger) {
  const entries = Array.isArray(ledger?.entries) ? ledger.entries : [];
  const concepts = new Map();
  for (const entry of entries) {
    for (const concept of entry.concepts || []) {
      const key = slug(concept);
      if (!key) continue;
      const current = concepts.get(key) || { concept: key, entries: [] };
      current.entries.push({ id: entry.id, title: entry.title, briefingDate: entry.briefingDate, reviewStatus: entry.reviewStatus });
      concepts.set(key, current);
    }
  }
  return {
    concepts: [...concepts.values()]
      .map((group) => ({ ...group, count: group.entries.length }))
      .sort((a, b) => b.count - a.count || a.concept.localeCompare(b.concept)),
    deepDiveLeads: entries
      .filter((entry) => entry.deepDivePotential === "develop" || entry.deepDivePotential === "ready")
      .map((entry) => ({ id: entry.id, title: entry.title, briefingDate: entry.briefingDate, status: entry.reviewStatus, concepts: entry.concepts || [], potential: entry.deepDivePotential })),
  };
}
