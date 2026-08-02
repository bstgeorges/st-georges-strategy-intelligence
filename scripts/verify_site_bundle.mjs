import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validatePublicHtmlCopy } from "./lib/public_copy_contract.mjs";

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

function readSourceJson(relative) {
  return JSON.parse(readSource(relative));
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

function formatDateLong(date) {
  const parsed = new Date(`${date}T00:00:00Z`);
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function checkCurrentEditionAlignment(failures) {
  const edition = readSourceJson("data/current-edition.json");
  const home = read("index.html");
  const brief = read("brief/index.html");
  const archive = read("archive/index.html");
  const committee = read("committee-questions/index.html");
  const about = read("about/index.html");
  const signals = readJson("data/signals.json");
  const homeEditionLabel = `Latest edition / ${formatDateLong(edition.publicationDate)}`;
  const briefEditionLabel = `Weekly brief / ${formatDateLong(edition.publicationDate)}`;
  const committeeEditionLabel = `Edition date ${formatDateLong(edition.publicationDate)}`;
  const expectedTopSignals = (edition.topSignals || []).map((signal) => signal.title);

  function topSignalTitles(html, pattern) {
    const section = (html.match(pattern) || [])[1] || "";
    return Array.from(section.matchAll(/<h3>([^<]+)<\/h3>/g), (match) => match[1]);
  }

  const homeTopSignals = topSignalTitles(home, /<ol class="home-signal-list"[^>]*>([\s\S]*?)<\/ol>/);
  const briefTopSignals = topSignalTitles(brief, /<p class="eyebrow">Top 5<\/p>[\s\S]*?<ol class="brief-index">([\s\S]*?)<\/ol>/);
  const signalsHub = read("signals/index.html");
  const hubTopSignals = topSignalTitles(signalsHub, /<ol class="brief-index signal-hub-top5">([\s\S]*?)<\/ol>/);

  assert(signals.edition === edition.publicationDate, `signals.json edition ${signals.edition} should match current publicationDate ${edition.publicationDate}`, failures);
  assert(brief.includes(briefEditionLabel), `brief should use canonical ${briefEditionLabel}`, failures);
  assert(brief.includes(edition.title), "brief should use canonical edition title", failures);
  assert(home.includes(homeEditionLabel), `home should use canonical ${homeEditionLabel}`, failures);
  const judgement = edition.judgement || {};
  const judgementText = [judgement.observation, judgement.executiveJudgement, judgement.implication].filter(Boolean).join(" ");
  const judgementWordCount = judgementText.trim().split(/\s+/).length;
  assert(judgementWordCount >= 80 && judgementWordCount <= 120, `current-edition judgement should be 80–120 words; found ${judgementWordCount}`, failures);
  for (const paragraph of [judgement.observation, judgement.executiveJudgement, judgement.implication].filter(Boolean)) {
    assert(home.includes(paragraph), "home should include every canonical current-edition judgement paragraph", failures);
  }
  assert(home.indexOf("This Week’s Judgement") < home.indexOf('class="ticker"'), "weekly judgement should appear immediately after the hero and before the coverage ticker", failures);
  assert(expectedTopSignals.length === 5, "current edition should define exactly five canonical top signals", failures);
  assert(JSON.stringify(homeTopSignals) === JSON.stringify(expectedTopSignals), "homepage Top 5 should match current-edition.json", failures);
  assert(JSON.stringify(briefTopSignals) === JSON.stringify(expectedTopSignals), "brief Top 5 should match current-edition.json", failures);
  assert(JSON.stringify(hubTopSignals) === JSON.stringify(expectedTopSignals), "signals hub Top 5 should match current-edition.json", failures);
  assert(
    archive.includes(`latest ${edition.publicationDate}`),
    `archive should report canonical latest archive ${edition.publicationDate}`,
    failures,
  );
  assert(committee.includes(committeeEditionLabel), `committee questions should use canonical ${committeeEditionLabel}`, failures);
  assert(about.includes("Coverage and cadence"), "About page should explain coverage and cadence", failures);
  assert(about.includes("Not proof of no activity"), "About page should explain quiet-theme meaning", failures);
  for (const [label, html] of [
    ["home", home],
    ["brief", brief],
    ["archive", archive],
    ["committee questions", committee],
  ]) {
    assert(!html.includes(`Week of ${formatDateLong(edition.weekOf)}`), `${label} should not display the internal weekOf date as the public edition date`, failures);
    assert(!html.includes(`week of ${formatDateLong(edition.weekOf)}`), `${label} should not display the internal weekOf date as the public edition date`, failures);
  }
}

function checkWorkerRouteCoverage(failures) {
  const routeWorker = readSource(path.join("..", "workers", "not-found-route.js"));
  const requiredPrefixes = [
    "/assets/",
    "/about/",
    "/archive/",
    "/brief/",
    "/committee-questions/",
    "/data/",
    "/regulatory-horizon/",
    "/signals/",
  ];
  const requiredDirectories = [
    "/about",
    "/archive",
    "/brief",
    "/committee-questions",
    "/regulatory-horizon",
    "/signals",
  ];

  for (const route of requiredPrefixes) {
    assert(routeWorker.includes(`"${route}"`), `not-found route worker missing prefix ${route}`, failures);
  }
  for (const route of requiredDirectories) {
    assert(routeWorker.includes(`"${route}"`), `not-found route worker missing directory redirect ${route}`, failures);
  }
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
    failures.push(...validatePublicHtmlCopy(html, path.relative(SITE, file)));
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
  const edition = readSourceJson("data/current-edition.json");
  assert(fs.existsSync(path.join(SITE, "assets", "hero.svg")), "hero.svg missing from the public bundle", failures);
  assert(fs.existsSync(path.join(SITE, "assets", "favicon.svg")), "favicon.svg missing from the public bundle", failures);
  assert(fs.existsSync(path.join(SITE, "assets", "og-card.png")), "og-card.png missing from the public bundle", failures);

  const publicMarkdown = [];
  function findMarkdown(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) findMarkdown(full);
      else if (entry.name.endsWith(".md")) publicMarkdown.push(full);
    }
  }
  if (SITE === GENERATED_SITE) {
    findMarkdown(SITE);
    assert(publicMarkdown.length === 0, "public bundle should not contain internal Markdown files", failures);
  }

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
    const stillMaterial = (html.match(/<ol class="brief-index evidence-list still-material-list">([\s\S]*?)<\/ol>/) || [])[1] || "";
    assert(count(/<li(?:\s|>)/g, top5) === 5, `${topic} should have 5 Top 5 rows`, failures);
    assert(count(/top-source/g, top5) === 5, `${topic} should have 5 Top 5 source labels`, failures);
    const retainedCount = count(/<li(?:\s|>)/g, stillMaterial);
    assert(retainedCount >= 3 && retainedCount <= 7, `${topic} should have 3–7 still-material rows`, failures);
    assert(!stillMaterial.includes('class="rank"'), `${topic} still-material rows should not be ranked`, failures);
    assert(!html.includes(`Week of ${formatDateLong(edition.weekOf)}`), `${topic} should not display the internal weekOf date as the public edition date`, failures);
    assert(!html.includes("Week of 1 Jul 2026"), `${topic} should not display stale topic-card week labels`, failures);
    assert(!html.includes("Week of 8 Jul 2026"), `${topic} should not display stale topic-card week labels`, failures);
  }

  const horizon = readJson("regulatory-horizon/latest.json");
  assert(Array.isArray(horizon.signals), "Reg Horizon latest.json missing signals[]", failures);
  assert(horizon.signals.length <= 15, "Reg Horizon signals[] exceeds 15 rows", failures);
  assert(horizon.signals.every((item) => item.sourceStatus), "Reg Horizon signals[] should include sourceStatus in mockup contract", failures);
  if (horizon.status === "published") {
    assert(horizon.editorialReview?.reviewStatus === "approved", "published Reg Horizon edition missing approved editorial review", failures);
    assert(horizon.signals.every((item) => ["act", "prepare", "monitor"].includes(item.lane)), "published Reg Horizon signals missing operating lane", failures);
    assert(horizon.signals.every((item) => item.cluster), "published Reg Horizon signals missing editorial cluster", failures);
  }
  assert(Array.isArray(horizon.warnings), "Reg Horizon latest.json missing warnings[]", failures);
  const horizonPage = read("regulatory-horizon/index.html");
  const styles = read("styles.css");
  const signalsHub = read("signals/index.html");
  const release = readJson("data/release.json");
  assert(release.contractVersion === "site.release.v2", "release metadata must use the shared site.release.v2 contract", failures);
  assert(release.products && Object.keys(release.products).length === 4, "release metadata must publish freshness for all four products", failures);
  for (const [name, product] of Object.entries(release.products || {})) {
    assert(product.route && product.edition && product.status, `release metadata product ${name} is missing route, edition, or status`, failures);
  }
  for (const [, relative] of routes) {
    if (relative.includes("archive/")) continue;
    const page = read(relative);
    const freshnessStrip = (page.match(/<aside class="site-freshness"[^>]*>[\s\S]*?<\/aside>/) || [""])[0];
    assert(page.includes('class="site-freshness"'), `${relative} missing shared publication freshness strip`, failures);
    assert(page.includes("22 Jul 2026") && page.includes("1 Aug 2026"), `${relative} freshness dates must use the long display format`, failures);
    assert(!freshnessStrip.includes("Publication status · 2026-") && !/<strong>2026-\d{2}-\d{2}<\/strong>/.test(freshnessStrip), `${relative} freshness strip must not display ISO dates`, failures);
  }
  assert(signalsHub.includes("news-research-radar"), "Signals hub missing news and research radar", failures);
  assert(signalsHub.includes("Financial Times") && signalsHub.includes("arXiv"), "Signals hub missing radar source mix", failures);
  assert(signalsHub.includes("The Economist") && signalsHub.includes("AP News") && signalsHub.includes("The Atlantic"), "Signals hub missing manual press radar sources", failures);
  assert(horizonPage.includes("source-tier-core"), "Reg Horizon source tiers missing core authority treatment", failures);
  assert(horizonPage.includes("source-tier-pilot"), "Reg Horizon source tiers missing pilot/watch treatment", failures);
  assert(horizonPage.includes("data-affordance"), "Reg Horizon machine-readable links missing data affordance treatment", failures);
  assert(signalsHub.includes("data-affordance"), "Signals machine-readable link missing data affordance treatment", failures);
  assert(signalsHub.includes("Signals / Edition 22 Jul 2026"), "Signals page edition label must use the long display format", failures);
  assert(count(/signal-freshness-tick/g, signalsHub) >= 40, "Signals overview missing freshness indicators", failures);
  assert(styles.includes("@media (prefers-reduced-motion: reduce)"), "Visual treatments missing reduced-motion fallback", failures);
  if (horizon.status === "withheld") {
    assert(horizon.signals.length === 0, "withheld Reg Horizon editions must publish zero material signals", failures);
    assert((horizon.horizon || []).length === 0, "withheld Reg Horizon editions must publish zero deadlines", failures);
    assert(horizonPage.includes("Withheld"), "withheld Reg Horizon page must show its publication status", failures);
    assert(horizonPage.includes("No material signals are published"), "withheld Reg Horizon page must not imply material rows were cleared", failures);
  } else {
    const horizonFeed = read("regulatory-horizon/feed.xml");
    const horizonCalendar = read("regulatory-horizon/horizon.ics");
    assert(horizon.status === "published", "Reg Horizon status must be published or withheld", failures);
    assert(!/withheld/i.test(horizonPage), "published Reg Horizon page contains stale withheld language", failures);
  assert(horizonPage.includes("What this edition means"), "published Reg Horizon page missing operating readout", failures);
  assert(horizonPage.includes("horizon-freshness-status"), "Reg Horizon page missing freshness status", failures);
  assert(horizonPage.includes("horizon-coverage-banner"), "Reg Horizon page missing coverage confidence banner", failures);
  assert(horizonPage.includes("horizon-lanes"), "Reg Horizon page missing operating lanes", failures);
  assert(horizonPage.includes("horizon-rolling-coverage"), "Reg Horizon page missing rolling coverage", failures);
  assert(horizonPage.includes("Top-three judgement"), "Reg Horizon page missing top-three judgement", failures);
  assert(horizonPage.includes("Edition / 1 Aug 2026"), "Reg Horizon page edition label must use the long display format", failures);
  assert(horizonPage.includes('id="horizon-masthead-edition">Edition / 1 Aug 2026'), "Reg Horizon masthead is missing its edition date", failures);
  assert(horizonPage.includes("Comparative risk radar"), "Reg Horizon page missing comparative risk radar", failures);
  assert(horizonPage.includes("7 days") && horizonPage.includes("30 days") && horizonPage.includes("90 days"), "Reg Horizon risk radar missing 7/30/90 action horizon", failures);
  assert(horizonPage.includes("Source coverage trend"), "Reg Horizon page missing source coverage trend", failures);
  assert(horizonPage.includes("No whole-market conclusion"), "Reg Horizon page missing explicit limited-coverage conclusion state", failures);
  assert(horizonPage.includes("Last reviewed edition:"), "Reg Horizon page missing explicit reviewed-edition label", failures);
    for (const signal of horizon.signals.slice(0, 5)) {
      assert(horizonPage.includes(signal.title), `published Reg Horizon page missing signal: ${signal.title}`, failures);
    }
    for (const entry of horizon.horizon || []) {
      assert(horizonPage.includes(`datetime="${entry.date}"`), `published Reg Horizon page missing deadline ${entry.date}`, failures);
    }
    assert(!/withheld/i.test(horizonFeed), "published Reg Horizon feed contains stale withheld language", failures);
    assert(
      count(/<item>/g, horizonFeed) === horizon.signals.length,
      "published Reg Horizon feed item count must match signals[]",
      failures,
    );
    assert(
      count(/BEGIN:VEVENT/g, horizonCalendar) === (horizon.horizon || []).length,
      "published Reg Horizon calendar event count must match horizon[]",
      failures,
    );
    const horizonArchive = `regulatory-horizon/archive/${horizon.edition}.html`;
    assert(fs.existsSync(path.join(SITE, horizonArchive)), `published Reg Horizon archive missing ${horizonArchive}`, failures);
    assert(
      (horizon.archives || [])[0] === `archive/${horizon.edition}.html`,
      `published Reg Horizon archive pointer should be archive/${horizon.edition}.html`,
      failures,
    );
    assert(
      horizonPage.includes(`href="archive/${horizon.edition}.html"`) ||
        horizonPage.includes(`href="/regulatory-horizon/archive/${horizon.edition}.html"`),
      "published Reg Horizon page should link the frozen-edition card to the current archive",
      failures,
    );
    for (const entry of horizon.horizon || []) {
      assert(entry.date > horizon.edition, `published Reg Horizon deadline ${entry.date} must be after edition ${horizon.edition}`, failures);
    }
  }

  const signalsLatest = readJson("signals/latest.json");
  assert(signalsLatest.contractVersion === "signals.latest.v1", "Signals latest.json contractVersion mismatch", failures);
  assert(signalsLatest.edition === edition.publicationDate, "Signals latest.json edition should match current publicationDate", failures);
  assert(signalsLatest.canonicalUrl === "https://stgeorgesstrategy.com/signals/", "Signals latest.json canonicalUrl mismatch", failures);
  assert(Array.isArray(signalsLatest.topics) && signalsLatest.topics.length === 8, "Signals latest.json should contain eight topics", failures);

  const brief = read("brief/index.html");
  const archive = read("archive/index.html");
  const briefHorizonHtml = Array.from(brief.matchAll(/<ul class="horizon-list"[^>]*>([\s\S]*?)<\/ul>/g), (match) => match[1]).join("\n");
  const briefDates = Array.from(briefHorizonHtml.matchAll(/<time datetime="(\d{4}-\d{2}-\d{2})"/g), (match) => match[1]);
  for (const date of briefDates) {
    assert(date >= edition.publicationDate, `brief horizon date ${date} must not be before edition ${edition.publicationDate}`, failures);
  }

  const sitemap = read("sitemap.xml");
  const sitemapUrls = count(/<url>/g, sitemap);
  const sitemapLastmods = count(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, sitemap);
  assert(sitemapUrls > 0, "sitemap.xml should include URLs", failures);
  assert(sitemapLastmods === sitemapUrls, "sitemap.xml should include one valid lastmod date per URL", failures);
  const horizonEdition = horizon.edition;
  const expectedHorizonArchiveHref = `/regulatory-horizon/archive/${horizonEdition}.html`;
  assert(
    archive.includes(`href="${expectedHorizonArchiveHref}"`),
    `archive should link Reg Horizon to its frozen ${horizonEdition} edition`,
    failures,
  );
  assert(
    !archive.includes('href="/regulatory-horizon/"><p class="meta">Reg Horizon</p>'),
    "archive should not link its Reg Horizon edition card to the live page",
    failures,
  );
  checkCurrentEditionAlignment(failures);

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

  checkWorkerRouteCoverage(failures);
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
