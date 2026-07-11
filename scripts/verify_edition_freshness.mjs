import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// §0 of the 10 Jul 2026 fix spec: "Add a post-publish check that diffs the edition
// date in the raw HTML against the rendered page (a curl + grep for the 'Week of'
// string is enough)." The root cause that prompted this (a stale prerendered HTML
// snapshot served to crawlers while browsers saw a newer client-rendered page) has
// been removed — the site is fully static HTML now, and the Cloudflare Worker/
// _headers cache-bypass fix stops the edge from serving a stale deploy. What's left,
// and what this script actually guards against going forward, is a *deploy* going
// stale: it fetches the raw HTML straight off the public origin (no browser, no JS —
// exactly what a crawler or link-preview bot would see) and confirms its "Week of"
// dateline matches the edition this build just produced. Run this right after a
// deploy; it is intentionally a live-network check, not part of the local build.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT = path.join(ROOT, "site-dist");
const DEFAULT_ORIGIN = "https://stgeorgesstrategy.com";

const CHECKS = [
  { route: "/", label: "homepage" },
  { route: "/brief/", label: "weekly brief" },
];

function parseArgs(argv) {
  const options = { out: DEFAULT_OUT, origin: DEFAULT_ORIGIN };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") options.out = path.resolve(argv[++index] || "");
    else if (arg === "--origin") options.origin = argv[++index] || DEFAULT_ORIGIN;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function expectedEdition(out) {
  const reportFile = path.join(out, "publish-report.json");
  if (!fs.existsSync(reportFile)) {
    throw new Error(`No publish-report.json at ${reportFile}. Run npm run site:build first.`);
  }
  const report = JSON.parse(fs.readFileSync(reportFile, "utf8"));
  if (!report.edition) throw new Error("publish-report.json has no edition field.");
  return report.edition;
}

function extractWeekOf(html) {
  const match = html.match(/Week of (\d{1,2}) ([A-Za-z]{3}) (\d{4})/);
  return match ? match[0] : null;
}

async function fetchRawHtml(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "ProjectVirtualOfficerEditionFreshnessCheck/1.0 (+https://stgeorgesstrategy.com/)" },
  });
  if (!response.ok) throw new Error(`${url} responded ${response.status}`);
  return response.text();
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const edition = expectedEdition(options.out);
  const failures = [];

  for (const check of CHECKS) {
    const url = `${options.origin}${check.route}`;
    let html;
    try {
      html = await fetchRawHtml(url);
    } catch (error) {
      failures.push(`${check.label} (${url}) could not be fetched: ${error.message}`);
      continue;
    }
    const weekOf = extractWeekOf(html);
    if (!weekOf) {
      failures.push(`${check.label} (${url}) has no "Week of" dateline in its raw HTML.`);
      continue;
    }
    if (!matchesEdition(weekOf, edition)) {
      failures.push(
        `${check.label} (${url}) raw HTML shows "${weekOf}" but this build's edition is ${edition}. The live deploy may be stale.`,
      );
    }
  }

  if (failures.length) {
    console.error("Edition freshness check failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Edition freshness check passed: live raw HTML matches edition ${edition}.`);
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function matchesEdition(weekOfText, edition) {
  const match = weekOfText.match(/Week of (\d{1,2}) ([A-Za-z]{3}) (\d{4})/);
  if (!match) return false;
  const [, day, monthAbbr, year] = match;
  const month = MONTHS.indexOf(monthAbbr.toLowerCase()) + 1;
  if (!month) return false;
  const iso = `${year}-${String(month).padStart(2, "0")}-${day.padStart(2, "0")}`;
  return iso === edition;
}

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
