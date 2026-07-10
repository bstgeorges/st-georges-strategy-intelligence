import type { PageSnapshot } from "@/content/schema";

interface ReferencePageProps {
  snapshot: PageSnapshot;
}

/** Renders only repository-owned HTML from the locked reference capture. */
export function ReferencePage({ snapshot }: ReferencePageProps) {
  const metadata = snapshot.metadata;
  const hasOpenGraphMetadata = Boolean(
    metadata.openGraphTitle ||
    metadata.openGraphDescription ||
    metadata.openGraphUrl ||
    metadata.openGraphImage,
  );

  return (
    <>
      {hasOpenGraphMetadata ? (
        <>
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="St Georges Strategy" />
          {metadata.openGraphTitle ? (
            <meta property="og:title" content={metadata.openGraphTitle} />
          ) : null}
          {metadata.openGraphDescription ? (
            <meta property="og:description" content={metadata.openGraphDescription} />
          ) : null}
          {metadata.openGraphUrl ? (
            <meta property="og:url" content={metadata.openGraphUrl} />
          ) : null}
          {metadata.openGraphImage ? (
            <meta property="og:image" content={metadata.openGraphImage} />
          ) : null}
        </>
      ) : null}
      {metadata.twitterCard ? <meta name="twitter:card" content={metadata.twitterCard} /> : null}
      {metadata.twitterTitle ? <meta name="twitter:title" content={metadata.twitterTitle} /> : null}
      {metadata.twitterDescription ? (
        <meta name="twitter:description" content={metadata.twitterDescription} />
      ) : null}
      {metadata.jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: metadata.jsonLd }} />
      ) : null}
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: snapshot.bodyHtml }}
      />
    </>
  );
}
