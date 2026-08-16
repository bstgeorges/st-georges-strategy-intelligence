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

  const briefTopSignals = topSignalTitles(brief, /<p class="eyebrow">Top 5<\/p>[\s\S]*?<ol class="brief-index">([\s\S]*?)<\/ol>/);
  const signalsHub = read("signals/index.html");
  const hubTopSignals = topSignalTitles(signalsHub, /<ol class="brief-index signal-hub-top5">([\s\S]*?)<\/ol>/);

  assert(signals.edition === edition.publicationDate, `signals.json edition ${signals.edition} should match current publicationDate ${edition.publicationDate}`, failures);
  assert(brief.includes(briefEditionLabel), `brief should use canonical ${briefEditionLabel}`, failures);
  assert(brief.includes(edition.title), "brief should use canonical edition title", failures);
  assert(home.includes(homeEditionLabel), `home should use canonical ${homeEditionLabel}`, failures);
  assert(home.includes("The operating question for leaders this week"), "home should use its distinct decision-led entry headline", failures);
  for (const [field, value] of Object.entries(edition.judgement || {})) {
    assert(home.includes(value), `home should surface current edition judgement ${field}`, failures);
  }
  assert(home.includes("Weekly Judgement"), "home should label its full editorial judgement", failures);
  assert(home.includes("One test for the week"), "home judgement should state its plain-English operating test", failures);
  assert(home.indexOf("Weekly Judgement") < home.indexOf('class="ticker"'), "weekly judgement should appear immediately after the hero and before the coverage ticker", failures);
  assert(expectedTopSignals.length === 5, "current edition should define exactly five canonical top signals", failures);
  assert(!home.includes('class="home-signal-list"'), "homepage should route to the Brief rather than duplicate its Top 5", failures);
  assert(JSON.stringify(briefTopSignals) === JSON.stringify(expectedTopSignals), "brief Top 5 should match current-edition.json", failures);
  assert(JSON.stringify(hubTopSignals) === JSON.stringify(expectedTopSignals), "signals hub Top 5 should match current-edition.json", failures);
  assert(
    archive.includes(`latest ${edition.publicationDate}`),
    `archive should report canonical latest archive ${edition.publicationDate}`,
    failures,
  );
  assert(committee.includes(committeeEditionLabel), `committee questions should use canonical ${committeeEditionLabel}`, failures);
  const committeeQuestions = edition.committeeQuestions || [edition.committeeQuestion];
  assert(committeeQuestions.length === 3, "current edition should define three Committee Questions", failures);
  for (const question of committeeQuestions) {
    assert(committee.includes(question?.question || ""), "committee questions should include every canonical current-edition question", failures);
  }
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
    "/signals/",
  ];
  const requiredDirectories = [
    "/about",
    "/archive",
    "/brief",
    "/committee-questions",
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
      if (href.includes("regulatory-horizon")) continue;
      if (href.startsWith("/regulatory-horizon/")) continue;
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

  const horizon = { status: "withheld", signals: [], horizon: [] };
  const horizonPage = "This week's scan is held";
  assert(!fs.existsSync(path.join(SITE, "regulatory-horizon")), "Reg Horizon must not be present in the public bundle", failures);
  assert(read("_redirects").includes("/regulatory-horizon/ /archive/ 301"), "Reg Horizon route must redirect to Archive", failures);
  assert(read("_redirects").includes("/regulatory-horizon/* /archive/ 301"), "Reg Horizon subroutes must redirect to Archive", failures);
  const styles = read("styles.css");
  const signalsHub = read("signals/index.html");
  const briefPage = read("brief/index.html");
  const release = readJson("data/release.json");
  assert(release.contractVersion === "site.release.v2", "release metadata must use the shared site.release.v2 contract", failures);
  assert(release.products && Object.keys(release.products).length === 3, "release metadata must publish freshness for all public products", failures);
  for (const [name, product] of Object.entries(release.products || {})) {
    assert(product.route && product.edition && product.status, `release metadata product ${name} is missing route, edition, or status`, failures);
  }
  for (const [, relative] of routes) {
    if (relative.includes("archive/")) continue;
    const page = read(relative);
    assert(!page.includes('class="site-freshness"'), `${relative} should not include the internal publication freshness strip`, failures);
  }
  assert(signalsHub.includes("news-research-radar"), "Signals hub missing news and research radar", failures);
  assert(signalsHub.includes("How we use evidence"), "Signals hub missing concise public source standard", failures);
  assert(signalsHub.includes("Primary sources") && signalsHub.includes("Paper-level review"), "Signals hub missing public evidence principles", failures);
  assert(!/Financial Times|Wall Street Journal|POLITICO Pro|manual or licensed feed/.test(signalsHub), "Signals hub must not publish the internal source register", failures);
  assert(!/How to read the source trail|Signals by watch theme/.test(signalsHub), "Signals hub must not repeat source or Horizon framing", failures);
  assert(briefPage.includes("The issue in four moves") && briefPage.includes("The full weekly readout") && briefPage.includes("Questions the public record puts on the table"), "Weekly Brief is missing its core scan, readout, or evidence watch", failures);
  assert(!/How the eight streams fed the issue|Three questions from the week|Three angles worth developing/.test(briefPage), "Weekly Brief must not repeat coverage, committee, or idea-development sections", failures);
  assert(signalsHub.includes(`Signals / Edition ${formatDateLong(edition.publicationDate)}`), "Signals page edition label must use the long display format", failures);
  assert(count(/signal-freshness-tick/g, signalsHub) >= 40, "Signals overview missing freshness indicators", failures);
  assert(styles.includes("@media (prefers-reduced-motion: reduce)"), "Visual treatments missing reduced-motion fallback", failures);
  if (horizon.status === "withheld") {
    assert(horizon.signals.length === 0, "withheld Reg Horizon editions must publish zero material signals", failures);
    assert((horizon.horizon || []).length === 0, "withheld Reg Horizon editions must publish zero deadlines", failures);
    assert(horizonPage.includes("This week's scan is held"), "withheld Reg Horizon page must explain its publication status", failures);
    assert(!horizonPage.includes('id="horizon-lanes"'), "withheld Reg Horizon page must not render empty operating lanes", failures);
    assert(!horizonPage.includes('id="horizon-deadlines"'), "withheld Reg Horizon page must not render an empty deadline list", failures);
  } else {
    const horizonFeed = read("regulatory-horizon/feed.xml");
    const horizonCalendar = read("regulatory-horizon/horizon.ics");
    assert(horizon.status === "published", "Reg Horizon status must be published or withheld", failures);
    assert(!/withheld/i.test(horizonPage), "published Reg Horizon page contains stale withheld language", failures);
  assert(horizonPage.includes("The regulatory decisions to own"), "published Reg Horizon page missing its decision-led purpose", failures);
  assert(horizonPage.includes("horizon-freshness-status"), "Reg Horizon page missing freshness status", failures);
  assert(horizonPage.includes("horizon-coverage-banner"), "Reg Horizon page missing coverage confidence banner", failures);
  assert(horizonPage.includes("horizon-lanes"), "Reg Horizon page missing operating lanes", failures);
  const horizonEditionLabel = `Edition / ${formatDateLong(horizon.edition)}`;
  assert(horizonPage.includes(horizonEditionLabel), "Reg Horizon page edition label must use the long display format", failures);
  assert(horizonPage.includes(`id="horizon-masthead-edition">${horizonEditionLabel}`), "Reg Horizon masthead is missing its edition date", failures);
  assert(read("committee-questions/index.html").includes(`id="committee-masthead-edition">Edition / ${formatDateLong(edition.publicationDate)}`), "Committee Questions masthead is missing its edition date", failures);
  assert(horizonPage.includes("Scope note:"), "Reg Horizon page missing its clear editorial scope note", failures);
  assert(!horizonPage.includes("Limited coverage:"), "Reg Horizon should not lead with internal coverage mechanics", failures);
  assert(!horizonPage.includes("Consob remains blocked"), "Reg Horizon should retain source-specific failures in the dated record, not the reader-facing summary", failures);
  assert(horizonPage.includes("Last reviewed edition:"), "Reg Horizon page missing explicit reviewed-edition label", failures);
  assert(!/Items awaiting confidence review|Additional items for analyst triage|Top 5 now\. Additional rows/.test(horizonPage), "Reg Horizon must not expose internal review scaffolding or duplicate signal lists", failures);
  assert(!horizonPage.includes("horizon-render.js"), "Reg Horizon must render without client-side data loading", failures);
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
  assert(!/Reg Horizon|regulatory-horizon/.test(archive), "Archive must not promote Reg Horizon while it is withdrawn", failures);
  assert(archive.includes("Choose the trail you need") && archive.includes('class="archive-navigation"'), "Archive should offer clear routes into briefs, topics and the current edition", failures);
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
