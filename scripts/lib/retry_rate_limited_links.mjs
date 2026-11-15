import { setTimeout as delay } from "node:timers/promises";

// Retry only explicit HTTP throttling after the parallel audit has finished.
// A persistent 429 stays a failure; no source is marked present by this helper.
export async function retryRateLimitedLinks(results, check, { wait = delay, delays = [5000, 10000, 20000] } = {}) {
  for (let index = 0; index < results.length; index += 1) {
    for (const delayMs of delays) {
      if (results[index].ok || results[index].status !== 429) break;
      await wait(delayMs);
      results[index] = await check(results[index].url);
    }
  }
  return results;
}
