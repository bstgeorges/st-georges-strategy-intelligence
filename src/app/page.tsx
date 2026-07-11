import type { Metadata } from "next";

import { HomePage } from "@/components/site/home-page";
import { homeEdition } from "@/content/editorial/home";

export const metadata: Metadata = {
  title: "The Virtual Officer | St Georges Strategy",
  description:
    "Weekly financial-services risk intelligence from St Georges Strategy, combining the brief, Signals, Reg Horizon, and archived source-backed topic pages.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "The Virtual Officer | St Georges Strategy",
    description:
      "Weekly financial-services risk intelligence from St Georges Strategy, combining the brief, Signals, Reg Horizon, and archived source-backed topic pages.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Virtual Officer | St Georges Strategy",
    description:
      "Weekly financial-services risk intelligence from St Georges Strategy, combining the brief, Signals, Reg Horizon, and archived source-backed topic pages.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Virtual Officer",
  description:
    "Weekly financial-services risk intelligence from St Georges Strategy, combining the brief, Signals, Reg Horizon, and archived source-backed topic pages.",
  url: "https://stgeorgesstrategy.com/",
  publisher: {
    "@type": "Organization",
    name: "St Georges Strategy",
  },
  author: {
    "@type": "Person",
    name: "Ben St Georges",
    email: "ben@stgeorgesstrategy.com",
    sameAs: "https://www.linkedin.com/in/benstgeorges/",
  },
  dateModified: "2026-07-09",
  about: homeEdition.briefTitle,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage />
    </>
  );
}
