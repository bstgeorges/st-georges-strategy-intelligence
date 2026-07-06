import { URL } from "node:url";

const finalRoutes = [
  ["/", "https://stgeorgesstrategy.com/"],
  ["/brief/", "https://stgeorgesstrategy.com/brief/"],
  ["/signals/", "https://stgeorgesstrategy.com/signals/"],
  ["/signals/ai/", "https://stgeorgesstrategy.com/signals/ai/"],
  ["/signals/resilience/", "https://stgeorgesstrategy.com/signals/resilience/"],
  ["/signals/third-party/", "https://stgeorgesstrategy.com/signals/third-party/"],
  ["/signals/market-structure/", "https://stgeorgesstrategy.com/signals/market-structure/"],
  ["/signals/financial-crime/", "https://stgeorgesstrategy.com/signals/financial-crime/"],
  ["/signals/cyber/", "https://stgeorgesstrategy.com/signals/cyber/"],
  ["/signals/technology-failure/", "https://stgeorgesstrategy.com/signals/technology-failure/"],
  ["/signals/data/", "https://stgeorgesstrategy.com/signals/data/"],
  ["/regulatory-horizon/", "https://stgeorgesstrategy.com/regulatory-horizon/"],
  ["/archive/", "https://stgeorgesstrategy.com/archive/"],
  ["/about/", "https://stgeorgesstrategy.com/about/"],
];

const redirects = [
  ["/intelligence/", "/brief/"],
  ["/intelligence/archive/", "/archive/"],
  ["/intelligence/regulatory-horizon/", "/regulatory-horizon/"],
  ["/ai-signals/", "/signals/ai/"],
  ["/thevirtualofficer/", "/about/"],
  ["/thevirtualofficer/brief/", "/brief/"],
  ["/thevirtualofficer/signals/", "/signals/"],
  ["/thevirtualofficer/signals/ai/", "/signals/ai/"],
  ["/thevirtualofficer/regulatory-horizon/", "/regulatory-horizon/"],
];

function parseArgs(argv) {
  const options = { base: "", requireAnalytics: false, checkRedirects: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base") options.base = argv[++index] || "";
    else if (arg.startsWith("--base=")) options.base = arg.slice("--base=".length);
    else if (arg === "--require-analytics") options.requireAnalytics = true;
    else if (arg === "--check-redirects") options.checkRedirects = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!options.base) throw new Error("Usage: node scripts/verify_staging_migration.mjs --base https://preview.example.com [--require-analytics] [--check-redirects]");
  options.base = new URL(options.base).href.replace(/\/$/, "");
  return options;
}

function publicUrlFor(path) {
  return `https://stgeorgesstrategy.com${path}`;
}

function routeUrl(base, path) {
  return `${base}${path}`;
}

function match(html, pattern) {
  const found = html.match(pattern);
  return found ? found[1] : "";
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    redirect: options.redirect || "follow",
    headers: { "user-agent": "StGeorgesStrategyStagingVerifier/1.0" },
  });
  const text = await response.text().catch(() => "");
  return { response, text };
}

async function checkFinalRoute(base, path, expectedCanonical, options, failures) {
  const url = routeUrl(base, path);
  const { response, text } = await fetchText(url);
  if (response.status !== 200) {
    failures.push(`${path} returned ${response.status}`);
    return;
  }

  const canonical = match(text, /<link rel="canonical" href="([^"]+)"/);
  const ogUrl = match(text, /<meta property="og:url" content="([^"]+)"/);
  const jsonLdId = match(text, /"@id": "([^"]+)"/);
  if (canonical !== expectedCanonical) failures.push(`${path} canonical mismatch: ${canonical}`);
  if (ogUrl !== expectedCanonical) failures.push(`${path} og:url mismatch: ${ogUrl}`);
  if (jsonLdId !== expectedCanonical) failures.push(`${path} JSON-LD @id mismatch: ${jsonLdId}`);
  if (text.includes("https://stgeorgesstrategy.com/thevirtualofficer/")) failures.push(`${path} still contains old /thevirtualofficer/ URL`);
  if (!text.includes("Not investment, legal, compliance, or regulatory advice")) failures.push(`${path} missing disclaimer`);
  if (options.requireAnalytics && !/static\.cloudflareinsights\.com|data-cf-beacon/.test(text)) failures.push(`${path} missing Cloudflare analytics beacon`);
}

async function checkRedirect(base, fromPath, toPath, failures) {
  const url = routeUrl(base, fromPath);
  const { response } = await fetchText(url, { redirect: "manual" });
  if (![301, 308].includes(response.status)) {
    failures.push(`${fromPath} should redirect permanently, got ${response.status}`);
    return;
  }
  const location = response.headers.get("location") || "";
  const expected = publicUrlFor(toPath);
  const expectedOnBase = routeUrl(base, toPath);
  if (location !== expected && location !== expectedOnBase && !location.endsWith(toPath)) {
    failures.push(`${fromPath} redirects to unexpected location: ${location}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const failures = [];

  for (const [path, canonical] of finalRoutes) {
    await checkFinalRoute(options.base, path, canonical, options, failures);
  }

  if (options.checkRedirects) {
    for (const [fromPath, toPath] of redirects) {
      await checkRedirect(options.base, fromPath, toPath, failures);
    }
  }

  if (failures.length) {
    console.error("Staging migration verification failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Staging migration verification passed for ${options.base}`);
  console.log(`Final routes checked: ${finalRoutes.length}`);
  if (options.checkRedirects) console.log(`Redirects checked: ${redirects.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
