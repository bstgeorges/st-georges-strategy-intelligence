const checks = [
  ["https://intelligence.stgeorgesstrategy.com/", "https://stgeorgesstrategy.com/brief/"],
  ["https://stgeorgesstrategy.com/intelligence/", "https://stgeorgesstrategy.com/brief/"],
  ["https://stgeorgesstrategy.com/ai-signals/", "https://stgeorgesstrategy.com/signals/ai/"],
  ["https://stgeorgesstrategy.com/thevirtualofficer/", "https://stgeorgesstrategy.com/about/"],
  ["https://www.stgeorgesstrategy.com/brief/", "https://stgeorgesstrategy.com/brief/"],
];

const failures = [];
const maxAttempts = 6;
const retryDelayMs = 10_000;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

for (const [source, expected] of checks) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(source, {
        redirect: "manual",
        headers: { "cache-control": "no-cache", "user-agent": "StGeorgesStrategyRouteVerifier/1.0" },
      });
      const location = response.headers.get("location");

      if (response.status === 403 && attempt < maxAttempts) {
        console.warn(`Transient 403 from ${source}; retrying in ${retryDelayMs / 1000}s (${attempt}/${maxAttempts})`);
        await wait(retryDelayMs);
        continue;
      }

      if (![301, 302, 307, 308].includes(response.status)) failures.push(`${source} returned ${response.status}, expected a redirect`);
      else if (new URL(location, source).href !== expected) failures.push(`${source} redirects to ${location}; expected ${expected}`);
      else console.log(`Verified ${source} -> ${expected}`);
      break;
    } catch (error) {
      failures.push(`${source} could not be checked: ${error.message}`);
      break;
    }
  }
}

if (failures.length) {
  console.error("Legacy route verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
