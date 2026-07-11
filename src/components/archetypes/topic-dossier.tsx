import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";

import {
  DeadlineList,
  EditorialCard,
  EditorialFlow,
  Masthead,
  MotionGrid,
  RankedList,
  SectionHeading,
} from "./editorial-primitives";
import { AuthoredArchiveComparison } from "./archive-comparison-state";

type TopicRecord = Extract<AuthoredEditorialRecord, { kind: "topic-dossier" }>;

export function TopicDossierArchetype({ record }: { record: TopicRecord }) {
  const { content } = record;
  return (
    <main id="main-content" tabIndex={-1} className="sgs-document-main page">
      <EditorialFlow>
        <Masthead masthead={content.masthead} />
        <section className="band">
          <div className="topic-layout">
            <EditorialCard
              card={content.sourcePanel}
              as="aside"
              className="display-card"
              titleLevel={record.selectionReason === "live-current" ? 2 : 3}
              motionKind="signal"
            />
            <section>
              <SectionHeading heading={content.evidence.heading} />
              <RankedList evidence items={content.evidence.items} />
            </section>
          </div>
        </section>
        <section className="band">
          {content.judgements.heading ? (
            <SectionHeading heading={content.judgements.heading} />
          ) : null}
          <MotionGrid className="grid-3" kind="priority">
            {content.judgements.cards.map((card, index) => (
              <EditorialCard key={index} card={card} className="brief-card" />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          <SectionHeading heading={content.deadlines.heading} />
          <DeadlineList deadlines={content.deadlines.deadlines} />
        </section>
        <section className="band">
          {content.archives.heading ? <SectionHeading heading={content.archives.heading} /> : null}
          <MotionGrid className="archive-grid" kind="archive">
            {content.archives.cards.map((card, index) => (
              <EditorialCard key={index} card={card} className="archive-card" as="link" />
            ))}
          </MotionGrid>
        </section>
        <AuthoredArchiveComparison comparison={record.archiveComparison} />
      </EditorialFlow>
    </main>
  );
}
