import { execFileSync } from "node:child_process";

const zoneName = "stgeorgesstrategy.com";
const recordName = "intelligence.stgeorgesstrategy.com";
const recordContent = "st-georges-strategy-intelligence.pages.dev";

function getToken() {
  const raw = execFileSync("npx", ["wrangler", "auth", "token", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Wrangler did not return parseable JSON credentials.");
  }
  const parsed = JSON.parse(raw.slice(start, end + 1));
  if (!parsed.token) {
    throw new Error("Wrangler did not return an OAuth token.");
  }
  return parsed.token;
}

async function cloudflare(path, options = {}) {
  const token = getToken();
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const body = await response.json().catch(() => ({}));
  return { status: response.status, body };
}

async function getZoneId() {
  const result = await cloudflare(`/zones?name=${encodeURIComponent(zoneName)}`);
  const zone = Array.isArray(result.body?.result) ? result.body.result[0] : null;
  if (!zone?.id) {
    throw new Error(`Could not find Cloudflare zone for ${zoneName}.`);
  }
  return zone.id;
}

async function listRecords(zoneId) {
  const result = await cloudflare(`/zones/${zoneId}/dns_records?name=${encodeURIComponent(recordName)}`);
  return {
    status: result.status,
    success: result.body?.success,
    errors: result.body?.errors,
    records: Array.isArray(result.body?.result)
      ? result.body.result.map((record) => ({
          id: record.id,
          type: record.type,
          name: record.name,
          content: record.content,
          proxied: record.proxied
        }))
      : result.body?.result
  };
}

async function createRecord(zoneId) {
  const result = await cloudflare(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify({
      type: "CNAME",
      name: recordName,
      content: recordContent,
      proxied: true,
      comment: "Project Virtual Officer intelligence dashboard"
    })
  });
  const record = result.body?.result;
  return {
    status: result.status,
    success: result.body?.success,
    errors: result.body?.errors,
    record: record
      ? {
          id: record.id,
          type: record.type,
          name: record.name,
          content: record.content,
          proxied: record.proxied
        }
      : undefined
  };
}

const mode = process.argv[2] || "list";
const zoneId = await getZoneId();

if (mode === "list") {
  console.log(JSON.stringify(await listRecords(zoneId), null, 2));
} else if (mode === "add") {
  const existing = await listRecords(zoneId);
  if (existing.records?.length) {
    console.log(JSON.stringify({ skipped: true, reason: "record already exists", existing }, null, 2));
  } else {
    console.log(JSON.stringify(await createRecord(zoneId), null, 2));
  }
} else {
  console.error("Usage: node scripts/cloudflare_dns_record.mjs [list|add]");
  process.exit(2);
}
