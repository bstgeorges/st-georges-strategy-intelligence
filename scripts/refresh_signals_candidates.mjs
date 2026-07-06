import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  isSpecificPublishedSourceUrl,
  loadPublishedSourceMap,
  resolvePublishedSource,
} from "./lib/published_source_contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FEED_REGISTRY_PATH = path.join(ROOT, "dashboard", "data", "signals-feed-registry.json");
const SOURCE_REGISTRY_PATH = path.join(ROOT, "dashboard", "data", "source-registry.json");
const STATE_PATH = path.join(ROOT, "dashboard", "data", "signals-candidate-state.json");
const OUTPUT_PATH = path.join(ROOT, "dashboard", "data", "signals-candidates.generated.json");
const HORIZON_PATH = path.join(ROOT, "dashboard", "regulatory-horizon", "latest.json");

const TOPICS = ["ai", "market-structure", "third-party"];
const TRACKING_PARAMS = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"]);

function parseArgs(argv) {
  const options = {
    offline: false,
    includeSeen: false,
    writeState: true,
    out: OUTPUT_PATH,
    state: STATE_PATH,
    windowDaysOverride: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--offline") options.offline = true;
    else if (arg === "--include-seen") options.includeSeen = true;
    else if (arg === "--no-state-write") options.writeState = false;
    else if (arg === "--out") options.out = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--out=")) options.out = path.resolve(arg.slice("--out=".length));
    else if (arg === "--state") options.state = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--state=")) options.state = path.resolve(arg.slice("--state=".length));
    else if (arg === "--window-days") options.windowDaysOverride = Number(argv[++index] || "");
    else if (arg.startsWith("--window-days=")) options.windowDaysOverride = Number(arg.slice("--window-days=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function canonicaliseUrl(rawUrl) {
  const url = new URL(rawUrl);
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMS.has(key.toLowerCase())) url.searchParams.delete(key);
  }
  const pathname = url.pathname.endsWith("/") && url.pathname !== "/" ? url.pathname.slice(0, -1) : url.pathname;
  url.pathname = pathname || "/";
  url.hash = "";
  return url.toString();
}

function urlHash(rawUrl) {
  return crypto.createHash("sha256").update(canonicaliseUrl(rawUrl)).digest("hex");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function xmlField(block, tag) {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = block.match(pattern);
  return match ? decodeXml(match[1].trim()) : "";
}

function xmlAttr(block, tag, attr) {
  const pattern = new RegExp(`<${tag}[^>]*${attr}="([^"]+)"[^>]*>`, "i");
  const match = block.match(pattern);
  return match ? decodeXml(match[1].trim()) : "";
}

function normalizeDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "st-georges-signals-candidate-ingestion/0.1" },
  });
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} for ${url}`);
  }
  return response.text();
}

function parseRssOrAtom(xml, source) {
  const blocks = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  const entries = blocks.length
    ? blocks.map((block) => ({
        title: xmlField(block, "title"),
        url: xmlField(block, "link"),
        publishedAt: normalizeDate(xmlField(block, "pubDate") || xmlField(block, "published") || xmlField(block, "updated")),
        summary: xmlField(block, "description") || xmlField(block, "summary"),
      }))
    : [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => {
        const block = match[0];
        return {
          title: xmlField(block, "title"),
          url: xmlAttr(block, "link", "href") || xmlField(block, "id"),
          publishedAt: normalizeDate(xmlField(block, "updated") || xmlField(block, "published")),
          summary: xmlField(block, "summary") || xmlField(block, "content"),
        };
      });

  return entries
    .filter((entry) => entry.title && entry.url)
    .slice(0, source.maxItems || 8);
}

function parseSitemap(xml, source) {
  const urls = [...xml.matchAll(/<url\b[\s\S]*?<\/url>/gi)]
    .map((match) => {
      const block = match[0];
      return {
        url: xmlField(block, "loc"),
        lastmod: normalizeDate(xmlField(block, "lastmod")),
      };
    })
    .filter((entry) => entry.url && /\/(news|blog)\//i.test(entry.url));

  return urls.slice(0, source.maxItems || 8);
}

async function enrichSitemapEntries(entries) {
  const enriched = [];
  for (const entry of entries) {
    try {
      const html = await fetchText(entry.url);
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i);
      const title = decodeXml((ogTitle?.[1] || titleMatch?.[1] || "").trim()).replace(/\s+/g, " ");
      if (title) {
        enriched.push({
          title,
          url: entry.url,
          publishedAt: entry.lastmod,
          summary: "",
        });
      }
    } catch {
      // Skip a page-level fetch failure; keep the pipeline moving.
    }
  }
  return enriched;
}

function isRecent(iso, windowDays, now) {
  if (!iso) return true;
  const published = new Date(iso);
  if (Number.isNaN(published.getTime())) return true;
  return published.getTime() >= now.getTime() - windowDays * 24 * 60 * 60 * 1000;
}

function matchesKeywords(entry, source) {
  const hints = source.keywordHints || [];
  if (!hints.length) return true;
  const haystack = `${entry.title || ""} ${entry.summary || ""}`.toLowerCase();
  return hints.some((hint) => haystack.includes(String(hint).toLowerCase()));
}

function topicFromHorizonSignal(signal, source) {
  const riskAreas = signal.riskAreas || [];
  const configuredRiskAreas = new Set(source.riskAreas || []);
  const hasRiskMatch = riskAreas.some((riskArea) => configuredRiskAreas.has(riskArea));
  const haystack = `${signal.title || ""} ${signal.why || ""}`.toLowerCase();
  const keywordMatch = (source.keywordHints || []).some((hint) => haystack.includes(String(hint).toLowerCase()));
  return hasRiskMatch || keywordMatch;
}

function loadSourceMeta(sourceRegistry, source) {
  if (!source.sourceRegistryId) {
    return {
      id: source.id,
      name: source.id,
      tier: "primary",
      category: "generated",
    };
  }
  return sourceRegistry.get(source.sourceRegistryId) || {
    id: source.sourceRegistryId,
    name: source.sourceRegistryId,
    tier: "primary",
    category: "generated",
  };
}

async function collectSourceCandidates(source, context) {
  if (source.fetchType === "reg_horizon_json") {
    const horizon = readJson(HORIZON_PATH);
    return (horizon.signals || [])
      .filter((signal) => topicFromHorizonSignal(signal, source))
      .slice(0, source.maxItems || 8)
      .map((signal) => ({
        title: signal.title,
        url: signal.url,
        publishedAt: signal.date ? `${signal.date}T00:00:00.000Z` : "",
        summary: signal.why || "",
        sourceName: signal.source || source.id,
      }));
  }

  if (context.options.offline) return [];

  const xml = await fetchText(source.fetchUrl);
  if (source.fetchType === "rss" || source.fetchType === "atom") {
    return parseRssOrAtom(xml, source);
  }
  if (source.fetchType === "sitemap") {
    const sitemapEntries = parseSitemap(xml, source);
    return enrichSitemapEntries(sitemapEntries);
  }
  return [];
}

function candidateRecord(entry, source, sourceMeta, topicId) {
  const canonicalUrl = canonicaliseUrl(entry.url);
  return {
    id: urlHash(canonicalUrl).slice(0, 16),
    topicId,
    title: entry.title,
    url: canonicalUrl,
    publishedAt: entry.publishedAt || "",
    sourceRegistryId: sourceMeta.id,
    sourceName: entry.sourceName || sourceMeta.name,
    sourceTier: sourceMeta.tier,
    sourceCategory: sourceMeta.category,
    ingestSourceId: source.id,
    fetchType: source.fetchType,
    riskAreas: source.riskAreas || [],
    tags: source.tags || [],
    reviewStatus: "candidate",
    sourceType: "feed-ingestion",
    whyCandidate:
      source.fetchType === "reg_horizon_json"
        ? "Pulled from the live Reg Horizon signal set because the risk-area or keyword mapping points at this topic."
        : `Pulled from ${sourceMeta.name} via ${source.fetchType} ingestion and matched the topic rules.`,
  };
}

function validateCandidate(candidate, warnings) {
  if (!candidate.title || !candidate.url) return false;
  if (!isSpecificPublishedSourceUrl(candidate.url)) {
    warnings.push(`Dropped generic citation candidate: ${candidate.url}`);
    return false;
  }
  const publishedSource = resolvePublishedSource(candidate.url, loadPublishedSourceMap());
  if (!publishedSource) {
    warnings.push(`Dropped unregistered citation host candidate: ${candidate.url}`);
    return false;
  }
  return true;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const feedRegistry = readJson(FEED_REGISTRY_PATH);
  const sourceRegistry = new Map(readJson(SOURCE_REGISTRY_PATH).sources.map((source) => [source.id, source]));
  const state = fs.existsSync(options.state) ? readJson(options.state) : { seenUrlHashes: [], lastGeneratedAt: null };
  const seen = new Set(options.includeSeen ? [] : state.seenUrlHashes || []);
  const generatedAt = new Date().toISOString();
  const now = new Date();
  const windowDays = Number.isFinite(options.windowDaysOverride) ? options.windowDaysOverride : feedRegistry.settings?.windowDays || 14;
  const topicBuckets = new Map(TOPICS.map((topic) => [topic, []]));
  const warnings = [];
  const sourceStats = [];

  for (const source of feedRegistry.sources || []) {
    const sourceMeta = loadSourceMeta(sourceRegistry, source);
    let entries = [];
    try {
      entries = await collectSourceCandidates(source, { options });
    } catch (error) {
      const message = `Source ${source.id} failed during candidate collection: ${error.message}`;
      warnings.push(message);
      sourceStats.push({
        sourceId: source.id,
        sourceRegistryId: source.sourceRegistryId || "",
        fetchType: source.fetchType,
        status: "failed",
        fetchedEntries: 0,
        acceptedCandidates: 0,
        error: error.message,
      });
      continue;
    }

    let acceptedCandidates = 0;
    for (const entry of entries) {
      if (!entry?.url || !entry?.title) continue;
      if (!isRecent(entry.publishedAt, windowDays, now)) continue;
      if (!matchesKeywords(entry, source)) continue;

      for (const topicId of source.topics || []) {
        const candidate = candidateRecord(entry, source, sourceMeta, topicId);
        if (!validateCandidate(candidate, warnings)) continue;
        const hash = urlHash(candidate.url);
        if (seen.has(hash)) continue;
        topicBuckets.get(topicId)?.push(candidate);
        seen.add(hash);
        acceptedCandidates += 1;
      }
    }

    sourceStats.push({
      sourceId: source.id,
      sourceRegistryId: source.sourceRegistryId || "",
      fetchType: source.fetchType,
      status: "ok",
      fetchedEntries: entries.length,
      acceptedCandidates,
      error: "",
    });
  }

  const output = {
    version: "2026-07-06",
    generatedAt,
    windowDays,
    mode: options.offline ? "offline" : "live",
    topics: TOPICS.map((topicId) => ({
      id: topicId,
      candidates: (topicBuckets.get(topicId) || [])
        .sort((a, b) => String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")))
        .slice(0, feedRegistry.settings?.perTopicCap || 20),
    })),
    sourceStats,
    warnings,
  };

  writeJson(options.out, output);
  if (options.writeState) {
    writeJson(options.state, {
      version: "2026-07-06",
      lastGeneratedAt: generatedAt,
      seenUrlHashes: [...seen],
    });
  }

  console.log(
    `Signals candidate refresh wrote ${output.topics.reduce((sum, topic) => sum + topic.candidates.length, 0)} candidates ` +
      `across ${output.topics.length} topics (${options.offline ? "offline" : "live"} mode).`,
  );
  for (const topic of output.topics) {
    console.log(`- ${topic.id}: ${topic.candidates.length}`);
  }
  for (const stat of sourceStats) {
    if (stat.status === "failed") {
      console.log(`- ${stat.sourceId}: failed (${stat.error})`);
    } else {
      console.log(`- ${stat.sourceId}: fetched ${stat.fetchedEntries}, accepted ${stat.acceptedCandidates}`);
    }
  }
  for (const warning of warnings) console.log(`Warning: ${warning}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
