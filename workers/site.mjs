import { resolveRedirect } from "./site-routes.mjs";

const SECURITY_HEADERS = {
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  "content-security-policy":
    "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; frame-src https://embeds.beehiiv.com https://subscribe-forms.beehiiv.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://subscribe-forms.beehiiv.com; connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com https://subscribe-forms.beehiiv.com; upgrade-insecure-requests",
};

function cacheControlFor(pathname) {
  if (pathname.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  // A dated Brief is an immutable edition record. Mutable reader surfaces keep
  // their explicit revalidation policy below, while a permanent edition URL can
  // be cached safely by readers and crawlers.
  if (/^\/brief\/\d{4}-\d{2}-\d{2}\/$/.test(pathname)) return "public, max-age=31536000, immutable";
  if (pathname.startsWith("/data/") || ["/feed.xml", "/regulatory-horizon/latest.json", "/regulatory-horizon/feed.xml", "/regulatory-horizon/horizon.ics"].includes(pathname)) {
    return "public, max-age=300";
  }
  return "no-cache, max-age=0, s-maxage=0, must-revalidate";
}

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function addAnalyticsBeacon(response, token) {
  if (!token || !(response.headers.get("content-type") || "").includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  const beacon = JSON.stringify({ token });
  const streamable = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(
          `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${escapeAttribute(beacon)}'></script>`,
          { html: true },
        );
      },
    })
    .transform(streamable);
}

function withSiteHeaders(response, requestUrl, analyticsToken) {
  const headers = new Headers(response.headers);
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => headers.set(key, value));
  headers.set("cache-control", cacheControlFor(new URL(requestUrl).pathname));
  headers.set("x-sgs-route", "stgeorgesstrategy-site-assets");
  const withHeaders = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
  return addAnalyticsBeacon(withHeaders, analyticsToken);
}

function serviceUnavailable() {
  const headers = new Headers(SECURITY_HEADERS);
  headers.set("content-type", "text/html; charset=UTF-8");
  headers.set("cache-control", "no-store");
  headers.set("retry-after", "60");
  headers.set("x-sgs-route", "stgeorgesstrategy-site-assets");
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Temporarily unavailable | St Georges Strategy</title></head>
<body><main><h1>Temporarily unavailable</h1><p>Please try again shortly.</p></main></body></html>`, { status: 503, headers });
}

export default {
  async fetch(request, env) {
    try {
      if (!["GET", "HEAD"].includes(request.method)) {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD", ...SECURITY_HEADERS } });
      }

      const redirect = resolveRedirect(request.url);
      if (redirect) {
        return new Response(null, { status: redirect.status, headers: { Location: redirect.location, ...SECURITY_HEADERS } });
      }

      const response = await env.ASSETS.fetch(request);
      return withSiteHeaders(response, request.url, env.CF_WEB_ANALYTICS_TOKEN);
    } catch (error) {
      // An application-level failure should retain the site security posture and
      // return a recoverable response instead of Cloudflare's unbranded 1101 page.
      console.error("St Georges Strategy asset Worker failed", error);
      return serviceUnavailable();
    }
  },
};
