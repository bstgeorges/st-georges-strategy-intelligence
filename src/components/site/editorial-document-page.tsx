import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";

import { AboutArchetype } from "../archetypes/about";
import { ArchiveArchetype } from "../archetypes/archive";
import { BriefArchetype } from "../archetypes/brief";
import { CommitteeQuestionsArchetype } from "../archetypes/committee-questions";
import { RegulatoryHorizonArchetype } from "../archetypes/regulatory-horizon";
import { SignalsIndexArchetype } from "../archetypes/signals-index";
import { TopicDossierArchetype } from "../archetypes/topic-dossier";
import { ArchetypeMotion } from "./archetype-motion";
import { ContextNavigation, type ContextNavigationItem } from "./context-navigation";
import { ReadingProgress } from "./reading-progress";
import { SiteShell } from "./site-shell";

function primaryPath(route: string): string {
  if (route.startsWith("/signals/")) return "/signals/";
  if (route.startsWith("/archive/")) return "/archive/";
  return route;
}

function contextItems(record: AuthoredEditorialRecord): readonly ContextNavigationItem[] {
  const { route } = record;
  const topic = /^\/signals\/([^/]+)\//.exec(route)?.[1];
  if (record.kind === "topic-dossier" && topic) {
    return [
      {
        href: `/signals/${topic}/`,
        label: "Current dossier",
        current: !route.includes("/archive/"),
      },
      {
        href: `/signals/${topic}/archive/`,
        label: "Topic archive",
        current: route.includes("/archive/"),
      },
      { href: "/signals/", label: "All streams" },
      { href: "/regulatory-horizon/", label: "Reg Horizon" },
    ];
  }
  if (route.startsWith("/signals/") && route.includes("/archive/") && topic) {
    return [
      { href: `/signals/${topic}/`, label: "Current dossier" },
      { href: `/signals/${topic}/archive/`, label: "Topic archive", current: true },
      { href: "/signals/", label: "All streams" },
      { href: "/archive/", label: "All archives" },
    ];
  }
  if (route.startsWith("/archive/brief/")) {
    return [
      { href: "/brief/", label: "Current brief", current: route === "/brief/" },
      { href: "/archive/brief/", label: "Brief archive", current: true },
      { href: "/archive/", label: "All archives" },
      { href: "/signals/", label: "Signals" },
    ];
  }
  const items: Record<AuthoredEditorialRecord["kind"], readonly ContextNavigationItem[]> = {
    brief: [
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
    "topic-dossier": [],
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
  return items[record.kind];
}

function AuthoredArchetype({ record }: { record: AuthoredEditorialRecord }) {
  switch (record.kind) {
    case "brief":
      return <BriefArchetype record={record} />;
    case "signals-index":
      return <SignalsIndexArchetype record={record} />;
    case "topic-dossier":
      return <TopicDossierArchetype record={record} />;
    case "regulatory-horizon":
      return <RegulatoryHorizonArchetype record={record} />;
    case "committee-questions":
      return <CommitteeQuestionsArchetype record={record} />;
    case "archive":
      return <ArchiveArchetype record={record} />;
    case "about":
      return <AboutArchetype record={record} />;
  }
}

export function EditorialDocumentPage({ record }: { record: AuthoredEditorialRecord }) {
  const items = contextItems(record);
  const longForm = ["brief", "topic-dossier", "regulatory-horizon", "committee-questions"].includes(
    record.kind,
  );
  return (
    <SiteShell currentPath={primaryPath(record.route)}>
      {longForm ? <ReadingProgress label={`${record.metadata.title} reading progress`} /> : null}
      {items.length ? <ContextNavigation label="In this publication" items={items} /> : null}
      <div className="sgs-document" data-archetype={record.kind} data-route={record.route}>
        <AuthoredArchetype record={record} />
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
