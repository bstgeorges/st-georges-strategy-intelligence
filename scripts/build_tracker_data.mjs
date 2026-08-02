// Builds the cumulative deadline dataset for the /tracker/ page.
//
// The weekly Reg Horizon publishes a per-edition snapshot: deadlines surfaced in
// earlier editions silently drop off the page once a newer edition replaces
// latest.json, even though the regulatory date is still open. This script sweeps
// every reviewed edition (current + JSON archives) and merges their horizon rows
// and deadline-bearing signals into one deduplicated, forward-looking dataset,
// so a deadline stays tracked from the edition that first spotted it until the
// date has passed (plus a grace window for post-deadline evidence capture).
//
// Output: site/tracker/deadlines.json (committed, matching the repo's pattern of
// committed generated data). Run via `npm run tracker:data`; chained into
// `site:build` so the published bundle can never ship a stale tracker dataset.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "site", "tracker", "deadlines.json");

// Days a passed deadline stays visible so the evidence/decision trail can be
// completed after the date closes.
const GRACE_DAYS = 30;

const SOURCES = [
  // Oldest committed edition still lives at the site path.
  path.join(ROOT, "site", "regulatory-horizon", "latest.json"),
  path.join(ROOT, "dashboard", "regulatory-horizon", "latest.json"),
];

const archiveDir = path.join(ROOT, "dashboard", "regulatory-horizon", "archive");
if (fs.existsSync(archiveDir)) {
  for (const name of fs.readdirSync(archiveDir).sort()) {
    if (/^\d{4}-\d{2}-\d{2}\.json$/.test(name)) SOURCES.push(path.join(archiveDir, name));
  }
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function normaliseUrl(url) {
  if (!url) return "";
  return url.trim().replace(/\/+$/, "").toLowerCase();
}

function itemKey(url, date) {
  return `${normaliseUrl(url)}|${date}`;
}

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(fromIso, toIso) {
  return Math.round((new Date(toIso) - new Date(fromIso)) / 86400000);
}

// Merge one edition's horizon rows + deadline-bearing signals into the map.
function ingestEdition(map, data, sourceFile) {
  const edition = data.edition;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(edition || "")) return null;

  const signals = Array.isArray(data.signals) ? data.signals : [];
  const horizon = Array.isArray(data.horizon) ? data.horizon : [];

  // Index signals by normalised URL so horizon rows can inherit theme/type.
  const signalByUrl = new Map();
  for (const signal of signals) {
    if (signal.url) signalByUrl.set(normaliseUrl(signal.url), signal);
  }

  const upsert = (entry) => {
    if (!entry.date || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) return;
    const key = itemKey(entry.url, entry.date);
    const existing = map.get(key);
    if (existing) {
      // Later editions win on wording; themes are unioned; first sighting kept.
      if (edition >= existing.lastSeen) {
        existing.lastSeen = edition;
        existing.title = entry.title || existing.title;
        existing.source = entry.source || existing.source;
        existing.stage = entry.stage || existing.stage;
        existing.type = entry.type || existing.type;
        if (entry.prompts) existing.prompts = entry.prompts;
      }
      if (edition < existing.firstSeen) existing.firstSeen = edition;
      for (const theme of entry.riskAreas || []) {
        if (!existing.riskAreas.includes(theme)) existing.riskAreas.push(theme);
      }
      return;
    }
    map.set(key, {
      id: key.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120),
      date: entry.date,
      title: (entry.title || "").trim(),
      url: entry.url || "",
      source: entry.source || "",
      stage: entry.stage || "",
      type: entry.type || "",
      riskAreas: [...(entry.riskAreas || [])],
      prompts: entry.prompts || null,
      firstSeen: edition,
      lastSeen: edition,
    });
  };

  for (const row of horizon) {
    const signal = signalByUrl.get(normaliseUrl(row.url));
    upsert({
      date: row.date,
      title: row.title,
      url: row.url,
      source: row.source,
      stage: row.stage || "",
      type: signal ? signal.type : "",
      riskAreas: signal ? signal.riskAreas || [] : [],
      prompts: row.prompts || null,
    });
  }

  for (const signal of signals) {
    if (!signal.deadline) continue;
    upsert({
      date: signal.deadline,
      title: signal.title,
      url: signal.url,
      source: signal.source,
      stage: "",
      type: signal.type || "",
      riskAreas: signal.riskAreas || [],
      prompts: null,
    });
  }

  return { edition, sourceFile: path.relative(ROOT, sourceFile), horizon: horizon.length, signals: signals.length };
}

function main() {
  const map = new Map();
  const editions = [];
  const seenEditions = new Set();

  for (const file of SOURCES) {
    if (!fs.existsSync(file)) continue;
    let data;
    try {
      data = readJson(file);
    } catch (error) {
      console.warn(`tracker:data — skipping unreadable ${file}: ${error.message}`);
      continue;
    }
    if (seenEditions.has(data.edition)) continue;
    const summary = ingestEdition(map, data, file);
    if (summary) {
      editions.push(summary);
      seenEditions.add(data.edition);
    }
  }

  const today = isoToday();
  const items = [...map.values()]
    .filter((item) => daysBetween(item.date, today) <= GRACE_DAYS)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.title.localeCompare(b.title)));

  editions.sort((a, b) => (a.edition < b.edition ? -1 : 1));

  const payload = {
    generatedAt: `${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`,
    graceDays: GRACE_DAYS,
    editions,
    counts: {
      open: items.filter((item) => item.date >= today).length,
      closedInGrace: items.filter((item) => item.date < today).length,
    },
    items,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `tracker:data — ${items.length} deadline(s) (${payload.counts.open} open, ${payload.counts.closedInGrace} in grace window) from ${editions.length} edition(s) → ${path.relative(ROOT, OUT)}`,
  );
}

main();
