import fs from "node:fs";

const PATH = "dashboard/data/source-estate.generated.json";
const data = JSON.parse(fs.readFileSync(PATH, "utf8"));
const failures = [];
const ids = new Set();
const urls = new Set();

if (data.metrics?.uniqueSourceRoutes < 200) failures.push(`expected at least 200 unique source routes; found ${data.metrics?.uniqueSourceRoutes || 0}`);
if (data.metrics?.cataloguedRegulatoryAuthorities < 130) failures.push(`expected at least 130 catalogued regulatory authorities; found ${data.metrics?.cataloguedRegulatoryAuthorities || 0}`);
if (data.metrics?.registeredPrimarySources < 70) failures.push(`expected at least 70 registered primary sources; found ${data.metrics?.registeredPrimarySources || 0}`);
if (data.metrics?.activeSignalsFeeds < 50) failures.push(`expected at least 50 active Signals feeds; found ${data.metrics?.activeSignalsFeeds || 0}`);

for (const route of data.routes || []) {
  if (!route.id || ids.has(route.id)) failures.push(`duplicate or missing route id: ${route.id || "<missing>"}`);
  ids.add(route.id);
  if (!/^https?:\/\//.test(route.url || "")) failures.push(`${route.id} has no web URL`);
  if (urls.has(route.url)) failures.push(`duplicate canonical route URL: ${route.url}`);
  urls.add(route.url);
  if (!route.names?.length) failures.push(`${route.id} has no source name`);
  if (!route.tiers?.length) failures.push(`${route.id} has no tier`);
  if (!route.roles?.length) failures.push(`${route.id} has no estate role`);
  if (!route.provenance?.length) failures.push(`${route.id} has no provenance`);
}

if (data.metrics?.uniqueSourceRoutes !== (data.routes || []).length) {
  failures.push(`metric/source mismatch: metrics reports ${data.metrics?.uniqueSourceRoutes}, routes contain ${(data.routes || []).length}`);
}

if (failures.length) {
  console.error("Source estate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Source estate validation passed: ${data.metrics.uniqueSourceRoutes} routes, ` +
    `${data.metrics.cataloguedRegulatoryAuthorities} authorities, ${data.metrics.activeSignalsFeeds} active Signals feeds.`,
);
