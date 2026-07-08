import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PUBLISHED_SOURCE_MAP = path.join(ROOT, "site", "data", "published-source-map.json");

const disallowedExactUrls = new Set([
  "https://www.anthropic.com/news",
  "https://openai.com/news/",
  "https://openai.com/news",
  "https://deepmind.google/blog/",
  "https://deepmind.google/blog",
  "https://www.reuters.com/",
  "https://www.reuters.com",
  "https://www.fca.org.uk/news",
  "https://www.fca.org.uk/news/",
  "https://www.bis.org/list/press_releases/index.htm",
]);

const disallowedPathPatterns = [
  /^\/category(?:\/|$)/i,
  /^\/news\/?$/i,
  /^\/blog\/?$/i,
  /^\/press\/?$/i,
  /^\/pressroom\/?$/i,
  /^\/newsroom\/?$/i,
];
const restrictedButPresentStatuses = new Set([401, 403, 415]);
const soft404TitlePatterns = [/404/i, /page not found/i, /not found/i, /search results/i];
const soft404BodyPatterns = [
  /page not found/i,
  /sorry[, ]+we can't find that page/i,
  /sorry[, ]+we couldn['’]t find/i,
  /this page does not exist/i,
  /no results found/i,
  /search results/i,
  /we could not find the page/i,
];
const soft404UrlPatterns = [/\/search(?:\/|$|\?)/i, /[?&](?:query|q|s)=/i];

let publishedSourceMapCache = null;

export function loadPublishedSourceMap() {
  if (!publishedSourceMapCache) {
    publishedSourceMapCache = JSON.parse(fs.readFileSync(PUBLISHED_SOURCE_MAP, "utf8"));
  }
  return publishedSourceMapCache;
}

export function parseHttpsUrl(value) {
  if (!/^https:\/\//.test(value || "")) return null;
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function isSpecificPublishedSourceUrl(value) {
  const url = parseHttpsUrl(value);
  if (!url) return false;
  if (disallowedExactUrls.has(`${url.origin}${url.pathname}`)) return false;
  if (!url.pathname || url.pathname === "/") return false;
  if (disallowedPathPatterns.some((pattern) => pattern.test(url.pathname))) return false;
  return true;
}

export function resolvePublishedSource(value, map = loadPublishedSourceMap()) {
  const url = parseHttpsUrl(value);
  if (!url) return null;

  const hostname = url.hostname.toLowerCase();
  for (const source of map.sources || []) {
    if ((source.hosts || []).some((host) => host.toLowerCase() === hostname)) {
      return source;
    }
  }
  return null;
}

export function summarisePublishedSourceCoverage(rows, resolveRowUrl) {
  const byHost = new Map();
  const byUrl = new Map();

  for (const row of rows) {
    const rawUrl = resolveRowUrl(row);
    const url = parseHttpsUrl(rawUrl);
    if (!url) continue;

    const hostCount = byHost.get(url.hostname) || 0;
    byHost.set(url.hostname, hostCount + 1);

    const exactCount = byUrl.get(rawUrl) || 0;
    byUrl.set(rawUrl, exactCount + 1);
  }

  return {
    byHost: Object.fromEntries([...byHost.entries()].sort((a, b) => b[1] - a[1])),
    byUrl: Object.fromEntries([...byUrl.entries()].sort((a, b) => b[1] - a[1])),
  };
}

export function validatePublishedRows(rows, options = {}) {
  const {
    label = "published rows",
    map = loadPublishedSourceMap(),
    maxExactReusePerTopic = 2,
    resolveRowUrl = (row) => row.url,
    resolveRowSourceLabel = (row) => row.source,
  } = options;

  const failures = [];
  const warnings = [];
  const coverage = summarisePublishedSourceCoverage(rows, resolveRowUrl);

  rows.forEach((row, index) => {
    const rowLabel = `${label} row ${index + 1}`;
    const url = resolveRowUrl(row);
    const sourceLabel = resolveRowSourceLabel(row);

    if (!url || !parseHttpsUrl(url)) {
      failures.push(`${rowLabel} must include an https URL.`);
      return;
    }
    if (!sourceLabel) failures.push(`${rowLabel} is missing a source label.`);
    if (!isSpecificPublishedSourceUrl(url)) {
      failures.push(`${rowLabel} uses a generic or unsupported source URL: ${url}`);
      return;
    }

    const publishedSource = resolvePublishedSource(url, map);
    if (!publishedSource) {
      failures.push(`${rowLabel} uses an unregistered citation host: ${url}`);
    }
  });

  for (const [url, count] of Object.entries(coverage.byUrl)) {
    if (count > maxExactReusePerTopic) {
      failures.push(
        `${label} reuses the same citation more than ${maxExactReusePerTopic} times: ${url} (${count} rows).`,
      );
    }
  }

  const dominantHosts = Object.entries(coverage.byHost).filter(([, count]) => count >= Math.ceil(rows.length / 2));
  for (const [host, count] of dominantHosts) {
    warnings.push(`${label} is concentrated on ${host} (${count}/${rows.length} rows).`);
  }

  return { failures, warnings, coverage };
}

function isRestrictedButPresent(url, status) {
  if (restrictedButPresentStatuses.has(status)) return true;
  try {
    const hostname = new URL(url).hostname;
    return status === 999 && hostname.endsWith("linkedin.com");
  } catch {
    return false;
  }
}

function isAbortError(error) {
  return /AbortError/i.test(String(error));
}

function isSoft404(finalUrl, body) {
  if (soft404UrlPatterns.some((pattern) => pattern.test(finalUrl))) return true;
  if (!body) return false;

  const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : "";
  if (soft404TitlePatterns.some((pattern) => pattern.test(title))) return true;

  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return soft404BodyPatterns.some((pattern) => pattern.test(text));
}

async function fetchPublishedUrl(url, options = {}) {
  const timeoutMs = options.timeoutMs ?? 15000;
  const userAgent =
    options.userAgent ?? "ProjectVirtualOfficerPublishedSourceValidator/1.0 (+https://stgeorgesstrategy.com/)";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headResponse = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": userAgent },
      signal: controller.signal,
    });

    let response = headResponse;
    let bodySample = "";
    let finalUrl = response.url;
    const needsGet = response.status < 400 || [400, 403, 404, 405, 429, 500, 501, 502, 503].includes(response.status);

    if (needsGet) {
      try {
        response = await fetch(url, {
          method: "GET",
          redirect: "follow",
          headers: { "user-agent": userAgent },
          signal: controller.signal,
        });
        finalUrl = response.url;
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("text/html") || contentType.includes("xml") || !contentType) {
          bodySample = (await response.text()).slice(0, 12000);
        }
      } catch (error) {
        if (!isAbortError(error) || headResponse.status >= 400) throw error;
        return {
          url,
          status: headResponse.status,
          finalUrl: headResponse.url,
          ok: true,
          note: "head-only",
        };
      }
    }

    const restricted = isRestrictedButPresent(url, response.status);
    const soft404 = isSoft404(finalUrl, bodySample);
    return {
      url,
      status: response.status,
      finalUrl,
      ok: (response.status < 400 && !soft404) || restricted,
      note: restricted ? "restricted" : soft404 ? "soft-404" : "",
    };
  } catch (error) {
    return { url, ok: false, error: String(error) };
  } finally {
    clearTimeout(timer);
  }
}

export async function validatePublishedRowsLiveness(rows, options = {}) {
  const {
    label = "published rows",
    resolveRowUrl = (row) => row.url,
    timeoutMs = 15000,
    concurrency = 8,
  } = options;

  const uniqueUrls = [...new Set(rows.map((row) => resolveRowUrl(row)).filter(Boolean))];
  const cache = new Map();
  const failures = [];
  const warnings = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < uniqueUrls.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      const url = uniqueUrls[currentIndex];
      cache.set(
        url,
        await fetchPublishedUrl(url, {
          timeoutMs,
          userAgent: "ProjectVirtualOfficerPublishedSourceValidator/1.0 (+https://stgeorgesstrategy.com/)",
        }),
      );
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, uniqueUrls.length || 1) }, () => worker()));

  rows.forEach((row, index) => {
    const rowLabel = `${label} row ${index + 1}`;
    const url = resolveRowUrl(row);
    if (!url) return;
    const result = cache.get(url);
    if (!result) {
      failures.push(`${rowLabel} could not be checked for liveness: ${url}`);
      return;
    }
    if (!result.ok) {
      const status = result.status ?? "ERR";
      const detail = result.error ? ` (${result.error})` : result.note ? ` (${result.note})` : "";
      failures.push(`${rowLabel} failed liveness check ${status}: ${url}${detail}`);
    } else if (result.note === "restricted") {
      warnings.push(`${rowLabel} is restricted/paywalled but present: ${url}`);
    }
  });

  return { failures, warnings, results: Object.fromEntries(cache.entries()) };
}
