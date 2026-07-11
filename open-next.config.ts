import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// This read-only cache is designed for fully prerendered sites. Replace it with reviewed
// persistent storage only when runtime revalidation becomes an editorial requirement.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Serve SSG hits directly from the configured cache and fall back to NextServer on misses.
  enableCacheInterception: true,
});
