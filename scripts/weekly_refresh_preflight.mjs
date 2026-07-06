import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const options = { date: "" };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--date") {
      options.date = argv[++index] || "";
    } else if (arg.startsWith("--date=")) {
      options.date = arg.slice("--date=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("Pass the live edition date as --date YYYY-MM-DD.");
  }

  return options;
}

function formatDisplayDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return `${date.getUTCDate()} ${date.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  })} ${date.getUTCFullYear()}`;
}

function readRelative(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function readJsonRelative(relativePath) {
  return JSON.parse(readRelative(relativePath));
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function countSectionCards(html, listId) {
  const pattern = new RegExp(`<div class="grid" id="${listId}">([\\s\\S]*?)<\\/section>`, "i");
  const match = html.match(pattern);
  if (!match) return 0;
  return countMatches(match[1], /<article class="card">/g);
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const displayDate = formatDisplayDate(options.date);
  const intelligence = readRelative("dashboard/index.html");
  const aiSignals = readRelative("dashboard/ai-signals/index.html");
  const aiSignalsData = readJsonRelative("dashboard/data/ai-signals.json");
  const failures = [];
  const aiSections = Array.isArray(aiSignalsData.sections) ? aiSignalsData.sections : [];
  const aiSectionCounts = Object.fromEntries(
    aiSections.map((section) => [section.id, Array.isArray(section.cards) ? section.cards.length : 0]),
  );
  const aiCards = aiSections.flatMap((section) => (Array.isArray(section.cards) ? section.cards : []));

  assert(
    new RegExp(`<p class="edition-line">Live edition · ${displayDate} · Vol\\. [IVXLCDM]+<\\/p>`).test(intelligence),
    `Intelligence edition line must use: Live edition · ${displayDate} · Vol. N`,
    failures,
  );
  assert(
    aiSignalsData.edition && aiSignalsData.edition.line === `Live edition / Updated ${displayDate}`,
    `dashboard/data/ai-signals.json edition line must use: Live edition / Updated ${displayDate}`,
    failures,
  );
  assert(
    aiSignalsData.generatedAt === options.date,
    `dashboard/data/ai-signals.json generatedAt must use: ${options.date}`,
    failures,
  );
  assert(
    aiSignals.includes('data-ai-signals-url="../data/ai-signals.json"') && aiSignals.includes('<script src="app.js"></script>'),
    "AI Signals page should render from dashboard/data/ai-signals.json via dashboard/ai-signals/app.js.",
    failures,
  );
  assert(
    intelligence.includes("https://stgeorgesstrategy.com/ai-signals/") &&
      aiSignals.includes("https://stgeorgesstrategy.com/intelligence/archive/"),
    "Primary navigation should include AI Signals before Archive.",
    failures,
  );
  assert(
    aiSectionCounts.model === 5,
    "AI Signals JSON should contain exactly 5 model cards.",
    failures,
  );
  assert(
    aiSectionCounts.feature === 5,
    "AI Signals JSON should contain exactly 5 feature cards.",
    failures,
  );
  assert(
    aiSectionCounts.industry === 5,
    "AI Signals JSON should contain exactly 5 industry cards.",
    failures,
  );
  assert(
    aiCards.length === 15 && aiCards.every((card) => card.source && /^https:\/\//.test(card.source.url || "")),
    "Every AI Signals JSON card should include an https source URL.",
    failures,
  );
  assert(
    !/\{\{[^}]+\}\}|<x-dc\b/i.test(intelligence + aiSignals),
    "Live pages must not contain raw template bindings.",
    failures,
  );

  if (failures.length) {
    console.error("Weekly refresh preflight failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Weekly refresh preflight passed for ${displayDate}.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
