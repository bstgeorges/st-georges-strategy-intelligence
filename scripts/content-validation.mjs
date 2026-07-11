import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://stgeorgesstrategy.com";
const topicSlugs = [
  "ai",
  "resilience",
  "third-party",
  "market-structure",
  "financial-crime",
  "cyber",
  "technology-failure",
  "data",
];

const supportPaths = new Set([
  "/data/ai-signals.json",
  "/regulatory-horizon/latest.json",
  "/regulatory-horizon/feed.xml",
  "/regulatory-horizon/feed.xsl",
  "/regulatory-horizon/horizon.ics",
  "/regulatory-horizon/archive/2026-07-02.html",
  "/ai-signals/archive/",
  "/robots.txt",
  "/sitemap.xml",
  "/styles.css",
  "/dashboard/assets/financial-services-intelligence-hero.webp",
  "/assets/favicon.svg",
]);

const invariant = (condition, message) => {
  if (!condition) throw new Error(message);
};

const normalizeInternalPath = (value) => {
  const pathname = new URL(value, baseUrl).pathname;
  if (pathname === "/" || /\.[a-z0-9]+$/i.test(pathname) || pathname.endsWith("/")) {
    return pathname;
  }
  return `${pathname}/`;
};

export async function loadSnapshots(projectRoot = process.cwd()) {
  const root = path.join(projectRoot, "src/content/reference");
  const fileNames = (await readdir(root)).filter((name) => /^\d{2}\.json$/.test(name)).sort();
  return Promise.all(
    fileNames.map(async (fileName) =>
      JSON.parse(await readFile(path.join(root, fileName), "utf8")),
    ),
  );
}

export function validateSnapshots(snapshots) {
  invariant(snapshots.length === 42, `Expected 42 snapshots, received ${snapshots.length}`);
  const routes = new Set(snapshots.map((snapshot) => snapshot.route));
  invariant(routes.size === snapshots.length, "Snapshot routes must be unique");
  const hashes = new Set();
  const brokenInternal = new Set();

  for (const snapshot of snapshots) {
    invariant(
      typeof snapshot.route === "string" && snapshot.route.startsWith("/"),
      "Invalid route",
    );
    invariant(
      snapshot.status === 200 || snapshot.status === 404,
      `Invalid status ${snapshot.route}`,
    );
    invariant(snapshot.bodyHtml.includes("<main"), `Missing main landmark ${snapshot.route}`);
    invariant(
      snapshot.bodyHtml.includes('id="main-content"'),
      `Missing skip-link target ${snapshot.route}`,
    );
    invariant(snapshot.metadata?.title, `Missing title ${snapshot.route}`);
    invariant(
      snapshot.status === 404 || snapshot.metadata?.description,
      `Missing description ${snapshot.route}`,
    );
    invariant(/^[a-f0-9]{64}$/.test(snapshot.sha256), `Invalid SHA-256 ${snapshot.route}`);
    invariant(
      !hashes.has(`${snapshot.route}:${snapshot.sha256}`),
      `Duplicate snapshot hash ${snapshot.route}`,
    );
    hashes.add(`${snapshot.route}:${snapshot.sha256}`);
    invariant(
      !/\b(?:TODO|lorem ipsum|placeholder)\b/i.test(snapshot.bodyHtml),
      `Placeholder copy ${snapshot.route}`,
    );

    if (snapshot.status === 200 && !snapshot.route.includes("/archive/")) {
      invariant(
        snapshot.bodyHtml.includes("Not investment, legal, compliance, or regulatory advice."),
        `Missing disclaimer ${snapshot.route}`,
      );
    }

    for (const match of snapshot.bodyHtml.matchAll(/\bhref=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (/^(?:mailto:|https?:\/\/)/i.test(href)) {
        if (!href.startsWith(baseUrl)) continue;
      } else if (!href.startsWith("/")) {
        continue;
      }
      const pathname = normalizeInternalPath(href);
      if (!routes.has(pathname) && !supportPaths.has(pathname)) brokenInternal.add(pathname);
    }
  }

  invariant(routes.has("/committee-questions/"), "Missing Committee route record");
  invariant(
    snapshots.find((page) => page.route === "/committee-questions/")?.status === 404,
    "Committee route must preserve the capture-time 404",
  );

  for (const slug of topicSlugs) {
    invariant(routes.has(`/signals/${slug}/`), `Missing current topic ${slug}`);
    invariant(routes.has(`/signals/${slug}/archive/2026-07-09/`), `Missing 2026-07-09 ${slug}`);
    invariant(routes.has(`/signals/${slug}/archive/2026-07-08/`), `Missing 2026-07-08 ${slug}`);
  }

  invariant(
    brokenInternal.size === 0,
    `Broken internal targets: ${[...brokenInternal].join(", ")}`,
  );
  return { pages: snapshots.length, routes: routes.size, topics: topicSlugs.length };
}

export async function validateMachineContent(projectRoot = process.cwd()) {
  const aiPath = path.join(projectRoot, "public/data/ai-signals.json");
  const horizonPath = path.join(projectRoot, "public/regulatory-horizon/latest.json");
  const [aiText, horizonText] = await Promise.all([
    readFile(aiPath, "utf8"),
    readFile(horizonPath, "utf8"),
  ]);
  const ai = JSON.parse(aiText);
  const horizon = JSON.parse(horizonText);

  invariant(
    Array.isArray(ai.sections) && ai.sections.length === 3,
    "AI feed must have three sections",
  );
  invariant(
    ai.sections.every((section) => Array.isArray(section.cards) && section.cards.length === 5),
    "AI sections must contain five cards",
  );
  invariant(
    Array.isArray(horizon.signals) && horizon.signals.length === 10,
    "Horizon must contain ten delivered signals",
  );
  invariant(
    Array.isArray(horizon.horizon) && horizon.horizon.length === 3,
    "Horizon must contain three deadlines",
  );

  return {
    aiSha256: createHash("sha256").update(aiText).digest("hex"),
    horizonSha256: createHash("sha256").update(horizonText).digest("hex"),
  };
}
