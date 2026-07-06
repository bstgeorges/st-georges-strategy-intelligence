import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_DIR = path.join(ROOT, "site-dist");
const USER_AGENT =
  "ProjectVirtualOfficerGeneratedLinkVerifier/1.0 (+https://stgeorgesstrategy.com/)";
const restrictedButPresentStatuses = new Set([401, 403]);
const ignoredSchemes = /^(#|mailto:|tel:|javascript:|data:)/i;
const REQUEST_TIMEOUT_MS = 15000;
const CONCURRENCY = 8;
const soft404TitlePatterns = [
  /404/i,
  /page not found/i,
  /not found/i,
  /search results/i,
];
const soft404BodyPatterns = [
  /page not found/i,
  /sorry[, ]+we can't find that page/i,
  /sorry[, ]+we couldn['’]t find/i,
  /this page does not exist/i,
  /no results found/i,
  /search results/i,
  /we could not find the page/i,
];
const soft404UrlPatterns = [
  /\/search(?:\/|$|\?)/i,
  /[?&](?:query|q|s)=/i,
];

function parseArgs(argv) {
  const options = { dir: DEFAULT_DIR };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dir") options.dir = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--dir=")) options.dir = path.resolve(arg.slice("--dir=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match ? match[1] : "";
}

function listHtmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listHtmlFiles(full));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function isRestrictedButPresent(url, status) {
  if (restrictedButPresentStatuses.has(status)) return true;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    return status === 999 && hostname.endsWith("linkedin.com");
  } catch {
    return false;
  }
}

function isKnownRestrictedFetchFailure(url, error) {
  if (!error) return false;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");
    if (hostname === "ft.com" && /^\/content\//i.test(parsed.pathname)) {
      return /fetch failed/i.test(String(error));
    }
  } catch {
    return false;
  }
  return false;
}

function extractExternalLinks(html) {
  const links = [];
  const tagPattern = /<(a|link)\b[^>]*\bhref=["'][^"']+["'][^>]*>/gi;
  let match;
  while ((match = tagPattern.exec(html))) {
    const href = attr(match[0], "href");
    const rel = attr(match[0], "rel").toLowerCase();
    if (!href || ignoredSchemes.test(href)) continue;
    if (match[1].toLowerCase() === "link" && rel.includes("preconnect")) continue;
    if (/^https?:\/\//i.test(href)) links.push(href);
  }
  return [...new Set(links)];
}

async function fetchUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const headResponse = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": USER_AGENT },
      signal: controller.signal,
    });
    let response = headResponse;
    const needsGet = response.status < 400 || [400, 403, 404, 405, 429, 500, 501, 502, 503].includes(response.status);
    let bodySample = "";
    let finalUrl = response.url;
    if (needsGet) {
      try {
        response = await fetch(url, {
          method: "GET",
          redirect: "follow",
          headers: { "user-agent": USER_AGENT },
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
    if (isKnownRestrictedFetchFailure(url, error)) {
      return { url, ok: true, note: "restricted", error: String(error) };
    }
    return { url, ok: false, error: String(error) };
  } finally {
    clearTimeout(timer);
  }
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

function isAbortError(error) {
  return /AbortError/i.test(String(error));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const htmlFiles = listHtmlFiles(options.dir);
  if (!htmlFiles.length) {
    throw new Error(`No HTML files found under ${path.relative(ROOT, options.dir) || options.dir}`);
  }

  const links = new Set();
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    for (const link of extractExternalLinks(html)) links.add(link);
  }

  const results = [];
  const pending = [...links].sort();
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < pending.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await fetchUrl(pending[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, pending.length) }, () => worker()),
  );

  for (const result of results) {
    const status = result.status ?? "ERR";
    const note = result.note ? ` ${result.note}` : "";
    console.log(`${result.ok ? "OK" : "FAIL"} link ${status}${note} ${result.url}`);
  }

  const failures = results.filter((result) => !result.ok);
  const restricted = results.filter((result) => result.note === "restricted");
  console.log(
    `Checked ${htmlFiles.length} generated HTML files and ${results.length} unique outbound links; ` +
      `${failures.length} failures; ${restricted.length} restricted/paywalled links.`,
  );

  if (failures.length) {
    console.error("Broken generated outbound links:");
    for (const failure of failures) {
      const reason = failure.error ? ` (${failure.error})` : "";
      console.error(`- ${failure.status ?? "ERR"} ${failure.url}${reason}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
