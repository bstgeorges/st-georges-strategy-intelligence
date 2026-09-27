import assert from "node:assert/strict";
import test from "node:test";
import { resolveRedirect } from "../workers/site-routes.mjs";
import worker from "../workers/site.mjs";

test("www requests permanently redirect to the apex while retaining query strings", () => {
  const redirect = resolveRedirect("https://www.stgeorgesstrategy.com/brief/?source=mail");
  assert.deepEqual(redirect, { location: "https://stgeorgesstrategy.com/brief/?source=mail", status: 301 });
});

test("legacy route mappings retain the established destinations", () => {
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/ai-signals/archive/2026-08-16/?x=1"), {
    location: "https://stgeorgesstrategy.com/signals/ai/archive/2026-08-16/?x=1",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://intelligence.stgeorgesstrategy.com/archive/2026-08-16/"), {
    location: "https://stgeorgesstrategy.com/brief/2026-08-16/",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/intelligence/anything-else"), {
    location: "https://stgeorgesstrategy.com/brief/",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://intelligence.stgeorgesstrategy.com/regulatory-horizon/"), {
    location: "https://stgeorgesstrategy.com/regulatory-horizon/",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/intelligence/regulatory-horizon/archive/2026-09-27.html"), {
    location: "https://stgeorgesstrategy.com/regulatory-horizon/",
    status: 301,
  });
});

test("current directories are canonicalised and normal asset paths are not intercepted", () => {
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/signals/ai?source=linkedin"), {
    location: "https://stgeorgesstrategy.com/signals/ai/?source=linkedin",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/brief?source=linkedin"), {
    location: "https://stgeorgesstrategy.com/brief/?source=linkedin",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/deep-dives"), {
    location: "https://stgeorgesstrategy.com/deep-dives/",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/deep-dives/future-control-review"), {
    location: "https://stgeorgesstrategy.com/deep-dives/future-control-review/",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/regulatory-horizon"), {
    location: "https://stgeorgesstrategy.com/regulatory-horizon/",
    status: 301,
  });
  assert.equal(resolveRedirect("https://stgeorgesstrategy.com/regulatory-horizon/"), null);
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/deep-dives/future-control-review/archive/2026-09-20"), {
    location: "https://stgeorgesstrategy.com/deep-dives/future-control-review/archive/2026-09-20/",
    status: 301,
  });
  assert.equal(resolveRedirect("https://stgeorgesstrategy.com/assets/hero.svg"), null);
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/brief/2026-09-27?source=search"), {
    location: "https://stgeorgesstrategy.com/brief/2026-09-27/?source=search",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/archive/brief/2026-09-27/?source=search"), {
    location: "https://stgeorgesstrategy.com/brief/2026-09-27/?source=search",
    status: 301,
  });
});

test("permanent Brief editions can be cached while current pages revalidate", async () => {
  const assets = { fetch: () => new Response("edition", { headers: { "content-type": "text/html" } }) };
  const edition = await worker.fetch(new Request("https://stgeorgesstrategy.com/brief/2026-09-27/"), { ASSETS: assets });
  const latest = await worker.fetch(new Request("https://stgeorgesstrategy.com/brief/"), { ASSETS: assets });
  assert.equal(edition.headers.get("cache-control"), "public, max-age=31536000, immutable");
  assert.equal(latest.headers.get("cache-control"), "no-cache, max-age=0, s-maxage=0, must-revalidate");
});

test("asset failures return a branded, protected 503 response", async () => {
  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    const response = await worker.fetch(new Request("https://stgeorgesstrategy.com/brief/"), {
      ASSETS: {
        fetch() {
          throw new Error("simulated asset binding failure");
        },
      },
    });
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.match(await response.text(), /Temporarily unavailable/);
  } finally {
    console.error = originalConsoleError;
  }
});
