const ORIGIN = "https://st-georges-strategy-intelligence.pages.dev";

const SECURITY_HEADERS = {
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  "content-security-policy":
    "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com; upgrade-insecure-requests",
};

function withOptionalAnalytics(html, token) {
  if (!token || html.includes("static.cloudflareinsights.com/beacon.min.js")) return html;
  const snippet = `\n    <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${token}"}'></script>`;
  return html.replace("</head>", `${snippet}\n  </head>`);
}

export default {
  async fetch(request, env) {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD", ...SECURITY_HEADERS },
      });
    }

    const upstream = new URL("/", ORIGIN);
    const upstreamResponse = await fetch(upstream, {
      method: request.method,
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    const headers = new Headers(upstreamResponse.headers);
    headers.delete("content-length");
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => headers.set(key, value));
    headers.set("x-sgs-route", "stgeorgesstrategy-home");

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
