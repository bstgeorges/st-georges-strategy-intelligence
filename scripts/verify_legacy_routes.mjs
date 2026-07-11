const checks = [
  ["https://intelligence.stgeorgesstrategy.com/", "https://stgeorgesstrategy.com/brief/"],
  ["https://stgeorgesstrategy.com/intelligence/", "https://stgeorgesstrategy.com/brief/"],
  ["https://stgeorgesstrategy.com/ai-signals/", "https://stgeorgesstrategy.com/signals/ai/"],
  ["https://stgeorgesstrategy.com/thevirtualofficer/", "https://stgeorgesstrategy.com/about/"],
  ["https://www.stgeorgesstrategy.com/brief/", "https://stgeorgesstrategy.com/brief/"],
];

const failures = [];
for (const [source, expected] of checks) {
  try {
    const response = await fetch(source, {
      redirect: "manual",
      headers: { "cache-control": "no-cache", "user-agent": "StGeorgesStrategyRouteVerifier/1.0" },
    });
    const location = response.headers.get("location");
    if (![301, 302, 307, 308].includes(response.status)) failures.push(`${source} returned ${response.status}, expected a redirect`);
    else if (new URL(location, source).href !== expected) failures.push(`${source} redirects to ${location}; expected ${expected}`);
    else console.log(`Verified ${source} -> ${expected}`);
  } catch (error) {
    failures.push(`${source} could not be checked: ${error.message}`);
  }
}

if (failures.length) {
  console.error("Legacy route verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
