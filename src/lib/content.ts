import type { Metadata } from "next";

import { pageSnapshots } from "@/content/reference";
import type { PageSnapshot } from "@/content/schema";
import { validateSnapshot } from "@/content/schema";

const successfulSnapshots = pageSnapshots.filter(
  (snapshot): snapshot is PageSnapshot & { status: 200 } => snapshot.status === 200,
);

for (const snapshot of successfulSnapshots) {
  validateSnapshot(snapshot);
}

const snapshotsByRoute = new Map<string, PageSnapshot>();

for (const snapshot of pageSnapshots) {
  if (snapshotsByRoute.has(snapshot.route)) {
    throw new Error(`Duplicate reference route: ${snapshot.route}`);
  }

  snapshotsByRoute.set(snapshot.route, snapshot);
}

const committeeQuestionsSnapshot = snapshotsByRoute.get("/committee-questions/");

if (
  !committeeQuestionsSnapshot ||
  committeeQuestionsSnapshot.status !== 404 ||
  !committeeQuestionsSnapshot.bodyHtml.includes("This page is not in the brief.")
) {
  throw new Error("Missing capture-time Committee Questions 404 snapshot");
}

const capturedCommitteeQuestionsSnapshot: PageSnapshot = committeeQuestionsSnapshot;

export const staticPageSnapshots = Object.freeze(successfulSnapshots);

export function routeFromSlug(slug?: readonly string[]): string {
  return slug?.length ? `/${slug.join("/")}/` : "/";
}

export function slugFromRoute(route: string): string[] | undefined {
  if (route === "/") {
    return undefined;
  }

  return route.split("/").filter(Boolean);
}

export function getStaticPageSnapshot(slug?: readonly string[]): PageSnapshot | undefined {
  const snapshot = snapshotsByRoute.get(routeFromSlug(slug));

  return snapshot?.status === 200 ? snapshot : undefined;
}

export function getCommitteeQuestionsSnapshot(): PageSnapshot {
  return capturedCommitteeQuestionsSnapshot;
}

export function toNextMetadata(snapshot: PageSnapshot): Metadata {
  const source = snapshot.metadata;

  return {
    title: source.title,
    description: source.description,
    ...(source.canonical ? { alternates: { canonical: source.canonical } } : {}),
    ...(source.robots ? { robots: source.robots } : {}),
  };
}
