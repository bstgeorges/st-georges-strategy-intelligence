import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HORIZON_DIR = path.join(ROOT, "dashboard", "regulatory-horizon");

function option(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] || fallback : fallback;
}

const edition = option("--edition", new Date().toISOString().slice(0, 10));
const reason = option(
  "--reason",
  "The current scan is held while source coverage, classification and materiality are reviewed. No new regulatory signals or deadlines are being presented as reviewed intelligence.",
);

if (!/^\d{4}-\d{2}-\d{2}$/.test(edition)) throw new Error("--edition must use YYYY-MM-DD.");

const currentPath = path.join(HORIZON_DIR, "latest.json");
const current = JSON.parse(fs.readFileSync(currentPath, "utf8"));
const lastReviewedEdition = current.status === "published" ? current.edition : current.lastReviewedEdition;
if (!/^\d{4}-\d{2}-\d{2}$/.test(lastReviewedEdition || "")) {
  throw new Error("A withheld edition needs a valid last reviewed edition.");
}

const held = {
  edition,
  generatedAt: `${edition} 00:00 UTC`,
  windowDays: 7,
  status: "withheld",
  lastReviewedEdition,
  kpis: {
    material: 0,
    themes: 0,
    sources: 0,
    jurisdictions: 0,
    coverage: `0 of ${current.coverage?.configuredPrimaryAuthorities || 34}`,
  },
  coverage: {
    ...(current.coverage || {}),
    reviewedAuthorities: 0,
    publishedAuthorities: 0,
    publishedJurisdictions: 0,
    state: "limited",
  },
  bottomLine: "No new Reg Horizon edition is published this week. The latest scan is held for editorial review; use the last reviewed edition for current decision and deadline context.",
  horizon: [],
  signals: [],
  warnings: [{ type: "publication", severity: "high", message: reason }],
  reviewQueue: [],
  heldLowConfidence: 0,
  runMetrics: current.runMetrics || {},
  rollingCoverage: current.rollingCoverage || {},
  editorialReview: {
    edition,
    reviewStatus: "withheld",
    reviewedAt: edition,
    editor: "St Georges Strategy editorial review",
    reason,
  },
};

const emptyFeed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>St Georges Strategy - Regulatory Horizon ${edition}</title>\n    <link>https://stgeorgesstrategy.com/regulatory-horizon</link>\n    <lastBuildDate>${edition} 00:00 UTC</lastBuildDate>\n    <description>No new reviewed regulatory signals are published for this edition.</description>\n  </channel>\n</rss>\n`;
const emptyCalendar = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//St Georges Strategy//Reg Horizon//EN\nCALSCALE:GREGORIAN\nEND:VCALENDAR\n`;
const archiveDir = path.join(HORIZON_DIR, "archive");

fs.mkdirSync(archiveDir, { recursive: true });
fs.writeFileSync(currentPath, `${JSON.stringify(held, null, 2)}\n`);
fs.writeFileSync(path.join(HORIZON_DIR, "feed.xml"), emptyFeed);
fs.writeFileSync(path.join(HORIZON_DIR, "horizon.ics"), emptyCalendar);
fs.writeFileSync(path.join(archiveDir, `${edition}.json`), `${JSON.stringify(held, null, 2)}\n`);

console.log(`Withheld Reg Horizon edition ${edition}; last reviewed edition is ${lastReviewedEdition}.`);
