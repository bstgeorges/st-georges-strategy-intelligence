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

const TOPICS = [
  "ai",
  "market-structure",
  "third-party",
  "resilience",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
];
const TRACKING_PARAMS = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"]);
const TOPIC_KEYWORDS = {
  ai: ["artificial intelligence", "ai model", "ai agent", "agentic", "algorithm", "copilot", "machine learning"],
  "market-structure": ["market", "trading", "settlement", "securities", "liquidity", "capital", "fund", "crypto", "stablecoin", "mica", "custody"],
  "third-party": ["third party", "third parties", "third-party", "outsourcing", "supplier", "vendor", "cloud", "concentration", "subcontract", "dependency", "processor", "drittanbieter", "auslagerung", "prestataire", "sous-traitance"],
  resilience: ["resilience", "operational", "outage", "incident", "continuity", "recovery", "impact tolerance", "important business service", "résilience", "continuité", "rétablissement", "ausfall", "wiederherstellung"],
  "financial-crime": ["fraud", "scam", "money laundering", "financial crime", "sanctions", "bribery", "corruption", "asset recovery", "aml"],
  cyber: ["cyber", "ransomware", "vulnerability", "exploit", "malware", "phishing", "breach", "threat", "vulnérabilité", "attaque", "compromission", "rançongiciel", "menace", "schwachstelle", "angriff"],
  "technology-failure": ["technology failure", "ict", "outage", "disruption", "system failure", "change failure", "recovery", "cloud", "défaillance", "indisponibilité", "interruption", "panne", "systemausfall", "störung", "ikt-risiko"],
  data: ["data", "reporting", "disclosure", "privacy", "record keeping", "lineage", "data quality", "governance", "données", "confidentialité", "protection des données", "daten", "datenschutz", "datenqualität"],
};

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
    const normalizedKey = key.toLowerCase();
    if (TRACKING_PARAMS.has(normalizedKey) || normalizedKey.startsWith("utm_")) url.searchParams.delete(key);
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
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "st-georges-signals-candidate-ingestion/0.2" },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`Fetch failed ${response.status} for ${url}`);
      return response.text();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

function parseRssOrAtom(xml, source) {
  const blocks = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  const entries = blocks.length
    ? blocks.map((block) => ({
        title: xmlField(block, "title"),
        url: xmlField(block, "link"),
        publishedAt: normalizeDate(xmlField(block, "pubDate") || xmlField(block, "dc:date") || xmlField(block, "published") || xmlField(block, "updated")),
        dateSource: "feed",
        summary: xmlField(block, "description") || xmlField(block, "summary"),
      }))
    : [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => {
        const block = match[0];
        return {
          title: xmlField(block, "title"),
          url: xmlAttr(block, "link", "href") || xmlField(block, "id"),
          publishedAt: normalizeDate(xmlField(block, "updated") || xmlField(block, "published")),
          dateSource: "feed",
          summary: xmlField(block, "summary") || xmlField(block, "content"),
        };
      });

  return entries
    .map((entry) => {
      if (entry.publishedAt) return entry;
      const inferred = inferDateFromUrl(entry.url);
      return { ...entry, publishedAt: inferred, dateSource: inferred ? "url-inference" : "" };
    })
    .filter((entry) => entry.title && entry.url)
    .slice(0, source.maxItems || 8);
}

function inferDateFromUrl(rawUrl) {
  const match = String(rawUrl || "").match(/(?:^|\/)(20\d{2})(\d{2})(\d{2})(?:\/|\.|-|$)/);
  if (!match) return "";
  const parsed = new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return "";
  if (parsed.getUTCFullYear() !== Number(match[1]) || parsed.getUTCMonth() + 1 !== Number(match[2]) || parsed.getUTCDate() !== Number(match[3])) return "";
  return parsed.toISOString();
}

function parseSitemap(xml, source) {
  const pathPatterns = (source.pathPatterns || ["/news/", "/blog/", "/research/", "/articles/", "/publications/"])
    .map((value) => String(value).toLowerCase());
  const urls = [...xml.matchAll(/<url\b[\s\S]*?<\/url>/gi)]
    .map((match) => {
      const block = match[0];
      return {
        url: xmlField(block, "loc"),
        lastmod: normalizeDate(xmlField(block, "lastmod")),
      };
    })
    .filter((entry) => entry.url && pathPatterns.some((pattern) => entry.url.toLowerCase().includes(pattern)));

  return urls
    .sort((a, b) => String(b.lastmod || "").localeCompare(String(a.lastmod || "")))
    .slice(0, source.maxItems || 8);
}

async function enrichSitemapEntries(entries) {
  const enriched = [];
  for (const entry of entries) {
    try {
      const html = await fetchText(entry.url);
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
      const ogTag = metaTags.find((tag) => /(?:property|name)\s*=\s*["']og:title["']/i.test(tag));
      const ogTitle = ogTag?.match(/content\s*=\s*["']([^"']+)["']/i);
      const title = decodeXml((ogTitle?.[1] || titleMatch?.[1] || "").trim()).replace(/\s+/g, " ");
      if (title) {
        enriched.push({
          title,
          url: entry.url,
          publishedAt: entry.lastmod,
          dateSource: entry.lastmod ? "sitemap-lastmod" : "",
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
  if (!iso) return false;
  const published = new Date(iso);
  if (Number.isNaN(published.getTime())) return false;
  if (published.getTime() > now.getTime() + 24 * 60 * 60 * 1000) return false;
  return published.getTime() >= now.getTime() - windowDays * 24 * 60 * 60 * 1000;
}

function matchesKeywords(entry, source) {
  const haystack = `${entry.title || ""} ${entry.summary || ""}`.toLowerCase();
  const excluded = source.excludeKeywordHints || [];
  if (excluded.some((hint) => haystack.includes(String(hint).toLowerCase()))) return false;
  const titleHints = source.titleKeywordHints || [];
  if (titleHints.length) {
    const title = String(entry.title || "").toLowerCase();
    return titleHints.some((hint) => title.includes(String(hint).toLowerCase()));
  }
  const hints = source.keywordHints || [];
  if (!hints.length) return true;
  return hints.some((hint) => haystack.includes(String(hint).toLowerCase()));
}

function dedupeEntriesByTitle(entries, source) {
  if (source.dedupeTitles !== true) return entries;
  const seenTitles = new Set();
  return entries.filter((entry) => {
    const key = String(entry.title || "").trim().toLowerCase().replace(/\s+/g, " ");
    if (!key || seenTitles.has(key)) return false;
    seenTitles.add(key);
    return true;
  });
}

function matchedTopicKeywords(entry, source, topicId) {
  const configured = source.topicKeywordHints?.[topicId];
  const keywords = Array.isArray(configured) && configured.length ? configured : TOPIC_KEYWORDS[topicId] || [];
  const haystack = `${entry.title || ""} ${entry.summary || ""}`.toLowerCase().replace(/\s+/g, " ");
  return keywords.filter((keyword) => haystack.includes(String(keyword).toLowerCase()));
}

function topicRelevance(entry, source, topicId) {
  // A single-topic feed has already passed that source's keyword gate. Multi-topic
  // feeds need topic evidence so one broad match cannot broadcast into every topic.
  if ((source.topics || []).length === 1) return { accepted: true, matchedKeywords: matchedTopicKeywords(entry, source, topicId) };
  const matchedKeywords = matchedTopicKeywords(entry, source, topicId);
  const titleMatches = matchedTopicKeywords({ title: entry.title, summary: "" }, source, topicId);
  const summaryMatches = matchedTopicKeywords({ title: "", summary: entry.summary }, source, topicId);
  return {
    // Multi-topic feeds are particularly prone to boilerplate and cross-story
    // terms in summaries. Require headline evidence unless a source is explicitly
    // configured to allow summary-only routing.
    accepted: titleMatches.length > 0 || (source.allowSummaryOnlyTopicMatch === true && summaryMatches.length >= 2),
    matchedKeywords,
    titleMatchedKeywords: titleMatches,
    summaryMatchedKeywords: summaryMatches,
  };
}

function relevanceScore(entry, sourceMeta, matchedKeywords, now = new Date(), titleMatchedKeywords = matchedKeywords) {
  const tierScores = { primary: 40, official: 40, research: 30, specialist: 20, press: 15 };
  let freshness = 0;
  if (entry.publishedAt) {
    const ageDays = Math.max(0, (now.getTime() - new Date(entry.publishedAt).getTime()) / 86400000);
    if (Number.isFinite(ageDays)) freshness = Math.max(0, 30 - Math.floor(ageDays * 2));
  }
  const titleEvidence = Math.min(30, titleMatchedKeywords.length * 15);
  const summaryOnlyEvidence = Math.min(10, Math.max(0, matchedKeywords.length - titleMatchedKeywords.length) * 2);
  return Math.min(100, (tierScores[sourceMeta.tier] || 10) + freshness + titleEvidence + summaryOnlyEvidence);
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
    if (horizon.status === "withheld") return { entries: [], status: "skipped", reason: "horizon-withheld" };
    return {
      entries: (horizon.signals || [])
        .filter((signal) => topicFromHorizonSignal(signal, source))
        .slice(0, source.maxItems || 8)
        .map((signal) => ({
          title: signal.title,
          url: signal.url,
          publishedAt: signal.date ? `${signal.date}T00:00:00.000Z` : "",
          dateSource: signal.date ? "reviewed-reg-horizon" : "",
          summary: signal.why || "",
          sourceName: signal.source || source.id,
        })),
      status: "ok",
      reason: "",
    };
  }

  if (context.options.offline) return { entries: [], status: "skipped", reason: "offline" };

  const xml = await fetchText(source.fetchUrl);
  if (source.fetchType === "rss" || source.fetchType === "atom") {
    return { entries: parseRssOrAtom(xml, source), status: "ok", reason: "" };
  }
  if (source.fetchType === "sitemap") {
    const sitemapEntries = parseSitemap(xml, source);
    return { entries: await enrichSitemapEntries(sitemapEntries), status: "ok", reason: "" };
  }
  return { entries: [], status: "skipped", reason: "unsupported-fetch-type" };
}

function candidateRecord(entry, source, sourceMeta, topicId, relevance, now) {
  const canonicalUrl = canonicaliseUrl(entry.url);
  return {
    id: urlHash(canonicalUrl).slice(0, 16),
    topicId,
    title: entry.title,
    url: canonicalUrl,
    publishedAt: entry.publishedAt || "",
    dateSource: entry.dateSource || "",
    sourceRegistryId: sourceMeta.id,
    sourceName: entry.sourceName || sourceMeta.name,
    sourceTier: sourceMeta.tier,
    sourceCategory: sourceMeta.category,
    ingestSourceId: source.id,
    fetchType: source.fetchType,
    riskAreas: source.riskAreas || [],
    tags: source.tags || [],
    matchedKeywords: relevance.matchedKeywords,
    titleMatchedKeywords: relevance.titleMatchedKeywords || [],
    summaryMatchedKeywords: relevance.summaryMatchedKeywords || [],
    relevanceScore: relevanceScore(entry, sourceMeta, relevance.matchedKeywords, now, relevance.titleMatchedKeywords),
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
  if (/^(?:.+\s+)?e-?mail alert\b|^new q&as? available$/i.test(candidate.title.trim())) {
    warnings.push(`Dropped low-information candidate title: ${candidate.title}`);
    return false;
  }
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

function assessCandidateQuality(topics) {
  const warnings = [];
  for (const topic of topics) {
    const candidates = topic.candidates || [];
    if (candidates.length === 0) {
      warnings.push(`Coverage gap: ${topic.id} has no candidates in the current window.`);
      continue;
    }
    if (candidates.length < 3) {
      warnings.push(`Thin coverage: ${topic.id} has only ${candidates.length} candidate(s) in the current window.`);
    }
    if (candidates.length >= 3) {
      const counts = new Map();
      for (const candidate of candidates) {
        counts.set(candidate.ingestSourceId, (counts.get(candidate.ingestSourceId) || 0) + 1);
      }
      const [sourceId, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
      const share = count / candidates.length;
      if (share >= 0.75) {
        warnings.push(`Source concentration: ${topic.id} relies on ${sourceId} for ${count}/${candidates.length} candidates.`);
      }
    }
  }
  return warnings;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const feedRegistry = readJson(FEED_REGISTRY_PATH);
  const sourceRegistry = new Map(readJson(SOURCE_REGISTRY_PATH).sources.map((source) => [source.id, source]));
  const state = fs.existsSync(options.state)
    ? readJson(options.state)
    : { publishedUrlHashes: [], rejectedUrlHashes: [], lastGeneratedAt: null };
  // Discovery is intentionally not an outcome.  Older state files stored every
  // discovered URL as "seen", which made unreviewed candidates disappear on the
  // next run.  Only a published or explicitly rejected item may be suppressed.
  const suppressedHashes = [
    ...(state.publishedUrlHashes || []),
    ...(state.rejectedUrlHashes || []),
  ];
  const seen = new Set(options.includeSeen ? [] : suppressedHashes);
  const acceptedThisRun = new Set();
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
      const collection = await collectSourceCandidates(source, { options });
      entries = collection.entries || [];
      if (collection.status === "skipped") {
        sourceStats.push({
          sourceId: source.id,
          sourceRegistryId: source.sourceRegistryId || "",
          fetchType: source.fetchType,
          status: "skipped",
          fetchedEntries: 0,
          acceptedCandidates: 0,
          reason: collection.reason || "not-run",
          error: "",
        });
        warnings.push(`Source ${source.id} skipped: ${collection.reason || "not-run"}.`);
        continue;
      }
      // Provider status feeds can contain several updates for one incident. Keep
      // the most recent titled update while preventing a review queue from being
      // crowded with repeated status messages.
      entries = dedupeEntriesByTitle(entries, source);
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
        reason: "",
        error: error.message,
      });
      continue;
    }

    let acceptedCandidates = 0;
    for (const entry of entries) {
      if (!entry?.url || !entry?.title) continue;
      const sourceWindowDays = Number.isFinite(source.windowDays) ? source.windowDays : windowDays;
      if (!isRecent(entry.publishedAt, sourceWindowDays, now)) continue;
      if (!matchesKeywords(entry, source)) continue;

      for (const topicId of source.topics || []) {
        const relevance = topicRelevance(entry, source, topicId);
        if (!relevance.accepted) continue;
        const candidate = candidateRecord(entry, source, sourceMeta, topicId, relevance, now);
        if (!validateCandidate(candidate, warnings)) continue;
        const hash = urlHash(candidate.url);
        const topicHash = `${topicId}:${hash}`;
        // Legacy state stored URL-only hashes. Honour those for duplicate suppression,
        // while all new state is topic-scoped so legitimate cross-topic use survives.
        if (seen.has(topicHash) || seen.has(hash)) continue;
        if (acceptedThisRun.has(topicHash)) continue;
        topicBuckets.get(topicId)?.push(candidate);
        acceptedThisRun.add(topicHash);
        seen.add(topicHash);
        acceptedCandidates += 1;
      }
    }

    const noParseableEntries = entries.length === 0;
    sourceStats.push({
      sourceId: source.id,
      sourceRegistryId: source.sourceRegistryId || "",
      fetchType: source.fetchType,
      status: noParseableEntries ? "quiet" : "ok",
      fetchedEntries: entries.length,
      acceptedCandidates,
      reason: noParseableEntries ? "no-parseable-entries" : "",
      error: "",
    });
    if (noParseableEntries) warnings.push(`Source ${source.id} returned no parseable entries; check its feed format or availability.`);
  }

  const topics = TOPICS.map((topicId) => ({
    id: topicId,
    candidates: (topicBuckets.get(topicId) || [])
      .sort((a, b) => b.relevanceScore - a.relevanceScore || String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")))
      .slice(0, feedRegistry.settings?.perTopicCap || 20),
  }));
  warnings.push(...assessCandidateQuality(topics));

  const output = {
    version: "2026-08-14",
    generatedAt,
    windowDays,
    mode: options.offline ? "offline" : "live",
    topics,
    sourceStats,
    warnings,
  };

  writeJson(options.out, output);
  if (options.writeState) {
    writeJson(options.state, {
      version: "2026-07-22",
      lastGeneratedAt: generatedAt,
      publishedUrlHashes: Array.from(new Set(state.publishedUrlHashes || [])).sort(),
      rejectedUrlHashes: Array.from(new Set(state.rejectedUrlHashes || [])).sort(),
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
    } else if (stat.status === "skipped") {
      console.log(`- ${stat.sourceId}: skipped (${stat.reason})`);
    } else if (stat.status === "quiet") {
      console.log(`- ${stat.sourceId}: quiet (${stat.reason})`);
    } else {
      console.log(`- ${stat.sourceId}: fetched ${stat.fetchedEntries}, accepted ${stat.acceptedCandidates}`);
    }
  }
  for (const warning of warnings) console.log(`Warning: ${warning}`);
}

if (path.resolve(process.argv[1] || "") === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

export { assessCandidateQuality, canonicaliseUrl, dedupeEntriesByTitle, inferDateFromUrl, isRecent, matchedTopicKeywords, matchesKeywords, parseRssOrAtom, parseSitemap, relevanceScore, topicRelevance };
