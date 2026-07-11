import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  EditorialDocumentPage,
  StructuredEditorialData,
} from "@/components/site/editorial-document-page";
import {
  editorialDocumentRegistry,
  getEditorialDocument,
} from "@/content/editorial/document-registry";
import { toEditorialMetadata } from "@/lib/editorial-metadata";

interface ReferenceRouteProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string[] }> {
  return editorialDocumentRegistry.flatMap(({ route }) => {
    const slug = route.split("/").filter(Boolean);
    return slug.length ? [{ slug }] : [];
  });
}

export async function generateMetadata({ params }: ReferenceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getEditorialDocument(`/${slug.join("/")}/`);
  return document ? toEditorialMetadata(document) : {};
}

export default async function EditorialRoute({ params }: ReferenceRouteProps) {
  const { slug } = await params;
  const document = getEditorialDocument(`/${slug.join("/")}/`);
  if (!document) notFound();
  return (
    <>
      {document.metadata.structuredData ? (
        <StructuredEditorialData value={document.metadata.structuredData} />
      ) : null}
      <EditorialDocumentPage document={document} />
    </>
  );
}
