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
  ["regulatory-horizon", "regulatory-horizon/index.html", "https://stgeorgesstrategy.com/regulatory-horizon/"],
  ["signals-ai", "signals/ai/index.html", "https://stgeorgesstrategy.com/signals/ai/"],
  ["signals-resilience", "signals/resilience/index.html", "https://stgeorgesstrategy.com/signals/resilience/"],
  ["signals-third-party", "signals/third-party/index.html", "https://stgeorgesstrategy.com/signals/third-party/"],
  ["signals-market-structure", "signals/market-structure/index.html", "https://stgeorgesstrategy.com/signals/market-structure/"],
  ["signals-financial-crime", "signals/financial-crime/index.html", "https://stgeorgesstrategy.com/signals/financial-crime/"],
  ["signals-cyber", "signals/cyber/index.html", "https://stgeorgesstrategy.com/signals/cyber/"],
  ["signals-technology-failure", "signals/technology-failure/index.html", "https://stgeorgesstrategy.com/signals/technology-failure/"],
  ["signals-data", "signals/data/index.html", "https://stgeorgesstrategy.com/signals/data/"],
  ["deep-dives", "deep-dives/index.html", "https://stgeorgesstrategy.com/deep-dives/"],
  ["deep-dive-harness", "deep-dives/harness-problem/index.html", "https://stgeorgesstrategy.com/deep-dives/harness-problem/"],
  ["deep-dive-agentic-authority", "deep-dives/agentic-authority/index.html", "https://stgeorgesstrategy.com/deep-dives/agentic-authority/"],
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

function deepDiveArchiveDetails(deepDive) {
  const route = String(deepDive?.route || "");
  const match = route.match(/^\/deep-dives\/([a-z0-9]+(?:-[a-z0-9]+)*)\/$/);
  if (!match) return null;
  const slug = match[1];
  return {
    relative: `deep-dives/${slug}/archive/${deepDive.publishedDate}/index.html`,
    url: `https://stgeorgesstrategy.com/deep-dives/${slug}/archive/${deepDive.publishedDate}/`,
  };
}

function checkCurrentEditionAlignment(failures) {
  const edition = readSourceJson("data/current-edition.json");
  const home = read("index.html");
  const brief = read("brief/index.html");
  const archive = read("archive/index.html");
  const archivedBrief = read(`archive/brief/${edition.publicationDate}/index.html`);
  const deepDives = read("deep-dives/index.html");
  const committee = read("committee-questions/index.html");
  const about = read("about/index.html");
  const signals = readJson("data/signals.json");
  const homeEditionLabel = `Latest edition / ${formatDateLong(edition.publicationDate)}`;
  const briefEditionLabel = `Weekly Brief / ${edition.editionNumber} · ${formatDateLong(edition.publicationDate)}`;
  const committeeEditionLabel = `Edition date ${formatDateLong(edition.publicationDate)}`;
  const expectedTopSignals = (edition.topSignals || []).map((signal) => signal.title);

  function topSignalTitles(html, pattern) {
    const section = (html.match(pattern) || [])[1] || "";
    return Array.from(section.matchAll(/<h3>([^<]+)<\/h3>/g), (match) => match[1]);
  }

  function topSignalLinks(html, pattern) {
    const section = (html.match(pattern) || [])[1] || "";
    return Array.from(section.matchAll(/<a href="([^"]+)"><h3>/g), (match) => match[1]);
  }

  const top5Pattern = /<p class="eyebrow">Top 5<\/p>[\s\S]*?<ol class="brief-index">([\s\S]*?)<\/ol>/;
  const hubTop5Pattern = /<ol class="brief-index signal-hub-top5">([\s\S]*?)<\/ol>/;
  const briefTopSignals = topSignalTitles(brief, top5Pattern);
  const briefTopSignalLinks = topSignalLinks(brief, top5Pattern);
  const signalsHub = read("signals/index.html");
  const hubTopSignals = topSignalTitles(signalsHub, hubTop5Pattern);
  const hubTopSignalLinks = topSignalLinks(signalsHub, hubTop5Pattern);
  const expectedTopSignalLinks = (edition.topSignals || []).map((signal) => {
    const topic = (signals.topics || []).find((item) => item.id === signal.topic);
    return (topic?.top5 || []).find((item) => item.title === signal.title)?.url || "";
  });

  assert(signals.edition === edition.publicationDate, `signals.json edition ${signals.edition} should match current publicationDate ${edition.publicationDate}`, failures);
  assert(home.includes('<details class="site-menu" open>'), "home navigation must be visible without JavaScript on desktop", failures);
  assert(home.includes('href="/regulatory-horizon/"'), "home navigation must expose Reg Horizon", failures);
  assert(brief.includes(briefEditionLabel), `brief should use canonical ${briefEditionLabel}`, failures);
  assert(brief.includes(edition.title), "brief should use canonical edition title", failures);
  assert(brief.includes('href="#weekly-readout"'), "brief one-minute scan should link to the readout", failures);
  assert(committee.includes('href="/signals/market-structure/"'), "committee questions must route market-structure prompts to their signal page", failures);
  assert(home.includes(homeEditionLabel), `home should use canonical ${homeEditionLabel}`, failures);
  assert(home.includes("What should a leadership team get ahead of this week?"), "home should use its distinct, reader-led entry headline", failures);
  for (const field of ["title", "observation", "executiveJudgement", "implication"]) {
    const value = edition.judgement?.[field];
    assert(home.includes(value), `home should surface current edition judgement ${field}`, failures);
  }
  assert(home.includes("Weekly Judgement"), "home should label its full editorial judgement", failures);
  assert(home.includes(edition.judgement?.title || "A note for the week"), "home judgement should frame the weekly editorial note", failures);
  assert(home.includes("What happened") && home.includes("Why it matters") && home.includes("What to do"), "home judgement should retain its clear reader signposts", failures);
  assert(home.indexOf("Weekly Judgement") < home.indexOf('class="ticker"'), "weekly judgement should appear immediately after the hero and before the coverage ticker", failures);
  assert(expectedTopSignals.length === 5, "current edition should define exactly five canonical top signals", failures);
  assert(!home.includes('class="home-signal-list"'), "homepage should route to the Brief rather than duplicate its Top 5", failures);
  assert(JSON.stringify(briefTopSignals) === JSON.stringify(expectedTopSignals), "brief Top 5 should match current-edition.json", failures);
  assert(JSON.stringify(hubTopSignals) === JSON.stringify(expectedTopSignals), "signals hub Top 5 should match current-edition.json", failures);
  assert(expectedTopSignalLinks.every(Boolean), "every current-edition Top 5 signal must resolve to a source URL", failures);
  assert(JSON.stringify(briefTopSignalLinks) === JSON.stringify(expectedTopSignalLinks), "brief Top 5 must link to each signal's primary source", failures);
  assert(JSON.stringify(hubTopSignalLinks) === JSON.stringify(expectedTopSignalLinks), "signals hub Top 5 must link to each signal's primary source", failures);
  assert(
    archive.includes(`latest ${edition.publicationDate}`),
    `archive should report canonical latest archive ${edition.publicationDate}`,
    failures,
  );
  const archiveMetaCount = attr(archive, /Last updated [^<]*?(?:&middot;|·)\s*(\d+) dated editions archived so far/);
  const archiveBriefCardCount = attr(archive, /class="archive-card archive-brief"[^>]*><p class="meta">(\d+) editions? archived, latest/);
  assert(Boolean(archiveMetaCount), "archive should state the dated edition count", failures);
  assert(Boolean(archiveBriefCardCount), "archive brief card should state the archived edition count", failures);
  assert(
    archiveMetaCount === archiveBriefCardCount,
    "archive masthead and Weekly Brief archive card must report the same edition count",
    failures,
  );
  const deepDiveArchiveSlugs = Array.from(
    archive.matchAll(/href="\/deep-dives\/([^/]+)\/archive\/[^/]+\//g),
    (match) => match[1],
  );
  assert(
    new Set(deepDiveArchiveSlugs).size === deepDiveArchiveSlugs.length,
    "archive index must show only the latest archived card for each Deep Dive",
    failures,
  );
  assert(committee.includes(committeeEditionLabel), `committee questions should use canonical ${committeeEditionLabel}`, failures);
  assert(committee.includes('property="og:image" content="https://stgeorgesstrategy.com/assets/og-card.png"'), "committee questions should use the shared OG card", failures);
  assert(committee.includes('href="/regulatory-horizon/"'), "committee questions should link to the published Reg Horizon", failures);
  assert(committee.includes(`"dateModified": "${edition.publicationDate}"`), "committee questions structured data should use the current edition date", failures);
  const aiSignals = read("signals/ai/index.html");
  assert(aiSignals.includes(`"dateModified": "${edition.publicationDate}"`), "AI Signals structured data should use the current edition date", failures);
  const committeeQuestions = edition.committeeQuestions || [edition.committeeQuestion];
  assert(committeeQuestions.length === 3, "current edition should define three Committee Questions", failures);
  for (const question of committeeQuestions) {
    assert(committee.includes(question?.question || ""), "committee questions should include every canonical current-edition question", failures);
  }
  if (edition.deepDive) {
    const deepDiveArchive = deepDiveArchiveDetails(edition.deepDive);
    assert(Boolean(deepDiveArchive), "current Deep Dive must use a canonical /deep-dives/<slug>/ URL", failures);
    if (deepDiveArchive) {
      assert(deepDives.includes(`href="${edition.deepDive.route}"`), "Deep Dives index must link to the current Deep Dive", failures);
      const archiveFile = path.join(SITE, deepDiveArchive.relative);
      assert(fs.existsSync(archiveFile), "current Deep Dive archive copy missing", failures);
      assert(archive.includes(`href="/${deepDiveArchive.relative.replace(/index\.html$/, "")}"`), "archive index must link to the current Deep Dive snapshot", failures);
      if (fs.existsSync(archiveFile)) {
        const archived = fs.readFileSync(archiveFile, "utf8");
        assert(attr(archived, /<link rel="canonical" href="([^"]+)"/) === deepDiveArchive.url, "Deep Dive archive canonical mismatch", failures);
        assert(attr(archived, /<meta property="og:url" content="([^"]+)"/) === deepDiveArchive.url, "Deep Dive archive og:url mismatch", failures);
        assert(attr(archived, /"@id": "([^"]+)"/) === deepDiveArchive.url, "Deep Dive archive JSON-LD @id mismatch", failures);
      }
    }
  }
  const standaloneDeepDives = (readSourceJson("data/deep-dives.json").items || [])
    .filter((record) => record?.route && record?.publishedDate && record?.title && record?.dek && record?.readTime)
    .sort((left, right) => String(right.publishedDate).localeCompare(String(left.publishedDate)));
  const latestStandalone = standaloneDeepDives[0];
  if (latestStandalone && latestStandalone.route !== edition.deepDive?.route) {
    const expectedMeta = `Deep Dive / ${formatDateLong(latestStandalone.publishedDate)} / ${latestStandalone.readTime}`;
    const slug = latestStandalone.route.match(/^\/deep-dives\/([^/]+)\/$/)?.[1] || "";
    assert(home.includes(latestStandalone.title), "homepage must promote the latest standalone Deep Dive", failures);
    assert(brief.includes(latestStandalone.title), "Weekly Brief must promote the latest standalone Deep Dive", failures);
    assert(home.includes(expectedMeta) && brief.includes(expectedMeta), "standalone Deep Dive promotion must use its publication date and read time", failures);
    assert(!archivedBrief.includes("Latest Deep Dive"), "standalone Deep Dive promotion must not rewrite the dated Weekly Brief", failures);
    assert(archive.includes(`Deep Dive / ${formatDateLong(latestStandalone.publishedDate)}`), "archive Deep Dive cards must use human-readable dates", failures);
    if (slug) {
      const liveDeepDive = read(`deep-dives/${slug}/index.html`);
      assert(liveDeepDive.includes(`assets/og/deep-dive-${slug}.png`), "standalone Deep Dive must use a contextual social image", failures);
    }
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
  const edgeWorker = readSource(path.join("..", "workers", "site.mjs"));
  const routePolicy = readSource(path.join("..", "workers", "site-routes.mjs"));
  const wrangler = readSource(path.join("..", "wrangler.jsonc"));
  const requiredDirectories = [
    "/about",
    "/archive",
    "/brief",
    "/committee-questions",
    "/deep-dives",
    "/deep-dives/harness-problem",
    "/signals",
  ];

  for (const route of requiredDirectories) {
    assert(routePolicy.includes(`"${route}"`), `site route policy missing directory redirect ${route}`, failures);
  }
  assert(edgeWorker.includes("env.ASSETS.fetch(request)"), "site Worker must serve the generated asset bundle directly", failures);
  assert(!edgeWorker.includes("pages.dev"), "site Worker must not proxy a Pages origin", failures);
  assert(edgeWorker.includes("new HTMLRewriter()"), "site Worker must preserve the optional analytics beacon injection", failures);
  assert(wrangler.includes('"run_worker_first": true'), "site Worker must run before static assets to enforce redirects and security headers", failures);
  assert(wrangler.includes('"observability": {') && wrangler.includes('"head_sampling_rate": 0.01'), "site Worker must keep production observability sampled at 1%", failures);
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
      if (href.includes("'+") || href.includes('"+')) continue;
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
  const signals = readSourceJson("data/signals.json");
  assert(fs.existsSync(path.join(SITE, "assets", "hero.svg")), "hero.svg missing from the public bundle", failures);
  assert(fs.existsSync(path.join(SITE, "assets", "favicon.svg")), "favicon.svg missing from the public bundle", failures);
  assert(fs.existsSync(path.join(SITE, "assets", "og-card.png")), "og-card.png missing from the public bundle", failures);
  for (const font of ["hanken-grotesk-latin.woff2", "jetbrains-mono-latin.woff2", "playfair-display-latin.woff2", "playfair-display-latin-italic.woff2"]) {
    assert(fs.existsSync(path.join(SITE, "assets", "fonts", font)), `self-hosted font missing: ${font}`, failures);
  }
  const styles = read("styles.css");
  assert(styles.includes("@media print"), "stylesheet must provide an executive print treatment", failures);
  assert(styles.includes("--muted: #5e5849"), "muted text must meet the AA contrast target", failures);
  assert(styles.includes("main + .subscribe-band + .footer"), "subscribe band must connect directly to the footer without a blank gap", failures);
  assert(styles.includes("clamp(196px, 18vh, 238px)"), "home hero must reserve space for its metrics strip", failures);

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
    const topicData = (signals.topics || []).find((item) => item.id === topic) || {};
    const expectedShortlistCount = Number.isInteger(topicData.shortlistCount) ? topicData.shortlistCount : 5;
    const top5 = (html.match(/<aside class="display-card">[\s\S]*?<ul class="mini-list">([\s\S]*?)<\/ul>/) || [])[1] || "";
    const stillMaterial = (html.match(/<ol class="brief-index evidence-list still-material-list">([\s\S]*?)<\/ol>/) || [])[1] || "";
    assert(count(/<li(?:\s|>)/g, top5) === expectedShortlistCount, `${topic} should have ${expectedShortlistCount} current shortlist rows`, failures);
    assert(count(/top-source/g, top5) === expectedShortlistCount, `${topic} should have ${expectedShortlistCount} current shortlist source labels`, failures);
    const retainedCount = count(/<li(?:\s|>)/g, stillMaterial);
    assert(retainedCount >= 3 && retainedCount <= 7, `${topic} should have 3–7 still-material rows`, failures);
    assert(!stillMaterial.includes('class="rank"'), `${topic} still-material rows should not be ranked`, failures);
    assert(!html.includes(`Week of ${formatDateLong(edition.weekOf)}`), `${topic} should not display the internal weekOf date as the public edition date`, failures);
    assert(!html.includes("Week of 1 Jul 2026"), `${topic} should not display stale topic-card week labels`, failures);
    assert(!html.includes("Week of 8 Jul 2026"), `${topic} should not display stale topic-card week labels`, failures);
  }

  const archiveHubPages = [
    "archive/brief/index.html",
    ...topics.map((topic) => `signals/${topic}/archive/index.html`),
  ];
  for (const relative of archiveHubPages) {
    const html = read(relative);
    assert(html.includes('href="/regulatory-horizon/"'), `${relative} must expose the published Reg Horizon navigation`, failures);
    assert(html.includes('href="/deep-dives/"'), `${relative} must use the canonical Deep Dives navigation route`, failures);
  }

  const horizon = readJson("regulatory-horizon/latest.json");
  const horizonPage = read("regulatory-horizon/index.html");
  assert(horizon.status === "published", "Reg Horizon must be explicitly published", failures);
  assert(Array.isArray(horizon.confirmedDates) && horizon.confirmedDates.length >= 1, "Reg Horizon needs at least one confirmed date", failures);
  assert(!read("_redirects").includes("/regulatory-horizon/ /archive/ 301"), "Reg Horizon must not redirect away from its published route", failures);
  assert(fs.existsSync(path.join(SITE, ".assetsignore")), "Worker assets ignore file missing", failures);
  assert(
    read(".assetsignore") === "_headers\n_redirects\npublish-report.json\n",
    "Worker assets ignore file must exclude Pages-only controls and the internal publish report",
    failures,
  );
  assert(fs.existsSync(path.join(SITE, "404.html")), "Branded 404 page missing", failures);
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
  assert(signalsHub.includes("Top 5 for this edition") && !signalsHub.includes("Top 5 refreshed"), "Signals hub must describe the current Top 5 accurately", failures);
  assert(!signalsHub.includes("reviewed each edition"), "Signals hub must not claim stale retained rows were reviewed this edition", failures);
  assert(signalsHub.includes("How we use evidence"), "Signals hub missing concise public source standard", failures);
  assert(signalsHub.includes("Primary sources") && signalsHub.includes("Paper-level review"), "Signals hub missing public evidence principles", failures);
  assert(!/Financial Times|Wall Street Journal|POLITICO Pro|manual or licensed feed/.test(signalsHub), "Signals hub must not publish the internal source register", failures);
  assert(!/How to read the source trail|Signals by watch theme/.test(signalsHub), "Signals hub must not repeat source or Horizon framing", failures);
  assert(
      briefPage.includes("What happened") &&
      briefPage.includes("Why it matters") &&
      briefPage.includes("What to do") &&
      briefPage.includes(edition.weeklyReadout?.heading || "") &&
      (edition.weeklyReadout?.steps || []).every((step) => briefPage.includes(step)),
    "Weekly Brief is missing its compact current-edition readout",
    failures,
  );
  assert(briefPage.includes("Where the dependency sits") && briefPage.includes("Three questions from the week"), "Weekly Brief must retain its analysis and executive challenge", failures);
  assert(!/How the eight streams fed the issue|Three angles worth developing/.test(briefPage), "Weekly Brief must not repeat coverage or idea-development sections", failures);
  assert(signalsHub.includes(`Signals / ${edition.editionNumber} · ${formatDateLong(edition.publicationDate)}`), "Signals page edition label must include both edition number and long display date", failures);
  assert(count(/signal-freshness-tick/g, signalsHub) >= 40, "Signals overview missing freshness indicators", failures);
  assert(styles.includes("@media (prefers-reduced-motion: reduce)"), "Visual treatments missing reduced-motion fallback", failures);
  assert(!/withheld/i.test(horizonPage), "published Reg Horizon page contains stale withheld language", failures);
  assert(horizonPage.includes("What is moving — and what is next."), "published Reg Horizon page missing its reader-led purpose", failures);
  assert(horizonPage.includes(`Updated ${formatDateLong(horizon.edition)}`), "Reg Horizon page must identify its edition date", failures);
  const dueSoon = (horizon.confirmedDates || []).filter((entry) => {
    const days = (Date.parse(entry.deadline) - Date.parse(horizon.edition)) / 86_400_000;
    return days >= 0 && days <= 30;
  });
  const dueSoonAuthorities = new Set(dueSoon.map((entry) => entry.authority));
  const horizonPicture = `${dueSoon.length} confirmed date${dueSoon.length === 1 ? "" : "s"} fall within the next 30 days, across ${dueSoonAuthorities.size} authorit${dueSoonAuthorities.size === 1 ? "y" : "ies"}.`;
  assert(horizonPage.includes(horizonPicture), "Reg Horizon weekly picture must match the confirmed-date register", failures);
  assert(horizonPage.includes('href="/styles.css"'), "Reg Horizon must use the shared site stylesheet", failures);
  assert(horizonPage.includes('class="site-banner"'), "Reg Horizon must use the shared site header", failures);
  assert(horizonPage.includes('class="footer"'), "Reg Horizon must use the shared site footer", failures);
  assert(!horizonPage.includes('class="top"'), "Reg Horizon must not retain its standalone preview header", failures);
  assert(!horizonPage.includes("Change since last review"), "first Reg Horizon edition must not imply a prior public comparison", failures);
  for (const entry of horizon.confirmedDates || []) {
    assert(horizonPage.includes(entry.url), `published Reg Horizon page missing confirmed date source: ${entry.url}`, failures);
    assert(entry.deadline > horizon.edition, `published Reg Horizon deadline ${entry.deadline} must be after edition ${horizon.edition}`, failures);
  }
  const horizonArchive = `regulatory-horizon/archive/${horizon.edition}.html`;
  assert(fs.existsSync(path.join(SITE, horizonArchive)), `published Reg Horizon archive missing ${horizonArchive}`, failures);
  if (fs.existsSync(path.join(SITE, horizonArchive))) {
    const archivedHorizon = read(horizonArchive);
    assert(attr(archivedHorizon, /<link rel="canonical" href="([^"]+)"/) === `https://stgeorgesstrategy.com/regulatory-horizon/archive/${horizon.edition}.html`, "Reg Horizon archive canonical mismatch", failures);
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
  assert(!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(brief), "public pages must not fetch typography from Google Fonts", failures);
  assert(brief.includes('href="/feed.xml"'), "Weekly Brief must advertise the public RSS feed", failures);
  assert(brief.includes(`"headline": "${edition.mainJudgement}"`), "Weekly Brief structured data must use the current editorial judgement", failures);
  assert(brief.includes('content="https://stgeorgesstrategy.com/assets/og/weekly-brief-current.png"'), "Weekly Brief must use its contextual social card", failures);
  const deepDive = read("deep-dives/harness-problem/index.html");
  assert(deepDive.includes('content="https://stgeorgesstrategy.com/assets/og/deep-dive-harness-problem.png"'), "Deep Dive must use its contextual social card", failures);
  const agenticAuthority = read("deep-dives/agentic-authority/index.html");
  assert(agenticAuthority.includes('content="https://stgeorgesstrategy.com/assets/og/deep-dive-agentic-authority.png"'), "Agentic-authority Deep Dive must use its contextual social card", failures);
  assert(fs.existsSync(path.join(SITE, "assets", "og", "weekly-brief-current.png")), "current Weekly Brief social card missing", failures);
  assert(fs.existsSync(path.join(SITE, "assets", "og", "deep-dive-harness-problem.png")), "current Deep Dive social card missing", failures);
  assert(fs.existsSync(path.join(SITE, "assets", "og", "deep-dive-agentic-authority.png")), "agentic-authority social card missing", failures);
  const feed = read("feed.xml");
  assert(feed.includes("St Georges Strategy — Weekly Brief"), "public RSS feed must identify the Weekly Brief", failures);
  assert(feed.includes(`${edition.mainJudgement}</title>`), "public RSS feed must include the current editorial judgement", failures);
  const permanentBriefRoute = `/brief/${edition.publicationDate}/`;
  const permanentBriefUrl = `https://stgeorgesstrategy.com${permanentBriefRoute}`;
  const permanentBrief = `brief/${edition.publicationDate}/index.html`;
  assert(fs.existsSync(path.join(SITE, permanentBrief)), "current Weekly Brief permanent edition page missing", failures);
  if (fs.existsSync(path.join(SITE, permanentBrief))) {
    const permanentHtml = read(permanentBrief);
    assert(attr(permanentHtml, /<link rel="canonical" href="([^"]+)"/) === permanentBriefUrl, "permanent Weekly Brief canonical mismatch", failures);
    assert(attr(permanentHtml, /<meta property="og:url" content="([^"]+)"/) === permanentBriefUrl, "permanent Weekly Brief og:url mismatch", failures);
  }
  assert(brief.includes(`href="${permanentBriefRoute}"`), "latest Weekly Brief must link to its permanent edition", failures);
  assert(feed.includes(`<link>${permanentBriefUrl}</link>`), "RSS feed must link the current edition to its permanent URL", failures);

  const robots = read("robots.txt");
  assert(/User-agent: OAI-SearchBot\s+Allow: \//.test(robots), "robots.txt must explicitly permit OAI-SearchBot", failures);
  assert(/User-agent: Googlebot\s+Allow: \//.test(robots), "robots.txt must explicitly permit Googlebot", failures);
  assert(robots.includes("Sitemap: https://stgeorgesstrategy.com/sitemap.xml"), "robots.txt must advertise the sitemap", failures);

  const sitemap = read("sitemap.xml");
  const sitemapUrls = count(/<url>/g, sitemap);
  const sitemapLastmods = count(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, sitemap);
  assert(sitemapUrls > 0, "sitemap.xml should include URLs", failures);
  assert(sitemapLastmods === sitemapUrls, "sitemap.xml should include one valid lastmod date per URL", failures);
  assert(sitemap.includes("https://stgeorgesstrategy.com/regulatory-horizon/"), "sitemap.xml must include the published Reg Horizon route", failures);
  assert(sitemap.includes(permanentBriefUrl), "sitemap.xml must include the current permanent Weekly Brief URL", failures);
  assert(!/&(?!amp;|lt;|gt;|quot;|apos;)/.test(sitemap), "sitemap.xml must XML-escape special characters", failures);
  const notFound = read("404.html");
  assert(notFound.includes('href="/styles.css"'), "branded 404 must use the root stylesheet path", failures);
  assert(notFound.includes('href="/assets/favicon.svg"'), "branded 404 must use the root favicon path", failures);
  assert(archive.includes('href="/regulatory-horizon/"'), "Archive navigation must include the published Reg Horizon route", failures);
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
