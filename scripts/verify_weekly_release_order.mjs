import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EDITION_PATH = path.join(ROOT, "site/data/current-edition.json");
const SIGNALS_PATH = path.join(ROOT, "site/data/signals.json");
const CANDIDATES_PATH = path.join(ROOT, "dashboard/data/signals-candidates.generated.json");
const SHORTLIST_PATH = path.join(ROOT, "dashboard/data/signals-promotion-shortlist.json");
const ARCHIVE_DIR = path.join(ROOT, "dashboard/signals-archive/brief");

function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }

function parseArgs(argv) {
  const options = { asOf: new Date().toISOString().slice(0, 10) };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--as-of") options.asOf = argv[++index] || "";
    else if (arg.startsWith("--as-of=")) options.asOf = arg.slice("--as-of=".length);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.asOf)) throw new Error("--as-of must use YYYY-MM-DD.");
  return options;
}

function ageDays(older, newer) {
  return Math.floor((Date.parse(`${newer}T00:00:00Z`) - Date.parse(`${older}T00:00:00Z`)) / 86400000);
}

function normalise(value) { return String(value || "").replace(/\s+/g, " ").trim().toLowerCase(); }

function main() {
  const options = parseArgs(process.argv.slice(2));
  const edition = readJson(EDITION_PATH);
  const signals = readJson(SIGNALS_PATH);
  const candidates = fs.existsSync(CANDIDATES_PATH) ? readJson(CANDIDATES_PATH) : null;
  const shortlist = fs.existsSync(SHORTLIST_PATH) ? readJson(SHORTLIST_PATH) : null;
  const failures = [];
  const publicationDate = edition.publicationDate;

  // This gate is invoked for every protected-site deployment, not just the Sunday
  // editorial release. A correct, reviewed edition remains publishable for the
  // seven-day cycle so a reliability or presentation fix cannot be stranded until
  // the next edition. The cross-product checks below still prevent a stale or
  // mismatched weekly package from being released.
  if (!publicationDate || ageDays(publicationDate, options.asOf) > 8 || ageDays(publicationDate, options.asOf) < 0) failures.push(`Publication date ${publicationDate || "<missing>"} is outside the eight-day reviewed release window ending ${options.asOf}`);
  if (publicationDate !== signals.edition) failures.push(`Signals edition ${signals.edition || "<missing>"} does not match current edition ${publicationDate || "<missing>"}`);
  if (!String(signals.generatedAt || "").startsWith(`${publicationDate}T`)) failures.push(`Signals generatedAt ${signals.generatedAt || "<missing>"} does not belong to publication date ${publicationDate}`);

  const topicsById = new Map((signals.topics || []).map((topic) => [topic.id, topic]));
  for (const signal of edition.topSignals || []) {
    const lead = topicsById.get(signal.topic)?.top5?.[0];
    if (!lead) failures.push(`Current edition top signal topic ${signal.topic} is missing from Signals`);
    else if (normalise(lead.title) !== normalise(signal.title)) failures.push(`Current edition top signal for ${signal.topic} does not match the Signals lead`);
  }
  if (new Set((edition.topSignals || []).map((signal) => signal.topic)).size !== 5) failures.push("Current edition must contain five distinct Signals topics");
  if (new Set((edition.topSignals || []).map((signal) => normalise(signal.title))).size !== (edition.topSignals || []).length) failures.push("Current edition Top 5 must contain five distinct signal titles");

  if (candidates?.generatedAt) {
    if (!shortlist || shortlist.reviewStatus !== "approved") failures.push("A newer Signals candidate run exists without an approved editorial shortlist");
    else if (shortlist.candidateGeneratedAt !== candidates.generatedAt) {
      const editionLocked = shortlist.publicationDate === publicationDate && shortlist.reviewedAt === publicationDate;
      if (!editionLocked) failures.push("The approved Signals shortlist does not match the newest candidate run");
      else console.warn(`Signals candidate run ${candidates.generatedAt} is newer than the approved ${publicationDate} shortlist; retaining the locked reviewed snapshot for this release.`);
    }
  }

  if (fs.existsSync(ARCHIVE_DIR)) {
    const priorDate = fs.readdirSync(ARCHIVE_DIR)
      .filter((entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry) && entry < publicationDate)
      .sort()
      .pop();
    const priorFile = priorDate && path.join(ARCHIVE_DIR, priorDate, "index.html");
    if (priorFile && fs.existsSync(priorFile)) {
      const prior = normalise(fs.readFileSync(priorFile, "utf8"));
      if (normalise(edition.title) && prior.includes(normalise(edition.title))) failures.push(`Current brief title is unchanged from prior archived edition ${priorDate}`);
      const judgementRepeats = Object.values(edition.judgement || {}).some((paragraph) => String(paragraph).split(/\s+/).length >= 15 && prior.includes(normalise(paragraph)));
      if (judgementRepeats) failures.push(`Current judgement repeats a paragraph from prior archived edition ${priorDate}`);
    }
  }

  if (failures.length) {
    console.error("Weekly release order check failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(`Weekly release order passed: Signals ${signals.edition}, publication ${publicationDate}.`);
}

try { main(); } catch (error) { console.error(error.message); process.exit(1); }
