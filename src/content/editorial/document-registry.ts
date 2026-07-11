// @ts-expect-error Node's type-stripping runtime needs the explicit extension; the bundler supports it.
import { capturedEditorialDocuments } from "../generated/editorial-documents.ts";
import type {
  EditorialDocument,
  EditorialDocumentEvidence,
  EditorialDocumentRoute,
} from "./document-types";

const documentsByRoute = new Map<string, EditorialDocument[]>();
for (const document of capturedEditorialDocuments) {
  const documents = documentsByRoute.get(document.route) ?? [];
  documents.push(document);
  documentsByRoute.set(document.route, documents);
}

const evidenceFor = (documents: readonly EditorialDocument[]): EditorialDocumentEvidence[] =>
  documents.map(({ key, corpus, status, sourceUrl, capturedAt, sourceSha256 }) => ({
    key,
    corpus,
    status,
    sourceUrl,
    capturedAt,
    sourceSha256,
  }));

export const editorialDocumentRegistry: readonly EditorialDocumentRoute[] = Object.freeze(
  [...documentsByRoute.entries()]
    .map(([route, documents]): EditorialDocumentRoute | undefined => {
      const live = documents.find(
        (document) => document.corpus === "live" && document.status === 200,
      );
      const frozen = documents.find(
        (document) => document.corpus === "frozen" && document.status === 200,
      );
      const selected = live ?? frozen;
      if (!selected) return undefined;
      return Object.freeze({
        route,
        archetype: selected.archetype,
        selectionReason: live ? "live-current" : "frozen-historical",
        document: selected,
        evidence: Object.freeze(evidenceFor(documents)),
      });
    })
    .filter((entry): entry is EditorialDocumentRoute => entry !== undefined)
    .sort((left, right) => left.route.localeCompare(right.route)),
);

const registryByRoute = new Map(editorialDocumentRegistry.map((entry) => [entry.route, entry]));

export const getEditorialDocumentRoute = (route: string): EditorialDocumentRoute | undefined =>
  registryByRoute.get(route);

export const getEditorialDocument = (route: string): EditorialDocument | undefined =>
  getEditorialDocumentRoute(route)?.document;

export const getEditorialDocumentEvidence = (route: string): readonly EditorialDocumentEvidence[] =>
  getEditorialDocumentRoute(route)?.evidence ?? [];
