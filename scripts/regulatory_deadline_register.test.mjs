import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const build = path.join(ROOT, "scripts/build_regulatory_deadline_register.mjs");
const validate = path.join(ROOT, "scripts/validate_regulatory_deadline_register.mjs");

function signal(id, deadline, confidence = "high") {
  return { authorityId: id, title: `${id} consultation`, url: `https://example.test/${id}/${deadline}`, date: "2026-08-09", deadline, type: "consultation", riskAreas: ["digital-resilience"], source: id, jurisdictions: ["UK"], confidence: { band: confidence, score: confidence === "high" ? 1 : 0.7, components: { detail: confidence === "high" ? 1 : 0 } }, businessImpact: { band: "high" }, editorial: { change: "Official consultation with a date." } };
}

test("builds a cumulative private register and keeps every scanner candidate in review", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deadline-register-"));
  const input = path.join(tmp, "scan.json");
  const out = path.join(tmp, "out");
  fs.mkdirSync(out);
  fs.copyFileSync(path.join(ROOT, "dashboard/regulatory-deadline-register/owners.json"), path.join(out, "owners.json"));
  fs.writeFileSync(input, JSON.stringify({ edition: "2026-08-09", signals: [signal("uk-fca", "2026-09-01"), signal("eba", "2026-09-02", "medium")], reviewQueue: [], sourceHealth: [], coverage: {} }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-09"]).status, 0);
  const first = JSON.parse(fs.readFileSync(path.join(out, "register.json")));
  assert.equal(first.visibility, "private");
  assert.equal(first.items.length, 2);
  assert.equal(first.items.filter((item) => item.status === "confirmed").length, 0);
  assert.equal(first.items.filter((item) => item.status === "ready-for-review").length, 1);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "review.json"))).items.length, 2);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "changes.json"))).baseline, true);
  fs.writeFileSync(path.join(out, "approvals.json"), JSON.stringify({ decisions: [{ url: first.items[0].url, deadline: first.items[0].deadline, decision: "approve", reviewer: "Editorial lead", note: "Editorial check complete", decidedAt: "2026-08-09" }] }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-09"]).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "register.json"))).items.find((item) => item.authority.id === "uk-fca").status, "confirmed");
  const approvalChange = JSON.parse(fs.readFileSync(path.join(out, "changes.json")));
  assert.equal(approvalChange.baseline, false);
  assert.equal(approvalChange.statusChanges.length, 1);
  assert.equal(approvalChange.statusChanges[0].to, "confirmed");
  fs.writeFileSync(input, JSON.stringify({ edition: "2026-08-16", signals: [], reviewQueue: [], sourceHealth: [], coverage: {} }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-16"]).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "register.json"))).items.length, 2);
});

test("keeps high-confidence official deadlines below the weekly material threshold in private review", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deadline-register-"));
  const input = path.join(tmp, "scan.json");
  const out = path.join(tmp, "out");
  fs.mkdirSync(out);
  fs.copyFileSync(path.join(ROOT, "dashboard/regulatory-deadline-register/owners.json"), path.join(out, "owners.json"));
  const candidate = { ...signal("esma", "2026-10-01"), score: 0.8 };
  fs.writeFileSync(input, JSON.stringify({
    edition: "2026-08-09",
    signals: [],
    reviewQueue: [],
    privateDeadlineCandidates: [candidate],
    sourceHealth: [],
    coverage: {},
  }));

  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-09"]).status, 0);
  const register = JSON.parse(fs.readFileSync(path.join(out, "register.json")));
  assert.equal(register.items.length, 1);
  assert.equal(register.items[0].authority.id, "esma");
  assert.equal(register.items[0].status, "ready-for-review");
  assert.equal(register.items[0].decision, null);
});

test("does not reintroduce expired scanner deadlines outside the review grace window", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deadline-register-"));
  const input = path.join(tmp, "scan.json");
  const out = path.join(tmp, "out");
  fs.mkdirSync(out);
  fs.copyFileSync(path.join(ROOT, "dashboard/regulatory-deadline-register/owners.json"), path.join(out, "owners.json"));
  fs.writeFileSync(input, JSON.stringify({
    edition: "2026-08-16",
    signals: [signal("uk-fca", "2026-06-15")],
    reviewQueue: [],
    privateDeadlineCandidates: [],
    sourceHealth: [],
    coverage: {},
  }));

  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-16"]).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "register.json"))).items.length, 0);
});

test("keeps source-verified backfill records private and does not mistake a repeated ledger row for a fresh scan", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deadline-register-"));
  const input = path.join(tmp, "scan.json");
  const out = path.join(tmp, "out");
  fs.mkdirSync(out);
  fs.copyFileSync(path.join(ROOT, "dashboard/regulatory-deadline-register/owners.json"), path.join(out, "owners.json"));
  fs.copyFileSync(path.join(ROOT, "dashboard/regulatory-deadline-register/verified-deadlines.json"), path.join(out, "verified-deadlines.json"));
  fs.writeFileSync(input, JSON.stringify({ edition: "2026-08-14", signals: [], reviewQueue: [], privateDeadlineCandidates: [], sourceHealth: [], coverage: {} }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-14"]).status, 0);
  const first = JSON.parse(fs.readFileSync(path.join(out, "register.json")));
  assert.equal(first.items.length, 6);
  assert.equal(first.items.filter((item) => item.status === "confirmed").length, 0);
  assert.equal(first.items.filter((item) => item.intake === "verified-backfill").length, 6);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "changes.json"))).additions.length, 6);
  assert.equal(spawnSync(process.execPath, [validate, "--dir", out, "--as-of", "2026-08-14", "--strict"]).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "qa.json"))).errors.length, 0);
  fs.writeFileSync(input, JSON.stringify({ edition: "2026-08-21", signals: [], reviewQueue: [], privateDeadlineCandidates: [], sourceHealth: [], coverage: {} }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-21"]).status, 0);
  const second = JSON.parse(fs.readFileSync(path.join(out, "register.json")));
  assert.equal(second.items.find((item) => item.authority.id === "eiopa").lastSeen, "2026-08-14");
  const changes = JSON.parse(fs.readFileSync(path.join(out, "changes.json")));
  assert.equal(changes.reconfirmed.length, 0);
  assert.equal(changes.notReconfirmed.length, 0);
});

test("does not claim a relaunch without recorded human sign-off, even when numerical gates pass", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deadline-register-"));
  const authorities = ["uk-fca", "uk-boe-pra", "uk-hm-treasury", "eba"];
  const register = {
    version: "regulatory-deadline-register.v1",
    visibility: "private",
    asOf: "2026-08-09",
    sourceEdition: "2026-08-09",
    items: Array.from({ length: 10 }, (_, index) => ({
      id: `item-${index}`,
      url: `https://example.test/${index}`,
      title: `Consultation ${index}`,
      deadline: `2026-09-${String(index + 1).padStart(2, "0")}`,
      status: "confirmed",
      authority: { id: authorities[index % authorities.length] },
    })),
  };
  fs.writeFileSync(path.join(tmp, "register.json"), JSON.stringify(register));
  const core = ["uk-fca", "uk-boe-pra", "uk-hm-treasury", "eba", "esma", "ecb-supervision", "ofsi"];
  fs.writeFileSync(path.join(tmp, "health.json"), JSON.stringify({ visibility: "private", sourceEdition: "2026-08-09", sourceHealth: core.map((sourceId) => ({ sourceId, status: "ok" })) }));
  fs.writeFileSync(path.join(tmp, "qa-history.json"), JSON.stringify({ runs: ["2026-07-26", "2026-08-02", "2026-08-09"].map((sourceEdition) => ({ sourceEdition, healthyCore: core, errors: [], warnings: [] })) }));
  assert.equal(spawnSync(process.execPath, [validate, "--dir", tmp, "--as-of", "2026-08-09"]).status, 0);
  const qa = JSON.parse(fs.readFileSync(path.join(tmp, "qa.json")));
  assert.equal(qa.readiness.relaunchEligible, false);
  assert.ok(qa.readiness.relaunchReasons.some((reason) => reason.includes("editor and product owner")));
  assert.equal(qa.errors.length, 0);
});

test("supersedes an old deadline when the same authority changes the date", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deadline-register-"));
  const input = path.join(tmp, "scan.json");
  const out = path.join(tmp, "out");
  fs.mkdirSync(out);
  fs.copyFileSync(path.join(ROOT, "dashboard/regulatory-deadline-register/owners.json"), path.join(out, "owners.json"));
  const original = { ...signal("uk-fca", "2026-09-01"), url: "https://example.test/fca/consultation" };
  fs.writeFileSync(input, JSON.stringify({ edition: "2026-08-09", signals: [original], reviewQueue: [], sourceHealth: [], coverage: {} }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-09"]).status, 0);
  const extended = { ...original, deadline: "2026-10-01" };
  fs.writeFileSync(input, JSON.stringify({ edition: "2026-08-16", signals: [extended], reviewQueue: [], sourceHealth: [], coverage: {} }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-16"]).status, 0);
  const items = JSON.parse(fs.readFileSync(path.join(out, "register.json")).toString()).items;
  assert.equal(items.find((item) => item.deadline === "2026-09-01").status, "superseded");
  assert.equal(items.find((item) => item.deadline === "2026-10-01").status, "ready-for-review");
  const changes = JSON.parse(fs.readFileSync(path.join(out, "changes.json")));
  assert.equal(changes.revisedDates.length, 1);
  assert.equal(changes.revisedDates[0].from, "2026-09-01");
  assert.equal(changes.revisedDates[0].to, "2026-10-01");
});
