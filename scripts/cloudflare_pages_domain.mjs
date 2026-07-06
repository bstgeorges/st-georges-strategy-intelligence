import { execFileSync } from "node:child_process";

const accountId = "8ccca7b7fc13d4819ff334001675528d";
const projectName = "st-georges-strategy-intelligence";
const domainName = "intelligence.stgeorgesstrategy.com";
const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`;

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

async function request(path = "", options = {}) {
  const token = getToken();
  const response = await fetch(`${baseUrl}${path}`, {
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

function summarize(result) {
  return {
    status: result.status,
    success: result.body?.success,
    errors: result.body?.errors,
    result: result.body?.result
      ? {
          name: result.body.result.name,
          status: result.body.result.status,
          verification_data: result.body.result.verification_data,
          ownership_verification: result.body.result.ownership_verification
        }
      : undefined
  };
}

const mode = process.argv[2] || "list";

if (mode === "list") {
  const result = await request();
  const domains = Array.isArray(result.body?.result)
    ? result.body.result.map((domain) => ({
        name: domain.name,
        status: domain.status,
        verification_data: domain.verification_data,
        ownership_verification: domain.ownership_verification
      }))
    : result.body?.result;
  console.log(JSON.stringify({ status: result.status, success: result.body?.success, domains, errors: result.body?.errors }, null, 2));
} else if (mode === "add") {
  const result = await request("", {
    method: "POST",
    body: JSON.stringify({ name: domainName })
  });
  console.log(JSON.stringify(summarize(result), null, 2));
} else {
  console.error("Usage: node scripts/cloudflare_pages_domain.mjs [list|add]");
  process.exit(2);
}
