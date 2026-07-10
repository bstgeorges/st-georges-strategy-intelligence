import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

type Snapshot = { route: string; status: 200 | 404; metadata: { title: string } };

async function snapshots(): Promise<Snapshot[]> {
  const root = path.join(process.cwd(), "src/content/reference");
  const files = (await readdir(root)).filter((name) => /^\d{2}\.json$/.test(name)).sort();
  return Promise.all(
    files.map(async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"))),
  );
}

test("every audited route returns its capture-time status", async ({ request }) => {
  for (const snapshot of await snapshots()) {
    const response = await request.get(snapshot.route);
    expect(response.status(), snapshot.route).toBe(snapshot.status);
  }
});

test("primary reading flow, metadata, and keyboard entry work", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("The Virtual Officer | St Georges Strategy");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://stgeorgesstrategy.com/",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText("What changed");

  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await page.getByRole("link", { name: "Weekly Brief" }).first().click();
  await expect(page).toHaveURL(/\/brief\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI risk story");
  await page.getByRole("link", { name: "Signals" }).first().click();
  await expect(page).toHaveURL(/\/signals\/$/);
});

for (const route of ["/", "/brief/", "/signals/", "/regulatory-horizon/", "/archive/", "/about/"]) {
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
  const animated = await page.locator(".hero-content h1").evaluate((element) => {
    const style = getComputedStyle(element);
    return { animationDuration: style.animationDuration, transitionDuration: style.transitionDuration };
  });
  expect(animated.animationDuration).toBe("0.00001s");
});

test("mobile layout has no horizontal overflow and all images resolve", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  const failedImages = await page.locator("img").evaluateAll((images) =>
    images.filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).map((image) => (image as HTMLImageElement).src),
  );
  expect(failedImages).toEqual([]);
});

test("representative pages emit no console errors or failed same-origin requests", async ({ page }) => {
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

