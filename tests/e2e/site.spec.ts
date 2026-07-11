import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

import { publicEditorialRegistry } from "../../src/content/editorial/public-registry";

async function followPrimaryNavigation(page: Page, mobile: boolean, label: string) {
  if (mobile) await page.locator(".sgs-mobile-nav summary").click();
  await page
    .getByRole("navigation", { name: mobile ? "Mobile primary" : "Primary", exact: true })
    .getByRole("link", { name: label, exact: true })
    .click();
}

test("every selected live or historical route returns 200", async ({ request }) => {
  for (const { route } of publicEditorialRegistry) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
  }
});

test("primary reading flow, metadata, and keyboard entry work", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle("The Virtual Officer | St Georges Strategy");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://stgeorgesstrategy.com/",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText("What changed");

  const skipLink = page.locator(".skip-link");
  if (testInfo.project.name === "desktop-chromium") {
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
  } else {
    // Chromium's touch emulation does not reliably grant synthetic Tab focus.
    // Explicit focus still proves the skip control's mobile keyboard action.
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  }
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const isMobile = testInfo.project.name === "mobile-chromium";
  await followPrimaryNavigation(page, isMobile, "Weekly Brief");
  await expect(page).toHaveURL(/\/brief\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI risk story");
  await followPrimaryNavigation(page, isMobile, "Signals");
  await expect(page).toHaveURL(/\/signals\/$/);
});

test("executive roles expose deterministic starting routes", async ({ page }) => {
  await page.goto("/");
  const paths = new Map([
    ["Chief Risk Officer", "/brief/"],
    ["Chief Operating Officer", "/signals/technology-failure/"],
    ["Chief Compliance Officer", "/committee-questions/"],
    ["Head of Operational Risk", "/signals/resilience/"],
    ["CISO", "/signals/cyber/"],
    ["AI governance lead", "/signals/ai/"],
    ["Resilience lead", "/signals/resilience/"],
  ]);
  for (const [role, href] of paths) {
    await expect(page.getByRole("link", { name: new RegExp(`^${role}\\b`, "i") })).toHaveAttribute(
      "href",
      href,
    );
  }
});

for (const route of [
  "/",
  "/brief/",
  "/signals/",
  "/signals/ai/",
  "/regulatory-horizon/",
  "/committee-questions/",
  "/archive/",
  "/about/",
]) {
  test(`WCAG 2.2 AA automated scan: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("reduced motion exposes stable content immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const running = await page.evaluate(
    () => document.getAnimations().filter(({ playState }) => playState === "running").length,
  );
  expect(running).toBe(0);
});

test("mobile layout has no horizontal overflow and all images resolve", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  const failedImages = await page
    .locator("img")
    .evaluateAll((images) =>
      images
        .filter(
          (image) =>
            !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0,
        )
        .map((image) => (image as HTMLImageElement).src),
    );
  expect(failedImages).toEqual([]);

  const menu = page.locator(".sgs-mobile-nav summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".sgs-mobile-nav")).toHaveAttribute("open", "");
});

test("representative pages emit no console errors or failed same-origin requests", async ({
  page,
}) => {
  const errors: string[] = [];
  const failed: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    if (request.url().startsWith("http://127.0.0.1:3000")) failed.push(request.url());
  });

  for (const route of ["/", "/signals/", "/regulatory-horizon/", "/about/"]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
  }

  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});
