import { execFileSync } from "node:child_process";

const zoneName = "stgeorgesstrategy.com";
const recordName = "www.stgeorgesstrategy.com";
const recordContent = "stgeorgesstrategy.com";
const redirectRuleRef = "redirect_www_to_apex";
const redirectPhase = "http_request_dynamic_redirect";

function getToken() {
  const envToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
  if (envToken) return envToken;

  const raw = execFileSync("npx", ["wrangler", "auth", "token", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
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

const token = getToken();

async function cloudflare(path, options = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  return { status: response.status, body };
}

function summarizeRecord(record) {
  return {
    id: record.id,
    type: record.type,
    name: record.name,
    content: record.content,
    proxied: record.proxied,
  };
}

async function getZoneId() {
  const result = await cloudflare(`/zones?name=${encodeURIComponent(zoneName)}`);
  const zone = Array.isArray(result.body?.result) ? result.body.result[0] : null;
  if (!zone?.id) {
    throw new Error(`Could not find Cloudflare zone for ${zoneName}.`);
  }
  return zone.id;
}

async function listWwwRecords(zoneId) {
  const result = await cloudflare(`/zones/${zoneId}/dns_records?name=${encodeURIComponent(recordName)}`);
  return Array.isArray(result.body?.result) ? result.body.result : [];
}

async function ensureWwwRecord(zoneId) {
  const records = await listWwwRecords(zoneId);
  const cname = records.find((record) => record.type === "CNAME");
  const blockers = records.filter((record) => record.type !== "CNAME");

  if (blockers.length) {
    return {
      changed: false,
      ok: false,
      error: `${recordName} already has non-CNAME DNS records. Review before changing.`,
      records: records.map(summarizeRecord),
    };
  }

  if (cname) {
    if (cname.content === recordContent && cname.proxied === true) {
      return { changed: false, ok: true, record: summarizeRecord(cname) };
    }

    const result = await cloudflare(`/zones/${zoneId}/dns_records/${cname.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "CNAME",
        name: recordName,
        content: recordContent,
        proxied: true,
        comment: "Redirect www traffic to the apex St Georges Strategy site",
      }),
    });
    return {
      changed: true,
      ok: result.body?.success,
      status: result.status,
      errors: result.body?.errors,
      record: result.body?.result ? summarizeRecord(result.body.result) : undefined,
    };
  }

  const result = await cloudflare(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify({
      type: "CNAME",
      name: recordName,
      content: recordContent,
      proxied: true,
      comment: "Redirect www traffic to the apex St Georges Strategy site",
    }),
  });
  return {
    changed: true,
    ok: result.body?.success,
    status: result.status,
    errors: result.body?.errors,
    record: result.body?.result ? summarizeRecord(result.body.result) : undefined,
  };
}

function wwwRedirectRule() {
  return {
    ref: redirectRuleRef,
    description: "Redirect www.stgeorgesstrategy.com to apex",
    expression: 'http.host eq "www.stgeorgesstrategy.com"',
    action: "redirect",
    action_parameters: {
      from_value: {
        target_url: {
          expression: 'concat("https://stgeorgesstrategy.com", http.request.uri.path)',
        },
        status_code: 301,
        preserve_query_string: true,
      },
    },
  };
}

async function getRedirectRuleset(zoneId) {
  const result = await cloudflare(`/zones/${zoneId}/rulesets/phases/${redirectPhase}/entrypoint`);
  if (result.status === 404) return null;
  if (!result.body?.success) {
    throw new Error(`Could not read redirect ruleset: ${JSON.stringify(result.body?.errors || result.body)}`);
  }
  return result.body.result;
}

async function ensureRedirectRule(zoneId) {
  const existing = await getRedirectRuleset(zoneId);
  const rule = wwwRedirectRule();

  if (!existing) {
    const result = await cloudflare(`/zones/${zoneId}/rulesets`, {
      method: "POST",
      body: JSON.stringify({
        name: "Redirect rules ruleset",
        kind: "zone",
        phase: redirectPhase,
        rules: [rule],
      }),
    });
    return {
      changed: true,
      ok: result.body?.success,
      status: result.status,
      errors: result.body?.errors,
      ruleset: summarizeRuleset(result.body?.result),
    };
  }

  const rules = Array.isArray(existing.rules) ? existing.rules : [];
  const currentIndex = rules.findIndex(
    (item) => item.ref === redirectRuleRef || item.description === rule.description,
  );
  const nextRules = currentIndex === -1
    ? [...rules, rule]
    : [...rules.slice(0, currentIndex), rule, ...rules.slice(currentIndex + 1)];

  if (currentIndex !== -1 && JSON.stringify(rules[currentIndex]) === JSON.stringify(rule)) {
    return { changed: false, ok: true, ruleset: summarizeRuleset(existing) };
  }

  const result = await cloudflare(`/zones/${zoneId}/rulesets/${existing.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: existing.name || "Redirect rules ruleset",
      description: existing.description || "",
      kind: "zone",
      phase: redirectPhase,
      rules: nextRules,
    }),
  });
  return {
    changed: true,
    ok: result.body?.success,
    status: result.status,
    errors: result.body?.errors,
    ruleset: summarizeRuleset(result.body?.result),
  };
}

function summarizeRuleset(ruleset) {
  if (!ruleset) return undefined;
  return {
    id: ruleset.id,
    name: ruleset.name,
    phase: ruleset.phase,
    rules: (ruleset.rules || []).map((rule) => ({
      id: rule.id,
      ref: rule.ref,
      description: rule.description,
      expression: rule.expression,
      action: rule.action,
      status_code: rule.action_parameters?.from_value?.status_code,
      target_expression: rule.action_parameters?.from_value?.target_url?.expression,
      preserve_query_string: rule.action_parameters?.from_value?.preserve_query_string,
    })),
  };
}

async function listState(zoneId) {
  const records = await listWwwRecords(zoneId);
  let redirectRuleset;
  let redirectRulesetError;
  try {
    redirectRuleset = summarizeRuleset(await getRedirectRuleset(zoneId));
  } catch (error) {
    redirectRulesetError = error.message;
  }
  return {
    dnsRecords: records.map(summarizeRecord),
    redirectRuleset,
    redirectRulesetError,
  };
}

const mode = process.argv[2] || "list";
const zoneId = await getZoneId();

if (mode === "list") {
  console.log(JSON.stringify(await listState(zoneId), null, 2));
} else if (mode === "apply") {
  const dns = await ensureWwwRecord(zoneId);
  if (!dns.ok) {
    console.log(JSON.stringify({ dns }, null, 2));
    process.exit(1);
  }
  let redirect;
  try {
    redirect = await ensureRedirectRule(zoneId);
  } catch (error) {
    redirect = {
      changed: false,
      ok: false,
      error: error.message,
    };
  }
  console.log(JSON.stringify({ dns, redirect }, null, 2));
  if (!redirect.ok) process.exit(1);
} else {
  console.error("Usage: node scripts/cloudflare_www_redirect.mjs [list|apply]");
  process.exit(2);
}
