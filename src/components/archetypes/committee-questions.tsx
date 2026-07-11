import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";

import {
  EditorialCard,
  EditorialFlow,
  Masthead,
  MotionGrid,
  RichText,
  SectionHeading,
} from "./editorial-primitives";

type CommitteeRecord = Extract<AuthoredEditorialRecord, { kind: "committee-questions" }>;

export function CommitteeQuestionsArchetype({ record }: { record: CommitteeRecord }) {
  return (
    <main id="main-content" tabIndex={-1} className="sgs-document-main page">
      <EditorialFlow>
        <Masthead masthead={record.content.masthead} />
        <section className="band">
          <SectionHeading heading={record.content.introduction} />
        </section>
        {record.content.sections.map((section, sectionIndex) => (
          <section className="band" key={sectionIndex}>
            {section.heading ? <SectionHeading heading={section.heading} /> : null}
            <MotionGrid className="grid-2" kind="translation">
              {section.cards.map((card, index) => (
                <EditorialCard key={index} card={card} className="brief-card" />
              ))}
            </MotionGrid>
          </section>
        ))}
        <section className="band">
          <div className="status-note">
            <p>
              <RichText value={record.content.status} />
            </p>
          </div>
        </section>
      </EditorialFlow>
    </main>
  );
}
