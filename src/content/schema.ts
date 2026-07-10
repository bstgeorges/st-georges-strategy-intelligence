export type PageStatus = 200 | 404;

export interface PageMetadata {
  title: string;
  description?: string;
  canonical?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphUrl?: string;
  openGraphImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  robots?: string;
  jsonLd?: string;
}

export interface PageSnapshot {
  route: string;
  sourceUrl: string;
  capturedAt: string;
  status: PageStatus;
  bodyClass: string;
  bodyHtml: string;
  metadata: PageMetadata;
  sha256: string;
}

export function validateSnapshot(value: unknown): asserts value is PageSnapshot {
  if (!value || typeof value !== "object") {
    throw new Error("Snapshot must be an object");
  }

  const snapshot = value as Partial<PageSnapshot>;
  if (!snapshot.route?.startsWith("/")) {
    throw new Error("Snapshot route must be root-relative");
  }
  if (!snapshot.sourceUrl?.startsWith("https://stgeorgesstrategy.com/")) {
    throw new Error(`Invalid source URL for ${snapshot.route}`);
  }
  if (snapshot.status !== 200 && snapshot.status !== 404) {
    throw new Error(`Invalid status for ${snapshot.route}`);
  }
  if (!snapshot.bodyHtml?.includes("<main")) {
    throw new Error(`Missing main landmark for ${snapshot.route}`);
  }
  if (!snapshot.metadata?.title || (snapshot.status === 200 && !snapshot.metadata.description)) {
    throw new Error(`Missing required metadata for ${snapshot.route}`);
  }
  if (!/^[a-f0-9]{64}$/.test(snapshot.sha256 ?? "")) {
    throw new Error(`Invalid checksum for ${snapshot.route}`);
  }
}
