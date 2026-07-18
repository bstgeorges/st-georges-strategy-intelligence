import fs from "node:fs";

const path = "dashboard/data/regulatory-source-universe.generated.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));
const failures = [];
const endpointIds = new Set();

if (data.metrics.endpoints < 150) failures.push(`expected at least 150 endpoints; found ${data.metrics.endpoints}`);
if (data.metrics.jurisdictions < 40) failures.push(`expected at least 40 jurisdictions; found ${data.metrics.jurisdictions}`);
if (data.metrics.authorities < 100) failures.push(`expected at least 100 authorities; found ${data.metrics.authorities}`);
for (const endpoint of data.endpoints || []) {
  if (!endpoint.id || endpointIds.has(endpoint.id)) failures.push(`duplicate or missing endpoint id: ${endpoint.id}`);
  endpointIds.add(endpoint.id);
  if (!/^https?:\/\//.test(endpoint.url || "")) failures.push(`${endpoint.id} has no web URL`);
  if (!endpoint.status) failures.push(`${endpoint.id} has no readiness status`);
}
for (const authority of data.authorities || []) {
  if (!authority.jurisdictions?.length) failures.push(`${authority.id} has no jurisdiction`);
  if (!authority.provenance?.url) failures.push(`${authority.id} has no provenance`);
  if (!authority.ingestion?.status) failures.push(`${authority.id} has no ingestion status`);
}
if (failures.length) {
  console.error("Regulatory source universe validation failed:");
  failures.slice(0, 50).forEach(x => console.error(`- ${x}`));
  process.exit(1);
}
console.log(`Regulatory source universe passed: ${data.metrics.endpoints} endpoints, ${data.metrics.authorities} authorities, ${data.metrics.jurisdictions} jurisdictions.`);
