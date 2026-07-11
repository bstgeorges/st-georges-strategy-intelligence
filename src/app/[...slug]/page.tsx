import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  EditorialDocumentPage,
  StructuredEditorialData,
} from "@/components/site/editorial-document-page";
import {
  authoredEditorialRegistry,
  getAuthoredEditorialRecord,
} from "@/content/editorial/authored-registry";
import { editorialStructuredData, toEditorialMetadata } from "@/lib/editorial-metadata";

interface ReferenceRouteProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string[] }> {
  return authoredEditorialRegistry.flatMap(({ route }) => {
    const slug = route.split("/").filter(Boolean);
    return slug.length ? [{ slug }] : [];
  });
}

export async function generateMetadata({ params }: ReferenceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getAuthoredEditorialRecord(`/${slug.join("/")}/`);
  return record ? toEditorialMetadata(record) : {};
}

export default async function EditorialRoute({ params }: ReferenceRouteProps) {
  const { slug } = await params;
  const record = getAuthoredEditorialRecord(`/${slug.join("/")}/`);
  if (!record) notFound();
  return (
    <>
      <StructuredEditorialData value={editorialStructuredData(record)} />
      <EditorialDocumentPage record={record} />
    </>
  );
}
