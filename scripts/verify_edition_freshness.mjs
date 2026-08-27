import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// This is a deploy-freshness check. It fetches the raw public HTML — exactly what a
// crawler or link-preview bot sees — and checks the current edition label emitted by
// the static publisher. Run it right after a deploy; it is intentionally a live-
// network check, not part of the local build.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT = path.join(ROOT, "site-dist");
const DEFAULT_ORIGIN = "https://stgeorgesstrategy.com";

const CHECKS = [
  { route: "/", label: "homepage", editionPrefix: "Latest edition / " },
  { route: "/brief/", label: "weekly brief", editionPrefix: "Weekly brief / " },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

function formatEditionDate(edition) {
  const match = String(edition).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) throw new Error(`Invalid edition date ${edition}.`);
  const [, year, month, day] = match;
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

function extractEditionLabel(html, prefix) {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`${escapedPrefix}[^<]+`));
  return match ? match[0].trim() : null;
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
  const editionDate = formatEditionDate(edition);
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
    const expected = `${check.editionPrefix}${editionDate}`;
    const actual = extractEditionLabel(html, check.editionPrefix);
    if (!actual) {
      failures.push(`${check.label} (${url}) has no current-edition label in its raw HTML.`);
      continue;
    }
    if (actual !== expected) {
      failures.push(
        `${check.label} (${url}) raw HTML shows "${actual}" but expected "${expected}". The live deploy may be stale.`,
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

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
