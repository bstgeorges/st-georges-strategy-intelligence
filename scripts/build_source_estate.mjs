import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UNIVERSE_PATH = path.join(ROOT, "dashboard/data/regulatory-source-universe.generated.json");
const REGISTRY_PATH = path.join(ROOT, "dashboard/data/source-registry.json");
const SIGNALS_FEEDS_PATH = path.join(ROOT, "dashboard/data/signals-feed-registry.json");
const OUTPUT_PATH = path.join(ROOT, "dashboard/data/source-estate.generated.json");

function canonicaliseUrl(rawUrl) {
  const url = new URL(rawUrl);
  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/$/, "") || "/";
  return url.toString();
}

function sourceIdFor(url) {
  return `route-${crypto.createHash("sha256").update(url).digest("hex").slice(0, 16)}`;
}

function addValues(target, values) {
  for (const value of values || []) {
    if (value && !target.includes(value)) target.push(value);
  }
}

function isDirectoryHeader(authority) {
  return authority?.id === "iosco-jurisdiction-organization" || authority?.provenance?.url?.endsWith("orgID=0");
}

function createEstate({ universe, registry, signalsFeeds }) {
  const sourceById = new Map((registry.sources || []).map((source) => [source.id, source]));
  const authorityById = new Map((universe.authorities || []).filter((authority) => !isDirectoryHeader(authority)).map((authority) => [authority.id, authority]));
  const feedsBySourceId = new Map();
  for (const feed of signalsFeeds.sources || []) {
    if (!feed.sourceRegistryId) continue;
    const feeds = feedsBySourceId.get(feed.sourceRegistryId) || [];
    feeds.push(feed.id);
    feedsBySourceId.set(feed.sourceRegistryId, feeds);
  }

  const routes = new Map();
  function addRoute(raw) {
    const url = canonicaliseUrl(raw.url);
    const key = url.toLowerCase();
    const existing = routes.get(key) || {
      id: sourceIdFor(url),
      url,
      names: [],
      tiers: [],
      jurisdictions: [],
      categories: [],
      roles: [],
      sourceRegistryIds: [],
      authorityIds: [],
      activeSignalsFeedIds: [],
      provenance: [],
    };

    addValues(existing.names, raw.names);
    addValues(existing.tiers, raw.tiers);
    addValues(existing.jurisdictions, raw.jurisdictions);
    addValues(existing.categories, raw.categories);
    addValues(existing.roles, raw.roles);
    addValues(existing.sourceRegistryIds, raw.sourceRegistryIds);
    addValues(existing.authorityIds, raw.authorityIds);
    addValues(existing.activeSignalsFeedIds, raw.activeSignalsFeedIds);
    existing.provenance.push(...(raw.provenance || []));
    routes.set(key, existing);
  }

  for (const authority of authorityById.values()) {
    addRoute({
      url: authority.homepage,
      names: [authority.name],
      tiers: ["primary"],
      jurisdictions: authority.jurisdictions,
      roles: ["catalogued-regulatory-authority"],
      authorityIds: [authority.id],
      provenance: [{ type: "iosco-directory", url: authority.provenance?.url || "" }],
    });
  }

  for (const endpoint of universe.endpoints || []) {
    const authority = authorityById.get(endpoint.authorityId);
    const source = sourceById.get(endpoint.authorityId);
    if (!authority && endpoint.authorityId === "iosco-jurisdiction-organization") continue;
    addRoute({
      url: endpoint.url,
      names: [authority?.name, source?.name].filter(Boolean),
      tiers: [source?.tier || (endpoint.primary ? "primary" : "")].filter(Boolean),
      jurisdictions: authority?.jurisdictions || source?.jurisdictions || endpoint.jurisdictions || [],
      categories: source?.category ? [source.category] : [],
      roles: [authority ? "catalogued-regulatory-authority" : "governed-source-registry"],
      sourceRegistryIds: source ? [source.id] : [],
      authorityIds: authority ? [authority.id] : [],
      activeSignalsFeedIds: source ? feedsBySourceId.get(source.id) || [] : [],
      provenance: [{ type: "regulatory-source-universe", endpointId: endpoint.id }],
    });
  }

  for (const source of registry.sources || []) {
    addRoute({
      url: source.url,
      names: [source.name],
      tiers: [source.tier],
      jurisdictions: source.jurisdictions,
      categories: [source.category],
      roles: ["governed-source-registry"],
      sourceRegistryIds: [source.id],
      activeSignalsFeedIds: feedsBySourceId.get(source.id) || [],
      provenance: [{ type: "source-registry", sourceId: source.id }],
    });
  }

  const orderedRoutes = [...routes.values()]
    .map((route) => ({
      ...route,
      names: route.names.sort(),
      tiers: route.tiers.sort(),
      jurisdictions: route.jurisdictions.sort(),
      categories: route.categories.sort(),
      roles: route.roles.sort(),
      sourceRegistryIds: route.sourceRegistryIds.sort(),
      authorityIds: route.authorityIds.sort(),
      activeSignalsFeedIds: route.activeSignalsFeedIds.sort(),
    }))
    .sort((a, b) => a.url.localeCompare(b.url));

  const count = (predicate) => orderedRoutes.filter(predicate).length;
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    purpose: "Governed discovery estate for Signals and regulatory research. Source routes are deduplicated by canonical publisher URL. Catalogue inclusion is not a claim of active scanning or weekly editorial use.",
    metrics: {
      uniqueSourceRoutes: orderedRoutes.length,
      cataloguedRegulatoryAuthorities: authorityById.size,
      cataloguedAuthorityRoutes: count((route) => route.roles.includes("catalogued-regulatory-authority")),
      governedRegistrySources: (registry.sources || []).length,
      registeredPrimarySources: (registry.sources || []).filter((source) => source.tier === "primary").length,
      activeSignalsFeeds: (signalsFeeds.sources || []).length,
      activeSignalsSourceOwners: new Set((signalsFeeds.sources || []).map((feed) => feed.sourceRegistryId).filter(Boolean)).size,
      uniquePrimaryRoutes: count((route) => route.tiers.includes("primary")),
      specialistOrPressRoutes: count((route) => route.tiers.some((tier) => tier === "specialist" || tier === "press")),
      jurisdictions: new Set(orderedRoutes.flatMap((route) => route.jurisdictions)).size,
    },
    routes: orderedRoutes,
  };
}

function main() {
  const estate = createEstate({
    universe: JSON.parse(fs.readFileSync(UNIVERSE_PATH, "utf8")),
    registry: JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8")),
    signalsFeeds: JSON.parse(fs.readFileSync(SIGNALS_FEEDS_PATH, "utf8")),
  });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(estate, null, 2)}\n`);
  console.log(
    `Source estate built: ${estate.metrics.uniqueSourceRoutes} unique routes, ` +
      `${estate.metrics.cataloguedRegulatoryAuthorities} authorities, ${estate.metrics.activeSignalsFeeds} active Signals feeds.`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) main();

export { canonicaliseUrl, createEstate };
