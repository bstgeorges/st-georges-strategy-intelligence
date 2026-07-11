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
} from "./editorial-primitives";

type HorizonRecord = Extract<AuthoredEditorialRecord, { kind: "regulatory-horizon" }>;

export function RegulatoryHorizonArchetype({ record }: { record: HorizonRecord }) {
  const { content } = record;
  return (
    <main id="main-content" tabIndex={-1} className="sgs-document-main page">
      <EditorialFlow>
        <Masthead masthead={content.masthead} />
        <section className="band">
          <SectionHeading heading={content.dashboard.heading} />
          <div className="so-what">
            <p>
              <RichText value={content.dashboard.summary} />
            </p>
          </div>{" "}
          <div className="horizon-dashboard">
            {content.dashboard.metrics.map((metric, index) => (
              <article key={index}>
                <p className="meta">
                  <RichText value={metric.label} />
                </p>{" "}
                <strong>
                  <RichText value={metric.value} />
                </strong>{" "}
                <span>
                  <RichText value={metric.detail} />
                </span>{" "}
              </article>
            ))}
          </div>
        </section>
        <CardSection
          section={content.operating}
          className="horizon-operating-grid"
          cardClass="brief-card"
        />
        <section className="band">
          <SectionHeading heading={content.currentDeadline.heading} />
          <DeadlineList deadlines={content.currentDeadline.deadlines} />
          <MotionGrid className="horizon-lanes" kind="time">
            {content.lanes.map((card, index) => (
              <EditorialCard key={index} card={card} className="brief-card" />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          <SectionHeading heading={content.watchlist.heading} />
          <RankedList items={content.watchlist.items} />
          <SectionHeading heading={content.evidenceWatchlist.heading} compact />
          <RankedList evidence items={content.evidenceWatchlist.items} />
        </section>
        <CardSection section={content.coverage} className="grid-4" />
        {content.coverage.note ? (
          <div className="status-note coverage-note">
            <p>
              <RichText value={content.coverage.note} />
            </p>
          </div>
        ) : null}
        <CardSection section={content.sources} className="grid-4" />
        <CardSection section={content.tools} className="grid-4" links />
        <CardSection
          section={content.archives}
          className="archive-grid"
          links
          cardClass="archive-card"
        />
        <section className="band">
          <SectionHeading heading={content.questions.heading} />
          <QuestionList items={content.questions.items} />
        </section>
      </EditorialFlow>
    </main>
  );
}

function CardSection({
  section,
  className,
  cardClass = "card",
  links = false,
}: {
  section: HorizonRecord["content"]["operating"];
  className: string;
  cardClass?: string;
  links?: boolean;
}) {
  return (
    <section className="band">
      {section.heading ? <SectionHeading heading={section.heading} /> : null}
      <MotionGrid className={className} kind={className === "archive-grid" ? "archive" : "signal"}>
        {section.cards.map((card, index) => (
          <EditorialCard
            key={index}
            card={card}
            className={cardClass}
            as={links || card.href ? "link" : "article"}
          />
        ))}
      </MotionGrid>
    </section>
  );
}
