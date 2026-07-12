#!/usr/bin/env node
// Generates dashboard/sitemap.xml from the static public pages plus every
// archived edition found on disk. Runs automatically before Pages deploys
// via the predeploy:cloudflare / predeploy:cloudflare:preview npm hooks.
//
// The apex worker (workers/seo-files.js) proxies this file from the Pages
// main branch, so the public sitemap stays current whenever the dashboard
// is deployed — no worker redeploy needed.

import { readdirSync, statSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "site-dist", "sitemap.xml");

const STATIC_PAGES = [
  "https://stgeorgesstrategy.com/",
  "https://stgeorgesstrategy.com/brief/",
  "https://stgeorgesstrategy.com/signals/",
  "https://stgeorgesstrategy.com/signals/ai/",
  "https://stgeorgesstrategy.com/regulatory-horizon/",
  "https://stgeorgesstrategy.com/archive/",
  "https://stgeorgesstrategy.com/about/",
];

const ARCHIVE_SOURCES = [
  {
    dir: join(ROOT, "site-dist", "archive", "brief"),
    base: "https://stgeorgesstrategy.com/archive/brief/",
  },
  {
    dir: join(ROOT, "site-dist", "signals", "ai", "archive"),
    base: "https://stgeorgesstrategy.com/signals/ai/archive/",
  },
];

const DATE_DIR = /^\d{4}-\d{2}-\d{2}$/;

function currentEdition() {
  const report = join(ROOT, "site-dist", "publish-report.json");
  if (existsSync(report)) {
    const edition = JSON.parse(readFileSync(report, "utf8")).edition;
    if (DATE_DIR.test(edition || "")) return edition;
  }
  return new Date().toISOString().slice(0, 10);
}

function archiveUrls({ dir, base }) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => DATE_DIR.test(name))
    .filter((name) => {
      const editionDir = join(dir, name);
      return statSync(editionDir).isDirectory() && existsSync(join(editionDir, "index.html"));
    })
    .sort()
    .map((name) => ({ loc: `${base}${name}/`, lastmod: name }));
}

const edition = currentEdition();
const entries = [
  ...STATIC_PAGES.map((loc) => ({ loc, lastmod: edition })),
  ...ARCHIVE_SOURCES.flatMap(archiveUrls),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(({ loc, lastmod }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`sitemap: wrote ${entries.length} URLs to site-dist/sitemap.xml`);
entries.forEach(({ loc, lastmod }) => console.log(`  ${lastmod} ${loc}`));
