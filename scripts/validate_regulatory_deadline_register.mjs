import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_DIR = path.join(ROOT, "dashboard/regulatory-deadline-register");
const CORE = ["uk-fca", "uk-boe-pra", "uk-hm-treasury", "eba", "esma", "ecb-supervision", "ofsi"];
const ALLOWED_SOURCE_HEALTH = new Set(["ok", "failed", "blocked", "degraded", "not-configured"]);
const ALLOWED_ITEM_STATUS = new Set(["ready-for-review", "review", "confirmed", "rejected", "not-applicable", "superseded"]);

function argValue(name, fallback) { const i = process.argv.indexOf(name); return i < 0 ? fallback : process.argv[i + 1]; }
function json(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function dateDiff(a, b) { return Math.floor((new Date(`${a}T00:00:00Z`) - new Date(`${b}T00:00:00Z`)) / 86400000); }
function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function hasCurrentRelaunchApproval(approval, sourceEdition) {
  const personApproved = (person) => Boolean(person?.name && isValidDate(person?.approvedAt) && person?.note);
  return approval?.visibility === "private"
    && approval?.approved === true
    && approval?.sourceEdition === sourceEdition
    && personApproved(approval.editor)
    && personApproved(approval.productOwner);
}

function main() {
  const dir = path.resolve(argValue("--dir", DEFAULT_DIR));
  const asOf = argValue("--as-of", null);
  const register = json(path.join(dir, "register.json"));
  const health = json(path.join(dir, "health.json"));
  const historyFile = path.join(dir, "qa-history.json");
  const approvalFile = path.join(dir, "relaunch-approval.json");
  const exceptionsFile = path.join(dir, "source-exceptions.json");
  const relaunchApproval = fs.existsSync(approvalFile) ? json(approvalFile) : null;
  const exceptions = fs.existsSync(exceptionsFile) ? json(exceptionsFile) : null;
  const prior = fs.existsSync(historyFile) ? json(historyFile) : { runs: [] };
  const today = asOf || new Date().toISOString().slice(0, 10);
  const errors = [];
  const warnings = [];
  if (!isValidDate(today)) errors.push("QA as-of date must be YYYY-MM-DD");
  if (register.visibility !== "private") errors.push("register must remain private during the shadow period");
  if (health.visibility !== "private") errors.push("health report must remain private during the shadow period");
  if (!isValidDate(register.asOf)) errors.push("register asOf must be YYYY-MM-DD");
  if (!isValidDate(register.sourceEdition)) errors.push("register sourceEdition must be YYYY-MM-DD");
  if (health.sourceEdition !== register.sourceEdition) errors.push("health sourceEdition must match register sourceEdition");
  if (isValidDate(register.sourceEdition) && register.sourceEdition > today) errors.push("register sourceEdition cannot be in the future");
  const seen = new Set();
  for (const item of register.items || []) {
    if (!item.id || !item.url || !item.title || !isValidDate(item.deadline)) errors.push(`invalid item ${item.id || item.title || "unknown"}`);
    if (!ALLOWED_ITEM_STATUS.has(item.status)) errors.push(`invalid item status ${item.id || item.title || "unknown"}`);
    if (seen.has(item.id)) errors.push(`duplicate item ${item.id}`);
    seen.add(item.id);
    if (item.deadline > "2030-12-31") errors.push(`implausibly distant deadline ${item.id}`);
    if (!item.authority?.id) errors.push(`missing authority ${item.id}`);
    if (item.intake === "verified-backfill") {
      if (!isValidDate(item.evidence?.verifiedAt)) errors.push(`missing current primary-source verification date ${item.id}`);
      if (!item.evidence?.verification) errors.push(`missing primary-source verification method ${item.id}`);
    }
    if (item.intake === "scanner") {
      const evidence = item.evidence?.deadlineCue;
      if (!item.evidence?.detailChecked || evidence?.source !== "primary-document-detail" || !evidence?.trigger || !evidence?.quote) {
        errors.push(`scanner deadline lacks explicit primary-document evidence ${item.id}`);
      }
    }
    if (item.status === "confirmed") {
      const decision = item.decision;
      if (decision?.decision !== "confirmed" || !decision?.scope || !decision?.reviewer || !isValidDate(decision?.decidedAt) || !decision?.note || !decision?.evidence?.quote || !decision?.evidence?.url) {
        errors.push(`confirmed record lacks a complete decision trail ${item.id}`);
      }
    }
  }
  const sourceHealthSeen = new Set();
  for (const item of health.sourceHealth || []) {
    if (!item?.sourceId || !ALLOWED_SOURCE_HEALTH.has(item.status)) errors.push(`invalid source health entry ${item?.sourceId || "unknown"}`);
    if (sourceHealthSeen.has(item.sourceId)) errors.push(`duplicate source health entry ${item.sourceId}`);
    sourceHealthSeen.add(item.sourceId);
  }
  const healthById = new Map((health.sourceHealth || []).map((item) => [item.sourceId, item]));
  const unavailableSources = (health.sourceHealth || []).filter((item) => ["blocked", "failed", "degraded"].includes(item.status));
  if (unavailableSources.length && !exceptions) errors.push("source-exceptions.json is required while any configured source is unavailable");
  if (exceptions) {
    if (exceptions.visibility !== "private" || !Array.isArray(exceptions.exceptions)) errors.push("source-exceptions.json must be a private exceptions list");
    const exceptionById = new Map((exceptions.exceptions || []).map((item) => [item.sourceId, item]));
    for (const source of unavailableSources) {
      const exception = exceptionById.get(source.sourceId);
      if (!exception || exception.expectedStatus !== source.status || !exception.issue || !exception.governance || !exception.nextCheck) {
        errors.push(`unavailable source lacks governed exception ${source.sourceId}`);
      }
    }
    for (const exception of exceptions.exceptions || []) {
      if (!exception?.sourceId || !ALLOWED_SOURCE_HEALTH.has(exception.expectedStatus)) errors.push(`invalid source exception ${exception?.sourceId || "unknown"}`);
      const actual = healthById.get(exception?.sourceId);
      if (actual && actual.status !== exception.expectedStatus) errors.push(`source exception status drift ${exception.sourceId}: expected ${exception.expectedStatus}, got ${actual.status}`);
    }
  }
  const healthyCore = CORE.filter((id) => healthById.get(id)?.status === "ok");
  const unavailableCore = CORE.filter((id) => healthById.get(id)?.status !== "ok");
  const confirmedOpen = (register.items || []).filter((item) => item.status === "confirmed" && item.deadline >= today);
  const confirmedAuthorities = new Set(confirmedOpen.map((item) => item.authority.id));
  const maxAuthorityCount = Math.max(0, ...[...confirmedAuthorities].map((id) => confirmedOpen.filter((item) => item.authority.id === id).length));
  const concentration = confirmedOpen.length ? maxAuthorityCount / confirmedOpen.length : 0;
  const sourceAgeDays = isValidDate(register.sourceEdition) && isValidDate(today) ? dateDiff(today, register.sourceEdition) : null;
  if (sourceAgeDays > 8) warnings.push(`scanner edition is ${sourceAgeDays} days old`);
  if (unavailableCore.length) warnings.push(`core authority health not ok: ${unavailableCore.join(", ")}`);
  if (confirmedOpen.length < 10) warnings.push(`only ${confirmedOpen.length} confirmed open deadlines; target is 10`);
  if (confirmedAuthorities.size < 4) warnings.push(`only ${confirmedAuthorities.size} confirmed authorities; target is 4`);
  if (concentration > 0.6) warnings.push(`confirmed register is concentrated in one authority (${Math.round(concentration * 100)}%)`);
  const staleVerifications = (register.items || []).filter((item) => item.intake === "verified-backfill" && isValidDate(item.evidence?.verifiedAt) && dateDiff(today, item.evidence.verifiedAt) > 14);
  if (staleVerifications.length) warnings.push(`${staleVerifications.length} verified carry-forward record(s) need a renewed primary-source check`);
  const run = { asOf: register.asOf, sourceEdition: register.sourceEdition, healthyCore, errors, warnings };
  const runs = [...(prior.runs || []).filter((item) => item.sourceEdition !== run.sourceEdition), run].slice(-12);
  const stableCore = CORE.filter((id) => runs.slice(-3).length === 3 && runs.slice(-3).every((entry) => entry.healthyCore.includes(id)));
  const relaunchReasons = [
    ...(errors.length ? ["correctness blockers remain"] : []),
    ...(sourceAgeDays === null || sourceAgeDays > 8 ? ["latest scanner edition is stale"] : []),
    ...(stableCore.length < 4 ? ["fewer than four core authorities have been healthy for three consecutive shadow runs"] : []),
    ...(confirmedOpen.length < 10 ? ["fewer than ten confirmed open deadlines"] : []),
    ...(confirmedAuthorities.size < 4 ? ["fewer than four contributing authorities"] : []),
    ...(concentration > 0.6 ? ["register is too concentrated in one authority"] : []),
    ...(!hasCurrentRelaunchApproval(relaunchApproval, register.sourceEdition) ? ["editor and product owner have not recorded a current-edition relaunch approval"] : []),
  ];
  const qa = {
    version: "regulatory-deadline-qa.v1", visibility: "private", generatedAt: new Date().toISOString(),
    sourceEdition: register.sourceEdition, asOf: register.asOf, errors, warnings,
    readiness: {
      score: Math.max(0, 100 - errors.length * 25 - unavailableCore.length * 7 - Math.max(0, 10 - confirmedOpen.length) * 3 - Math.max(0, 4 - confirmedAuthorities.size) * 5),
      metrics: { confirmedOpenDeadlines: confirmedOpen.length, confirmedAuthorities: confirmedAuthorities.size, healthyCoreAuthorities: healthyCore.length, stableCoreAuthorities: stableCore.length, sourceAgeDays, concentration: Number(concentration.toFixed(3)) },
      relaunchEligible: relaunchReasons.length === 0,
      relaunchReasons,
    },
  };
  fs.writeFileSync(path.join(dir, "qa.json"), `${JSON.stringify(qa, null, 2)}\n`);
  fs.writeFileSync(historyFile, `${JSON.stringify({ version: "regulatory-deadline-qa-history.v1", visibility: "private", runs }, null, 2)}\n`);
  console.log(JSON.stringify(qa, null, 2));
  if (process.argv.includes("--strict") && errors.length) process.exitCode = 1;
}

main();
