import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_DIR = path.join(ROOT, "dashboard/regulatory-deadline-register");
const CORE = ["uk-fca", "uk-boe-pra", "uk-hm-treasury", "eba", "esma", "ecb-supervision", "ofsi"];

function argValue(name, fallback) { const i = process.argv.indexOf(name); return i < 0 ? fallback : process.argv[i + 1]; }
function json(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function dateDiff(a, b) { return Math.floor((new Date(`${a}T00:00:00Z`) - new Date(`${b}T00:00:00Z`)) / 86400000); }

function main() {
  const dir = path.resolve(argValue("--dir", DEFAULT_DIR));
  const asOf = argValue("--as-of", null);
  const register = json(path.join(dir, "register.json"));
  const health = json(path.join(dir, "health.json"));
  const historyFile = path.join(dir, "qa-history.json");
  const prior = fs.existsSync(historyFile) ? json(historyFile) : { runs: [] };
  const today = asOf || new Date().toISOString().slice(0, 10);
  const errors = [];
  const warnings = [];
  if (register.visibility !== "private") errors.push("register must remain private during the shadow period");
  if (health.visibility !== "private") errors.push("health report must remain private during the shadow period");
  const seen = new Set();
  for (const item of register.items || []) {
    if (!item.id || !item.url || !item.title || !/^\d{4}-\d{2}-\d{2}$/.test(item.deadline || "")) errors.push(`invalid item ${item.id || item.title || "unknown"}`);
    if (seen.has(item.id)) errors.push(`duplicate item ${item.id}`);
    seen.add(item.id);
    if (item.deadline > "2030-12-31") errors.push(`implausibly distant deadline ${item.id}`);
    if (!item.authority?.id) errors.push(`missing authority ${item.id}`);
  }
  const healthById = new Map((health.sourceHealth || []).map((item) => [item.sourceId, item]));
  const healthyCore = CORE.filter((id) => healthById.get(id)?.status === "ok");
  const unavailableCore = CORE.filter((id) => healthById.get(id)?.status !== "ok");
  const confirmed = (register.items || []).filter((item) => item.status === "confirmed");
  const confirmedAuthorities = new Set(confirmed.map((item) => item.authority.id));
  const maxAuthorityCount = Math.max(0, ...[...confirmedAuthorities].map((id) => confirmed.filter((item) => item.authority.id === id).length));
  const concentration = confirmed.length ? maxAuthorityCount / confirmed.length : 0;
  const sourceAgeDays = dateDiff(today, register.sourceEdition);
  if (sourceAgeDays > 8) warnings.push(`scanner edition is ${sourceAgeDays} days old`);
  if (unavailableCore.length) warnings.push(`core authority health not ok: ${unavailableCore.join(", ")}`);
  if (confirmed.length < 10) warnings.push(`only ${confirmed.length} confirmed open deadlines; target is 10`);
  if (confirmedAuthorities.size < 4) warnings.push(`only ${confirmedAuthorities.size} confirmed authorities; target is 4`);
  if (concentration > 0.6) warnings.push(`confirmed register is concentrated in one authority (${Math.round(concentration * 100)}%)`);
  const run = { asOf: register.asOf, sourceEdition: register.sourceEdition, healthyCore, errors, warnings };
  const runs = [...(prior.runs || []).filter((item) => item.sourceEdition !== run.sourceEdition), run].slice(-12);
  const stableCore = CORE.filter((id) => runs.slice(-3).length === 3 && runs.slice(-3).every((entry) => entry.healthyCore.includes(id)));
  const relaunchReasons = [
    ...(errors.length ? ["correctness blockers remain"] : []),
    ...(sourceAgeDays > 8 ? ["latest scanner edition is stale"] : []),
    ...(stableCore.length < 4 ? ["fewer than four core authorities have been healthy for three consecutive shadow runs"] : []),
    ...(confirmed.length < 10 ? ["fewer than ten confirmed open deadlines"] : []),
    ...(confirmedAuthorities.size < 4 ? ["fewer than four contributing authorities"] : []),
    ...(concentration > 0.6 ? ["register is too concentrated in one authority"] : []),
  ];
  const qa = {
    version: "regulatory-deadline-qa.v1", visibility: "private", generatedAt: new Date().toISOString(),
    sourceEdition: register.sourceEdition, asOf: register.asOf, errors, warnings,
    readiness: {
      score: Math.max(0, 100 - errors.length * 25 - unavailableCore.length * 7 - Math.max(0, 10 - confirmed.length) * 3 - Math.max(0, 4 - confirmedAuthorities.size) * 5),
      metrics: { confirmedOpenDeadlines: confirmed.length, confirmedAuthorities: confirmedAuthorities.size, healthyCoreAuthorities: healthyCore.length, stableCoreAuthorities: stableCore.length, sourceAgeDays, concentration: Number(concentration.toFixed(3)) },
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
