import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CANDIDATES_PATH = path.join(ROOT, "dashboard/data/source-candidates.json");
const REGISTRY_PATH = path.join(ROOT, "dashboard/data/source-registry.json");

const allowedTiers = new Set(["primary", "specialist", "press"]);
const allowedStatuses = new Set(["proposed", "approved", "watchlist", "rejected"]);
const gates = ["authority", "relevance", "signalValue", "citationQuality", "refreshability"];

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function scoreCandidate(candidate, thresholds) {
  const failures = [];
  let total = 0;

  for (const gate of gates) {
    const score = candidate.gateScores?.[gate];
    if (!Number.isInteger(score)) {
      failures.push(`missing integer gate score: ${gate}`);
      continue;
    }
    if (score < 0 || score > thresholds.maximumScorePerGate) {
      failures.push(`${gate} score must be between 0 and ${thresholds.maximumScorePerGate}`);
    }
    if (score < thresholds.minimumScorePerGate) {
      failures.push(`${gate} score ${score} is below minimum ${thresholds.minimumScorePerGate}`);
    }
    total += score;
  }

  if (total < thresholds.minimumTotalScore) {
    failures.push(`total score ${total} is below minimum ${thresholds.minimumTotalScore}`);
  }

  return { total, passed: failures.length === 0, failures };
}

function validateCandidate(candidate, registryIds, candidateIds, thresholds) {
  const failures = [];
  const requiredStringFields = ["id", "name", "tier", "category", "url", "cadence", "status", "rationale", "addedBy", "addedDate", "reviewDate"];
  const requiredArrayFields = ["jurisdictions", "useFor", "signalQuestions"];

  for (const field of requiredStringFields) {
    if (!candidate[field] || typeof candidate[field] !== "string") failures.push(`missing ${field}`);
  }
  for (const field of requiredArrayFields) {
    if (!Array.isArray(candidate[field]) || candidate[field].length === 0) failures.push(`missing ${field}`);
  }
  if (candidate.signalQuestions && candidate.signalQuestions.length < 2) failures.push("signalQuestions must include at least two questions");
  if (candidate.tier && !allowedTiers.has(candidate.tier)) failures.push(`invalid tier: ${candidate.tier}`);
  if (candidate.status && !allowedStatuses.has(candidate.status)) failures.push(`invalid status: ${candidate.status}`);
  if (candidate.url && !/^https:\/\//.test(candidate.url)) failures.push("url must use https");
  if (candidate.id && registryIds.has(candidate.id)) failures.push("id already exists in source registry");
  if (candidate.id && candidateIds.has(candidate.id)) failures.push("duplicate id in candidate file");
  if (!candidate.gateScores || typeof candidate.gateScores !== "object") failures.push("missing gateScores");

  const score = scoreCandidate(candidate, thresholds);
  const shouldPassGate = candidate.status === "proposed" || candidate.status === "approved";
  if (shouldPassGate && !score.passed) failures.push(...score.failures);
  if (candidate.status === "watchlist" && !candidate.watchReason) failures.push("watchlist candidates must include watchReason");
  if (candidate.status === "rejected" && !candidate.rejectionReason) failures.push("rejected candidates must include rejectionReason");

  return { failures, score };
}

function main() {
  const candidatesFile = loadJson(CANDIDATES_PATH);
  const registry = loadJson(REGISTRY_PATH);
  const thresholds = candidatesFile.gateThresholds;
  const registryIds = new Set((registry.sources || []).map((source) => source.id));
  const candidateIds = new Set();
  const failures = [];
  const results = [];

  if (!Array.isArray(candidatesFile.candidates)) {
    throw new Error("source-candidates.json must contain a candidates array.");
  }

  for (const candidate of candidatesFile.candidates) {
    const result = validateCandidate(candidate, registryIds, candidateIds, thresholds);
    if (candidate.id) candidateIds.add(candidate.id);
    results.push({ id: candidate.id || "(missing)", status: candidate.status || "(missing)", ...result.score });
    for (const failure of result.failures) {
      failures.push(`${candidate.id || "(missing)"}: ${failure}`);
    }
  }

  for (const result of results) {
    const label = result.passed ? "PASS" : result.status === "watchlist" || result.status === "rejected" ? "HELD" : "FAIL";
    console.log(`${label} ${result.id} status=${result.status} score=${result.total}`);
  }

  if (failures.length) {
    console.error("Source intake gate failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Source intake gate passed for ${results.length} candidate source${results.length === 1 ? "" : "s"}.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
