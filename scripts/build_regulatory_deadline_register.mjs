import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_INPUT = path.join(ROOT, "tools/reg-scan/docs/latest.json");
const DEFAULT_OUT = path.join(ROOT, "dashboard/regulatory-deadline-register");
const DEFAULT_VERIFIED = path.join(DEFAULT_OUT, "verified-deadlines.json");
const REGISTRY = path.join(ROOT, "dashboard/data/source-registry.json");
const GRACE_DAYS = 30;

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function readJson(file, fallback) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fallback;
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function isoDate(value) {
  const match = String(value || "").match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
}

function isValidDate(value) {
  const date = isoDate(value);
  if (!date) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

function addDays(value, days) {
  const result = new Date(`${value}T00:00:00Z`);
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString().slice(0, 10);
}

function stableId(url, deadline) {
  return crypto.createHash("sha256").update(`${url}|${deadline}`).digest("hex").slice(0, 20);
}

function hasExplicitPrimaryDeadlineEvidence(item) {
  const evidence = item?.evidence?.deadlineCue;
  return item?.intake !== "scanner" || (
    item.evidence?.detailChecked === true
    && evidence?.source === "primary-document-detail"
    && typeof evidence?.trigger === "string"
    && typeof evidence?.quote === "string"
  );
}

function approvalFor(decisions, id, url, deadline) {
  return decisions.find((decision) => (
    (decision.id && decision.id === id) ||
    (decision.url === url && (!decision.deadline || decision.deadline === deadline))
  ));
}

function validateApprovals(approvals) {
  if (!Array.isArray(approvals?.decisions)) throw new Error("approvals.json must contain decisions[].");
  for (const [index, decision] of approvals.decisions.entries()) {
    const label = `approvals.json decision ${index + 1}`;
    if (!decision?.id && !decision?.url) throw new Error(`${label} must identify a register item by id or URL.`);
    if (!["confirmed", "rejected", "not-applicable"].includes(decision?.decision)) throw new Error(`${label} must be confirmed, rejected, or not-applicable.`);
    if (!decision?.reviewer) throw new Error(`${label} must record a reviewer.`);
    if (!isValidDate(decision?.decidedAt)) throw new Error(`${label} must record decidedAt as YYYY-MM-DD.`);
    if (!decision?.note) throw new Error(`${label} must record the editorial evidence or reason.`);
    if (!["source-date-only", "applicability"].includes(decision?.scope)) throw new Error(`${label} must set scope to source-date-only or applicability.`);
    if (decision.decision === "confirmed" && (!decision?.evidence?.quote || !decision?.evidence?.url)) {
      throw new Error(`${label} must include a primary-source quote and URL when confirmed.`);
    }
  }
}

function ownerGuidance(owners, themes) {
  const selected = themes.map((theme) => owners.themes?.[theme]).filter(Boolean);
  const unique = (values) => [...new Set(values.flat())];
  return {
    owners: unique(selected.map((item) => item.owners)).length
      ? unique(selected.map((item) => item.owners)) : owners.default.owners,
    prepare: unique(selected.map((item) => item.prepare)).length
      ? unique(selected.map((item) => item.prepare)) : owners.default.prepare,
  };
}

function asCandidate(signal, sourceById, sourceIdByName, owners, asOf, decisions) {
  const deadline = isoDate(signal.deadline);
  const authorityId = signal.authorityId || signal.sourceId || signal.source_id || sourceIdByName.get(signal.source);
  if (!deadline || !signal.url || !authorityId) return null;
  // A longer discovery lookback is intended to find upcoming obligations,
  // not to keep rediscovering historic consultations forever. Retain a short
  // grace window for closure review, then let the record age out.
  if (deadline < addDays(asOf, -GRACE_DAYS)) return null;
  const id = stableId(signal.url, deadline);
  const source = sourceById.get(authorityId) || {};
  const decision = approvalFor(decisions, id, signal.url, deadline);
  const confidence = signal.confidence?.band || "unknown";
  // Confidence is evidence quality, not an editorial decision. No scanner
  // result becomes a confirmed operating deadline without a recorded review.
  let state = confidence === "high" ? "ready-for-review" : "review";
  if (decision?.decision === "confirmed") state = "confirmed";
  if (decision?.decision === "rejected") state = "rejected";
  if (decision?.decision === "not-applicable") state = "not-applicable";
  const themes = signal.riskAreas || [];
  return {
    id,
    title: signal.title,
    url: signal.url,
    deadline,
    daysToDeadline: Math.round((new Date(`${deadline}T00:00:00Z`) - new Date(`${asOf}T00:00:00Z`)) / 86400000),
    stage: signal.type || "other",
    authority: { id: authorityId, name: signal.source || source.name || authorityId, tier: source.tier || "unknown" },
    jurisdictions: signal.jurisdictions?.length ? signal.jurisdictions : (source.jurisdictions || []),
    themes,
    confidence: { band: confidence, score: signal.confidence?.score ?? null, components: signal.confidence?.components || {} },
    businessImpact: signal.businessImpact || null,
    sourcePublishedAt: isoDate(signal.date),
    status: state,
    intake: signal.intake || "scanner",
    decision: decision ? { decision: decision.decision, scope: decision.scope || null, reviewer: decision.reviewer || null, note: decision.note || "", decidedAt: decision.decidedAt || null, evidence: decision.evidence || null } : null,
    evidence: {
      change: signal.editorial?.change || signal.why || "",
      detailChecked: Boolean(signal.confidence?.components?.detail),
      deadlineCue: signal.deadlineEvidence || signal.deadline_evidence || null,
      verifiedAt: isoDate(signal.verifiedAt),
      verification: signal.verification || null,
    },
    ownerGuidance: ownerGuidance(owners, themes),
    firstSeen: isoDate(signal.verifiedAt) || asOf,
    lastSeen: isoDate(signal.verifiedAt) || asOf,
    sourceEdition: isoDate(signal.verifiedAt) || null,
  };
}

function merge(previous, candidates, asOf, edition) {
  const next = new Map();
  for (const item of previous) {
    if (item.deadline && item.deadline >= addDays(asOf, -GRACE_DAYS) && hasExplicitPrimaryDeadlineEvidence(item)) next.set(item.id, item);
  }
  for (const candidate of candidates) {
    for (const old of next.values()) {
      if (old.url === candidate.url && old.id !== candidate.id) {
        next.set(old.id, {
          ...old,
          status: "superseded",
          supersededAt: asOf,
          supersededBy: candidate.id,
        });
      }
    }
    const old = next.get(candidate.id);
    const isVerifiedBackfill = candidate.intake === "verified-backfill";
    next.set(candidate.id, {
      ...old,
      ...candidate,
      firstSeen: old?.firstSeen || candidate.firstSeen,
      lastSeen: isVerifiedBackfill ? old?.lastSeen || candidate.lastSeen : asOf,
      sourceEdition: isVerifiedBackfill ? old?.sourceEdition || candidate.sourceEdition || edition : edition,
    });
  }
  return [...next.values()].sort((a, b) => a.deadline.localeCompare(b.deadline) || a.title.localeCompare(b.title));
}

function buildChanges(previous, candidates, items, asOf, edition) {
  const prior = previous.items || [];
  const priorById = new Map(prior.map((item) => [item.id, item]));
  const currentById = new Map(items.map((item) => [item.id, item]));
  const seenIds = new Set(candidates.filter((item) => item.intake !== "verified-backfill").map((item) => item.id));
  const additions = [];
  const revisedDates = [];
  const statusChanges = [];
  const reconfirmed = [];

  for (const candidate of candidates) {
    const old = priorById.get(candidate.id);
    const priorVersion = prior.find((item) => item.url === candidate.url && item.id !== candidate.id && item.status !== "superseded");
    const current = currentById.get(candidate.id) || candidate;
    if (candidate.intake === "verified-backfill" && old) {
      continue;
    } else if (priorVersion) {
      revisedDates.push({
        id: candidate.id,
        title: candidate.title,
        authority: candidate.authority,
        url: candidate.url,
        from: priorVersion.deadline,
        to: candidate.deadline,
      });
    } else if (!old) {
      additions.push({ id: candidate.id, title: candidate.title, authority: candidate.authority, deadline: candidate.deadline, url: candidate.url });
    } else if (old.status !== current.status) {
      statusChanges.push({ id: candidate.id, title: candidate.title, authority: candidate.authority, deadline: candidate.deadline, from: old.status, to: current.status, url: candidate.url });
    } else {
      reconfirmed.push({ id: candidate.id, title: candidate.title, authority: candidate.authority, deadline: candidate.deadline, url: candidate.url });
    }
  }

  const notReconfirmed = prior
    .filter((item) => item.intake !== "verified-backfill" && !["rejected", "not-applicable", "superseded"].includes(item.status) && !seenIds.has(item.id) && currentById.has(item.id))
    .map((item) => ({ id: item.id, title: item.title, authority: item.authority, deadline: item.deadline, url: item.url }));

  return {
    version: "regulatory-deadline-changes.v1",
    visibility: "private",
    generatedAt: new Date().toISOString(),
    asOf,
    sourceEdition: edition,
    baseline: prior.length === 0,
    comparedWith: prior.length ? { asOf: previous.asOf || null, sourceEdition: previous.sourceEdition || null } : null,
    additions,
    revisedDates,
    statusChanges,
    reconfirmed,
    notReconfirmed,
  };
}

function run() {
  const inputFile = path.resolve(argValue("--input", DEFAULT_INPUT));
  const outDir = path.resolve(argValue("--out", DEFAULT_OUT));
  const asOf = argValue("--as-of", null) || new Date().toISOString().slice(0, 10);
  const scanner = readJson(inputFile, null);
  if (!scanner) throw new Error(`Scanner edition not found: ${inputFile}`);
  if (!isValidDate(scanner.edition)) throw new Error("Scanner edition must be a valid YYYY-MM-DD date.");
  if (!isValidDate(asOf)) throw new Error("Register as-of date must be a valid YYYY-MM-DD date.");
  if (scanner.edition > asOf) throw new Error("Scanner edition cannot be after the register as-of date.");
  const sourceById = new Map((readJson(REGISTRY, { sources: [] }).sources || []).map((source) => [source.id, source]));
  const sourceIdByName = new Map([...sourceById.values()].map((source) => [source.name, source.id]));
  const owners = readJson(path.join(outDir, "owners.json"), readJson(path.join(DEFAULT_OUT, "owners.json"), null));
  if (!owners?.default) throw new Error("owners.json is required and must define a default owner route");
  const approvals = readJson(path.join(outDir, "approvals.json"), { decisions: [] });
  const verified = readJson(
    path.join(outDir, "verified-deadlines.json"),
    outDir === DEFAULT_OUT ? readJson(DEFAULT_VERIFIED, { records: [] }) : { records: [] },
  );
  validateApprovals(approvals);
  const previous = readJson(path.join(outDir, "register.json"), { items: [] });
  const seen = new Set();
  // The weekly material shortlist is not the complete deadline universe.
  // `privateDeadlineCandidates` carries high-confidence official dates that
  // are too narrow to be promoted as a weekly signal, and must remain private.
  const candidates = [...(scanner.signals || []), ...(scanner.reviewQueue || []), ...(scanner.privateDeadlineCandidates || []), ...(verified.records || [])]
    .map((signal) => asCandidate(signal, sourceById, sourceIdByName, owners, asOf, approvals.decisions || []))
    .filter((item) => item && !seen.has(item.id) && seen.add(item.id));
  const items = merge(previous.items || [], candidates, asOf, scanner.edition);
  const changes = buildChanges(previous, candidates, items, asOf, scanner.edition);
  const review = items.filter((item) => ["ready-for-review", "review"].includes(item.status));
  const register = {
    version: "regulatory-deadline-register.v1",
    visibility: "private",
    generatedAt: new Date().toISOString(),
    asOf,
    sourceEdition: scanner.edition,
    carryForwardGraceDays: GRACE_DAYS,
    items,
  };
  const health = {
    version: "regulatory-deadline-health.v1",
    visibility: "private",
    generatedAt: register.generatedAt,
    sourceEdition: scanner.edition,
    sourceHealth: scanner.sourceHealth || [],
    coverage: scanner.coverage || {},
    coreAuthorities: ["uk-fca", "uk-boe-pra", "uk-hm-treasury", "eba", "esma", "ecb-supervision", "ofsi"],
  };
  writeJson(path.join(outDir, "register.json"), register);
  writeJson(path.join(outDir, "review.json"), { version: "regulatory-deadline-review.v1", visibility: "private", generatedAt: register.generatedAt, sourceEdition: scanner.edition, items: review });
  writeJson(path.join(outDir, "health.json"), health);
  writeJson(path.join(outDir, "changes.json"), changes);
  console.log(JSON.stringify({ sourceEdition: scanner.edition, asOf, openItems: items.length, confirmed: items.filter((item) => item.status === "confirmed").length, review: review.length }, null, 2));
}

run();
