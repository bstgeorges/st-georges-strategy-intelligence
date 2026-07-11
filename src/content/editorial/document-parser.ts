import type { PageSnapshot } from "../schema";
import type {
  EditorialDocument,
  EditorialDocumentArchetype,
  EditorialDocumentCorpus,
  EditorialDocumentMetadata,
  EditorialElementAttributes,
  EditorialElementNode,
  EditorialElementTag,
  EditorialNode,
  JsonValue,
} from "./document-types";

const ALLOWED_TAGS = new Set<EditorialElementTag>([
  "main",
  "section",
  "article",
  "aside",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "a",
  "span",
  "strong",
  "time",
  "img",
  "br",
]);

const DROP_WITH_CONTENT = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "template",
  "svg",
  "math",
  "form",
]);

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  middot: "\u00b7",
  nbsp: "\u00a0",
  quot: '"',
};

interface RawTextNode {
  type: "text";
  value: string;
}

interface RawElementNode {
  type: "element";
  tag: string;
  attributes: Readonly<Record<string, string>>;
  children: RawNode[];
}

type RawNode = RawTextNode | RawElementNode;

interface TagToken {
  end: number;
  closing: boolean;
  selfClosing: boolean;
  name: string;
  attributesSource: string;
}

const decodeEntities = (value: string): string =>
  value.replace(/&(#x[\da-f]+|#\d+|[a-z][a-z\d]+);/gi, (entity, name: string) => {
    if (name.startsWith("#x") || name.startsWith("#X")) {
      const codePoint = Number.parseInt(name.slice(2), 16);
      return Number.isSafeInteger(codePoint) && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : entity;
    }
    if (name.startsWith("#")) {
      const codePoint = Number.parseInt(name.slice(1), 10);
      return Number.isSafeInteger(codePoint) && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : entity;
    }
    return NAMED_ENTITIES[name.toLowerCase()] ?? entity;
  });

function readTag(source: string, start: number): TagToken | undefined {
  if (source[start] !== "<" || source.startsWith("<!--", start)) return undefined;

  let cursor = start + 1;
  const closing = source[cursor] === "/";
  if (closing) cursor += 1;
  while (/\s/.test(source[cursor] ?? "")) cursor += 1;

  const nameStart = cursor;
  while (/[a-z\d:-]/i.test(source[cursor] ?? "")) cursor += 1;
  if (cursor === nameStart) return undefined;
  const name = source.slice(nameStart, cursor).toLowerCase();
  const attributesStart = cursor;
  let quote: '"' | "'" | undefined;

  while (cursor < source.length) {
    const character = source[cursor];
    if (quote) {
      if (character === quote) quote = undefined;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === ">") {
      const rawAttributes = source.slice(attributesStart, cursor);
      return {
        end: cursor + 1,
        closing,
        selfClosing: /\/\s*$/.test(rawAttributes),
        name,
        attributesSource: rawAttributes.replace(/\/\s*$/, ""),
      };
    }
    cursor += 1;
  }
  return undefined;
}

function mainFragment(bodyHtml: string): string {
  const opening = /<main\b/i.exec(bodyHtml);
  if (!opening) throw new Error("Captured body is missing its main landmark");

  let cursor = opening.index;
  let depth = 0;
  while (cursor < bodyHtml.length) {
    const next = bodyHtml.indexOf("<", cursor);
    if (next < 0) break;
    const token = readTag(bodyHtml, next);
    if (!token) {
      cursor = next + 1;
      continue;
    }
    if (token.name === "main") {
      depth += token.closing ? -1 : 1;
      if (depth === 0) return bodyHtml.slice(opening.index, token.end);
    }
    cursor = token.end;
  }
  throw new Error("Captured body has an unclosed main landmark");
}

function parseAttributes(source: string): Readonly<Record<string, string>> {
  const attributes: Record<string, string> = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    const name = match[1].toLowerCase();
    if (!(name in attributes)) {
      attributes[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
    }
  }
  return attributes;
}

function parseRawFragment(source: string): RawElementNode {
  const container: RawElementNode = {
    type: "element",
    tag: "root",
    attributes: {},
    children: [],
  };
  const stack = [container];
  let cursor = 0;

  while (cursor < source.length) {
    if (source.startsWith("<!--", cursor)) {
      const commentEnd = source.indexOf("-->", cursor + 4);
      cursor = commentEnd < 0 ? source.length : commentEnd + 3;
      continue;
    }
    if (source[cursor] === "<") {
      const token = readTag(source, cursor);
      if (token) {
        if (token.closing) {
          const matchingIndex = stack.findLastIndex(({ tag }) => tag === token.name);
          if (matchingIndex > 0) stack.length = matchingIndex;
        } else {
          const node: RawElementNode = {
            type: "element",
            tag: token.name,
            attributes: parseAttributes(token.attributesSource),
            children: [],
          };
          stack.at(-1)?.children.push(node);
          if (!token.selfClosing && !VOID_TAGS.has(token.name)) stack.push(node);
        }
        cursor = token.end;
        continue;
      }
    }

    const next = source.indexOf("<", cursor + 1);
    const end = next < 0 ? source.length : next;
    const value = decodeEntities(source.slice(cursor, end)).replace(/\s+/g, " ");
    if (value) stack.at(-1)?.children.push({ type: "text", value });
    cursor = end;
  }

  const root = container.children.find(
    (node): node is RawElementNode => node.type === "element" && node.tag === "main",
  );
  if (!root) throw new Error("Parsed fragment did not produce a main landmark");
  return root;
}

function safeHref(value: string, sourceUrl: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed || /[\u0000-\u001f\u007f]/.test(trimmed)) return undefined;
  if (trimmed.startsWith("#")) return trimmed;
  try {
    const resolved = new URL(trimmed, sourceUrl);
    return ["http:", "https:", "mailto:"].includes(resolved.protocol) ? trimmed : undefined;
  } catch {
    return undefined;
  }
}

function safeSource(value: string, sourceUrl: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed || /[\u0000-\u001f\u007f]/.test(trimmed)) return undefined;
  try {
    const base = new URL(sourceUrl);
    const resolved = new URL(trimmed, base);
    return resolved.protocol === "https:" && resolved.origin === base.origin ? trimmed : undefined;
  } catch {
    return undefined;
  }
}

const safeToken = (value: string): string | undefined =>
  /^[a-z\d][a-z\d_.:-]*$/i.test(value) ? value : undefined;

function sanitizeAttributes(
  raw: Readonly<Record<string, string>>,
  tag: EditorialElementTag,
  sourceUrl: string,
): EditorialElementAttributes {
  const attributes: Record<string, string | number | boolean> = {};
  const identifier = raw.id && safeToken(raw.id);
  if (identifier) attributes.id = identifier;
  if (raw.class) {
    const className = raw.class
      .split(/\s+/)
      .filter((token) => safeToken(token))
      .join(" ");
    if (className) attributes.className = className;
  }
  if (raw["aria-label"]) attributes["aria-label"] = raw["aria-label"];
  if (raw["aria-hidden"] === "true") attributes["aria-hidden"] = true;
  if (raw["aria-current"] === "page") attributes["aria-current"] = "page";
  if (raw.tabindex && /^-?\d+$/.test(raw.tabindex)) {
    const tabIndex = Number.parseInt(raw.tabindex, 10);
    if (tabIndex >= -1 && tabIndex <= 0) attributes.tabIndex = tabIndex;
  }
  if (raw["data-topic"]) {
    const topic = safeToken(raw["data-topic"]);
    if (topic) attributes["data-topic"] = topic;
  }
  if ("data-auto-status" in raw) attributes["data-auto-status"] = true;

  if (tag === "a") {
    const href = raw.href && safeHref(raw.href, sourceUrl);
    if (href) attributes.href = href;
    if (raw.target === "_blank") attributes.target = "_blank";
    if (raw.rel) {
      const rel = raw.rel
        .toLowerCase()
        .split(/\s+/)
        .filter((value) => value === "noopener" || value === "noreferrer")
        .sort()
        .join(" ");
      if (rel) attributes.rel = rel;
    }
  }
  if (tag === "img") {
    const src = raw.src && safeSource(raw.src, sourceUrl);
    if (src) attributes.src = src;
    if (raw.alt !== undefined) attributes.alt = raw.alt;
  }
  if (tag === "time" && raw.datetime) attributes.dateTime = raw.datetime;

  return attributes as EditorialElementAttributes;
}

function sanitizeNode(raw: RawNode, sourceUrl: string): EditorialNode[] {
  if (raw.type === "text") return [{ type: "text", value: raw.value }];
  if (DROP_WITH_CONTENT.has(raw.tag)) return [];

  const children = raw.children.flatMap((child) => sanitizeNode(child, sourceUrl));
  if (!ALLOWED_TAGS.has(raw.tag as EditorialElementTag)) return children;
  const tag = raw.tag as EditorialElementTag;
  return [
    {
      type: "element",
      tag,
      attributes: sanitizeAttributes(raw.attributes, tag, sourceUrl),
      children,
    },
  ];
}

export function classifyEditorialRoute(route: string): EditorialDocumentArchetype {
  if (route === "/") return "home";
  if (route === "/brief/") return "weekly-brief";
  if (route === "/signals/") return "signals-index";
  if (route === "/regulatory-horizon/") return "regulatory-horizon";
  if (route === "/committee-questions/") return "committee-questions";
  if (route === "/about/") return "about";
  if (route === "/archive/" || /\/archive\//.test(route)) return "archive";
  if (/^\/signals\/[^/]+\/$/.test(route)) return "signal-topic";
  throw new Error(`Cannot classify editorial route: ${route}`);
}

function isJsonObject(value: JsonValue): value is Readonly<Record<string, JsonValue>> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function metadataFromSnapshot(snapshot: PageSnapshot): EditorialDocumentMetadata {
  const { jsonLd, ...metadata } = snapshot.metadata;
  if (!jsonLd) return metadata;
  let structuredData: JsonValue;
  try {
    structuredData = JSON.parse(jsonLd) as JsonValue;
  } catch {
    throw new Error(`Invalid JSON-LD metadata for ${snapshot.route}`);
  }
  if (!isJsonObject(structuredData)) {
    throw new Error(`JSON-LD metadata must be an object for ${snapshot.route}`);
  }
  return { ...metadata, structuredData };
}

export function parseEditorialDocument(
  snapshot: PageSnapshot,
  corpus: EditorialDocumentCorpus,
): EditorialDocument {
  const sanitized = sanitizeNode(
    parseRawFragment(mainFragment(snapshot.bodyHtml)),
    snapshot.sourceUrl,
  );
  const content = sanitized[0];
  if (!content || content.type !== "element" || content.tag !== "main") {
    throw new Error(`Sanitization removed the main landmark for ${snapshot.route}`);
  }
  return {
    key: `${corpus}:${snapshot.sha256}:${snapshot.route}`,
    corpus,
    route: snapshot.route,
    archetype: classifyEditorialRoute(snapshot.route),
    sourceUrl: snapshot.sourceUrl,
    capturedAt: snapshot.capturedAt,
    status: snapshot.status,
    sourceSha256: snapshot.sha256,
    metadata: metadataFromSnapshot(snapshot),
    content,
  };
}

export interface EditorialSemanticProjection {
  readonly text: string;
  readonly links: readonly { readonly label: string; readonly href: string }[];
}

export function projectEditorialSemantics(
  content: EditorialElementNode,
): EditorialSemanticProjection {
  const links: Array<{ label: string; href: string }> = [];
  const boundaryTags = new Set(["br", "p", "li", "dt", "dd", "h1", "h2", "h3", "h4"]);

  const nodeText = (node: EditorialNode): string => {
    if (node.type === "text") return node.value;
    const value = node.children.map(nodeText).join("");
    return boundaryTags.has(node.tag) ? `${value} ` : value;
  };

  const collectLinks = (node: EditorialNode): void => {
    if (node.type === "text") return;
    if (node.tag === "a" && node.attributes.href) {
      links.push({ label: nodeText(node).replace(/\s+/g, " ").trim(), href: node.attributes.href });
    }
    node.children.forEach(collectLinks);
  };

  collectLinks(content);
  return { text: nodeText(content).replace(/\s+/g, " ").trim(), links };
}

export const editorialDocumentAllowlist = Object.freeze({
  tags: Object.freeze([...ALLOWED_TAGS].sort()),
  attributes: Object.freeze([
    "id",
    "className",
    "href",
    "src",
    "alt",
    "dateTime",
    "tabIndex",
    "target",
    "rel",
    "aria-label",
    "aria-hidden",
    "aria-current",
    "data-topic",
    "data-auto-status",
  ]),
});
