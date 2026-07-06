import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATES_PATH = path.join(ROOT, "dashboard/data/source-candidates.json");
const REGISTRY_PATH = path.join(ROOT, "dashboard/data/source-registry.json");

const gates = ["authority", "relevance", "signalValue", "citationQuality", "refreshability"];
const intakeOnlyFields = new Set([
  "status",
  "rationale",
  "addedBy",
  "addedDate",
  "reviewDate",
  "gateScores",
  "watchReason",
  "rejectionReason",
  "reviewerNotes",
]);

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function passesGate(candidate, thresholds) {
  let total = 0;
  for (const gate of gates) {
    const score = candidate.gateScores?.[gate];
    if (!Number.isInteger(score) || score < thresholds.minimumScorePerGate || score > thresholds.maximumScorePerGate) {
      return false;
    }
    total += score;
  }
  return total >= thresholds.minimumTotalScore;
}

function toRegistrySource(candidate) {
  return Object.fromEntries(
    Object.entries(candidate).filter(([key]) => !intakeOnlyFields.has(key)),
  );
}

function main() {
  const candidatesFile = loadJson(CANDIDATES_PATH);
  const registry = loadJson(REGISTRY_PATH);
  const thresholds = candidatesFile.gateThresholds;
  const registryIds = new Set((registry.sources || []).map((source) => source.id));
  const remainingCandidates = [];
  const promoted = [];
  const failures = [];

  for (const candidate of candidatesFile.candidates || []) {
    if (candidate.status !== "approved") {
      remainingCandidates.push(candidate);
      continue;
    }

    if (registryIds.has(candidate.id)) {
      failures.push(`${candidate.id} already exists in source registry.`);
      remainingCandidates.push(candidate);
      continue;
    }

    if (!passesGate(candidate, thresholds)) {
      failures.push(`${candidate.id} is approved but does not pass the intake gate.`);
      remainingCandidates.push(candidate);
      continue;
    }

    const registrySource = toRegistrySource(candidate);
    registry.sources.push(registrySource);
    registryIds.add(candidate.id);
    promoted.push(candidate.id);
  }

  if (failures.length) {
    console.error("Source promotion failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  if (promoted.length > 0) {
    registry.sources.sort((a, b) => a.id.localeCompare(b.id));
    candidatesFile.candidates = remainingCandidates;
    writeJson(REGISTRY_PATH, registry);
    writeJson(CANDIDATES_PATH, candidatesFile);
  }

  console.log(`Promoted ${promoted.length} source${promoted.length === 1 ? "" : "s"}.`);
  for (const id of promoted) console.log(`- ${id}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
