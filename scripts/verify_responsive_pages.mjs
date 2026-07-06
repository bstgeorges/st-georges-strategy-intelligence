const DEFAULT_PAGES = [
  "https://stgeorgesstrategy.com/",
  "https://stgeorgesstrategy.com/thevirtualofficer/",
  "https://stgeorgesstrategy.com/intelligence/",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "small-mobile", width: 320, height: 740 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

const templateBindingPattern = /\{\{[^}]+\}\}|<x-dc\b/i;

function getArgPages() {
  const explicit = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
  return explicit.length ? explicit : DEFAULT_PAGES;
}

async function loadPlaywright() {
  const bundledNodeModules = path.join(
    os.homedir(),
    ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules",
  );

  function normalizePlaywright(module) {
    return module.chromium ? module : module.default;
  }

  try {
    return normalizePlaywright(await import("playwright"));
  } catch (error) {
    const require = createRequire(import.meta.url);
    try {
      return normalizePlaywright(require("playwright"));
    } catch {
      const nodePaths = (process.env.NODE_PATH || "").split(path.delimiter).filter(Boolean);
      for (const nodePath of nodePaths) {
        try {
          return normalizePlaywright(await import(pathToFileURL(path.join(nodePath, "playwright", "index.js")).href));
        } catch {
          // Try the next NODE_PATH entry.
        }
      }

      try {
        return normalizePlaywright(await import(pathToFileURL(path.join(bundledNodeModules, "playwright", "index.js")).href));
      } catch {
        // Fall through to the explicit error below.
      }

      throw new Error(
        "Playwright is required for responsive QA. Run with the bundled Codex Node runtime or install Playwright locally.",
        { cause: error },
      );
    }
  }
}

function findBrowserExecutable() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate));
}

async function measurePage(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const elements = [...document.querySelectorAll("body *")];
    const viewportWidth = window.innerWidth;
    const offenders = [];

    function hasHorizontalScrollContainer(element) {
      for (let node = element.parentElement; node; node = node.parentElement) {
        const style = window.getComputedStyle(node);
        const overflowX = style.overflowX;
        if ((overflowX === "auto" || overflowX === "scroll") && node.scrollWidth > node.clientWidth) {
          return true;
        }
      }
      return false;
    }

    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      if (hasHorizontalScrollContainer(element)) continue;
      if (rect.right > viewportWidth + 1 || rect.left < -1) {
        offenders.push({
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        });
      }
      if (offenders.length >= 8) break;
    }

    return {
      title: document.title,
      scrollWidth: Math.max(doc.scrollWidth, body?.scrollWidth || 0),
      clientWidth: doc.clientWidth,
      bodyWidth: body?.getBoundingClientRect().width || 0,
      viewportWidth,
      rawTemplates: /\{\{[^}]+\}\}|<x-dc\b/i.test(document.documentElement.outerHTML),
      offenders,
    };
  });
}

async function main() {
  const { chromium } = await loadPlaywright();
  const executablePath = findBrowserExecutable();
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  const pages = getArgPages();
  const failures = [];

  try {
    for (const url of pages) {
      for (const viewport of VIEWPORTS) {
        const page = await browser.newPage({ viewport });
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        const result = await measurePage(page);
        await page.close();

        const overflow = result.scrollWidth - result.clientWidth;
        const ok = overflow <= 1 && !result.rawTemplates && result.offenders.length === 0;
        console.log(
          `${ok ? "OK" : "FAIL"} ${viewport.name} ${viewport.width}x${viewport.height} ${url} ` +
            `title="${result.title}" overflow=${overflow}`,
        );

        if (!ok) {
          failures.push({ url, viewport, overflow, ...result });
        }
      }
    }
  } finally {
    await browser.close();
  }

  if (failures.length) {
    console.error("Responsive QA failures:");
    for (const failure of failures) {
      console.error(
        `- ${failure.viewport.name} ${failure.viewport.width}px ${failure.url}: ` +
          `overflow=${failure.overflow}, rawTemplates=${failure.rawTemplates}`,
      );
      for (const offender of failure.offenders) {
        console.error(
          `  ${offender.tag}.${offender.className} left=${offender.left} right=${offender.right} width=${offender.width} text="${offender.text}"`,
        );
      }
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error.message);
  if (error.cause) console.error(error.cause.message);
  process.exit(1);
});
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
