import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "dashboard/data/regulatory-source-universe.generated.json");
const REGISTRY = path.join(ROOT, "dashboard/data/source-registry.json");
const IOSCO = "https://www.iosco.org/v2/about/?subsection=membership";
const REGULATORY_CATEGORIES = new Set([
  "regulation", "prudential", "financial-stability", "financial-crime", "markets", "government",
]);

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).trim();
}

function slug(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

async function getText(url) {
  const response = await fetch(url, {headers: {"User-Agent": "St-Georges-Strategy source-governance/1.0"}});
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

function parseDirectory(html) {
  const options = [...html.matchAll(/<option value="(\d+)"[^>]*>([\s\S]*?)<\/option>/g)];
  return options.map(([, orgId, label]) => {
    const clean = decodeHtml(label.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
    const split = clean.indexOf(" - ");
    return {orgId, jurisdiction: clean.slice(0, split), name: clean.slice(split + 3)};
  }).filter(x => x.orgId !== "0" && x.jurisdiction && x.name && x.jurisdiction !== "Jurisdiction" && x.name !== "Organization");
}

async function enrich(member) {
  const detailUrl = `${IOSCO}&memid=1&orgID=${member.orgId}`;
  try {
    const html = await getText(detailUrl);
    const match = html.match(/<strong>Internet:<\/strong>[\s\S]*?<a href="([^"]+)"/i);
    return {...member, homepage: decodeHtml(match?.[1] || detailUrl), directoryUrl: detailUrl, verification: "official-directory"};
  } catch (error) {
    return {...member, homepage: detailUrl, directoryUrl: detailUrl, verification: "directory-detail-failed", error: error.message};
  }
}

async function concurrentMap(values, limit, fn) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor++;
      results[index] = await fn(values[index]);
    }
  }
  await Promise.all(Array.from({length: limit}, worker));
  return results;
}

const directoryHtml = await getText(IOSCO);
const members = await concurrentMap(parseDirectory(directoryHtml), 8, enrich);
const registry = JSON.parse(await fs.readFile(REGISTRY, "utf8"));
const supplemental = registry.sources.filter(source => REGULATORY_CATEGORIES.has(source.category));

const authorities = members.map(member => ({
  id: `iosco-${slug(member.jurisdiction)}-${slug(member.name)}`,
  name: member.name,
  jurisdictions: [member.jurisdiction],
  functions: ["securities-and-markets"],
  publicationLanguages: [],
  languageReview: "required",
  homepage: member.homepage,
  provenance: {directory: "IOSCO ordinary members", url: member.directoryUrl},
  verification: member.verification,
  ingestion: {status: "catalogued", method: "to-assess", endpoints: []},
}));

const endpoints = [
  ...authorities.map(authority => ({
    id: `${authority.id}-home`, authorityId: authority.id, type: "authority-home",
    url: authority.homepage, status: "catalogued", primary: true,
  })),
  ...supplemental.map(source => ({
    id: `registry-${source.id}`, authorityId: source.id, type: "monitored-publication-source",
    url: source.url, status: "operational-or-assessed", primary: source.tier === "primary",
    jurisdictions: source.jurisdictions, functions: source.useFor,
  })),
];

const jurisdictionCount = new Set([
  ...authorities.flatMap(x => x.jurisdictions), ...supplemental.flatMap(x => x.jurisdictions),
]).size;
const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  purpose: "Governed global discovery universe for Regulatory Horizon. Catalogue status does not imply ingestion coverage.",
  provenance: [
    {name: "IOSCO ordinary-member directory", url: IOSCO, retrievedAt: new Date().toISOString()},
    {name: "St Georges Strategy source registry", path: "dashboard/data/source-registry.json"},
  ],
  metrics: {
    authorities: authorities.length,
    endpoints: endpoints.length,
    jurisdictions: jurisdictionCount,
    operationalOrAssessedEndpoints: supplemental.length,
    cataloguedEndpoints: authorities.length,
  },
  authorities,
  supplementalSources: supplemental.map(({id, name, category, jurisdictions, url, cadence, useFor}) => (
    {id, name, category, jurisdictions, url, cadence, useFor}
  )),
  endpoints,
};

await fs.writeFile(OUT, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Regulatory source universe: ${output.metrics.authorities} authorities, ${output.metrics.endpoints} endpoints, ${jurisdictionCount} jurisdictions.`);
