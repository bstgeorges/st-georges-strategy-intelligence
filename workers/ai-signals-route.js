const TARGET_BASE = "https://stgeorgesstrategy.com";

const SECURITY_HEADERS = {
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  "content-security-policy":
    "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; frame-src https://embeds.beehiiv.com https://subscribe-forms.beehiiv.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://subscribe-forms.beehiiv.com; connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com https://subscribe-forms.beehiiv.com; upgrade-insecure-requests",
};

function redirectTarget(requestUrl) {
  const url = new URL(requestUrl);
  const path = url.pathname;

  if (path === "/ai-signals" || path === "/ai-signals/") return `${TARGET_BASE}/signals/ai/${url.search}`;
  if (path === "/ai-signals/archive" || path === "/ai-signals/archive/") return `${TARGET_BASE}/archive/${url.search}`;
  if (path.startsWith("/ai-signals/archive/")) {
    return `${TARGET_BASE}/signals/ai/archive/${path.slice("/ai-signals/archive/".length)}${url.search}`;
  }

  return `${TARGET_BASE}/signals/ai/${url.search}`;
}

export default {
  async fetch(request) {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD", ...SECURITY_HEADERS },
      });
    }

    return new Response(null, {
      status: 301,
      headers: {
        Location: redirectTarget(request.url),
        ...SECURITY_HEADERS,
      },
    });
  },
};
