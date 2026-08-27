const APEX_HOST = "stgeorgesstrategy.com";
const WWW_HOST = "www.stgeorgesstrategy.com";
const LEGACY_HOST = "intelligence.stgeorgesstrategy.com";
const TOPICS = new Set([
  "ai",
  "resilience",
  "third-party",
  "market-structure",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
]);

const DIRECTORY_PATHS = new Set([
  "/about",
  "/archive",
  "/brief",
  "/committee-questions",
  "/signals",
  "/signals/ai",
  "/signals/resilience",
  "/signals/third-party",
  "/signals/market-structure",
  "/signals/financial-crime",
  "/signals/cyber",
  "/signals/technology-failure",
  "/signals/data",
]);

function location(url, pathname) {
  const target = new URL(url);
  target.protocol = "https:";
  target.hostname = APEX_HOST;
  target.pathname = pathname;
  return target.toString();
}

function redirect(url, pathname, status = 301) {
  return { location: location(url, pathname), status };
}

function redirectLegacyHost(url) {
  const { pathname } = url;
  if (pathname === "/" || pathname === "") return redirect(url, "/brief/");
  if (pathname === "/archive" || pathname === "/archive/") return redirect(url, "/archive/");
  if (pathname.startsWith("/archive/")) return redirect(url, `/archive/brief/${pathname.slice("/archive/".length)}`);
  if (pathname === "/regulatory-horizon" || pathname === "/regulatory-horizon/" || pathname.startsWith("/regulatory-horizon/")) {
    return redirect(url, "/archive/");
  }
  return redirect(url, "/brief/");
}

function redirectApexLegacyPath(url) {
  const { pathname } = url;
  if (pathname === "/intelligence" || pathname === "/intelligence/") return redirect(url, "/brief/");
  if (pathname === "/intelligence/archive" || pathname === "/intelligence/archive/") return redirect(url, "/archive/");
  if (pathname.startsWith("/intelligence/archive/")) return redirect(url, `/archive/brief/${pathname.slice("/intelligence/archive/".length)}`);
  if (pathname === "/ai-signals" || pathname === "/ai-signals/") return redirect(url, "/signals/ai/");
  if (pathname === "/ai-signals/archive" || pathname === "/ai-signals/archive/") return redirect(url, "/archive/");
  if (pathname.startsWith("/ai-signals/archive/")) return redirect(url, `/signals/ai/archive/${pathname.slice("/ai-signals/archive/".length)}`);
  if (pathname === "/thevirtualofficer" || pathname === "/thevirtualofficer/") return redirect(url, "/about/");
  if (pathname === "/thevirtualofficer/brief" || pathname === "/thevirtualofficer/brief/") return redirect(url, "/brief/");
  if (pathname === "/thevirtualofficer/signals" || pathname === "/thevirtualofficer/signals/") return redirect(url, "/signals/");
  if (pathname === "/thevirtualofficer/signals/ai" || pathname === "/thevirtualofficer/signals/ai/") return redirect(url, "/signals/ai/");
  if (
    pathname === "/intelligence/regulatory-horizon" ||
    pathname === "/intelligence/regulatory-horizon/" ||
    pathname.startsWith("/intelligence/regulatory-horizon/") ||
    pathname === "/thevirtualofficer/regulatory-horizon" ||
    pathname === "/thevirtualofficer/regulatory-horizon/" ||
    pathname.startsWith("/thevirtualofficer/regulatory-horizon/")
  ) {
    return redirect(url, "/archive/");
  }
  if (pathname === "/regulatory-horizon" || pathname === "/regulatory-horizon/" || pathname.startsWith("/regulatory-horizon/")) {
    return redirect(url, "/archive/");
  }
  if (pathname.startsWith("/intelligence")) return redirect(url, "/brief/");
  if (pathname.startsWith("/ai-signals")) return redirect(url, "/signals/ai/");
  if (pathname.startsWith("/thevirtualofficer")) return redirect(url, "/about/");
  return null;
}

function isArchivedDirectory(pathname) {
  if (/^\/archive\/brief\/\d{4}-\d{2}-\d{2}$/.test(pathname)) return true;
  const match = pathname.match(/^\/signals\/([^/]+)\/archive\/\d{4}-\d{2}-\d{2}$/);
  return Boolean(match && TOPICS.has(match[1]));
}

/**
 * Returns the one canonical redirect for a request, or null when Assets should serve it.
 * Query strings are retained by URL mutation in `location`.
 */
export function resolveRedirect(requestUrl) {
  const url = new URL(requestUrl);

  if (url.hostname === WWW_HOST) return redirect(url, url.pathname);
  if (url.hostname === LEGACY_HOST) return redirectLegacyHost(url);
  if (url.hostname !== APEX_HOST) return null;

  const legacy = redirectApexLegacyPath(url);
  if (legacy) return legacy;

  if (url.pathname === "/index.html") return redirect(url, "/");
  if (DIRECTORY_PATHS.has(url.pathname) || isArchivedDirectory(url.pathname)) {
    return redirect(url, `${url.pathname}/`, 308);
  }
  return null;
}
