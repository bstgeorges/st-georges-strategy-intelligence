import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = process.env.SGS_REFERENCE_ROOT ?? "/tmp/sgs-crawl";
const pageRoot = path.join(sourceRoot, "pages");
const supportRoot = path.join(sourceRoot, "support-current");
const outputRoot = path.join(projectRoot, "src/content/reference");
const publicRoot = path.join(projectRoot, "public");
const capturedAt = "2026-07-10T14:16:05Z";

const escapeHtmlBody = (html) => {
  const match = html.match(/<body(?:\s+class=["']([^"']*)["'])?[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) throw new Error("Reference page has no body");
  const bodyHtml = match[2]
    .trim()
    .replace(/<main(?![^>]*\bid=)/i, '<main id="main-content" tabindex="-1"');
  return { bodyClass: match[1] ?? "", bodyHtml };
};

const tagContent = (html, expression, fallback = "") =>
  html.match(expression)?.[1]?.trim() ?? fallback;

const metaContent = (html, attribute, value) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta(?=[^>]*${attribute}=["']${escaped}["'])(?=[^>]*content=["']([^"']*)["'])[^>]*>`,
    "i",
  );
  return tagContent(html, pattern);
};

const linkHref = (html, rel) => {
  const pattern = new RegExp(
    `<link(?=[^>]*rel=["']${rel}["'])(?=[^>]*href=["']([^"']*)["'])[^>]*>`,
    "i",
  );
  return tagContent(html, pattern);
};

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const manifestRows = (await readFile(path.join(sourceRoot, "urls.tsv"), "utf8"))
  .trim()
  .split("\n")
  .map((line) => {
    const [rawIndex, sourceUrl] = line.split("\t");
    return { index: Number.parseInt(rawIndex.trim(), 10), sourceUrl: sourceUrl.trim() };
  });

await mkdir(outputRoot, { recursive: true });

const imports = [];
const records = [];

for (const row of manifestRows) {
  const sourcePath = path.join(pageRoot, `${String(row.index).padStart(3, " ")}.html`);
  const html = await readFile(sourcePath, "utf8");
  const url = new URL(row.sourceUrl);
  const route = url.pathname;
  const { bodyClass, bodyHtml } = escapeHtmlBody(html);
  const record = {
    route,
    sourceUrl: row.sourceUrl,
    capturedAt,
    status: row.index === 12 ? 404 : 200,
    bodyClass,
    bodyHtml,
    metadata: {
      title: tagContent(html, /<title>([\s\S]*?)<\/title>/i),
      description: metaContent(html, "name", "description"),
      canonical: linkHref(html, "canonical") || undefined,
      openGraphTitle: metaContent(html, "property", "og:title") || undefined,
      openGraphDescription: metaContent(html, "property", "og:description") || undefined,
      openGraphUrl: metaContent(html, "property", "og:url") || undefined,
      openGraphImage: metaContent(html, "property", "og:image") || undefined,
      twitterCard: metaContent(html, "name", "twitter:card") || undefined,
      twitterTitle: metaContent(html, "name", "twitter:title") || undefined,
      twitterDescription: metaContent(html, "name", "twitter:description") || undefined,
      robots: metaContent(html, "name", "robots") || undefined,
      jsonLd:
        tagContent(html, /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i) ||
        undefined,
    },
    sha256: sha256(html),
  };

  const identifier = `page${String(row.index).padStart(2, "0")}`;
  const fileName = `${String(row.index).padStart(2, "0")}.json`;
  await writeFile(path.join(outputRoot, fileName), `${JSON.stringify(record, null, 2)}\n`);
  imports.push(`import ${identifier} from "./${fileName}";`);
  records.push({ route, status: record.status, sha256: record.sha256, file: fileName });
}

await writeFile(
  path.join(outputRoot, "index.ts"),
  `${imports.join("\n")}\n\nimport type { PageSnapshot } from "../schema";\n\nexport const pageSnapshots = [${records
    .map((_, index) => `page${String(index).padStart(2, "0")}`)
    .join(", ")}] as PageSnapshot[];\n`,
);
await writeFile(
  path.join(outputRoot, "content-fidelity-manifest.json"),
  `${JSON.stringify({ capturedAt, pages: records }, null, 2)}\n`,
);

const supportCopies = [
  ["styles.css", "styles.css"],
  ["signals-horizon.js", "signals/signals-horizon.js"],
  ["horizon-render.js", "regulatory-horizon/horizon-render.js"],
  ["ai-signals.json", "data/ai-signals.json"],
  ["latest.json", "regulatory-horizon/latest.json"],
  ["feed.xml", "regulatory-horizon/feed.xml"],
  ["horizon.ics", "regulatory-horizon/horizon.ics"],
  ["feed.xsl", "regulatory-horizon/feed.xsl"],
];

for (const [sourceName, destination] of supportCopies) {
  const destinationPath = path.join(publicRoot, destination);
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await copyFile(path.join(supportRoot, sourceName), destinationPath);
}

console.log(`Imported ${records.length} audited pages and ${supportCopies.length} support assets.`);
