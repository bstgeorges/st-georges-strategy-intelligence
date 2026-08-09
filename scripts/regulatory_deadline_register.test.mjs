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
  fs.writeFileSync(path.join(out, "approvals.json"), JSON.stringify({ decisions: [{ url: first.items[0].url, deadline: first.items[0].deadline, decision: "approve", note: "Editorial check complete", decidedAt: "2026-08-09" }] }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-09"]).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "register.json"))).items.find((item) => item.authority.id === "uk-fca").status, "confirmed");
  fs.writeFileSync(input, JSON.stringify({ edition: "2026-08-16", signals: [], reviewQueue: [], sourceHealth: [], coverage: {} }));
  assert.equal(spawnSync(process.execPath, [build, "--input", input, "--out", out, "--as-of", "2026-08-16"]).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(out, "register.json"))).items.length, 2);
});

test("does not claim a relaunch until the hard gates have evidence", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deadline-register-"));
  const register = { version: "regulatory-deadline-register.v1", visibility: "private", asOf: "2026-08-09", sourceEdition: "2026-08-09", items: [signal("uk-fca", "2026-09-01")] };
  register.items[0] = { id: "a", url: register.items[0].url, title: "FCA consultation", deadline: "2026-09-01", status: "confirmed", authority: { id: "uk-fca" } };
  fs.writeFileSync(path.join(tmp, "register.json"), JSON.stringify(register));
  fs.writeFileSync(path.join(tmp, "health.json"), JSON.stringify({ sourceHealth: [{ sourceId: "uk-fca", status: "ok" }] }));
  assert.equal(spawnSync(process.execPath, [validate, "--dir", tmp, "--as-of", "2026-08-09"]).status, 0);
  const qa = JSON.parse(fs.readFileSync(path.join(tmp, "qa.json")));
  assert.equal(qa.readiness.relaunchEligible, false);
  assert.ok(qa.readiness.relaunchReasons.some((reason) => reason.includes("three consecutive")));
});
