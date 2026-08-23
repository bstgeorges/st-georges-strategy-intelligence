import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SIGNALS_PATH = path.join(ROOT, "site", "data", "signals.json");
const USER_AGENT = "StGeorgesStrategySignalDateAudit/1.0";
const DATE_RE = /\b(20\d{2}-\d{2}-\d{2})\b/g;
const HUMAN_DATE_RE =
  /\b(?:published|updated|posted|date)?\s*:?\s*(\d{1,2})\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(20\d{2})\b/gi;
const HUMAN_MONTH_FIRST_DATE_RE =
  /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),?\s*(20\d{2})\b/gi;
const SLASH_DATE_RE = /\b(\d{1,2})\/(\d{1,2})\/(20\d{2})\b/g;
const MONTHS = {
  jan: "01",
  january: "01",
  feb: "02",
  february: "02",
  mar: "03",
  march: "03",
  apr: "04",
  april: "04",
  may: "05",
  jun: "06",
  june: "06",
  jul: "07",
  july: "07",
  aug: "08",
  august: "08",
  sep: "09",
  sept: "09",
  september: "09",
  oct: "10",
  october: "10",
  nov: "11",
  november: "11",
  dec: "12",
  december: "12",
};

function parseArgs(argv) {
  const options = { out: "", concurrency: 6, failOnMismatch: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") options.out = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--out=")) options.out = path.resolve(arg.slice("--out=".length));
    else if (arg === "--concurrency") options.concurrency = Number(argv[++index]);
    else if (arg === "--fail-on-mismatch") options.failOnMismatch = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1) throw new Error("--concurrency must be a positive integer.");
  return options;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function rowsFromSignals(data) {
  const rows = [];
  for (const topic of data.topics || []) {
    for (const section of ["top5", "stillMaterial"]) {
      for (const row of topic[section] || []) {
        rows.push({
          topic: topic.id,
          section,
          title: row.title,
          url: row.evidence?.sourceUrl || row.url,
          displayedDate: row.evidence?.publishedDate || "",
          displayedSourceDate: sourceLabelDate(row.source || ""),
          displayedSourceDates: sourceLabelDates(row.source || "").length
            ? sourceLabelDates(row.source || "")
            : [row.evidence?.publishedDate].filter(Boolean),
          sourceLabel: row.source || "",
          sourceType: row.evidence?.sourceType || "",
          manualVerification: row.evidence?.sourceDateVerification || null,
        });
      }
    }
  }
  return rows;
}

function sourceLabelDate(label) {
  return sourceLabelDates(label)[0] || "";
}

function sourceLabelDates(label) {
  const dates = [];
  for (const match of String(label || "").matchAll(/\b(20\d{2}-\d{2}-\d{2})\b/g)) dates.push(match[1]);
  if (dates.length) return Array.from(new Set(dates));
  const monthLabel = String(label || "").match(/\b(20\d{2})-(\d{2})(?!-\d{2})\b/);
  if (monthLabel) return [`${monthLabel[1]}-${monthLabel[2]}`];
  return [];
}

function uniqueRows(rows) {
  const byUrl = new Map();
  for (const row of rows) {
    if (!byUrl.has(row.url)) byUrl.set(row.url, { url: row.url, rows: [] });
    byUrl.get(row.url).rows.push(row);
  }
  return Array.from(byUrl.values());
}

function addCandidate(candidates, date, source) {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  if (!candidates.some((candidate) => candidate.date === date && candidate.source === source)) {
    candidates.push({ date, source });
  }
}

function textOfTag(html, pattern) {
  const match = html.match(pattern);
  return match ? decodeHtml(match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()) : "";
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function normalizeDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const iso = raw.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const slash = raw.match(/\b(20\d{2})\/(\d{1,2})\/(\d{1,2})\b/);
  if (slash) return `${slash[1]}-${slash[2].padStart(2, "0")}-${slash[3].padStart(2, "0")}`;
  const ukSlash = raw.match(/\b(\d{1,2})\/(\d{1,2})\/(20\d{2})\b/);
  if (ukSlash) return `${ukSlash[3]}-${ukSlash[2].padStart(2, "0")}-${ukSlash[1].padStart(2, "0")}`;
  const human = raw.match(/\b(\d{1,2})\s+([A-Za-z]+)\s+(20\d{2})\b/);
  if (human) {
    const month = MONTHS[human[2].toLowerCase()];
    if (month) return `${human[3]}-${month}-${human[1].padStart(2, "0")}`;
  }
  const monthFirst = raw.match(/\b([A-Za-z]+)\s+(\d{1,2}),?\s*(20\d{2})\b/);
  if (monthFirst) {
    const month = MONTHS[monthFirst[1].toLowerCase()];
    if (month) return `${monthFirst[3]}-${month}-${monthFirst[2].padStart(2, "0")}`;
  }
  return "";
}

function collectJsonLdDates(html, candidates) {
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeHtml(match[1].trim()));
      const stack = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (stack.length) {
        const item = stack.pop();
        if (!item || typeof item !== "object") continue;
        for (const key of ["datePublished", "dateCreated", "dateModified", "uploadDate"]) {
          const value = item[key];
          if (Array.isArray(value)) value.forEach((entry) => addCandidate(candidates, normalizeDate(entry), `jsonld.${key}`));
          else addCandidate(candidates, normalizeDate(value), `jsonld.${key}`);
        }
        for (const value of Object.values(item)) {
          if (value && typeof value === "object") {
            if (Array.isArray(value)) stack.push(...value);
            else stack.push(value);
          }
        }
      }
    } catch {
      // Ignore malformed third-party JSON-LD; other metadata paths may still work.
    }
  }
}

function collectDates(html, finalUrl) {
  const candidates = [];
  const metaPatterns = [
    ["meta.article.published_time", /<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["'][^>]*>/i],
    ["meta.article.modified_time", /<meta[^>]+property=["']article:modified_time["'][^>]+content=["']([^"']+)["'][^>]*>/i],
    ["meta.date", /<meta[^>]+(?:name|property)=["'](?:date|dc\.date|dcterms\.date|pubdate|publishdate|published|datePublished|parsely-pub-date)["'][^>]+content=["']([^"']+)["'][^>]*>/i],
    ["meta.itemprop.datePublished", /<meta[^>]+itemprop=["']datePublished["'][^>]+content=["']([^"']+)["'][^>]*>/i],
    ["time.datetime", /<time[^>]+datetime=["']([^"']+)["'][^>]*>/i],
  ];
  for (const [source, pattern] of metaPatterns) addCandidate(candidates, normalizeDate(textOfTag(html, pattern)), source);
  collectJsonLdDates(html, candidates);

  for (const match of html.matchAll(DATE_RE)) addCandidate(candidates, match[1], "body.iso");
  for (const match of html.matchAll(HUMAN_DATE_RE)) {
    const month = MONTHS[match[2].toLowerCase()];
    if (month) addCandidate(candidates, `${match[3]}-${month}-${match[1].padStart(2, "0")}`, "body.human");
  }
  for (const match of html.matchAll(HUMAN_MONTH_FIRST_DATE_RE)) {
    const month = MONTHS[match[1].toLowerCase()];
    if (month) addCandidate(candidates, `${match[3]}-${month}-${match[2].padStart(2, "0")}`, "body.month-first");
  }
  for (const match of html.matchAll(SLASH_DATE_RE)) {
    addCandidate(candidates, `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`, "body.slash");
  }
  const pathDate = finalUrl.match(/\/(20\d{2})\/(\d{1,2})\/(\d{1,2})(?:\/|$)/);
  if (pathDate) addCandidate(candidates, `${pathDate[1]}-${pathDate[2].padStart(2, "0")}-${pathDate[3].padStart(2, "0")}`, "url.path");
  return candidates;
}

function chooseBestDate(candidates) {
  const priority = [
    /^jsonld\.datePublished$/,
    /^meta\.article\.published_time$/,
    /^meta\.itemprop\.datePublished$/,
    /^meta\.date$/,
    /^time\.datetime$/,
    /^url\.path$/,
    /^jsonld\.dateCreated$/,
    /^body\.human$/,
    /^body\.iso$/,
    /^jsonld\.dateModified$/,
    /^meta\.article\.modified_time$/,
  ];
  for (const pattern of priority) {
    const candidate = candidates.find((item) => pattern.test(item.source));
    if (candidate) return candidate;
  }
  return candidates[0] || null;
}

function classify(expectedDates, best, candidates, response) {
  if (!response.ok) return [401, 403, 429].includes(response.status) ? "restricted" : "fetch-failed";
  if (!best) return "no-source-date-found";
  if (expectedDates.some((expected) => best.date === expected || best.date.startsWith(`${expected}-`))) return "match";
  if (candidates.some((candidate) => expectedDates.some((expected) => candidate.date === expected || candidate.date.startsWith(`${expected}-`)))) return "candidate-match";
  return "mismatch";
}

function confidenceForResult(result) {
  return {
    match: "verified",
    "candidate-match": "candidate-match",
    restricted: "restricted",
    "no-source-date-found": "undated",
    "no-displayed-date": "undated",
    "fetch-failed": "fetch-failed",
    "fetch-error": "fetch-failed",
    mismatch: "mismatch",
  }[result] || "unknown";
}

function applyEvergreenPolicy(result, row) {
  if (row.section === "stillMaterial" && row.manualVerification?.status === "evergreen") return "evergreen";
  return result;
}

function applyManualVerificationPolicy(result, rows) {
  if (result !== "mismatch") return result;
  const verified = rows.every((row) => {
    const verification = row.manualVerification;
    return (
      verification?.status === "manual-verified" &&
      /^\d{4}-\d{2}-\d{2}$/.test(verification.verifiedDate || "") &&
      Boolean(verification.reason?.trim())
    );
  });
  return verified ? "manual-verified" : result;
}

async function auditUrl(item) {
  const expectedDates = Array.from(new Set(item.rows.flatMap((row) => row.displayedSourceDates || []).filter(Boolean)));
  if (!expectedDates.length) {
    return {
      url: item.url,
      finalUrl: "",
      status: 0,
      expectedDates,
      sourceDate: "",
      sourceDateEvidence: "",
      candidates: [],
      result: "no-displayed-date",
      confidence: "undated",
      rows: item.rows,
    };
  }
  try {
    const response = await fetch(item.url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
    });
    const contentType = response.headers.get("content-type") || "";
    const html = contentType.includes("text") || contentType.includes("html") || contentType.includes("xml") ? await response.text() : "";
    const candidates = html ? collectDates(html, response.url) : [];
    const best = chooseBestDate(candidates);
    const classified = item.rows.every((row) => row.section === "stillMaterial")
      ? applyEvergreenPolicy(classify(expectedDates, best, candidates, response), item.rows[0])
      : classify(expectedDates, best, candidates, response);
    const result = applyManualVerificationPolicy(classified, item.rows);
    return {
      url: item.url,
      finalUrl: response.url,
      status: response.status,
      expectedDates,
      sourceDate: best?.date || "",
      sourceDateEvidence: best?.source || "",
      candidates: candidates.slice(0, 12),
      result,
      confidence: confidenceForResult(result),
      rows: item.rows,
    };
  } catch (error) {
    return { url: item.url, finalUrl: "", status: 0, expectedDates, sourceDate: "", sourceDateEvidence: "", candidates: [], result: "fetch-error", confidence: "fetch-failed", error: error.message, rows: item.rows };
  }
}

async function mapLimit(items, limit, fn) {
  const results = [];
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const data = readJson(SIGNALS_PATH);
  const rows = rowsFromSignals(data);
  const results = await mapLimit(uniqueRows(rows), options.concurrency, auditUrl);
  const summary = results.reduce((acc, item) => {
    acc[item.result] = (acc[item.result] || 0) + 1;
    return acc;
  }, {});
  const report = { generatedAt: new Date().toISOString(), source: path.relative(ROOT, SIGNALS_PATH), edition: data.edition, rowCount: rows.length, uniqueUrlCount: results.length, summary, results };
  if (options.out) {
    fs.mkdirSync(path.dirname(options.out), { recursive: true });
    fs.writeFileSync(options.out, `${JSON.stringify(report, null, 2)}\n`);
  }
  console.log(JSON.stringify({ edition: report.edition, rowCount: report.rowCount, uniqueUrlCount: report.uniqueUrlCount, summary }, null, 2));
  for (const item of results.filter((result) => !["match", "candidate-match"].includes(result.result))) {
    console.log(`${item.result.toUpperCase()} ${item.expectedDates.join(",") || "<no displayed date>"} -> ${item.sourceDate || "<none>"} ${item.url}`);
    for (const row of item.rows) console.log(`  - ${row.topic}/${row.section}: ${row.title}`);
  }
  const mismatches = results.filter((result) => result.result === "mismatch");
  const blockingMismatches = mismatches.filter((result) => result.rows.some((row) => row.section === "top5"));
  if (options.failOnMismatch && blockingMismatches.length) {
    console.error(`Signal source date audit failed: ${blockingMismatches.length} Top 5 displayed date mismatch(es).`);
    process.exit(1);
  }
}

await main();
