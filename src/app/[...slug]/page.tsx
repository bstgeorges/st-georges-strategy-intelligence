import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReferencePage } from "@/components/reference-page";
import {
  getStaticPageSnapshot,
  slugFromRoute,
  staticPageSnapshots,
  toNextMetadata,
} from "@/lib/content";

interface ReferenceRouteProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = true;

export function generateStaticParams(): Array<{ slug: string[] }> {
  return staticPageSnapshots.flatMap((snapshot) => {
    const slug = slugFromRoute(snapshot.route);
    return slug?.length ? [{ slug }] : [];
  });
}

export async function generateMetadata({ params }: ReferenceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const snapshot = getStaticPageSnapshot(slug);
  return snapshot ? toNextMetadata(snapshot) : {};
}

export default async function ReferenceRoute({ params }: ReferenceRouteProps) {
  const { slug } = await params;
  const snapshot = getStaticPageSnapshot(slug);
  if (!snapshot) notFound();
  return <ReferencePage snapshot={snapshot} />;
}
