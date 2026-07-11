import Link from "next/link";
import { createElement, type ReactNode } from "react";

import type {
  EditorialDocument,
  EditorialDocumentArchetype,
  EditorialElementNode,
  EditorialNode,
} from "@/content/editorial/document-types";

import { ArchetypeMotion } from "./archetype-motion";
import { ContextNavigation, type ContextNavigationItem } from "./context-navigation";
import { ReadingProgress } from "./reading-progress";
import { SiteShell } from "./site-shell";

const longFormArchetypes = new Set<EditorialDocumentArchetype>([
  "weekly-brief",
  "signal-topic",
  "regulatory-horizon",
  "committee-questions",
]);

function primaryPath(route: string): string {
  if (route.startsWith("/signals/")) return "/signals/";
  if (route.startsWith("/archive/")) return "/archive/";
  return route;
}

function contextItems(document: EditorialDocument): readonly ContextNavigationItem[] {
  const route = document.route;
  const topicMatch = /^\/signals\/([^/]+)\//.exec(route);
  const topic = topicMatch?.[1];

  if (document.archetype === "signal-topic" && topic) {
    return [
      { href: route, label: "Current dossier", current: true },
      { href: `/signals/${topic}/archive/`, label: "Topic archive" },
      { href: "/signals/", label: "All streams" },
      { href: "/regulatory-horizon/", label: "Reg Horizon" },
    ];
  }
  if (route.startsWith("/signals/") && route.includes("/archive/") && topic) {
    return [
      { href: `/signals/${topic}/`, label: "Current dossier" },
      {
        href: `/signals/${topic}/archive/`,
        label: "Topic archive",
        current: !/\d{4}-\d{2}-\d{2}/.test(route),
      },
      { href: "/signals/", label: "All streams" },
      { href: "/archive/", label: "All archives" },
    ];
  }
  if (route.startsWith("/archive/brief/")) {
    return [
      { href: "/brief/", label: "Current brief" },
      { href: "/archive/brief/", label: "Brief archive", current: route === "/archive/brief/" },
      { href: "/archive/", label: "All archives" },
      { href: "/signals/", label: "Signals" },
    ];
  }

  const byArchetype: Partial<Record<EditorialDocumentArchetype, readonly ContextNavigationItem[]>> =
    {
      "weekly-brief": [
        { href: "/brief/", label: "Current brief", current: true },
        { href: "/signals/", label: "Signal dossiers" },
        { href: "/committee-questions/", label: "Committee questions" },
        { href: "/archive/brief/", label: "Brief archive" },
      ],
      "signals-index": [
        { href: "/signals/", label: "Eight streams", current: true },
        { href: "/brief/", label: "Current brief" },
        { href: "/regulatory-horizon/", label: "Reg Horizon" },
        { href: "/archive/", label: "Archive" },
      ],
      "regulatory-horizon": [
        { href: "/regulatory-horizon/", label: "Deadlines", current: true },
        { href: "/committee-questions/", label: "Questions" },
        { href: "/signals/", label: "Signals" },
        { href: "/archive/", label: "Archive" },
      ],
      "committee-questions": [
        { href: "/committee-questions/", label: "Question library", current: true },
        { href: "/brief/", label: "Current judgement" },
        { href: "/regulatory-horizon/", label: "Deadlines" },
        { href: "/signals/", label: "Evidence dossiers" },
      ],
      archive: [
        { href: "/archive/", label: "Archive", current: route === "/archive/" },
        { href: "/archive/brief/", label: "Brief editions" },
        { href: "/signals/", label: "Signal streams" },
        { href: "/brief/", label: "Current brief" },
      ],
      about: [
        { href: "/about/", label: "Method & author", current: true },
        { href: "/brief/", label: "Current brief" },
        { href: "/signals/", label: "Source dossiers" },
        { href: "/archive/", label: "Archive discipline" },
      ],
    };
  return byArchetype[document.archetype] ?? [];
}

function motionKind(node: EditorialElementNode): string | undefined {
  const classes = new Set(node.attributes.className?.split(/\s+/) ?? []);
  if (classes.has("masthead")) return "orientation";
  if (classes.has("brief-card") || classes.has("signal-card")) return "priority";
  if (classes.has("source-row") || classes.has("top-source")) return "signal";
  if (classes.has("question-callout") || classes.has("question-list")) return "translation";
  if (classes.has("horizon-list") || classes.has("horizon-lanes")) return "time";
  if (classes.has("archive-card") || classes.has("archive-grid")) return "archive";
  return undefined;
}

function renderNode(
  node: EditorialNode,
  path: string,
  archetype: EditorialDocumentArchetype,
  parentClassName = "",
): ReactNode {
  if (node.type === "text") return node.value;
  const attributes: Record<string, unknown> = { ...node.attributes, key: path };
  const kind = motionKind(node);
  if (kind) attributes["data-editorial-motion"] = kind;
  if (node.tag === "main") {
    attributes.id = "main-content";
    attributes.className = ["sgs-document-main", node.attributes.className]
      .filter(Boolean)
      .join(" ");
  }
  if (node.tag === "a" && node.attributes.target === "_blank") {
    attributes.rel = [node.attributes.rel, "noopener", "noreferrer"].filter(Boolean).join(" ");
  }
  if (node.tag === "a" && /^https?:\/\//.test(node.attributes.href ?? "")) {
    attributes["data-external"] = "true";
  }

  const children = node.children.map((child, index) =>
    renderNode(child, `${path}.${index}`, archetype, node.attributes.className),
  );
  const href = node.attributes.href;
  if (node.tag === "a" && href?.startsWith("/")) {
    return createElement(Link, { ...attributes, href }, ...children);
  }
  const tag =
    node.tag === "h3" &&
    ((archetype === "signal-topic" && /\bdisplay-card\b/.test(parentClassName)) ||
      (archetype === "about" && /\babout-card\b/.test(parentClassName)))
      ? "h2"
      : node.tag;
  return createElement(tag, attributes as never, ...children);
}

export function EditorialDocumentPage({ document }: { document: EditorialDocument }) {
  const items = contextItems(document);
  const longForm =
    longFormArchetypes.has(document.archetype) || /\/\d{4}-\d{2}-\d{2}\/$/.test(document.route);

  return (
    <SiteShell currentPath={primaryPath(document.route)}>
      {longForm ? <ReadingProgress label={`${document.metadata.title} reading progress`} /> : null}
      {items.length ? <ContextNavigation label="In this publication" items={items} /> : null}
      <div className="sgs-document" data-archetype={document.archetype} data-route={document.route}>
        {renderNode(document.content, "document", document.archetype)}
      </div>
      <ArchetypeMotion />
    </SiteShell>
  );
}

export function StructuredEditorialData({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }}
    />
  );
}
