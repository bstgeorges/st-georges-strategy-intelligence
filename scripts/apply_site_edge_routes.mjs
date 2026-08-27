const SITE_WORKER = "st-georges-strategy-not-found-route";
const REQUIRED_PATTERNS = [
  "stgeorgesstrategy.com/*",
  "www.stgeorgesstrategy.com/*",
  "intelligence.stgeorgesstrategy.com/*",
];
const OPTIONAL_PATTERNS = [
  "stgeorgesstrategy.com/",
  "stgeorgesstrategy.com/intelligence*",
  "stgeorgesstrategy.com/ai-signals*",
  "stgeorgesstrategy.com/thevirtualofficer*",
  "stgeorgesstrategy.com/robots.txt",
  "stgeorgesstrategy.com/sitemap.xml",
];
const LEGACY_SCRIPTS = new Set([
  "st-georges-strategy-landing-route",
  "st-georges-strategy-not-found-route",
  "st-georges-strategy-seo-files-route",
  "st-georges-strategy-www-redirect",
  "st-georges-strategy-intelligence-route",
  "st-georges-strategy-intelligence-subdomain-route",
  "st-georges-strategy-ai-signals-route",
  "st-georges-strategy-thevirtualofficer-route",
]);

function apiHeaders() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) throw new Error("CLOUDFLARE_API_TOKEN is required.");
  return { Authorization: `Bearer ${token}`, "content-type": "application/json" };
}

async function cloudflare(path, init = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, { ...init, headers: { ...apiHeaders(), ...init.headers } });
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    const details = (payload.errors || []).map((item) => item.message).join("; ") || response.statusText;
    throw new Error(`${init.method || "GET"} ${path} failed: ${details}`);
  }
  return payload.result;
}

async function zoneId() {
  if (process.env.CLOUDFLARE_ZONE_ID) return process.env.CLOUDFLARE_ZONE_ID;
  const zones = await cloudflare("/zones?name=stgeorgesstrategy.com&status=active");
  if (zones.length !== 1) throw new Error("Could not resolve the stgeorgesstrategy.com zone. Set CLOUDFLARE_ZONE_ID.");
  return zones[0].id;
}

function parseArgs(argv) {
  if (!argv.length) return { dryRun: false };
  if (argv.length === 1 && argv[0] === "--dry-run") return { dryRun: true };
  throw new Error("Usage: node scripts/apply_site_edge_routes.mjs [--dry-run]");
}

async function main() {
  const { dryRun } = parseArgs(process.argv.slice(2));
  const id = await zoneId();
  const routes = await cloudflare(`/zones/${id}/workers/routes`);
  const byPattern = new Map(routes.map((route) => [route.pattern, route]));

  for (const pattern of REQUIRED_PATTERNS) {
    if (!byPattern.has(pattern)) throw new Error(`Required Cloudflare route is missing: ${pattern}`);
  }

  const candidates = [...REQUIRED_PATTERNS, ...OPTIONAL_PATTERNS]
    .map((pattern) => byPattern.get(pattern))
    .filter(Boolean);
  for (const route of candidates) {
    if (!LEGACY_SCRIPTS.has(route.script)) {
      throw new Error(`Refusing to change ${route.pattern}: it is assigned to unexpected script ${route.script || "<none>"}.`);
    }
    if (route.script === SITE_WORKER) {
      console.log(`Route already assigned: ${route.pattern}`);
      continue;
    }
    if (dryRun) {
      console.log(`Would assign ${route.pattern} to ${SITE_WORKER}.`);
      continue;
    }
    await cloudflare(`/zones/${id}/workers/routes/${route.id}`, {
      method: "PUT",
      body: JSON.stringify({ pattern: route.pattern, script: SITE_WORKER }),
    });
    console.log(`Assigned ${route.pattern} to ${SITE_WORKER}.`);
  }
}

await main();
