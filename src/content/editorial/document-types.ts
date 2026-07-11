import type { PageMetadata, PageStatus } from "../schema";

export type EditorialDocumentCorpus = "frozen" | "live";

export type EditorialDocumentArchetype =
  | "home"
  | "weekly-brief"
  | "signals-index"
  | "signal-topic"
  | "regulatory-horizon"
  | "committee-questions"
  | "archive"
  | "about";

export type EditorialElementTag =
  | "main"
  | "section"
  | "article"
  | "aside"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "ul"
  | "ol"
  | "li"
  | "dl"
  | "dt"
  | "dd"
  | "a"
  | "span"
  | "strong"
  | "time"
  | "img"
  | "br";

export interface EditorialElementAttributes {
  readonly id?: string;
  readonly className?: string;
  readonly href?: string;
  readonly src?: string;
  readonly alt?: string;
  readonly dateTime?: string;
  readonly tabIndex?: number;
  readonly target?: "_blank";
  readonly rel?: string;
  readonly "aria-label"?: string;
  readonly "aria-hidden"?: boolean;
  readonly "aria-current"?: "page";
  readonly "data-topic"?: string;
  readonly "data-auto-status"?: boolean;
}

export interface EditorialTextNode {
  readonly type: "text";
  readonly value: string;
}

export interface EditorialElementNode {
  readonly type: "element";
  readonly tag: EditorialElementTag;
  readonly attributes: EditorialElementAttributes;
  readonly children: readonly EditorialNode[];
}

export type EditorialNode = EditorialTextNode | EditorialElementNode;

export type JsonValue =
  null | boolean | number | string | readonly JsonValue[] | { readonly [key: string]: JsonValue };

export interface EditorialDocumentMetadata extends Omit<Readonly<PageMetadata>, "jsonLd"> {
  readonly structuredData?: Readonly<Record<string, JsonValue>>;
}

export interface EditorialDocument {
  readonly key: string;
  readonly corpus: EditorialDocumentCorpus;
  readonly route: string;
  readonly archetype: EditorialDocumentArchetype;
  readonly sourceUrl: string;
  readonly capturedAt: string;
  readonly status: PageStatus;
  readonly sourceSha256: string;
  readonly metadata: EditorialDocumentMetadata;
  readonly content: EditorialElementNode;
}

export type EditorialSelectionReason = "live-current" | "frozen-historical";

export interface EditorialDocumentEvidence {
  readonly key: string;
  readonly corpus: EditorialDocumentCorpus;
  readonly status: PageStatus;
  readonly sourceUrl: string;
  readonly capturedAt: string;
  readonly sourceSha256: string;
}

export interface EditorialDocumentRoute {
  readonly route: string;
  readonly archetype: EditorialDocumentArchetype;
  readonly selectionReason: EditorialSelectionReason;
  readonly document: EditorialDocument;
  readonly evidence: readonly EditorialDocumentEvidence[];
}
