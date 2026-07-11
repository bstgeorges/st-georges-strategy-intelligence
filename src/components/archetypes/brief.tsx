import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";

import {
  DeadlineList,
  EditorialCard,
  EditorialFlow,
  Masthead,
  MotionGrid,
  QuestionList,
  RankedList,
  RichText,
  SectionHeading,
  SourceRow,
} from "./editorial-primitives";
import { AuthoredArchiveComparison } from "./archive-comparison-state";

type BriefRecord = Extract<AuthoredEditorialRecord, { kind: "brief" }>;

export function BriefArchetype({ record }: { record: BriefRecord }) {
  const { content } = record;
  return (
    <main id="main-content" tabIndex={-1} className="sgs-document-main page">
      <EditorialFlow>
        <Masthead masthead={content.masthead} />
        <section className="band">
          <div className="so-what">
            <p>
              <RichText value={content.summary} />
            </p>
          </div>
        </section>
        <section className="band">
          <SectionHeading heading={content.priorities.heading} />
          <RankedList items={content.priorities.items} />
        </section>
        <section className="band">
          {content.streams.heading ? <SectionHeading heading={content.streams.heading} /> : null}
          <MotionGrid className="grid-4" kind="priority">
            {content.streams.cards.map((card, index) => (
              <EditorialCard key={index} card={card} as={card.href ? "link" : "article"} />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          <MotionGrid className="grid-3" kind="priority">
            {content.decisionWindow.map((card, index) => (
              <EditorialCard key={index} card={card} className="brief-card" />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          <SectionHeading heading={content.lead.heading} />
          <article className="display-card">
            {content.lead.meta ? (
              <p className="meta">
                <RichText value={content.lead.meta} />
              </p>
            ) : null}
            <h3>
              <RichText value={content.lead.title} />
            </h3>
            {content.lead.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <RichText value={paragraph} />
              </p>
            ))}
            <div className="brief-columns">
              {content.lead.lenses.map((lens, index) => (
                <div key={index}>
                  <h4>
                    <RichText value={lens.title} />
                  </h4>
                  <p>
                    <RichText value={lens.body} />
                  </p>
                </div>
              ))}
            </div>
            <SourceRow links={content.lead.sources} />
          </article>
        </section>
        <section className="band">
          {content.committeeAngles.heading ? (
            <SectionHeading heading={content.committeeAngles.heading} />
          ) : null}
          <MotionGrid className="grid-3" kind="translation">
            {content.committeeAngles.cards.map((card, index) => (
              <EditorialCard key={index} card={card} className="brief-card" />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          {content.evidenceAsks.heading ? (
            <SectionHeading heading={content.evidenceAsks.heading} />
          ) : null}
          <MotionGrid className="grid-2" kind="translation">
            {content.evidenceAsks.cards.map((card, index) => (
              <EditorialCard key={index} card={card} className="brief-card" />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          <SectionHeading heading={content.nextQuestions.heading} />
          <QuestionList items={content.nextQuestions.questions} />
        </section>
        <section className="band">
          <SectionHeading heading={content.deadlines.heading} />
          <DeadlineList deadlines={content.deadlines.deadlines} />
          {content.deadlines.sources ? <SourceRow links={content.deadlines.sources} /> : null}
        </section>
        <section className="band">
          {content.radar.heading ? <SectionHeading heading={content.radar.heading} /> : null}
          <MotionGrid className="radar-grid" kind="signal">
            {content.radar.cards.map((card, index) => (
              <EditorialCard key={index} card={card} />
            ))}
          </MotionGrid>
        </section>
        <AuthoredArchiveComparison comparison={record.archiveComparison} />
      </EditorialFlow>
    </main>
  );
}
