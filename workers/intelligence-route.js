const MAIN_HOST = "stgeorgesstrategy.com";
const LEGACY_HOST = "intelligence.stgeorgesstrategy.com";
const TARGET_BASE = "https://stgeorgesstrategy.com";

const SECURITY_HEADERS = {
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
  "content-security-policy":
    "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com; upgrade-insecure-requests",
};

function redirectTarget(requestUrl) {
  const url = new URL(requestUrl);
  const path = url.pathname;

  if (url.hostname === LEGACY_HOST) {
    if (path === "/" || path === "") return `${TARGET_BASE}/brief/${url.search}`;
    if (path === "/archive" || path === "/archive/") return `${TARGET_BASE}/archive/${url.search}`;
    if (path.startsWith("/archive/")) return `${TARGET_BASE}/archive/brief/${path.slice("/archive/".length)}${url.search}`;
    if (path === "/regulatory-horizon" || path === "/regulatory-horizon/") return `${TARGET_BASE}/regulatory-horizon/${url.search}`;
    if (path.startsWith("/regulatory-horizon/")) return `${TARGET_BASE}${path}${url.search}`;
    return `${TARGET_BASE}/brief/${url.search}`;
  }

  if (path === "/intelligence" || path === "/intelligence/") return `${TARGET_BASE}/brief/${url.search}`;
  if (path === "/intelligence/archive" || path === "/intelligence/archive/") return `${TARGET_BASE}/archive/${url.search}`;
  if (path.startsWith("/intelligence/archive/")) {
    return `${TARGET_BASE}/archive/brief/${path.slice("/intelligence/archive/".length)}${url.search}`;
  }
  if (path === "/intelligence/regulatory-horizon" || path === "/intelligence/regulatory-horizon/") {
    return `${TARGET_BASE}/regulatory-horizon/${url.search}`;
  }
  if (path.startsWith("/intelligence/regulatory-horizon/")) {
    return `${TARGET_BASE}/regulatory-horizon/${path.slice("/intelligence/regulatory-horizon/".length)}${url.search}`;
  }

  return `${TARGET_BASE}/brief/${url.search}`;
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
