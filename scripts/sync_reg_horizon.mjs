import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REG_SCAN_DOCS = path.join(ROOT, "tools", "reg-scan", "docs");
const EDITORIAL_REVIEW = path.join(ROOT, "dashboard", "data", "regulatory-horizon-editorial.json");
const TARGETS = [
  {
    path: path.join(ROOT, "dashboard", "regulatory-horizon"),
    files: ["latest.json", "feed.xml", "horizon.ics", "index.html"],
    copyArchive: true,
  },
  {
    path: path.join(ROOT, "mockup", "full-site", "regulatory-horizon"),
    files: ["latest.json", "feed.xml", "horizon.ics"],
    copyArchive: true,
  },
];

const REQUIRED = ["latest.json", "feed.xml", "horizon.ics", "index.html"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function copySelected(source, target, files, copyArchive) {
  fs.mkdirSync(target, { recursive: true });
  for (const file of files) {
    fs.copyFileSync(path.join(source, file), path.join(target, file));
  }
  if (copyArchive) {
    const archiveSource = path.join(source, "archive");
    const archiveTarget = path.join(target, "archive");
    if (fs.existsSync(archiveSource)) fs.cpSync(archiveSource, archiveTarget, { recursive: true });
  }
}

function listHtml(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listHtml(full));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function normaliseArchiveLinks(target) {
  const archiveDir = path.join(target, "archive");
  for (const file of listHtml(archiveDir)) {
    let html = fs.readFileSync(file, "utf8");
    html = html
      .replace(/href="feed\.xml"/g, 'href="../feed.xml"')
      .replace(/href="horizon\.ics"/g, 'href="../horizon.ics"')
      .replace(/href="latest\.json"/g, 'href="../latest.json"')
      .replace(/href="archive\/([^"]+)"/g, 'href="$1"');
    fs.writeFileSync(file, html);
  }
}

function verifyTarget(target, files) {
  for (const file of files) {
    assert(fs.existsSync(path.join(target, file)), `${path.relative(ROOT, target)} missing ${file}`);
  }
  const latest = JSON.parse(fs.readFileSync(path.join(target, "latest.json"), "utf8"));
  assert(Array.isArray(latest.signals), `${path.relative(ROOT, target)} latest.json missing signals[]`);
  assert(latest.signals.length <= 15, `${path.relative(ROOT, target)} latest.json has more than 15 signals`);
  assert(Array.isArray(latest.warnings), `${path.relative(ROOT, target)} latest.json missing warnings[]`);
  assert(
    latest.signals.every((signal) => signal.sourceStatus),
    `${path.relative(ROOT, target)} latest.json signals missing sourceStatus`,
  );
}

function applyEditorialReview(target) {
  if (!fs.existsSync(EDITORIAL_REVIEW)) return;
  const review = JSON.parse(fs.readFileSync(EDITORIAL_REVIEW, "utf8"));
  const latestPath = path.join(target, "latest.json");
  const latest = JSON.parse(fs.readFileSync(latestPath, "utf8"));
  if (review.edition !== latest.edition || review.reviewStatus !== "approved") return;

  const byUrl = new Map((latest.signals || []).map((signal) => [signal.url, signal]));
  const selected = [];
  for (const selection of review.shortlist || []) {
    const signal = byUrl.get(selection.url);
    if (!signal) throw new Error(`Editorial shortlist URL is not present in scan output: ${selection.url}`);
    selected.push({
      ...signal,
      lane: selection.lane,
      cluster: selection.cluster,
      editorial: {
        ...(signal.editorial || {}),
        change: signal.editorial?.change || signal.why || `The source published a ${signal.type || "regulatory"} item on ${signal.date}.`,
        implication: selection.whyItMatters,
        affected: selection.affected,
        owner: signal.editorial?.owner || `Accountable owner for ${selection.affected} applicability and governance review.`,
        action: selection.action,
        evidence: selection.evidence,
      },
    });
  }
  latest.signals = selected;
  latest.horizon = (latest.horizon || []).filter((entry) => selected.some((signal) => signal.url === entry.url));
  latest.kpis = {
    ...latest.kpis,
    material: selected.length,
    themes: new Set(selected.flatMap((signal) => signal.riskAreas || [])).size,
    sources: new Set(selected.map((signal) => signal.source).filter(Boolean)).size,
  };
  latest.editorialReview = { ...review, excludedCount: (review.exclusions || []).length };
  fs.writeFileSync(latestPath, `${JSON.stringify(latest, null, 2)}\n`);

  const allowedUrls = new Set(selected.map((signal) => signal.url));
  const feedPath = path.join(target, "feed.xml");
  if (fs.existsSync(feedPath)) {
    const feed = fs.readFileSync(feedPath, "utf8").replace(/\s*<item>[\s\S]*?<\/item>/g, (item) => {
      const url = item.match(/<link>([^<]+)<\/link>/)?.[1];
      return url && allowedUrls.has(url) ? `\n${item.trim()}` : "";
    });
    fs.writeFileSync(feedPath, `${feed.trim()}\n`);
  }
}

function main() {
  assert(fs.existsSync(REG_SCAN_DOCS), "tools/reg-scan/docs does not exist. Run npm run reg-scan:run first.");
  for (const file of REQUIRED) {
    assert(fs.existsSync(path.join(REG_SCAN_DOCS, file)), `tools/reg-scan/docs missing ${file}`);
  }

  for (const target of TARGETS) {
    copySelected(REG_SCAN_DOCS, target.path, target.files, target.copyArchive);
    normaliseArchiveLinks(target.path);
    applyEditorialReview(target.path);
    verifyTarget(target.path, target.files);
    console.log(`synced ${path.relative(ROOT, REG_SCAN_DOCS)} -> ${path.relative(ROOT, target.path)}`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
