import { chromium } from "@playwright/test";

import { publicEditorialRegistry } from "../src/content/editorial/public-registry.ts";
import { editorialCanonical } from "../src/lib/editorial-metadata.ts";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const canonicalOrigin = "https://stgeorgesstrategy.com";
const checkExternal = process.argv.includes("--external");
const accessRestrictedExternalUrls = new Map([
  [
    "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
    new Set([401]),
  ],
  ["https://www.fatf-gafi.org/en/publications.html", new Set([403])],
  ["https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c", new Set([403])],
  ["https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568", new Set([403])],
  ["https://www.ft.com/content/7f501320-9037-410f-b8e7-3111b9041311", new Set([403])],
  ["https://www.jmlsg.org.uk/guidance/current-guidance/", new Set([403])],
  ["https://www.jmlsg.org.uk/latest-news/jmlsg-consultation-part-i-2/", new Set([403])],
  ["https://www.linkedin.com/in/benstgeorges/", new Set([999])],
]);

function visitLinks(value, links, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  if (typeof value.href === "string") links.add(value.href);
  for (const nested of Array.isArray(value) ? value : Object.values(value)) {
    visitLinks(nested, links, seen);
  }
}

const sourceLinks = new Set();
for (const record of publicEditorialRegistry) visitLinks(record.content, sourceLinks);
for (const route of [
  "/",
  "/brief/",
  "/signals/",
  "/regulatory-horizon/",
  "/committee-questions/",
  "/archive/",
  "/about/",
]) {
  sourceLinks.add(route);
}

const internalPaths = new Set();
const externalUrls = new Set();
for (const href of sourceLinks) {
  if (href.startsWith("#") || href.startsWith("mailto:")) continue;
  const resolved = new URL(href, canonicalOrigin);
  resolved.hash = "";
  if (resolved.origin === canonicalOrigin)
    internalPaths.add(`${resolved.pathname}${resolved.search}`);
  else if (resolved.protocol === "http:" || resolved.protocol === "https:")
    externalUrls.add(resolved.href);
}

async function pooled(values, concurrency, task) {
  const pending = [...values];
  const results = [];
  await Promise.all(
    Array.from({ length: Math.min(concurrency, pending.length) }, async () => {
      while (pending.length) {
        const value = pending.shift();
        results.push(await task(value));
      }
    }),
  );
  return results;
}

function tagAttribute(tag, name) {
  return new RegExp(`\\b${name}=["']([^"']*)["']`, "i").exec(tag)?.[1];
}

function metadataContent(html, attribute, value) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (tagAttribute(match[0], attribute) === value) return tagAttribute(match[0], "content");
  }
}

function linkHref(html, rel) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    if (tagAttribute(match[0], "rel") === rel) return tagAttribute(match[0], "href");
  }
}

function structuredDataIdentifiers(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  const identifiers = [];
  for (const key of ["@id", "url"]) {
    if (typeof value[key] === "string") identifiers.push(value[key]);
  }
  const mainEntity = value.mainEntityOfPage;
  if (typeof mainEntity === "string") identifiers.push(mainEntity);
  else if (mainEntity && typeof mainEntity === "object" && !Array.isArray(mainEntity)) {
    for (const key of ["@id", "url"]) {
      if (typeof mainEntity[key] === "string") identifiers.push(mainEntity[key]);
    }
  }
  return identifiers;
}

const internalResults = await pooled([...internalPaths].sort(), 10, async (pathname) => {
  const response = await fetch(new URL(pathname, baseURL), { redirect: "follow" });
  return { pathname, status: response.status, finalUrl: response.url };
});
const brokenInternal = internalResults.filter(({ status }) => status < 200 || status >= 400);
if (brokenInternal.length)
  throw new Error(`Broken internal links: ${JSON.stringify(brokenInternal)}`);

const metadataResults = await pooled(publicEditorialRegistry, 8, async (record) => {
  const { route } = record;
  const response = await fetch(new URL(route, baseURL));
  const html = await response.text();
  const title = /<title>([^<]+)<\/title>/i.exec(html)?.[1];
  const description = metadataContent(html, "name", "description");
  const canonical = linkHref(html, "canonical");
  const openGraphUrl = metadataContent(html, "property", "og:url");
  const structuredData = [
    ...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ]
    .map((match) => match[1])
    .map((value) => {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    });
  const expectedCanonical = editorialCanonical(record);
  const routeIdentifiers = structuredData.flatMap(structuredDataIdentifiers);
  const conflictingRouteIdentifiers = routeIdentifiers.filter((identifier) => {
    if (!URL.canParse(identifier)) return false;
    const url = new URL(identifier);
    return url.origin === canonicalOrigin && url.href !== expectedCanonical;
  });
  return {
    route,
    status: response.status,
    title: Boolean(title),
    description: Boolean(description),
    canonical,
    openGraphUrl,
    expectedCanonical,
    canonicalIsSelf:
      URL.canParse(canonical ?? "") &&
      new URL(canonical).origin === canonicalOrigin &&
      new URL(canonical).pathname === route,
    structuredData,
    routeIdentifiers,
    conflictingRouteIdentifiers,
  };
});
const invalidMetadata = metadataResults.filter(
  ({
    status,
    title,
    description,
    canonical,
    openGraphUrl,
    expectedCanonical,
    canonicalIsSelf,
    structuredData,
    routeIdentifiers,
    conflictingRouteIdentifiers,
  }) =>
    status !== 200 ||
    !title ||
    !description ||
    !canonical ||
    canonical !== expectedCanonical ||
    !canonicalIsSelf ||
    openGraphUrl !== expectedCanonical ||
    structuredData.includes(null) ||
    structuredData.length === 0 ||
    !routeIdentifiers.includes(expectedCanonical) ||
    conflictingRouteIdentifiers.length > 0,
);
if (invalidMetadata.length) {
  throw new Error(`Route metadata failures: ${JSON.stringify(invalidMetadata)}`);
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", baseURL));
const sitemap = await sitemapResponse.text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedCanonicals = publicEditorialRegistry.map((record) => editorialCanonical(record));
const expectedCanonicalSet = new Set(expectedCanonicals);
const sitemapUrlSet = new Set(sitemapUrls);
if (
  sitemapResponse.status !== 200 ||
  sitemapUrls.length !== publicEditorialRegistry.length ||
  sitemapUrlSet.size !== sitemapUrls.length ||
  expectedCanonicalSet.size !== expectedCanonicals.length ||
  expectedCanonicals.some((canonical) => !sitemapUrlSet.has(canonical)) ||
  sitemapUrls.some((canonical) => !expectedCanonicalSet.has(canonical))
) {
  throw new Error(
    `Sitemap uniqueness/path coverage failed: ${sitemapUrls.length} URLs, ${sitemapUrlSet.size} unique`,
  );
}

const robotsResponse = await fetch(new URL("/robots.txt", baseURL));
const robots = await robotsResponse.text();
if (
  robotsResponse.status !== 200 ||
  !robots.includes("Allow: /") ||
  !robots.includes(`${canonicalOrigin}/sitemap.xml`)
) {
  throw new Error("robots.txt coverage failed");
}

const homeResponse = await fetch(new URL("/", baseURL));
const requiredHeaders = [
  "content-security-policy",
  "permissions-policy",
  "referrer-policy",
  "strict-transport-security",
  "x-content-type-options",
  "x-frame-options",
];
const missingHeaders = requiredHeaders.filter((header) => !homeResponse.headers.has(header));
if (missingHeaders.length)
  throw new Error(`Missing security headers: ${missingHeaders.join(", ")}`);

const redirectCases = [
  ["/intelligence", "/brief/"],
  ["/intelligence/archive/2026-07-09", "/archive/brief/2026-07-09/"],
  ["/ai-signals", "/signals/ai/"],
  ["/ai-signals/archive/2026-07-09", "/signals/ai/archive/2026-07-09/"],
  ["/thevirtualofficer", "/about/"],
  ["/thevirtualofficer/regulatory-horizon", "/regulatory-horizon/"],
];
for (const [source, destination] of redirectCases) {
  let current = new URL(source, baseURL);
  const hops = [];
  for (let hop = 0; hop < 4; hop += 1) {
    const response = await fetch(current, { redirect: "manual" });
    const location = response.headers.get("location");
    if (![301, 308].includes(response.status) || !location) break;
    current = new URL(location, current);
    hops.push({ status: response.status, pathname: current.pathname });
  }
  if (hops.length === 0 || current.pathname !== destination) {
    throw new Error(`${source} redirect failed: ${JSON.stringify(hops)}`);
  }
}

const legacyArchiveResponse = await fetch(
  new URL("/regulatory-horizon/archive/2026-07-02.html", baseURL),
);
const legacyArchive = await legacyArchiveResponse.text();
if (
  legacyArchiveResponse.status !== 200 ||
  /<script\b|\son[a-z]+\s*=|javascript:/i.test(legacyArchive) ||
  !legacyArchive.includes("Content-Security-Policy") ||
  !legacyArchive.includes("script-src 'none'")
) {
  throw new Error("Legacy Horizon archive is missing inert-content hardening");
}

const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(new URL("/committee-questions/", baseURL).href, {
    waitUntil: "domcontentloaded",
  });
  await page.keyboard.press("Tab");
  if ((await page.evaluate(() => document.activeElement?.className)) !== "skip-link") {
    throw new Error("Skip link is not the first keyboard stop");
  }
  await page.keyboard.press("Enter");
  if ((await page.evaluate(() => document.activeElement?.id)) !== "main-content") {
    throw new Error("Skip link does not move focus to the main landmark");
  }
  const menu = page.locator(".sgs-mobile-nav summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  if (
    !(await page.locator(".sgs-mobile-nav").evaluate((element) => element.hasAttribute("open")))
  ) {
    throw new Error("Mobile navigation is not keyboard operable");
  }
  await page.emulateMedia({ media: "print" });
  await page.goto(new URL("/brief/", baseURL).href, { waitUntil: "domcontentloaded" });
  const print = await page.evaluate(() => ({
    header: getComputedStyle(document.querySelector(".sgs-header")).display,
    progress: getComputedStyle(document.querySelector(".sgs-reading-progress-region")).display,
    cardBreak: getComputedStyle(document.querySelector(".brief-card")).breakInside,
    footerBackground: getComputedStyle(document.querySelector(".sgs-footer")).backgroundColor,
  }));
  if (
    print.header !== "none" ||
    print.progress !== "none" ||
    print.cardBreak !== "avoid" ||
    print.footerBackground !== "rgb(255, 255, 255)"
  ) {
    throw new Error(`Print stylesheet failed: ${JSON.stringify(print)}`);
  }
  await context.close();
} finally {
  await browser.close();
}

let externalResults = [];
if (checkExternal) {
  externalResults = await pooled([...externalUrls].sort(), 8, async (url) => {
    let lastFailure;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        let response = await fetch(url, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(12000),
        });
        if (response.status === 405 || response.status === 403) {
          response = await fetch(url, {
            method: "GET",
            redirect: "follow",
            signal: AbortSignal.timeout(12000),
          });
        }
        if (response.status < 500 || attempt === 3) {
          return { url, status: response.status, finalUrl: response.url, attempts: attempt };
        }
        lastFailure = { url, status: response.status, finalUrl: response.url, attempts: attempt };
      } catch (error) {
        lastFailure = {
          url,
          status: 0,
          error: error instanceof Error ? error.message : String(error),
          attempts: attempt,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, attempt * 250));
    }
    return lastFailure;
  });
}

const restrictedExternal = externalResults.filter(({ url, status }) =>
  accessRestrictedExternalUrls.get(url)?.has(status),
);
const unavailableExternal = externalResults.filter(
  ({ url, status }) =>
    (status < 200 || status >= 400) && !accessRestrictedExternalUrls.get(url)?.has(status),
);
if (unavailableExternal.length) {
  throw new Error(`Unavailable external links: ${JSON.stringify(unavailableExternal)}`);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      routes: metadataResults.length,
      internalLinks: internalResults.length,
      sitemapUrls: sitemapUrls.length,
      structuredDataRoutes: metadataResults.filter(
        ({ structuredData }) => structuredData.length > 0,
      ).length,
      securityHeaders: requiredHeaders.length,
      redirects: redirectCases.length,
      keyboard: "pass",
      print: "pass",
      legacyArchive: "inert-content",
      external: checkExternal
        ? {
            checked: externalResults.length,
            healthy: externalResults.filter(({ status }) => status >= 200 && status < 400).length,
            restricted: restrictedExternal,
            unavailable: unavailableExternal,
          }
        : "skipped",
    },
    null,
    2,
  ),
);
