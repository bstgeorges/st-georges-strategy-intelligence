import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_INPUT = path.join(ROOT, "tools/reg-scan/docs/latest.json");
const DEFAULT_OUT = path.join(ROOT, "dashboard/regulatory-deadline-register");
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

function addDays(value, days) {
  const result = new Date(`${value}T00:00:00Z`);
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString().slice(0, 10);
}

function stableId(url, deadline) {
  return crypto.createHash("sha256").update(`${url}|${deadline}`).digest("hex").slice(0, 20);
}

function approvalFor(decisions, id, url, deadline) {
  return decisions.find((decision) => (
    (decision.id && decision.id === id) ||
    (decision.url === url && (!decision.deadline || decision.deadline === deadline))
  ));
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
  const id = stableId(signal.url, deadline);
  const source = sourceById.get(authorityId) || {};
  const decision = approvalFor(decisions, id, signal.url, deadline);
  const confidence = signal.confidence?.band || "unknown";
  // Confidence is evidence quality, not an editorial decision. No scanner
  // result becomes a confirmed operating deadline without a recorded review.
  let state = confidence === "high" ? "ready-for-review" : "review";
  if (decision?.decision === "approve") state = "confirmed";
  if (decision?.decision === "reject") state = "rejected";
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
    decision: decision ? { decision: decision.decision, note: decision.note || "", decidedAt: decision.decidedAt || null } : null,
    evidence: {
      change: signal.editorial?.change || signal.why || "",
      detailChecked: Boolean(signal.confidence?.components?.detail),
      deadlineCue: signal.deadlineEvidence || signal.deadline_evidence || null,
    },
    ownerGuidance: ownerGuidance(owners, themes),
    firstSeen: asOf,
    lastSeen: asOf,
    sourceEdition: null,
  };
}

function merge(previous, candidates, asOf, edition) {
  const next = new Map();
  for (const item of previous) {
    if (item.deadline && item.deadline >= addDays(asOf, -GRACE_DAYS) && item.status !== "rejected") next.set(item.id, item);
  }
  for (const candidate of candidates) {
    const old = next.get(candidate.id);
    next.set(candidate.id, {
      ...old,
      ...candidate,
      firstSeen: old?.firstSeen || candidate.firstSeen,
      lastSeen: asOf,
      sourceEdition: edition,
    });
  }
  return [...next.values()].sort((a, b) => a.deadline.localeCompare(b.deadline) || a.title.localeCompare(b.title));
}

function run() {
  const inputFile = path.resolve(argValue("--input", DEFAULT_INPUT));
  const outDir = path.resolve(argValue("--out", DEFAULT_OUT));
  const asOf = argValue("--as-of", null) || new Date().toISOString().slice(0, 10);
  const scanner = readJson(inputFile, null);
  if (!scanner) throw new Error(`Scanner edition not found: ${inputFile}`);
  const sourceById = new Map((readJson(REGISTRY, { sources: [] }).sources || []).map((source) => [source.id, source]));
  const sourceIdByName = new Map([...sourceById.values()].map((source) => [source.name, source.id]));
  const owners = readJson(path.join(outDir, "owners.json"), readJson(path.join(DEFAULT_OUT, "owners.json"), null));
  if (!owners?.default) throw new Error("owners.json is required and must define a default owner route");
  const approvals = readJson(path.join(outDir, "approvals.json"), { decisions: [] });
  const previous = readJson(path.join(outDir, "register.json"), { items: [] });
  const seen = new Set();
  const candidates = [...(scanner.signals || []), ...(scanner.reviewQueue || [])]
    .map((signal) => asCandidate(signal, sourceById, sourceIdByName, owners, asOf, approvals.decisions || []))
    .filter((item) => item && !seen.has(item.id) && seen.add(item.id));
  const items = merge(previous.items || [], candidates, asOf, scanner.edition);
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
  console.log(JSON.stringify({ sourceEdition: scanner.edition, asOf, openItems: items.length, confirmed: items.filter((item) => item.status === "confirmed").length, review: review.length }, null, 2));
}

run();
