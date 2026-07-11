import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const outputDirectory = path.resolve("output/motion");
const allRoutes = [
  ["home", "/"],
  ["brief", "/brief/"],
  ["topic", "/signals/ai/"],
  ["horizon", "/regulatory-horizon/"],
  ["archive", "/archive/"],
];
const routes = process.env.PROFILE_HOME_ONLY ? [allRoutes[0]] : allRoutes;
const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["tablet", { width: 768, height: 1024 }],
  ["mobile", { width: 390, height: 844 }],
  ["narrow", { width: 320, height: 844 }],
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();

async function profile({ name, route, viewportName, viewport, reducedMotion }) {
  const context = await browser.newContext({ viewport, reducedMotion });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__sgsProfile = { longTasks: [], layoutShifts: [] };
    new PerformanceObserver((list) => {
      window.__sgsProfile.longTasks.push(...list.getEntries().map(({ duration }) => duration));
    }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) => {
      window.__sgsProfile.layoutShifts.push(
        ...list
          .getEntries()
          .filter((entry) => !entry.hadRecentInput)
          .map(({ value }) => value),
      );
    }).observe({ type: "layout-shift", buffered: true });
  });

  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "domcontentloaded" });
  if (response?.status() !== 200) throw new Error(`${route} returned ${response?.status()}`);
  await page.waitForTimeout(180);

  const frames = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const intervals = [];
        const candidates = [
          ...document.querySelectorAll("[data-home-motion], [data-editorial-motion]"),
        ];
        const sample =
          candidates.length <= 6
            ? candidates
            : Array.from(
                { length: 6 },
                (_, index) => candidates[Math.round((index * (candidates.length - 1)) / 5)],
              );
        const started = performance.now();
        let previous = started;
        let targetIndex = 0;
        const duration = Math.max(1_400, sample.length * 450);
        const tick = (now) => {
          intervals.push(now - previous);
          previous = now;
          if (targetIndex < sample.length && now - started >= targetIndex * 450) {
            sample[targetIndex].scrollIntoView({ behavior: "auto", block: "center" });
            targetIndex += 1;
          }
          const progress = Math.min(1, (now - started) / duration);
          if (progress < 1) requestAnimationFrame(tick);
          else resolve(intervals.slice(2));
        };
        requestAnimationFrame(tick);
      }),
  );
  await page.waitForTimeout(900);
  await page
    .waitForFunction(
      () => document.getAnimations().every(({ playState }) => playState !== "running"),
      undefined,
      { timeout: 3_000 },
    )
    .catch(() => {});

  const result = await page.evaluate((intervals) => {
    const sorted = [...intervals].sort((left, right) => left - right);
    const percentile = (value) =>
      sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * value))] ?? 0;
    const targetSizes = [
      ...document.querySelectorAll(".sgs-motion-controls label, .sgs-mobile-nav summary"),
    ]
      .map((element) => {
        const box = element.getBoundingClientRect();
        return { width: box.width, height: box.height };
      })
      .filter(({ width, height }) => width > 0 && height > 0);
    return {
      frames: intervals.length,
      medianFrameMs: percentile(0.5),
      p95FrameMs: percentile(0.95),
      framesOver32ms: intervals.filter((duration) => duration > 32).length,
      longTasks: window.__sgsProfile.longTasks,
      cls: window.__sgsProfile.layoutShifts.reduce((sum, value) => sum + value, 0),
      runningAnimations: document.getAnimations().filter(({ playState }) => playState === "running")
        .length,
      mode: document.documentElement.dataset.motion,
      playedRegions: document.querySelectorAll("[data-motion-played='true']").length,
      homeFamilies: [...document.querySelectorAll("[data-home-motion]")].map(
        (element) => element.dataset.homeMotion,
      ),
      archetypeFamilies: [...document.querySelectorAll("[data-editorial-motion]")].map(
        (element) => element.dataset.editorialMotion,
      ),
      overflow: document.documentElement.scrollWidth - innerWidth,
      targetSizes,
    };
  }, frames);

  const mode = reducedMotion === "reduce" ? "reduced" : "full";
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, 0);
  });
  await page.waitForFunction(() => scrollY === 0);
  await page.screenshot({
    path: path.join(outputDirectory, `${name}-${viewportName}-${mode}.png`),
    fullPage: false,
  });
  await context.close();
  return result;
}

try {
  const evidence = [];
  for (const [viewportName, viewport] of viewports) {
    for (const [name, route] of routes) {
      for (const reducedMotion of ["no-preference", "reduce"]) {
        const result = await profile({ name, route, viewportName, viewport, reducedMotion });
        const reduced = reducedMotion === "reduce";
        if (
          result.cls >= 0.1 ||
          result.overflow > 0 ||
          result.runningAnimations !== 0 ||
          (reduced && (result.mode !== "reduced" || result.playedRegions !== 0))
        ) {
          throw new Error(
            `Motion profile failed for ${route} ${viewportName} ${reducedMotion}: ${JSON.stringify(result)}`,
          );
        }
        if (name === "home" && !reduced && new Set(result.homeFamilies).size !== 6) {
          throw new Error(`Home does not expose six semantic families: ${JSON.stringify(result)}`);
        }
        if (
          viewport.width <= 390 &&
          result.targetSizes.some(({ width, height }) => width < 24 || height < 24)
        ) {
          throw new Error(`Touch target below 24px: ${JSON.stringify(result.targetSizes)}`);
        }
        evidence.push({ route, viewport: viewportName, reducedMotion, ...result });
      }
    }
  }

  const forcedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    forcedColors: "active",
  });
  const forcedPage = await forcedContext.newPage();
  await forcedPage.goto(new URL("/", baseURL).href, { waitUntil: "domcontentloaded" });
  const firstControl = forcedPage.locator('.sgs-motion-controls input[value="full"]');
  await firstControl.focus();
  const forcedColors = await firstControl.evaluate((element) => {
    const indicator = element.nextElementSibling;
    if (!(indicator instanceof HTMLElement)) throw new Error("Motion indicator is missing");
    return {
      outlineStyle: getComputedStyle(indicator).outlineStyle,
      outlineWidth: getComputedStyle(indicator).outlineWidth,
    };
  });
  await forcedContext.close();
  if (forcedColors.outlineStyle === "none" || forcedColors.outlineWidth === "0px") {
    throw new Error(`Forced-colors focus state is not visible: ${JSON.stringify(forcedColors)}`);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        cpuThrottle: 4,
        captures: evidence.length,
        viewports: viewports.map(([viewportName]) => viewportName),
        routes: routes.map(([, route]) => route),
        forcedColors,
        evidence,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
