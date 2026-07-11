import { mkdir } from "node:fs/promises";

import { chromium } from "@playwright/test";

const baseUrl = process.env.SGS_BASE_URL ?? "http://127.0.0.1:3001";
const outputRoot = "output/home-slice";
const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 844 },
];
const failures = [];
const results = [];

await mkdir(outputRoot, { recursive: true });
const browser = await chromium.launch();

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedSameOriginRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).origin === new URL(baseUrl).origin) {
      failedSameOriginRequests.push(request.url());
    }
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const mainText = await page.locator("main").innerText();
  const topSignals = await page.locator(".sgs-ranked-list > li").count();
  const streams = await page.locator(".sgs-stream-grid > a").count();
  if (overflow > 0) failures.push(viewport.width + "px: " + overflow + "px horizontal overflow");
  if (topSignals !== 5) {
    failures.push(viewport.width + "px: expected 5 signals, got " + topSignals);
  }
  if (streams !== 8) failures.push(viewport.width + "px: expected 8 streams, got " + streams);
  for (const required of [
    "Firms need one evidence base",
    "Can we stop an agent quickly",
    "The permission map, the stop path",
    "14 Aug",
  ]) {
    if (!mainText.includes(required)) failures.push(viewport.width + "px: missing " + required);
  }

  await page.evaluate(() => document.getAnimations().forEach((animation) => animation.finish()));
  await page.screenshot({
    path: outputRoot + "/home-" + viewport.width + "x" + viewport.height + "-full.png",
    fullPage: false,
  });

  await page.locator('label:has(input[value="reduced"])').click();
  await page.waitForTimeout(50);
  const mode = await page.evaluate(() => document.documentElement.dataset.motion);
  const running = await page.evaluate(
    () => document.getAnimations().filter((animation) => animation.playState === "running").length,
  );
  if (mode !== "reduced") failures.push(viewport.width + "px: reduced preference not applied");
  if (running !== 0)
    failures.push(viewport.width + "px: " + running + " animations run in reduced mode");

  if (viewport.width <= 1180) {
    await page.locator(".sgs-mobile-nav summary").click();
    if ((await page.locator(".sgs-mobile-nav nav a").count()) !== 7) {
      failures.push(viewport.width + "px: mobile navigation is incomplete");
    }
  }

  await page.screenshot({
    path: outputRoot + "/home-" + viewport.width + "x" + viewport.height + ".png",
    fullPage: false,
  });

  if (consoleErrors.length) {
    failures.push(viewport.width + "px console: " + consoleErrors.join(" | "));
  }
  if (failedSameOriginRequests.length) {
    failures.push(viewport.width + "px requests: " + failedSameOriginRequests.join(" | "));
  }
  results.push({
    viewport: viewport.width + "x" + viewport.height,
    overflow,
    topSignals,
    streams,
    reducedMode: mode,
    consoleErrors: consoleErrors.length,
    failedSameOriginRequests: failedSameOriginRequests.length,
  });
  await context.close();
}

const staticContext = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
const staticPage = await staticContext.newPage();
await staticPage.goto(baseUrl, { waitUntil: "networkidle" });
const staticText = await staticPage.locator("main").innerText();
const normalizedStaticText = staticText.toLowerCase();
for (const required of [
  "The judgement, the question, and the ask",
  "Eight streams",
  "Why trust it",
]) {
  if (!normalizedStaticText.includes(required.toLowerCase())) {
    failures.push("no-JS: missing " + required);
  }
}
if ((await staticPage.evaluate(() => document.documentElement.scrollWidth - innerWidth)) > 0) {
  failures.push("no-JS: horizontal overflow");
}
await staticPage.locator(".sgs-mobile-nav summary").click();
if ((await staticPage.locator(".sgs-mobile-nav nav a").count()) !== 7) {
  failures.push("no-JS: mobile navigation unavailable");
}
await staticContext.close();

const fallbackContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const fallbackPage = await fallbackContext.newPage();
await fallbackPage.goto(baseUrl + "/brief/", { waitUntil: "networkidle" });
if (!(await fallbackPage.locator("main").innerText()).toLowerCase().includes("weekly brief")) {
  failures.push("snapshot fallback: Brief did not render");
}
await fallbackContext.close();

await browser.close();
console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exitCode = 1;
