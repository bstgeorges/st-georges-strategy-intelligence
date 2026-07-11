const ZONE_NAME = "stgeorgesstrategy.com";
const DEFAULT_HOSTS = ["stgeorgesstrategy.com", "www.stgeorgesstrategy.com", "intelligence.stgeorgesstrategy.com"];
const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;

if (!token) throw new Error("CLOUDFLARE_API_TOKEN is required.");

function parseHosts(argv) {
  const hosts = [];
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] !== "--hostname") throw new Error(`Unknown argument: ${argv[index]}`);
    hosts.push(argv[++index] || "");
  }
  return hosts.length ? hosts : DEFAULT_HOSTS;
}

async function cloudflare(path, options = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.success) {
    throw new Error(`Cloudflare API ${path} failed (${response.status}): ${JSON.stringify(body.errors || body)}`);
  }
  return body.result;
}

async function zoneId() {
  if (process.env.CLOUDFLARE_ZONE_ID) return process.env.CLOUDFLARE_ZONE_ID;
  const zones = await cloudflare(`/zones?name=${encodeURIComponent(ZONE_NAME)}`);
  if (!zones?.[0]?.id) throw new Error(`Cloudflare zone ${ZONE_NAME} was not found.`);
  return zones[0].id;
}

const hosts = parseHosts(process.argv.slice(2));
const id = await zoneId();
await cloudflare(`/zones/${id}/purge_cache`, {
  method: "POST",
  body: JSON.stringify({ hosts }),
});
console.log(`Purged Cloudflare cache for: ${hosts.join(", ")}`);
