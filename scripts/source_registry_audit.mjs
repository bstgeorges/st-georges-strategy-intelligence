import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = path.join(ROOT, "dashboard/data/source-registry.json");

const allowedTiers = new Set(["primary", "specialist", "press"]);
const requiredCategories = [
  "regulation",
  "prudential",
  "financial-stability",
  "markets",
  "cyber",
  "ai",
  "ai-infrastructure",
];

function fail(message, failures) {
  failures.push(message);
}

function main() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  const failures = [];
  const ids = new Set();
  const categoryCounts = new Map();
  let primaryCount = 0;

  if (!Array.isArray(registry.sources)) {
    throw new Error("source-registry.json must contain a sources array.");
  }

  for (const source of registry.sources) {
    if (!source.id || ids.has(source.id)) fail(`Duplicate or missing source id: ${source.id || "(missing)"}`, failures);
    ids.add(source.id);

    if (!source.name) fail(`${source.id} is missing name.`, failures);
    if (!allowedTiers.has(source.tier)) fail(`${source.id} has invalid tier: ${source.tier}`, failures);
    if (!source.category) fail(`${source.id} is missing category.`, failures);
    if (!/^https:\/\//.test(source.url || "")) fail(`${source.id} must use an https URL.`, failures);
    if (!Array.isArray(source.jurisdictions) || source.jurisdictions.length === 0) {
      fail(`${source.id} must include at least one jurisdiction.`, failures);
    }
    if (!Array.isArray(source.useFor) || source.useFor.length === 0) {
      fail(`${source.id} must include useFor tags.`, failures);
    }
    if (!Array.isArray(source.signalQuestions) || source.signalQuestions.length < 2) {
      fail(`${source.id} must include at least two signal questions.`, failures);
    }

    if (source.tier === "primary") primaryCount += 1;
    categoryCounts.set(source.category, (categoryCounts.get(source.category) || 0) + 1);
  }

  for (const category of requiredCategories) {
    if (!categoryCounts.has(category)) fail(`Missing required source category: ${category}`, failures);
  }

  if (registry.sources.length < 20) fail("Registry should contain at least 20 sources.", failures);
  if (primaryCount < 15) fail("Registry should contain at least 15 primary sources.", failures);

  if (failures.length) {
    console.error("Source registry audit failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(
    `Source registry audit passed: ${registry.sources.length} sources, ${primaryCount} primary sources, ` +
      `${categoryCounts.size} categories.`,
  );
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
