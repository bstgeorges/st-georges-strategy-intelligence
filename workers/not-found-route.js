const ORIGIN = "https://st-georges-strategy-intelligence.pages.dev";
const FINAL_ROUTE_PREFIXES = [
  "/assets/",
  "/about/",
  "/archive/",
  "/brief/",
  "/committee-questions/",
  "/data/",
  "/regulatory-horizon/",
  "/signals/",
];
const FINAL_EXACT_PATHS = new Set(["/", "/index.html"]);
const DIRECTORY_PATHS = new Set(["/about", "/archive", "/brief", "/committee-questions", "/regulatory-horizon", "/signals"]);

const SECURITY_HEADERS = {
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  "content-security-policy":
    "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com; upgrade-insecure-requests",
};

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page not found | St Georges Strategy</title>
    <meta name="robots" content="noindex">
    <link rel="icon" type="image/svg+xml" href="https://stgeorgesstrategy.com/assets/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <style>
      :root { color-scheme: light; --paper:#e7e1d3; --ink:#15140f; --body:#3a382f; --navy:#0f2233; --cream:#f1ebdc; --accent:#a07e2e; }
      * { box-sizing: border-box; }
      body { display:grid; min-height:100vh; margin:0; background:var(--paper); color:var(--ink); font-family:"Hanken Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height:1.55; }
      main { display:grid; align-content:center; width:min(920px, 100%); margin:0 auto; padding:clamp(32px, 7vw, 84px); }
      .wordmark, .eyebrow, .button { font-family:"JetBrains Mono", ui-monospace, SFMono-Regular, monospace; text-transform:uppercase; }
      .wordmark { display:flex; align-items:center; gap:16px; margin-bottom:clamp(56px, 10vw, 104px); color:var(--navy); font-size:13px; font-weight:600; letter-spacing:.16em; text-decoration:none; }
      .mark { display:grid; place-items:center; min-width:42px; height:30px; border:1px solid rgba(160,126,46,.55); color:var(--accent); font-size:12px; letter-spacing:.12em; }
      .eyebrow { margin:0 0 18px; color:var(--accent); font-size:12px; font-weight:600; letter-spacing:.18em; }
      h1 { max-width:760px; margin:0 0 20px; font-family:"Playfair Display", Georgia, serif; font-size:clamp(52px, 9vw, 112px); line-height:.98; }
      p { max-width:620px; margin:0; color:var(--body); font-size:clamp(18px, 2vw, 23px); }
      .actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:34px; }
      .button { display:inline-flex; align-items:center; justify-content:center; min-height:46px; border:1px solid var(--navy); padding:13px 18px; background:var(--navy); color:var(--cream); font-size:12px; font-weight:600; letter-spacing:.14em; text-decoration:none; }
      .button.secondary { border-color:rgba(15,34,51,.26); background:transparent; color:var(--navy); }
    </style>
  </head>
  <body>
    <main>
      <a class="wordmark" href="https://stgeorgesstrategy.com/" aria-label="St Georges Strategy home"><span class="mark" aria-hidden="true">SGS</span><span>St Georges Strategy</span></a>
      <p class="eyebrow">404 / Page not found</p>
      <h1>This page is not in the brief.</h1>
      <p>The address may have moved during the site migration, but the main briefing pages are still live.</p>
      <div class="actions" aria-label="Useful links">
        <a class="button" href="https://stgeorgesstrategy.com/">Home</a>
        <a class="button secondary" href="https://stgeorgesstrategy.com/brief/">Weekly brief</a>
      </div>
    </main>
  </body>
</html>`;

function shouldServePath(pathname) {
  if (FINAL_EXACT_PATHS.has(pathname)) return true;
  if (pathname === "/styles.css" || pathname === "/app.js" || pathname === "/sitemap.xml" || pathname === "/robots.txt") return true;
  return FINAL_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function withOptionalAnalytics(html, token) {
  if (!token || html.includes("static.cloudflareinsights.com/beacon.min.js")) return html;
  const snippet = `\n    <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${token}"}'></script>`;
  return html.replace("</head>", `${snippet}\n  </head>`);
}

function notFound(method) {
  return new Response(method === "HEAD" ? null : NOT_FOUND_HTML, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      ...SECURITY_HEADERS,
    },
  });
}

export default {
  async fetch(request, env) {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD", ...SECURITY_HEADERS },
      });
    }

    const url = new URL(request.url);

    if (url.pathname === "/index.html") {
      url.pathname = "/";
      return Response.redirect(url.toString(), 301);
    }

    if (DIRECTORY_PATHS.has(url.pathname)) {
      url.pathname = `${url.pathname}/`;
      return Response.redirect(url.toString(), 308);
    }

    if (!shouldServePath(url.pathname)) {
      return notFound(request.method);
    }

    const upstream = new URL(url.pathname + url.search, ORIGIN);
    // §0 fix (10 Jul 2026 fix spec): this fetch previously had no cache-control options,
    // which let Cloudflare's edge cache transparently serve a stale copy of the origin
    // response for an arbitrary period — the observed symptom was crawlers and non-JS
    // clients getting a publish cycle (and one template generation) behind what a
    // browser rendered. Forcing cacheTtl to 0 and disabling cacheEverything makes this
    // Worker always pull a fresh response from the Pages origin, which already has its
    // own short-lived Cache-Control (see generateHeaders() in publish_site_bundle.mjs).
    const upstreamResponse = await fetch(upstream, {
      method: request.method,
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    if (upstreamResponse.status === 404) {
      return notFound(request.method);
    }

    const headers = new Headers(upstreamResponse.headers);
    headers.delete("content-length");
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => headers.set(key, value));
    headers.set("x-sgs-route", "stgeorgesstrategy-site");

    if (request.method === "GET" && (headers.get("content-type") || "").includes("text/html")) {
      const body = withOptionalAnalytics(await upstreamResponse.text(), env.CF_WEB_ANALYTICS_TOKEN);
      return new Response(body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers,
      });
    }

    return new Response(request.method === "HEAD" ? null : upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  },
};
