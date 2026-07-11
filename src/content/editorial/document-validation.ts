import type { PageSnapshot } from "../schema";
// @ts-expect-error Node's type-stripping runtime needs the explicit extension; the bundler supports it.
import { editorialDocumentAllowlist, projectEditorialSemantics } from "./document-parser.ts";
import type { EditorialDocument, EditorialDocumentRoute, EditorialNode } from "./document-types";

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const normalizedText = (value: string): string => value.replace(/\s+/g, " ").trim();

const VALIDATION_ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  middot: "\u00b7",
  nbsp: "\u00a0",
  quot: '"',
};

const decodeEntities = (value: string): string =>
  value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|middot|nbsp|quot);/gi, (entity, name: string) => {
    if (name.toLowerCase().startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
    }
    if (name.startsWith("#")) return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
    return VALIDATION_ENTITIES[name.toLowerCase()] ?? entity;
  });

const stripMarkup = (value: string): string =>
  normalizedText(
    decodeEntities(
      value
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(
          /<(script|style|iframe|object|embed|template|svg|math|form)\b[\s\S]*?<\/\1\s*>/gi,
          "",
        )
        .replace(
          /<\/(?:main|section|article|aside|div|h1|h2|h3|h4|p|ul|ol|li|dl|dt|dd)\s*>|<br\b[^>]*>/gi,
          " ",
        )
        .replace(/<[^>]*>/g, ""),
    ),
  );

function sourceMain(snapshot: PageSnapshot): string {
  const match = snapshot.bodyHtml.match(/<main\b[\s\S]*?<\/main\s*>/i);
  invariant(match, `Source main landmark missing for ${snapshot.route}`);
  return match[0];
}

function readAttribute(tag: string, name: string): string | undefined {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(
    new RegExp(`(?:^|\\s)${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\u0060]+))`, "i"),
  );
  return match ? decodeEntities(match[1] ?? match[2] ?? match[3] ?? "") : undefined;
}

export function projectCapturedMainSemantics(snapshot: PageSnapshot): {
  readonly text: string;
  readonly links: readonly { readonly label: string; readonly href: string }[];
} {
  const main = sourceMain(snapshot);
  const links = [...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi)].flatMap((match) => {
    const href = readAttribute(match[1], "href");
    return href ? [{ label: stripMarkup(match[2]), href }] : [];
  });
  return { text: stripMarkup(main), links };
}

function assertSafeTree(document: EditorialDocument): void {
  const tags = new Set(editorialDocumentAllowlist.tags);
  const attributes = new Set(editorialDocumentAllowlist.attributes);

  const visit = (node: EditorialNode): void => {
    if (node.type === "text") {
      invariant(typeof node.value === "string", `Invalid text node in ${document.key}`);
      return;
    }
    invariant(tags.has(node.tag), `Unsafe tag ${node.tag} in ${document.key}`);
    for (const name of Object.keys(node.attributes)) {
      invariant(attributes.has(name), `Unsafe attribute ${name} in ${document.key}`);
      invariant(
        !/^on/i.test(name) && name !== "style",
        `Executable attribute ${name} in ${document.key}`,
      );
    }
    const { href, src } = node.attributes;
    if (href) {
      const resolved = new URL(href, document.sourceUrl);
      invariant(
        href.startsWith("#") || ["http:", "https:", "mailto:"].includes(resolved.protocol),
        `Unsafe href ${href} in ${document.key}`,
      );
    }
    if (src) {
      const base = new URL(document.sourceUrl);
      const resolved = new URL(src, base);
      invariant(
        resolved.protocol === "https:" && resolved.origin === base.origin,
        `Unsafe src ${src} in ${document.key}`,
      );
    }
    node.children.forEach(visit);
  };

  visit(document.content);
}

export function assertEditorialDocumentParity(
  snapshot: PageSnapshot,
  document: EditorialDocument,
): void {
  const source = projectCapturedMainSemantics(snapshot);
  const generated = projectEditorialSemantics(document.content);
  invariant(source.text === generated.text, `Text parity failed for ${document.key}`);
  invariant(
    JSON.stringify(source.links) === JSON.stringify(generated.links),
    `Link parity failed for ${document.key}`,
  );
}

export interface EditorialDocumentValidationResult {
  readonly captures: number;
  readonly frozenCaptures: number;
  readonly liveCaptures: number;
  readonly routes: number;
  readonly liveSelectedRoutes: number;
  readonly frozenHistoricalRoutes: number;
}

export function validateEditorialDocumentRegistry(
  documents: readonly EditorialDocument[],
  registry: readonly EditorialDocumentRoute[],
): EditorialDocumentValidationResult {
  const captureKeys = new Set<string>();
  const corpusRoutes = new Set<string>();
  for (const document of documents) {
    invariant(!captureKeys.has(document.key), `Duplicate document key ${document.key}`);
    captureKeys.add(document.key);
    const corpusRoute = `${document.corpus}:${document.route}`;
    invariant(!corpusRoutes.has(corpusRoute), `Duplicate corpus route ${corpusRoute}`);
    corpusRoutes.add(corpusRoute);
    invariant(document.content.tag === "main", `Document root must be main: ${document.key}`);
    invariant(document.archetype !== undefined, `Document archetype missing: ${document.key}`);
    assertSafeTree(document);
  }

  const registryRoutes = new Set<string>();
  for (const entry of registry) {
    invariant(!registryRoutes.has(entry.route), `Duplicate registry route ${entry.route}`);
    registryRoutes.add(entry.route);
    invariant(entry.document.status === 200, `Selected non-200 document for ${entry.route}`);
    invariant(entry.document.route === entry.route, `Selected route mismatch for ${entry.route}`);
    invariant(
      entry.document.archetype === entry.archetype,
      `Archetype mismatch for ${entry.route}`,
    );
    invariant(entry.evidence.length > 0, `Missing evidence for ${entry.route}`);
    if (entry.evidence.some(({ corpus, status }) => corpus === "live" && status === 200)) {
      invariant(entry.document.corpus === "live", `Live precedence violated for ${entry.route}`);
      invariant(entry.selectionReason === "live-current", `Live reason missing for ${entry.route}`);
    } else {
      invariant(entry.document.corpus === "frozen", `Frozen fallback violated for ${entry.route}`);
      invariant(
        entry.selectionReason === "frozen-historical",
        `Frozen reason missing for ${entry.route}`,
      );
      invariant(entry.archetype === "archive", `Non-archive frozen fallback for ${entry.route}`);
    }
  }

  const successfulRoutes = new Set(
    documents.filter(({ status }) => status === 200).map(({ route }) => route),
  );
  invariant(
    successfulRoutes.size === registryRoutes.size &&
      [...successfulRoutes].every((route) => registryRoutes.has(route)),
    "Registry must cover exactly the successful route union",
  );

  return {
    captures: documents.length,
    frozenCaptures: documents.filter(({ corpus }) => corpus === "frozen").length,
    liveCaptures: documents.filter(({ corpus }) => corpus === "live").length,
    routes: registry.length,
    liveSelectedRoutes: registry.filter(({ selectionReason }) => selectionReason === "live-current")
      .length,
    frozenHistoricalRoutes: registry.filter(
      ({ selectionReason }) => selectionReason === "frozen-historical",
    ).length,
  };
}
