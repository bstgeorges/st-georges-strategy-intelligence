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

  if (path === "/thevirtualofficer" || path === "/thevirtualofficer/") return `${TARGET_BASE}/about/${url.search}`;
  if (path === "/thevirtualofficer/brief" || path === "/thevirtualofficer/brief/") return `${TARGET_BASE}/brief/${url.search}`;
  if (path === "/thevirtualofficer/signals" || path === "/thevirtualofficer/signals/") return `${TARGET_BASE}/signals/${url.search}`;
  if (path === "/thevirtualofficer/signals/ai" || path === "/thevirtualofficer/signals/ai/") {
    return `${TARGET_BASE}/signals/ai/${url.search}`;
  }
  if (path === "/thevirtualofficer/regulatory-horizon" || path === "/thevirtualofficer/regulatory-horizon/") {
    return `${TARGET_BASE}/regulatory-horizon/${url.search}`;
  }
  if (path.startsWith("/thevirtualofficer/regulatory-horizon/")) {
    return `${TARGET_BASE}/regulatory-horizon/${path.slice("/thevirtualofficer/regulatory-horizon/".length)}${url.search}`;
  }

  return `${TARGET_BASE}/about/${url.search}`;
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
