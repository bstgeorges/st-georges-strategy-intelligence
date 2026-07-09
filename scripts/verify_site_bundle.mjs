import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_SITE = path.join(ROOT, "site");
const GENERATED_SITE = path.join(ROOT, "site-dist");
const SITE = fs.existsSync(GENERATED_SITE) ? GENERATED_SITE : SOURCE_SITE;

const routes = [
  ["home", "index.html", "https://stgeorgesstrategy.com/"],
  ["brief", "brief/index.html", "https://stgeorgesstrategy.com/brief/"],
  ["signals", "signals/index.html", "https://stgeorgesstrategy.com/signals/"],
  ["signals-ai", "signals/ai/index.html", "https://stgeorgesstrategy.com/signals/ai/"],
  ["signals-resilience", "signals/resilience/index.html", "https://stgeorgesstrategy.com/signals/resilience/"],
  ["signals-third-party", "signals/third-party/index.html", "https://stgeorgesstrategy.com/signals/third-party/"],
  ["signals-market-structure", "signals/market-structure/index.html", "https://stgeorgesstrategy.com/signals/market-structure/"],
  ["signals-financial-crime", "signals/financial-crime/index.html", "https://stgeorgesstrategy.com/signals/financial-crime/"],
  ["signals-cyber", "signals/cyber/index.html", "https://stgeorgesstrategy.com/signals/cyber/"],
  ["signals-technology-failure", "signals/technology-failure/index.html", "https://stgeorgesstrategy.com/signals/technology-failure/"],
  ["signals-data", "signals/data/index.html", "https://stgeorgesstrategy.com/signals/data/"],
  ["regulatory-horizon", "regulatory-horizon/index.html", "https://stgeorgesstrategy.com/regulatory-horizon/"],
  ["committee-questions", "committee-questions/index.html", "https://stgeorgesstrategy.com/committee-questions/"],
  ["archive", "archive/index.html", "https://stgeorgesstrategy.com/archive/"],
  ["about", "about/index.html", "https://stgeorgesstrategy.com/about/"],
];

const topics = [
  "ai",
  "resilience",
  "third-party",
  "market-structure",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
];

function read(relative) {
  return fs.readFileSync(path.join(SITE, relative), "utf8");
}

function readSource(relative) {
  return fs.readFileSync(path.join(SOURCE_SITE, relative), "utf8");
}

function readJson(relative) {
  return JSON.parse(read(relative));
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1] : "";
}

function count(pattern, text) {
  return (text.match(pattern) || []).length;
}

function checkLocalLinks(failures) {
  const htmlFiles = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (full.includes(`${path.sep}qa${path.sep}responsive${path.sep}`)) continue;
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) htmlFiles.push(full);
    }
  }
  walk(SITE);

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      const clean = href.split("#")[0];
      if (!clean) continue;
      let target = clean.startsWith("/")
        ? path.normalize(path.join(SITE, clean.slice(1)))
        : path.normalize(path.join(path.dirname(file), clean));
      if (clean.endsWith("/") || !path.extname(target)) target = path.join(target, "index.html");
      assert(fs.existsSync(target), `${path.relative(ROOT, file)} links to missing ${href}`, failures);
    }
  }
}

function main() {
  const failures = [];

  for (const [name, relative, expectedUrl] of routes) {
    const file = path.join(SITE, relative);
    assert(fs.existsSync(file), `${name} route missing at ${relative}`, failures);
    if (!fs.existsSync(file)) continue;

    const html = read(relative);
    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    const ogUrl = attr(html, /<meta property="og:url" content="([^"]+)"/);
    const jsonLdId = attr(html, /"@id": "([^"]+)"/);
    assert(canonical === expectedUrl, `${name} canonical mismatch: ${canonical}`, failures);
    assert(ogUrl === expectedUrl, `${name} og:url mismatch: ${ogUrl}`, failures);
    assert(jsonLdId === expectedUrl, `${name} JSON-LD @id mismatch: ${jsonLdId}`, failures);
    assert(!html.includes("https://stgeorgesstrategy.com/thevirtualofficer/"), `${name} still has /thevirtualofficer/ metadata`, failures);
    assert(html.includes("ben@stgeorgesstrategy.com"), `${name} missing email footer`, failures);
    assert(html.includes("Not investment, legal, compliance, or regulatory advice"), `${name} missing disclaimer`, failures);
  }

  for (const topic of topics) {
    const html = read(`signals/${topic}/index.html`);
    const top5 = (html.match(/<aside class="display-card">[\s\S]*?<ul class="mini-list">([\s\S]*?)<\/ul>/) || [])[1] || "";
    const additional = (html.match(/<ol class="brief-index evidence-list">([\s\S]*?)<\/ol>/) || [])[1] || "";
    assert(count(/<li>/g, top5) === 5, `${topic} should have 5 Top 5 rows`, failures);
    assert(count(/top-source/g, top5) === 5, `${topic} should have 5 Top 5 source labels`, failures);
    assert(count(/<li>/g, additional) >= 5, `${topic} should have at least 5 additional rows`, failures);
  }

  const horizon = readJson("regulatory-horizon/latest.json");
  assert(Array.isArray(horizon.signals), "Reg Horizon latest.json missing signals[]", failures);
  assert(horizon.signals.length <= 15, "Reg Horizon signals[] exceeds 15 rows", failures);
  assert(horizon.signals.every((item) => item.sourceStatus), "Reg Horizon signals[] should include sourceStatus in mockup contract", failures);
  assert(Array.isArray(horizon.warnings), "Reg Horizon latest.json missing warnings[]", failures);

  const responsiveReport = path.join(SOURCE_SITE, "qa", "responsive", "responsive-report.json");
  assert(fs.existsSync(responsiveReport), "Responsive report missing", failures);
  if (fs.existsSync(responsiveReport)) {
    const report = JSON.parse(fs.readFileSync(responsiveReport, "utf8"));
    const responsiveFailures = report.filter((item) => item.scrollWidth > item.innerWidth + 1 || (item.overflowing || []).length);
    assert(report.length === 56, `Responsive report should have 56 captures, found ${report.length}`, failures);
    assert(responsiveFailures.length === 0, `Responsive report has ${responsiveFailures.length} failures`, failures);
  }

  const publisherContract = readSource("WEEKLY_PUBLISHER_CONTRACT.md");
  const structurePlan = readSource("SITE_STRUCTURE_AND_TOPIC_PLAN.md");
  const redirectPlan = readSource("STAGING_REDIRECT_ANALYTICS_PLAN.md");
  assert(publisherContract.includes("Decision: use build-time generated HTML"), "Publisher contract must record build-time HTML decision", failures);
  assert(structurePlan.includes("Root-level tabs are the target staging structure"), "Structure plan must record root-level route decision", failures);
  assert(redirectPlan.includes("Analytics Continuity"), "Redirect plan must include analytics continuity", failures);

  checkLocalLinks(failures);

  if (failures.length) {
    console.error("Site bundle verification failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("Site bundle verification passed.");
  console.log(`Routes checked: ${routes.length}`);
  console.log(`Topics checked: ${topics.length}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
