import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";

import {
  EditorialCard,
  EditorialFlow,
  Masthead,
  MotionGrid,
  RankedList,
  SectionHeading,
} from "./editorial-primitives";

type SignalsRecord = Extract<AuthoredEditorialRecord, { kind: "signals-index" }>;

export function SignalsIndexArchetype({ record }: { record: SignalsRecord }) {
  const { content } = record;
  return (
    <main id="main-content" tabIndex={-1} className="sgs-document-main page">
      <EditorialFlow>
        <Masthead masthead={content.masthead} />
        <section className="band">
          {content.streams.heading ? <SectionHeading heading={content.streams.heading} /> : null}
          <MotionGrid className="grid-4 signal-stream-grid" kind="priority">
            {content.streams.cards.map((card, index) => (
              <EditorialCard
                key={index}
                card={card}
                className={`signal-card${card.featured ? " featured" : ""}`}
                linkTitle
              />
            ))}
          </MotionGrid>
        </section>
        <CardSection section={content.operatingModel} className="grid-4" />
        <section className="band">
          <SectionHeading heading={content.priorities.heading} />
          <RankedList items={content.priorities.items} />
        </section>
        <CardSection section={content.topicArchives} className="grid-4" />
        <CardSection section={content.coverage} className="grid-4" />
        <CardSection section={content.archiveCadence} className="archive-grid" />
        <CardSection section={content.liveChannels} className="archive-grid" links />
        <CardSection section={content.archiveDirectories} className="archive-grid" links />
      </EditorialFlow>
    </main>
  );
}

function CardSection({
  section,
  className,
  links = false,
}: {
  section: SignalsRecord["content"]["operatingModel"];
  className: string;
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
            className={className === "archive-grid" ? "archive-card" : "card"}
            as={links || card.href ? "link" : "article"}
          />
        ))}
      </MotionGrid>
    </section>
  );
}
