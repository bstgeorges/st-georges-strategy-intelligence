import { mkdir } from "node:fs/promises";
import path from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

import { publicEditorialRegistry } from "../src/content/editorial/public-registry.ts";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const outputDirectory = path.resolve("output/archetypes");
const routes = [
  ["brief", "/brief/"],
  ["signals", "/signals/"],
  ["topic", "/signals/ai/"],
  ["horizon", "/regulatory-horizon/"],
  ["questions", "/committee-questions/"],
  ["archive", "/archive/"],
  ["archive-edition", "/archive/brief/2026-07-09/"],
  ["about", "/about/"],
];
const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
  ["narrow", { width: 320, height: 844 }],
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();

try {
  const requestContext = await browser.newContext();
  for (const { route } of publicEditorialRegistry) {
    const response = await requestContext.request.get(new URL(route, baseURL).href);
    if (response.status() !== 200) throw new Error(`${route} returned ${response.status()}`);
  }
  await requestContext.close();

  const evidence = [];
  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const failures = [];
    page.on("console", (message) => {
      if (message.type() === "error") failures.push(`console: ${message.text()}`);
    });
    page.on("response", (response) => {
      const url = new URL(response.url());
      if (url.origin === baseURL && response.status() >= 400) {
        failures.push(`response: ${response.status()} ${url.pathname}`);
      }
    });

    for (const [name, route] of routes) {
      const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "networkidle" });
      if (response?.status() !== 200) throw new Error(`${route} returned ${response?.status()}`);
      await page.evaluate(() =>
        document.getAnimations().forEach((animation) => animation.finish()),
      );
      const facts = await page.evaluate(() => ({
        h1: document.querySelectorAll("h1").length,
        main: document.querySelectorAll("main").length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        text: document.querySelector("main")?.textContent?.replace(/\s+/g, " ").trim().length ?? 0,
      }));
      if (facts.h1 !== 1 || facts.main !== 1 || facts.overflow > 0 || facts.text < 80) {
        throw new Error(`${viewportName} ${route} failed structure: ${JSON.stringify(facts)}`);
      }
      if (viewportName !== "narrow") {
        const accessibility = await new AxeBuilder({ page }).analyze();
        if (accessibility.violations.length) {
          throw new Error(
            `${viewportName} ${route} Axe: ${accessibility.violations.map(({ id }) => id).join(", ")}`,
          );
        }
      }
      await page.screenshot({
        path: path.join(outputDirectory, `${name}-${viewportName}.png`),
        fullPage: true,
      });
      evidence.push({ route, viewport: viewportName, ...facts });
    }
    if (failures.length) throw new Error(failures.join("\n"));
    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(new URL("/brief/", baseURL).href, { waitUntil: "networkidle" });
  const reduced = await reducedPage.evaluate(() => ({
    mode: document.documentElement.dataset.motion,
    running: document.getAnimations().filter(({ playState }) => playState === "running").length,
    text: document.querySelector("main")?.textContent?.replace(/\s+/g, " ").trim().length ?? 0,
  }));
  if (reduced.mode !== "reduced" || reduced.running !== 0 || reduced.text < 80) {
    throw new Error(`Reduced-motion route failed: ${JSON.stringify(reduced)}`);
  }
  await reducedContext.close();

  const noScriptContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(new URL("/signals/", baseURL).href, { waitUntil: "networkidle" });
  const noScript = await noScriptPage.evaluate(() => ({
    main: document.querySelectorAll("main").length,
    links: document.querySelectorAll("main a[href]").length,
    text: document.querySelector("main")?.textContent?.replace(/\s+/g, " ").trim().length ?? 0,
  }));
  if (noScript.main !== 1 || noScript.links < 8 || noScript.text < 80) {
    throw new Error(`JavaScript-disabled route failed: ${JSON.stringify(noScript)}`);
  }
  await noScriptContext.close();

  const missingContext = await browser.newContext();
  const missingPage = await missingContext.newPage();
  const missing = await missingPage.goto(new URL("/not-in-the-brief/", baseURL).href);
  if (
    missing?.status() !== 404 ||
    (await missingPage.locator("h1").textContent()) !== "This page is not in the brief."
  ) {
    throw new Error("Useful 404 did not return its expected status and heading");
  }
  await missingContext.close();

  console.log(
    JSON.stringify(
      {
        ok: true,
        registryRoutes: publicEditorialRegistry.length,
        archetypeCaptures: evidence.length,
        axeRoutes: routes.length * 2,
        reducedMotion: reduced,
        noJavaScript: noScript,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
