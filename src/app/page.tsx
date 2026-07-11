import { HomePage } from "@/components/site/home-page";
import { homeEditorialRecord } from "@/content/editorial/home";
import { editorialStructuredData, toEditorialMetadata } from "@/lib/editorial-metadata";

export const metadata = toEditorialMetadata(homeEditorialRecord);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(editorialStructuredData(homeEditorialRecord)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <HomePage />
    </>
  );
}
