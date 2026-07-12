import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT = path.join(ROOT, "site-dist");
const DEFAULT_ORIGINS = [
  "https://st-georges-strategy-intelligence.pages.dev",
  "https://main.st-georges-strategy-intelligence.pages.dev",
  "https://stgeorgesstrategy.com",
];

function parseArgs(argv) {
  const options = { out: DEFAULT_OUT, origins: [], attempts: 12, delayMs: 5000 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") options.out = path.resolve(argv[++index] || "");
    else if (arg === "--origin") options.origins.push((argv[++index] || "").replace(/\/$/, ""));
    else if (arg === "--attempts") options.attempts = Number(argv[++index]);
    else if (arg === "--delay-ms") options.delayMs = Number(argv[++index]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!options.origins.length) options.origins = DEFAULT_ORIGINS;
  if (!Number.isInteger(options.attempts) || options.attempts < 1) throw new Error("--attempts must be a positive integer.");
  if (!Number.isFinite(options.delayMs) || options.delayMs < 0) throw new Error("--delay-ms must be zero or greater.");
  return options;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cacheBustedUrl(origin, route, release) {
  const url = new URL(route, `${origin}/`);
  url.searchParams.set("__sgs_release", release);
  return url;
}

async function fetchBytes(url) {
  const response = await fetch(url, {
    redirect: "follow",
    cache: "no-store",
    headers: {
      "cache-control": "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      "user-agent": "StGeorgesStrategyReleaseVerifier/1.0",
    },
  });
  const bytes = Buffer.from(await response.arrayBuffer());
  return { response, bytes };
}

async function checkOrigin(origin, report, releaseMetadata) {
  const failures = [];
  const releaseUrl = cacheBustedUrl(origin, "/data/release.json", report.release);
  try {
    const { response, bytes } = await fetchBytes(releaseUrl);
    if (!response.ok) failures.push(`${releaseUrl} returned ${response.status}`);
    else {
      const live = JSON.parse(bytes.toString("utf8"));
      if (live.release !== report.release) {
        failures.push(`${origin} reports release ${live.release || "<missing>"}; expected ${report.release}`);
      }
    }
  } catch (error) {
    failures.push(`${releaseUrl} could not be read: ${error.message}`);
  }

  for (const route of report.routes) {
    const url = cacheBustedUrl(origin, route, report.release);
    try {
      const { response, bytes } = await fetchBytes(url);
      const html = bytes.toString("utf8");
      if (!response.ok) failures.push(`${url} returned ${response.status}`);
      else if (!html.includes(`<meta name="x-sgs-release" content="${report.release}">`)) {
        failures.push(`${url} is not release ${report.release}`);
      }
    } catch (error) {
      failures.push(`${url} could not be read: ${error.message}`);
    }
  }

  for (const [route, expectedHash] of Object.entries(releaseMetadata.files || {})) {
    const url = cacheBustedUrl(origin, route, report.release);
    try {
      const { response, bytes } = await fetchBytes(url);
      if (!response.ok) failures.push(`${url} returned ${response.status}`);
      else {
        const liveHash = sha256(bytes);
        if (liveHash !== expectedHash) failures.push(`${url} hash ${liveHash} does not match ${expectedHash}`);
      }
    } catch (error) {
      failures.push(`${url} could not be read: ${error.message}`);
    }
  }

  return failures;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const report = readJson(path.join(options.out, "publish-report.json"));
  const releaseMetadata = readJson(path.join(options.out, "data", "release.json"));
  if (!report.release || report.release !== releaseMetadata.release) {
    throw new Error("Build release metadata is missing or inconsistent. Run npm run site:build first.");
  }

  let outstanding = options.origins;
  let lastFailures = new Map();
  for (let attempt = 1; attempt <= options.attempts && outstanding.length; attempt += 1) {
    const results = await Promise.all(outstanding.map(async (origin) => [origin, await checkOrigin(origin, report, releaseMetadata)]));
    outstanding = [];
    lastFailures = new Map();
    for (const [origin, failures] of results) {
      if (failures.length) {
        outstanding.push(origin);
        lastFailures.set(origin, failures);
        console.warn(`Release ${report.release} not yet converged at ${origin} (attempt ${attempt}/${options.attempts}).`);
      } else {
        console.log(`Verified release ${report.release} at ${origin}.`);
      }
    }
    if (outstanding.length && attempt < options.attempts) await sleep(options.delayMs);
  }

  if (outstanding.length) {
    console.error(`Deployment verification failed for release ${report.release}:`);
    for (const origin of outstanding) {
      console.error(`- ${origin}`);
      for (const failure of lastFailures.get(origin) || []) console.error(`  - ${failure}`);
    }
    process.exit(1);
  }
}

await main();
