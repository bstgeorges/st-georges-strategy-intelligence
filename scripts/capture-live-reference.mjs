import { createHash } from "node:crypto";
import { readFile, rename, rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://stgeorgesstrategy.com";
const sitemapUrl = `${origin}/sitemap.xml`;
const expectedPageCount = 33;
const requestIntervalMs = 125;
const outputRoot = path.join(process.cwd(), "src/content/live-reference");
const requiredRoutes = [
  "/committee-questions/",
  "/archive/brief/2026-07-06/",
  "/signals/ai/archive/2026-07-06/",
  "/signals/resilience/archive/2026-07-06/",
  "/signals/third-party/archive/2026-07-06/",
  "/signals/market-structure/archive/2026-07-06/",
  "/signals/financial-crime/archive/2026-07-06/",
  "/signals/cyber/archive/2026-07-06/",
  "/signals/technology-failure/archive/2026-07-06/",
  "/signals/data/archive/2026-07-06/",
];

let lastRequestAt = 0;

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const waitForRequestSlot = async () => {
  const remaining = requestIntervalMs - (Date.now() - lastRequestAt);
  if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
  lastRequestAt = Date.now();
};

const assertSameOrigin = (value) => {
  const url = new URL(value);
  if (url.origin !== origin || url.username || url.password || url.search || url.hash) {
    throw new Error(`Refusing non-canonical or non-same-origin URL: ${value}`);
  }
  return url;
};

const fetchText = async (value, contentTypePattern) => {
  const url = assertSameOrigin(value);
  await waitForRequestSlot();
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(20_000),
    headers: {
      accept: contentTypePattern.test("text/html")
        ? "text/html,application/xhtml+xml"
        : "application/xml,text/xml",
      "cache-control": "no-cache",
      "user-agent": "StGeorgesStrategiesEvidenceCapture/1.0 (+https://stgeorgesstrategy.com/)",
    },
  });
  const contentType = response.headers.get("content-type") ?? "";
  if (response.status !== 200) {
    throw new Error(`Expected 200 from ${url.href}; received ${response.status}`);
  }
  if (!contentTypePattern.test(contentType)) {
    throw new Error(
      `Expected ${contentTypePattern} from ${url.href}; received ${contentType || "no content type"}`,
    );
  }
  return { status: response.status, text: await response.text() };
};

const decodeXml = (value) =>
  value.replace(/&(amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, (entity, name) => {
    const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
    if (name.startsWith("#x")) return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
    if (name.startsWith("#")) return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
    return named[name.toLowerCase()];
  });

const isHtmlRoute = (url) => {
  const leaf = url.pathname.split("/").at(-1) ?? "";
  return !leaf.includes(".") || /\.html?$/i.test(leaf);
};

const parseSitemap = (xml) => {
  if (!/<urlset\b/i.test(xml) || /<sitemapindex\b/i.test(xml)) {
    throw new Error("Expected a URL-set sitemap, not a sitemap index");
  }
  const listedUrls = [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)].map((match) =>
    assertSameOrigin(decodeXml(match[1].trim())),
  );
  const htmlUrls = listedUrls.filter(isHtmlRoute);
  const routes = htmlUrls.map((url) => url.pathname);
  if (htmlUrls.length !== expectedPageCount) {
    throw new Error(`Expected ${expectedPageCount} HTML routes; received ${htmlUrls.length}`);
  }
  if (new Set(routes).size !== routes.length) {
    throw new Error("Sitemap HTML routes must be unique");
  }
  for (const route of requiredRoutes) {
    if (!routes.includes(route)) throw new Error(`Sitemap is missing required route ${route}`);
  }
  return htmlUrls;
};

const attribute = (tag, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(
    new RegExp(`(?:^|\\s)${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`, "i"),
  );
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : undefined;
};

const metadataFromHtml = (html) => {
  const metadata = { title: html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "" };
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const readMeta = (key, value) => {
    const tag = metaTags.find((candidate) => attribute(candidate, key)?.toLowerCase() === value);
    return tag ? attribute(tag, "content") : undefined;
  };
  const readLink = (rel) => {
    const tag = linkTags.find((candidate) =>
      (attribute(candidate, "rel") ?? "").toLowerCase().split(/\s+/).includes(rel),
    );
    return tag ? attribute(tag, "href") : undefined;
  };
  const optional = {
    description: readMeta("name", "description"),
    canonical: readLink("canonical"),
    openGraphTitle: readMeta("property", "og:title"),
    openGraphDescription: readMeta("property", "og:description"),
    openGraphUrl: readMeta("property", "og:url"),
    openGraphImage: readMeta("property", "og:image"),
    twitterCard: readMeta("name", "twitter:card"),
    twitterTitle: readMeta("name", "twitter:title"),
    twitterDescription: readMeta("name", "twitter:description"),
    robots: readMeta("name", "robots"),
    jsonLd: [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
      .find((match) => attribute(match[1], "type")?.toLowerCase() === "application/ld+json")?.[2]
      ?.trim(),
  };
  for (const [key, value] of Object.entries(optional)) {
    if (value !== undefined && value !== "") metadata[key] = value;
  }
  if (!metadata.title) throw new Error("Captured page is missing a title");
  return metadata;
};

const snapshotFromHtml = ({ capturedAt, sourceUrl, status, html }) => {
  const bodyMatch = html.match(/<body\b([^>]*)>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) throw new Error(`Captured page has no body: ${sourceUrl}`);
  return {
    route: new URL(sourceUrl).pathname,
    sourceUrl,
    capturedAt,
    status,
    bodyClass: attribute(bodyMatch[1], "class") ?? "",
    bodyHtml: bodyMatch[2].trim(),
    metadata: metadataFromHtml(html),
    sha256: sha256(html),
  };
};

const capturePass = async (urls, capturedAt, expectedHashes) => {
  const snapshots = [];
  for (const [index, url] of urls.entries()) {
    const response = await fetchText(url.href, /text\/html|application\/xhtml\+xml/i);
    const snapshot = snapshotFromHtml({
      capturedAt,
      sourceUrl: url.href,
      status: response.status,
      html: response.text,
    });
    const expectedHash = expectedHashes?.get(snapshot.route);
    if (expectedHash && snapshot.sha256 !== expectedHash) {
      throw new Error(
        `Live content changed during capture for ${snapshot.route}: ${expectedHash} -> ${snapshot.sha256}`,
      );
    }
    snapshots.push(snapshot);
    console.log(
      `${expectedHashes ? "Verified" : "Captured"} ${index + 1}/${urls.length} ${snapshot.route}`,
    );
  }
  return snapshots;
};

const writeCorpus = async (snapshots, capturedAt, sitemapSha256) => {
  const parent = path.dirname(outputRoot);
  const stagingRoot = path.join(parent, `.live-reference-staging-${process.pid}`);
  const backupRoot = path.join(parent, `.live-reference-backup-${process.pid}`);
  await rm(stagingRoot, { recursive: true, force: true });
  await rm(backupRoot, { recursive: true, force: true });
  await mkdir(stagingRoot, { recursive: true });

  const imports = [];
  const identifiers = [];
  const pages = [];
  for (const [index, snapshot] of snapshots.entries()) {
    const suffix = String(index).padStart(2, "0");
    const identifier = `page${suffix}`;
    const file = `${suffix}.json`;
    await writeFile(path.join(stagingRoot, file), `${JSON.stringify(snapshot, null, 2)}\n`);
    imports.push(`import ${identifier} from "./${file}";`);
    identifiers.push(identifier);
    pages.push({
      route: snapshot.route,
      sourceUrl: snapshot.sourceUrl,
      status: snapshot.status,
      sha256: snapshot.sha256,
      file,
    });
  }

  const manifest = {
    capturedAt,
    sitemap: { sourceUrl: sitemapUrl, status: 200, sha256: sitemapSha256 },
    pages,
  };
  await writeFile(
    path.join(stagingRoot, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  const pageEntries = identifiers.map((identifier) => `  ${identifier},`).join("\n");
  await writeFile(
    path.join(stagingRoot, "index.ts"),
    `${imports.join("\n")}\nimport manifestData from "./manifest.json";\n\nimport type { PageSnapshot } from "../schema";\n\nexport interface LiveReferenceManifest {\n  capturedAt: string;\n  sitemap: { sourceUrl: string; status: 200; sha256: string };\n  pages: Array<Pick<PageSnapshot, "route" | "sourceUrl" | "status" | "sha256"> & { file: string }>;\n}\n\nexport const livePageSnapshots = [\n${pageEntries}\n] as PageSnapshot[];\nexport const liveReferenceManifest = manifestData as LiveReferenceManifest;\n`,
  );

  for (const page of pages) {
    const persisted = JSON.parse(await readFile(path.join(stagingRoot, page.file), "utf8"));
    if (persisted.status !== 200 || persisted.sha256 !== page.sha256) {
      throw new Error(`Persisted snapshot validation failed for ${page.route}`);
    }
  }

  let backedUp = false;
  try {
    try {
      await rename(outputRoot, backupRoot);
      backedUp = true;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    await rename(stagingRoot, outputRoot);
    if (backedUp) await rm(backupRoot, { recursive: true, force: true });
  } catch (error) {
    if (backedUp) await rename(backupRoot, outputRoot);
    throw error;
  } finally {
    await rm(stagingRoot, { recursive: true, force: true });
  }
};

const initialSitemap = await fetchText(sitemapUrl, /application\/xml|text\/xml/i);
const initialSitemapHash = sha256(initialSitemap.text);
const urls = parseSitemap(initialSitemap.text);
const capturedAt = new Date().toISOString();
const snapshots = await capturePass(urls, capturedAt);
const firstPassHashes = new Map(snapshots.map((snapshot) => [snapshot.route, snapshot.sha256]));

await capturePass(urls, capturedAt, firstPassHashes);
const finalSitemap = await fetchText(sitemapUrl, /application\/xml|text\/xml/i);
const finalSitemapHash = sha256(finalSitemap.text);
if (finalSitemapHash !== initialSitemapHash) {
  throw new Error(`Sitemap changed during capture: ${initialSitemapHash} -> ${finalSitemapHash}`);
}
const finalRoutes = parseSitemap(finalSitemap.text).map((url) => url.href);
if (JSON.stringify(finalRoutes) !== JSON.stringify(urls.map((url) => url.href))) {
  throw new Error("Sitemap route order or membership changed during capture");
}

await writeCorpus(snapshots, capturedAt, initialSitemapHash);
console.log(`Captured ${snapshots.length} stable live pages at ${capturedAt}.`);
