import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isSpecificPublishedSourceUrl, validatePublishedRows } from "./lib/published_source_contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "site");
const DEFAULT_OUT = path.join(ROOT, "site-dist");
const DASHBOARD_HORIZON = path.join(ROOT, "dashboard", "regulatory-horizon");
const SIGNALS_INPUT = path.join(SOURCE, "data", "signals.json");
const ARCHIVE_STORE = path.join(ROOT, "dashboard", "signals-archive");
const PUBLIC_ORIGIN = "https://stgeorgesstrategy.com";
const FEED_XSL = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="rss/channel/title"/></title>
        <style>
          body { margin: 0; background: #e7e1d3; color: #15140f; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.55; }
          main { max-width: 980px; margin: 0 auto; padding: 32px 24px 64px; }
          .eyebrow { margin: 0 0 12px; color: #a07e2e; font: 600 12px ui-monospace, SFMono-Regular, monospace; letter-spacing: .16em; text-transform: uppercase; }
          h1 { margin: 0 0 12px; font: 700 clamp(34px, 6vw, 62px) Georgia, serif; line-height: 1.02; }
          p { max-width: 70ch; margin: 0 0 16px; }
          .note { color: #6b6555; font-size: 14px; }
          .item { padding: 20px 0; border-top: 1px solid rgba(15,34,51,.16); }
          .meta { color: #6b6555; font-size: 14px; }
          a { color: #0f2233; }
        </style>
      </head>
      <body>
        <main>
          <p class="eyebrow">RSS feed</p>
          <h1><xsl:value-of select="rss/channel/title"/></h1>
          <p><xsl:value-of select="rss/channel/description"/></p>
          <p class="note">This is the regulatory horizon feed in a browser-friendly view. Feed readers and automation can still consume the same URL as RSS XML.</p>
          <xsl:for-each select="rss/channel/item">
            <article class="item">
              <p class="meta">
                <xsl:value-of select="pubDate"/>
                <xsl:if test="category">
                  <xsl:text> / </xsl:text>
                  <xsl:value-of select="category"/>
                </xsl:if>
              </p>
              <h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a></h2>
              <p><xsl:value-of select="description"/></p>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;

const routes = [
  ["/", "index.html"],
  ["/brief/", "brief/index.html"],
  ["/signals/", "signals/index.html"],
  ["/signals/ai/", "signals/ai/index.html"],
  ["/signals/resilience/", "signals/resilience/index.html"],
  ["/signals/third-party/", "signals/third-party/index.html"],
  ["/signals/market-structure/", "signals/market-structure/index.html"],
  ["/signals/financial-crime/", "signals/financial-crime/index.html"],
  ["/signals/cyber/", "signals/cyber/index.html"],
  ["/signals/technology-failure/", "signals/technology-failure/index.html"],
  ["/signals/data/", "signals/data/index.html"],
  ["/regulatory-horizon/", "regulatory-horizon/index.html"],
  ["/archive/", "archive/index.html"],
  ["/about/", "about/index.html"],
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

const TOP5_COUNT = 5;
const ADDITIONAL_COUNT = 5;

const redirects = [
  ["/intelligence/", "/brief/"],
  ["/intelligence/archive/", "/archive/"],
  ["/intelligence/regulatory-horizon/", "/regulatory-horizon/"],
  ["/ai-signals/", "/signals/ai/"],
  ["/ai-signals/archive/", "/signals/ai/archive/"],
  ["/thevirtualofficer/", "/about/"],
  ["/thevirtualofficer/brief/", "/brief/"],
  ["/thevirtualofficer/signals/", "/signals/"],
  ["/thevirtualofficer/signals/ai/", "/signals/ai/"],
  ["/thevirtualofficer/regulatory-horizon/", "/regulatory-horizon/"],
];

const RISK_AREA_LABELS = {
  "balance-sheet": "Balance sheet",
  "customer-outcomes": "Customer outcomes",
  "boardroom-and-accountability": "Boardroom and accountability",
  "crime-and-sanctions": "Crime and sanctions",
  "digital-resilience": "Digital resilience",
  "ai-and-models": "AI and models",
  "digital-money": "Digital money",
  "market-plumbing": "Market plumbing",
};

function parseArgs(argv) {
  const options = {
    out: DEFAULT_OUT,
    edition: "",
    commitCheck: false,
    analyticsToken: process.env.CF_WEB_ANALYTICS_TOKEN || "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") options.out = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--out=")) options.out = path.resolve(arg.slice("--out=".length));
    else if (arg === "--edition") options.edition = argv[++index] || "";
    else if (arg.startsWith("--edition=")) options.edition = arg.slice("--edition=".length);
    else if (arg === "--analytics-token") options.analyticsToken = argv[++index] || "";
    else if (arg.startsWith("--analytics-token=")) options.analyticsToken = arg.slice("--analytics-token=".length);
    else if (arg === "--commit-check") options.commitCheck = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!options.out) throw new Error("--out cannot be empty.");
  if (options.edition && !/^\d{4}-\d{2}-\d{2}$/.test(options.edition)) {
    throw new Error("--edition must use YYYY-MM-DD.");
  }

  return options;
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

function readJson(file) {
  return JSON.parse(read(file));
}

function routeFile(out, route) {
  return path.join(out, route);
}

function copySite(out) {
  const relativeOut = path.relative(ROOT, out);
  if (!relativeOut || relativeOut.startsWith("..") || path.isAbsolute(relativeOut)) {
    throw new Error("Dry-run output must stay inside the project workspace.");
  }
  if (!relativeOut.includes("site-dist")) {
    throw new Error("Refusing to clean an output path that does not include site-dist.");
  }

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  fs.cpSync(SOURCE, out, {
    recursive: true,
    filter: (sourcePath) => !sourcePath.includes(`${path.sep}qa${path.sep}`),
  });
}

function copyIfExists(from, to) {
  if (!fs.existsSync(from)) return false;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  return true;
}

function copyHorizonArtifacts(out) {
  const horizonOut = path.join(out, "regulatory-horizon");
  const latestIn = path.join(DASHBOARD_HORIZON, "latest.json");
  const latestOut = path.join(horizonOut, "latest.json");
  if (copyIfExists(latestIn, latestOut)) {
    const latest = readJson(latestOut);
    if (Array.isArray(latest.signals)) latest.signals = latest.signals.slice(0, TOP5_COUNT + ADDITIONAL_COUNT);
    write(latestOut, `${JSON.stringify(latest, null, 2)}\n`);
  }
  copyIfExists(path.join(DASHBOARD_HORIZON, "feed.xml"), path.join(horizonOut, "feed.xml"));
  copyIfExists(path.join(DASHBOARD_HORIZON, "horizon.ics"), path.join(horizonOut, "horizon.ics"));
  write(path.join(horizonOut, "feed.xsl"), FEED_XSL);
  copyIfExists(path.join(ROOT, "dashboard", "data", "ai-signals.json"), path.join(out, "data", "ai-signals.json"));

  const archiveIn = path.join(DASHBOARD_HORIZON, "archive");
  const archiveOut = path.join(horizonOut, "archive");
  if (fs.existsSync(archiveIn)) fs.cpSync(archiveIn, archiveOut, { recursive: true });
}

function decorateHorizonFeed(out) {
  const feedFile = path.join(out, "regulatory-horizon", "feed.xml");
  if (!fs.existsSync(feedFile)) return;
  const xml = read(feedFile);
  if (xml.includes("xml-stylesheet")) return;
  if (xml.startsWith("<?xml")) {
    const end = xml.indexOf("?>");
    if (end !== -1) {
      write(
        feedFile,
        `${xml.slice(0, end + 2)}<?xml-stylesheet type="text/xsl" href="feed.xsl"?>${xml.slice(end + 2)}`,
      );
      return;
    }
  }
  write(feedFile, `<?xml-stylesheet type="text/xsl" href="feed.xsl"?>${xml}`);
}

function normaliseMockupLinks(out) {
  const replacements = [
    [/href="\.\.\/\.\.\/\.\.\/dashboard\/regulatory-horizon\/feed\.xml"/g, 'href="feed.xml"'],
    [/href="\.\.\/\.\.\/\.\.\/dashboard\/regulatory-horizon\/horizon\.ics"/g, 'href="horizon.ics"'],
    [/href="\.\.\/\.\.\/\.\.\/dashboard\/regulatory-horizon\/archive\/([^"]+)"/g, 'href="archive/$1"'],
    [/href="\.\.\/\.\.\/\.\.\/\.\.\/dashboard\/data\/ai-signals\.json"/g, 'href="../../data/ai-signals.json"'],
  ];

  for (const html of listFiles(out, ".html")) {
    let text = read(html);
    for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement);
    write(html, text);
  }
}

function normaliseHorizonArchiveLinks(out) {
  const archiveDir = path.join(out, "regulatory-horizon", "archive");
  if (!fs.existsSync(archiveDir)) return;

  for (const html of listFiles(archiveDir, ".html")) {
    let text = read(html);
    text = text
      .replace(/href="feed\.xml"/g, 'href="../feed.xml"')
      .replace(/href="horizon\.ics"/g, 'href="../horizon.ics"')
      .replace(/href="latest\.json"/g, 'href="../latest.json"')
      .replace(/href="archive\/([^"]+)"/g, 'href="$1"');
    write(html, text);
  }
}

function isExternalReference(value) {
  return /^(https?:|mailto:|tel:|data:|#|\/\/)/.test(value);
}

function toRootRelativeReference(out, file, value) {
  if (!value || isExternalReference(value) || value.startsWith("/")) return value;
  const [clean, hash = ""] = value.split("#");
  if (!clean) return value;

  let target = path.normalize(path.join(path.dirname(file), clean));
  const hasExtension = Boolean(path.extname(target));
  if (clean.endsWith("/") || !hasExtension) target = path.join(target, "index.html");
  if (!fs.existsSync(target)) return value;

  let relative = path.relative(out, target).replaceAll(path.sep, "/");
  if (relative === "index.html") return hash ? `/#${hash}` : "/";
  if (relative.endsWith("/index.html")) relative = relative.slice(0, -"index.html".length);
  const suffix = hash ? `#${hash}` : "";
  return `/${relative}${suffix}`;
}

function normaliseHtmlReferencesToRoot(out) {
  for (const file of listFiles(out, ".html")) {
    let text = read(file);
    text = text.replace(/\b(href|src)="([^"]+)"/g, (_match, attr, value) => {
      return `${attr}="${toRootRelativeReference(out, file, value)}"`;
    });
    text = text.replace(/\bhref="\/index\.html([#?][^"]*)?"/g, (_match, suffix = "") => `href="/${suffix}"`);
    write(file, text);
  }
}

function injectAnalytics(out, token) {
  if (!token) return false;
  const snippet = `\n    <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${escapeHtml(token)}"}'></script>`;
  for (const file of listFiles(out, ".html")) {
    const html = read(file);
    if (html.includes("static.cloudflareinsights.com/beacon.min.js")) continue;
    write(file, html.replace("</head>", `${snippet}\n  </head>`));
  }
  return true;
}

function listFiles(dir, extension) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(full, extension));
    else if (entry.name.endsWith(extension)) files.push(full);
  }
  return files;
}

function latestEdition(out, preferred) {
  if (preferred) return preferred;
  const latest = path.join(out, "regulatory-horizon", "latest.json");
  if (fs.existsSync(latest)) {
    const data = readJson(latest);
    if (/^\d{4}-\d{2}-\d{2}$/.test(data.edition || "")) return data.edition;
  }
  return "2026-07-04";
}

function listEditionDates(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .reverse();
}

// Freezes this edition's brief and topic pages into a persistent, git-tracked store
// (dashboard/signals-archive/) that survives the site-dist wipe-and-rebuild at the top
// of every publish run, then copies the full accumulated history forward into this
// build's output. Without this, dated archive URLs only ever contained whatever
// edition happened to be "current" at build time, because site-dist itself is deleted
// and regenerated from source on every run.
function syncSignalsArchiveStore(out, edition) {
  archiveIntoStore(out, "brief/index.html", path.join(ARCHIVE_STORE, "brief", edition, "index.html"));
  for (const topic of topics) {
    archiveIntoStore(
      out,
      `signals/${topic}/index.html`,
      path.join(ARCHIVE_STORE, "topics", topic, edition, "index.html"),
    );
  }

  const briefStoreDir = path.join(ARCHIVE_STORE, "brief");
  if (fs.existsSync(briefStoreDir)) {
    fs.cpSync(briefStoreDir, path.join(out, "archive", "brief"), { recursive: true });
  }
  for (const topic of topics) {
    const topicStoreDir = path.join(ARCHIVE_STORE, "topics", topic);
    if (fs.existsSync(topicStoreDir)) {
      fs.cpSync(topicStoreDir, path.join(out, "signals", topic, "archive"), { recursive: true });
    }
  }
}

function archiveIntoStore(out, sourceRelative, destinationFile) {
  const sourceFile = path.join(out, sourceRelative);
  let text = read(sourceFile);
  text = text.replace(/\b(href|src)="([^"]+)"/g, (_match, attr, value) => {
    return `${attr}="${toRootRelativeReference(out, sourceFile, value)}"`;
  });
  write(destinationFile, text);
}

function buildArchiveHubPage({ title, eyebrow, description, cards, backHref, backLabel }) {
  const cardsHtml = cards.length
    ? cards
        .map(
          (card) =>
            `<a class="archive-card" href="${escapeHtml(card.href)}"><p class="meta">${escapeHtml(card.meta)}</p><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.description)}</p></a>`,
        )
        .join("\n          ")
    : "<p>No dated editions archived yet. Check back after the next weekly publish.</p>";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <header class="site-banner" aria-label="Primary">
      <div class="site-banner-inner">
        <a class="site-wordmark" href="/"><span class="site-mark" aria-hidden="true">SGS</span><span>St Georges Strategy</span></a>
        <nav class="site-nav" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/brief/">Weekly Brief</a>
          <a href="/signals/">Signals</a>
          <a href="/regulatory-horizon/">Reg Horizon</a>
          <a href="/archive/" aria-current="page">Archive</a>
          <a href="/about/">About</a>
        </nav>
      </div>
    </header>
    <main class="page">
      <section class="masthead">
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="dek">${escapeHtml(description)}</p>
      </section>
      <section class="band">
        <div class="archive-grid">
          ${cardsHtml}
        </div>
        <p><a href="${escapeHtml(backHref)}">${escapeHtml(backLabel)}</a></p>
      </section>
    </main>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">Archive</div>
        <div class="footer-meta">
          <p>Written by Ben St Georges, drawing on over two decades of financial-services risk, regulation, strategy, and transformation experience.</p>
          <p class="footer-contact"><a href="mailto:ben@stgeorgesstrategy.com">ben@stgeorgesstrategy.com</a> &middot; <a href="https://www.linkedin.com/in/benstgeorges/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </div>
      </div>
    </footer>
  </body>
</html>
`;
}

function generateArchiveHubPages(out) {
  const signalsData = fs.existsSync(SIGNALS_INPUT) ? readJson(SIGNALS_INPUT) : { topics: [] };
  const topicMeta = new Map((signalsData.topics || []).map((topic) => [topic.id, topic]));

  const briefDates = listEditionDates(path.join(ARCHIVE_STORE, "brief"));
  write(
    path.join(out, "archive", "brief", "index.html"),
    buildArchiveHubPage({
      title: "Weekly Brief Archive | The Virtual Officer",
      eyebrow: "Archive / Weekly Brief",
      description: "Every dated edition of the weekly brief, preserved exactly as published.",
      cards: briefDates.map((date) => ({
        href: `/archive/brief/${date}/`,
        meta: `Edition / ${date}`,
        title: `Weekly Brief — ${date}`,
        description: "Open the brief exactly as it was published that week.",
      })),
      backHref: "/archive/",
      backLabel: "Back to the archive",
    }),
  );

  for (const topic of topics) {
    const meta = topicMeta.get(topic) || {};
    const topicTitle = String(meta.title || topic).replace(/\.+$/, "");
    const dates = listEditionDates(path.join(ARCHIVE_STORE, "topics", topic));
    write(
      path.join(out, "signals", topic, "archive", "index.html"),
      buildArchiveHubPage({
        title: `${topicTitle} Archive | The Virtual Officer`,
        eyebrow: `Archive / Signals / ${topic}`,
        description: `Every dated edition of the ${topic.replace(/-/g, " ")} topic page, preserved exactly as published.`,
        cards: dates.map((date) => ({
          href: `/signals/${topic}/archive/${date}/`,
          meta: `Edition / ${date}`,
          title: `${topicTitle} — ${date}`,
          description: "Open this topic page exactly as it was published that week.",
        })),
        backHref: `/signals/${topic}/`,
        backLabel: "Back to the current edition",
      }),
    );
  }
}

function updateArchiveIndexCards(out) {
  const file = path.join(out, "archive", "index.html");
  if (!fs.existsSync(file)) return;
  const html = read(file);
  const startMarker = "<!-- archive-grid:start -->";
  const endMarker = "<!-- archive-grid:end -->";
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) return;

  const signalsData = fs.existsSync(SIGNALS_INPUT) ? readJson(SIGNALS_INPUT) : { topics: [] };
  const topicMeta = new Map((signalsData.topics || []).map((topic) => [topic.id, topic]));
  const horizonEdition = latestEdition(out);

  const briefDates = listEditionDates(path.join(ARCHIVE_STORE, "brief"));
  const cards = [];
  cards.push(
    `<a class="archive-card" href="/archive/brief/"><p class="meta">${briefDates.length ? `${briefDates.length} edition${briefDates.length === 1 ? "" : "s"} archived, latest ${briefDates[0]}` : "Brief archive"}</p><h3>Weekly brief archive</h3><p>Every dated issue, preserved as published.</p></a>`,
  );

  for (const topic of topics) {
    const meta = topicMeta.get(topic) || {};
    const dates = listEditionDates(path.join(ARCHIVE_STORE, "topics", topic));
    cards.push(
      `<a class="archive-card" href="/signals/${topic}/archive/"><p class="meta">${dates.length ? `${dates.length} edition${dates.length === 1 ? "" : "s"} archived, latest ${dates[0]}` : "Topic archive"}</p><h3>${escapeHtml(meta.title || topic)}</h3><p>Top 5 shortlist, additional evidence rows, and source trail.</p></a>`,
    );
  }

  cards.push(
    `<a class="archive-card" href="/regulatory-horizon/"><p class="meta">Reg Horizon</p><h3>Reg Horizon scan${horizonEdition ? ` / ${escapeHtml(horizonEdition)}` : ""}</h3><p>Public-source horizon scan with bottom line, deadline, material signals, and machine outputs.</p></a>`,
  );

  const rebuilt = `${html.slice(0, start)}${startMarker}\n          ${cards.join("\n          ")}\n          ${html.slice(end)}`;
  write(file, rebuilt);
}

function stripTags(text) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(text) {
  return text
    .replace(/&middot;/g, "·")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normaliseLockedText(text) {
  return decodeEntities(stripTags(text)).replace(/\s+/g, " ").trim();
}

function extractLockedSection(html, key) {
  const start = `<!-- publisher-lock:start:${key} -->`;
  const end = `<!-- publisher-lock:end:${key} -->`;
  const startIndex = html.indexOf(start);
  const endIndex = html.indexOf(end);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) return "";
  return html.slice(startIndex + start.length, endIndex);
}

function verifyLockedSections(out, failures) {
  const locked = [
    { file: "index.html", key: "home-editorial" },
    { file: "brief/index.html", key: "brief-editorial" },
    { file: "signals/index.html", key: "signals-editorial" },
  ];

  for (const item of locked) {
    const sourceFile = path.join(SOURCE, item.file);
    const outputFile = path.join(out, item.file);
    const sourceSection = extractLockedSection(read(sourceFile), item.key);
    const outputSection = extractLockedSection(read(outputFile), item.key);
    assert(Boolean(sourceSection), `${item.file} missing source lock marker ${item.key}`, failures);
    assert(Boolean(outputSection), `${item.file} missing generated lock marker ${item.key}`, failures);
    if (!sourceSection || !outputSection) continue;
    assert(
      normaliseLockedText(sourceSection) === normaliseLockedText(outputSection),
      `${item.file} publisher-locked section ${item.key} changed during build`,
      failures,
    );
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateLong(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatDateShort(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function titleCaseType(value) {
  return String(value || "signal")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function signalMeta(signal) {
  const parts = [];
  if (signal.source) parts.push(signal.source);
  if (signal.type) parts.push(titleCaseType(signal.type));
  if (signal.date) parts.push(formatDateShort(signal.date));
  return parts.join(" / ");
}

function riskLabel(signal) {
  const labels = (signal.riskAreas || []).map((area) => RISK_AREA_LABELS[area] || area);
  return labels[0] || "Leadership signal";
}

function renderSignalList(signals, count = 5) {
  return (signals || [])
    .slice(0, count)
    .map((signal, index) => {
      const rank = String(index + 1).padStart(2, "0");
      return `<li><span class="rank">${rank}</span><a href="${escapeHtml(signal.url)}"><h3>${escapeHtml(signal.title)}</h3></a><span class="meta">${escapeHtml(signalMeta(signal) || riskLabel(signal))}</span></li>`;
    })
    .join("");
}

function renderHorizonList(entries) {
  return (entries || [])
    .map((entry) => {
      const source = entry.source ? ` / ${entry.source}` : "";
      return `<li><time datetime="${escapeHtml(entry.date)}">${escapeHtml(formatDateShort(entry.date))}</time><span><a href="${escapeHtml(entry.url)}">${escapeHtml(entry.title)}</a>${escapeHtml(source)}</span><span class="owner">${escapeHtml(entry.prompts?.owner || "Owner to assign")}</span></li>`;
    })
    .join("");
}

function renderThemeCards(signals) {
  const grouped = new Map();
  for (const signal of signals || []) {
    for (const area of signal.riskAreas || []) {
      if (!grouped.has(area)) grouped.set(area, []);
      grouped.get(area).push(signal);
    }
  }
  return Object.keys(RISK_AREA_LABELS)
    .filter((slug) => grouped.has(slug))
    .map((slug) => {
      const items = grouped.get(slug) || [];
      const first = items[0] || {};
      const extra = items.length > 1 ? ` Plus ${items.length - 1} more.` : "";
      return `<a class="archive-card" href="../regulatory-horizon/index.html"><p class="meta">${escapeHtml(slug)}</p><h3>${escapeHtml(RISK_AREA_LABELS[slug])}</h3><p>${escapeHtml(first.title || "No material signal in this edition")}${escapeHtml(extra)}</p></a>`;
    })
    .join("");
}

function assessPublisherWarnings(horizonData) {
  const warnings = [];
  const commentaryOnly = (horizonData.horizon || []).filter((entry) =>
    /regulation tomorrow/i.test(entry.source || ""),
  );
  if (commentaryOnly.length && commentaryOnly.length === (horizonData.horizon || []).length) {
    warnings.push(
      "All live horizon entries are commentary-sourced. Review reg-scan deadline extraction and primary-source support before treating horizon dates as final.",
    );
  }
  return warnings;
}

function loadHorizonData(out, failures) {
  const file = path.join(out, "regulatory-horizon", "latest.json");
  assert(fs.existsSync(file), "Reg Horizon latest.json missing for live page refresh", failures);
  if (!fs.existsSync(file)) {
    return { edition: "2026-07-04", bottomLine: "", signals: [], horizon: [], warnings: [] };
  }
  return readJson(file);
}

function applyLiveEditionContent(out, horizonData) {
  void out;
  void horizonData;
}

function loadSignalsData(edition, failures) {
  assert(fs.existsSync(SIGNALS_INPUT), "signals.json input missing at site/data/signals.json", failures);
  if (!fs.existsSync(SIGNALS_INPUT)) return { edition, topics: [] };

  const data = readJson(SIGNALS_INPUT);
  data.edition = edition;
  data.generatedAt = data.generatedAt || new Date().toISOString();
  data.source = data.source || "signals-json-contract";
  validateSignalsData(data, failures);
  return data;
}

function validateSignalsData(data, failures) {
  assert(Array.isArray(data.topics), "signals.json must contain topics[]", failures);
  const byId = new Map((data.topics || []).map((topic) => [topic.id, topic]));
  for (const topicId of topics) {
    const topic = byId.get(topicId);
    assert(Boolean(topic), `signals.json missing topic ${topicId}`, failures);
    if (!topic) continue;
    assert(topic.route === `/signals/${topicId}/`, `${topicId} route mismatch in signals.json`, failures);
    assert(Array.isArray(topic.top5) && topic.top5.length === TOP5_COUNT, `${topicId} must have five top5 rows`, failures);
    const additionalRows = getAdditionalRows(topic);
    assert(
      Array.isArray(additionalRows) && additionalRows.length === ADDITIONAL_COUNT,
      `${topicId} must have five additional rows`,
      failures,
    );
    for (const [index, row] of [...(topic.top5 || []), ...additionalRows].entries()) {
      assert(row.title, `${topicId} row ${index + 1} missing title`, failures);
      assert(/^https:\/\//.test(row.url || ""), `${topicId} row ${index + 1} missing https URL`, failures);
      assert(row.source, `${topicId} row ${index + 1} missing source label`, failures);
      assert(
        isSpecificPublishedSourceUrl(row.url || ""),
        `${topicId} row ${index + 1} uses a generic or unsupported source URL: ${row.url}`,
        failures,
      );
    }
    const publishedValidation = validatePublishedRows([...(topic.top5 || []), ...additionalRows], {
      label: topicId,
      resolveRowUrl: (row) => row.url,
      resolveRowSourceLabel: (row) => row.source,
      maxExactReusePerTopic: 2,
    });
    failures.push(...publishedValidation.failures);
  }
}

function getAdditionalRows(topic) {
  if (Array.isArray(topic.additional5)) return topic.additional5.slice(0, ADDITIONAL_COUNT);
  return [];
}

function renderTopicPagesFromSignals(out, signalsData) {
  const byId = new Map(signalsData.topics.map((topic) => [topic.id, topic]));
  for (const topicId of topics) {
    const topic = byId.get(topicId);
    if (!topic) continue;
    const file = path.join(out, "signals", topicId, "index.html");
    let html = read(file);
    const top5Html = topic.top5
      .map((row) => {
        return `<li><a href="${escapeHtml(row.url)}">${escapeHtml(row.title)}</a><span class="top-source">${escapeHtml(row.source)}</span></li>`;
      })
      .join("\n              ");
    const additionalRows = getAdditionalRows(topic);
    const additionalHtml = additionalRows
      .map((row, index) => {
        const rank = String(row.rank || index + 6).padStart(2, "0");
        return `<li><span class="rank">${rank}</span><a href="${escapeHtml(row.url)}"><h3>${escapeHtml(row.title)}</h3></a><span class="meta">${escapeHtml(row.source)}</span></li>`;
      })
      .join("\n              ");

    html = html.replace(
      /<ul class="mini-list">[\s\S]*?<\/ul>/,
      `<ul class="mini-list">\n              ${top5Html}\n            </ul>`,
    );
    html = html.replace(
      /<ol class="brief-index evidence-list">[\s\S]*?<\/ol>/,
      `<ol class="brief-index evidence-list">\n              ${additionalHtml}\n            </ol>`,
    );
    write(file, html);
  }
}

function generateSignalsJson(out, data) {
  write(path.join(out, "data", "signals.json"), `${JSON.stringify(data, null, 2)}\n`);
}

function generateSitemap(out, edition) {
  const briefDates = listEditionDates(path.join(ARCHIVE_STORE, "brief"));
  const urls = [
    ...routes.map(([route]) => `${PUBLIC_ORIGIN}${route}`),
    `${PUBLIC_ORIGIN}/archive/brief/`,
    ...briefDates.map((date) => `${PUBLIC_ORIGIN}/archive/brief/${date}/`),
  ];
  for (const topic of topics) {
    urls.push(`${PUBLIC_ORIGIN}/signals/${topic}/archive/`);
    for (const date of listEditionDates(path.join(ARCHIVE_STORE, "topics", topic))) {
      urls.push(`${PUBLIC_ORIGIN}/signals/${topic}/archive/${date}/`);
    }
  }
  if (!briefDates.includes(edition)) urls.push(`${PUBLIC_ORIGIN}/archive/brief/${edition}/`);

  const horizonArchive = path.join(out, "regulatory-horizon", "archive", `${edition}.html`);
  if (fs.existsSync(horizonArchive)) urls.push(`${PUBLIC_ORIGIN}/regulatory-horizon/archive/${edition}.html`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`).join("\n")}
</urlset>
`;
  write(path.join(out, "sitemap.xml"), xml);
  return urls;
}

function generateRedirects(out) {
  const lines = redirects.map(([from, to]) => `${from} ${to} 301`);
  write(path.join(out, "_redirects"), `${lines.join("\n")}\n`);
}

function generateHeaders(out) {
  const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com; upgrade-insecure-requests

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/data/*
  Cache-Control: public, max-age=300

/regulatory-horizon/latest.json
  Cache-Control: public, max-age=300

/regulatory-horizon/feed.xml
  Cache-Control: public, max-age=300

/regulatory-horizon/horizon.ics
  Cache-Control: public, max-age=300
`;
  write(path.join(out, "_headers"), headers);
}

function checkLocalLinks(out, failures) {
  for (const file of listFiles(out, ".html")) {
    const html = read(file);
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      const clean = href.split("#")[0];
      if (!clean) continue;
      let target = clean.startsWith("/")
        ? path.normalize(path.join(out, clean.slice(1)))
        : path.normalize(path.join(path.dirname(file), clean));
      if (clean.endsWith("/") || !path.extname(target)) target = path.join(target, "index.html");
      assert(fs.existsSync(target), `${path.relative(out, file)} links to missing ${href}`, failures);
    }
  }
}

function verifyBuild(out, edition, sitemapUrls, failures) {
  for (const [route, relative] of routes) {
    const file = routeFile(out, relative);
    assert(fs.existsSync(file), `${route} missing generated file ${relative}`, failures);
    if (!fs.existsSync(file)) continue;
    const html = read(file);
    const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || "";
    const expected = `${PUBLIC_ORIGIN}${route}`;
    assert(canonical === expected, `${route} canonical should be ${expected}, got ${canonical}`, failures);
    assert(html.includes("Not investment, legal, compliance, or regulatory advice"), `${route} missing disclaimer`, failures);
  }

  assert(fs.existsSync(path.join(out, "archive", "brief", edition, "index.html")), "Weekly brief archive copy missing", failures);
  for (const topic of topics) {
    assert(
      fs.existsSync(path.join(out, "signals", topic, "archive", edition, "index.html")),
      `${topic} topic archive copy missing`,
      failures,
    );
  }

  const horizonFiles = ["latest.json", "feed.xml", "horizon.ics"];
  for (const file of horizonFiles) {
    assert(fs.existsSync(path.join(out, "regulatory-horizon", file)), `Reg Horizon ${file} missing`, failures);
  }

  const signals = readJson(path.join(out, "data", "signals.json"));
  assert(signals.topics?.length === topics.length, "signals.json should contain all eight topics", failures);
  assert(
    signals.topics?.every((topic) => topic.top5?.length === TOP5_COUNT && getAdditionalRows(topic)?.length === ADDITIONAL_COUNT),
    "signals.json topics should contain Top 5 plus 5 more",
    failures,
  );

  assert(sitemapUrls.length >= 23, `sitemap should include current routes and archives, found ${sitemapUrls.length}`, failures);
  assert(fs.existsSync(path.join(out, "_redirects")), "_redirects missing", failures);
  assert(fs.existsSync(path.join(out, "_headers")), "_headers missing", failures);
  checkLocalLinks(out, failures);
  verifyLockedSections(out, failures);
}

function writeReport(out, edition, sitemapUrls, analyticsInjected, failures, publisherWarnings = []) {
  const report = {
    status: failures.length ? "failed" : "passed",
    generatedAt: new Date().toISOString(),
    edition,
    routes: routes.map(([route]) => route),
    topics,
    archiveCopies: {
      brief: `/archive/brief/${edition}/`,
      topics: topics.map((topic) => `/signals/${topic}/archive/${edition}/`),
      horizon: `/regulatory-horizon/archive/${edition}.html`,
    },
    sitemapUrlCount: sitemapUrls.length,
    analyticsInjected,
    publisherWarnings,
    redirects: redirects.map(([from, to]) => ({ from, to, status: 301 })),
    failures,
  };
  write(path.join(out, "publish-report.json"), `${JSON.stringify(report, null, 2)}\n`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const failures = [];
  copySite(options.out);
  copyHorizonArtifacts(options.out);
  decorateHorizonFeed(options.out);
  normaliseMockupLinks(options.out);
  normaliseHorizonArchiveLinks(options.out);
  const edition = latestEdition(options.out, options.edition);
  const horizonData = loadHorizonData(options.out, failures);
  const signalsData = loadSignalsData(edition, failures);
  renderTopicPagesFromSignals(options.out, signalsData);
  applyLiveEditionContent(options.out, horizonData);
  syncSignalsArchiveStore(options.out, edition);
  generateArchiveHubPages(options.out);
  updateArchiveIndexCards(options.out);
  generateSignalsJson(options.out, signalsData);
  const sitemapUrls = generateSitemap(options.out, edition);
  generateRedirects(options.out);
  generateHeaders(options.out);
  normaliseHtmlReferencesToRoot(options.out);
  normaliseHorizonArchiveLinks(options.out);
  const analyticsInjected = injectAnalytics(options.out, options.analyticsToken);
  const publisherWarnings = assessPublisherWarnings(horizonData);
  verifyBuild(options.out, edition, sitemapUrls, failures);
  writeReport(options.out, edition, sitemapUrls, analyticsInjected, failures, publisherWarnings);

  if (failures.length) {
    console.error("Site bundle publish failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("Site bundle publish passed.");
  console.log(`Output: ${path.relative(ROOT, options.out)}`);
  console.log(`Edition: ${edition}`);
  console.log(`Routes generated: ${routes.length}`);
  console.log(`Topic archives generated: ${topics.length}`);
  console.log(`Sitemap URLs: ${sitemapUrls.length}`);
  console.log(`Analytics injected: ${analyticsInjected ? "yes" : "no"}`);
  if (publisherWarnings.length) {
    for (const warning of publisherWarnings) console.warn(`Warning: ${warning}`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
