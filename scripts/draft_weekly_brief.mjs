import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SIGNALS_PATH = path.join(ROOT, "site", "data", "signals.json");
const SUMMARY_PATH = path.join(ROOT, "dashboard", "data", "signals-promotion-summary.json");
const BRIEF_PATH = path.join(ROOT, "site", "brief", "index.html");

// Fixed editorial priority used as a tie-break when several topics have the same
// freshness this week, and as the fallback order if the promotion summary is missing.
const PRIORITY_ORDER = [
  "ai",
  "cyber",
  "financial-crime",
  "resilience",
  "market-structure",
  "third-party",
  "technology-failure",
  "data",
];

const TOPIC_META = {
  ai: "AI governance",
  cyber: "Cyber",
  "financial-crime": "Financial crime",
  resilience: "Resilience",
  "market-structure": "Market structure",
  "third-party": "Third-party",
  "technology-failure": "Technology failure",
  data: "Data",
};

function parseArgs(argv) {
  const options = { date: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--date") options.date = argv[++index] || "";
    else if (arg.startsWith("--date=")) options.date = arg.slice("--date=".length);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!options.date) options.date = new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("Pass the draft date as --date YYYY-MM-DD.");
  }
  return options;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function mondayOf(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const weekday = date.getUTCDay() || 7; // Sunday -> 7
  date.setUTCDate(date.getUTCDate() - (weekday - 1));
  return date;
}

function formatDisplayDate(date) {
  return `${date.getUTCDate()} ${date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" })} ${date.getUTCFullYear()}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// AI is always the lead item — it's the flagship theme for the product and shouldn't be
// bumped by an off-topic feed having an unusually "fresh" week. The remaining four slots
// are ranked by freshness (tie-broken by editorial priority), so an untrustworthy topic
// with several fresh-but-questionable candidates can crowd out other topics but can never
// become the whole issue's lead story on its own.
function rankTopics(signalsData, summary) {
  const freshById = new Map((summary?.topics || []).map((topic) => [topic.id, topic.freshCount || 0]));
  const byId = new Map(signalsData.topics.map((topic) => [topic.id, topic]));

  const anchor = byId.has("ai") ? ["ai"] : [];
  const rest = PRIORITY_ORDER.filter((id) => byId.has(id) && id !== "ai").sort(
    (a, b) => (freshById.get(b) || 0) - (freshById.get(a) || 0),
  );

  return [...anchor, ...rest]
    .slice(0, 5)
    .map((id) => ({ id, topic: byId.get(id), freshCount: freshById.get(id) || 0 }));
}

function buildTopFiveList(ranked) {
  return ranked
    .map(({ id, topic }, index) => {
      const lead = topic.top5?.[0];
      if (!lead) return "";
      const rank = String(index + 1).padStart(2, "0");
      const label = TOPIC_META[id] || id;
      return `          <li><span class="rank">${rank}</span><a href="../signals/${id}/index.html"><h3>${escapeHtml(lead.title)}</h3></a><span class="meta">${escapeHtml(label)}</span></li>`;
    })
    .filter(Boolean)
    .join("\n");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const signalsData = readJson(SIGNALS_PATH);
  const summary = fs.existsSync(SUMMARY_PATH) ? readJson(SUMMARY_PATH) : null;
  let html = fs.readFileSync(BRIEF_PATH, "utf8");

  const ranked = rankTopics(signalsData, summary);
  if (ranked.length < 5) {
    throw new Error(`Only found ${ranked.length} ranked topics; expected 5. Check site/data/signals.json.`);
  }

  const monday = mondayOf(options.date);
  const displayDate = formatDisplayDate(monday);
  const leadTopic = ranked[0];
  const leadTitle = leadTopic.topic.top5[0].title;

  html = html.replace(/"datePublished": "\d{4}-\d{2}-\d{2}"/, `"datePublished": "${options.date}"`);
  html = html.replace(/"dateModified": "\d{4}-\d{2}-\d{2}"/, `"dateModified": "${options.date}"`);

  html = html.replace(
    /<p class="eyebrow">Weekly brief \/ Week of [^<]+<\/p>/,
    `<p class="eyebrow">Weekly brief / Week of ${displayDate}</p>`,
  );

  html = html.replace(
    /(<section class="masthead">\s*<p class="eyebrow">[^<]+<\/p>\s*)<h1>[^<]*<\/h1>\s*<p class="dek">[^<]*<\/p>/,
    `$1<h1>This week's leading signal: ${escapeHtml(leadTitle)}</h1>\n        <p class="dek">Auto-drafted from this week's promoted Signals candidates — review before publishing. See the Top 5 below and the full topic pages for source trails.</p>`,
  );

  html = html.replace(
    /(<div class="so-what">\s*<p>)[^<]*(<\/p>)/,
    `$1So what: this week's leading signal is "${escapeHtml(leadTitle)}" (${escapeHtml(TOPIC_META[leadTopic.id] || leadTopic.id)}). This so-what is auto-drafted and needs an editorial pass before publishing.$2`,
  );

  const newList = buildTopFiveList(ranked);
  html = html.replace(
    /<ol class="brief-index">[\s\S]*?<\/ol>/,
    `<ol class="brief-index">\n${newList}\n        </ol>`,
  );

  if (!html.includes("<!-- auto-drafted:weekly-refresh -->")) {
    html = html.replace(
      "<!-- publisher-lock:start:brief-editorial -->",
      "<!-- publisher-lock:start:brief-editorial -->\n      <!-- auto-drafted:weekly-refresh — masthead, so-what, and Top 5 were regenerated automatically; Executive pulse, Regulator watch, and Control lessons below still need a human editorial pass. -->",
    );
  }

  fs.writeFileSync(BRIEF_PATH, html);
  console.log(`Drafted ${path.relative(ROOT, BRIEF_PATH)} for week of ${displayDate}.`);
  console.log("Top 5 this week:");
  for (const { id, topic, freshCount } of ranked) {
    console.log(`- ${id} (${freshCount} fresh): ${topic.top5[0].title}`);
  }
  console.log(
    "\nReminder: Executive pulse, Regulator watch, and Control lessons sections were left untouched and still need a human pass.",
  );
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
