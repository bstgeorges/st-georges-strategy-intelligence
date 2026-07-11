import Link from "next/link";

import {
  executiveRoles,
  homeEdition,
  homeTopicStreams,
  homeTopSignals,
  publicationUses,
  trustSignals,
} from "@/content/editorial/home";

import { EditorialMotion } from "./editorial-motion";
import { SiteShell } from "./site-shell";

const handoffSteps = [
  {
    label: "Public sources",
    title: "FCA · ESAs and ESRB · OFSI · Bank of England · ICO",
    summary: "Official sources first, secondary reporting labelled.",
  },
  {
    label: "Eight signal streams",
    title: "AI · Resilience · Third-party · Markets · Financial crime · Cyber · Technology · Data",
    summary: "Eight streams, ranked and source-backed.",
  },
  {
    label: "This week's pattern",
    title: homeEdition.pattern,
    summary: "The judgement, the question, and the ask.",
  },
  {
    label: "Executive judgement",
    title: homeEdition.judgement,
    summary: "Built to be used, not just read.",
  },
  {
    label: "Board question",
    title: homeEdition.boardQuestion,
    summary: "A board question built to travel straight into the pack.",
  },
  {
    label: "Evidence ask",
    title: homeEdition.evidenceAsk,
    summary: "What to ask for.",
  },
] as const;

export function HomePage() {
  return (
    <SiteShell currentPath="/">
      <main id="main-content" className="sgs-main" tabIndex={-1}>
        <section className="sgs-home-hero" aria-labelledby="home-title">
          <div className="sgs-hero-orientation" data-home-motion="orientation">
            <p className="sgs-edition" data-motion-part="context">
              Weekly risk intelligence · {homeEdition.week}
            </p>
            <p className="sgs-kicker" data-motion-part="context">
              {homeEdition.eyebrow}
            </p>
            <h1 id="home-title">{homeEdition.title}</h1>
            <p className="sgs-hero-copy" data-motion-part="explanation">
              {homeEdition.description}
            </p>
            <div className="sgs-action-row" data-motion-part="action">
              <Link className="sgs-button sgs-button-primary" href="/brief/" prefetch={false}>
                Read this week&apos;s brief
              </Link>
              <Link className="sgs-button sgs-button-secondary" href="/signals/" prefetch={false}>
                Explore Signals
              </Link>
            </div>
          </div>
          <aside
            className="sgs-executive-glance"
            aria-labelledby="glance-title"
            data-home-motion="translation"
          >
            <div className="sgs-glance-heading" data-motion-part="judgement">
              <div>
                <p className="sgs-kicker">This week in three lines</p>
                <h2 id="glance-title">The judgement, the question, and the ask</h2>
              </div>
              <span>{homeEdition.editionDate}</span>
            </div>
            <p className="sgs-glance-pattern" data-motion-part="judgement">
              {homeEdition.pattern}
            </p>
            <dl>
              <div data-motion-part="judgement">
                <dt>The judgement</dt>
                <dd>{homeEdition.judgement}</dd>
              </div>
              <div data-motion-part="question">
                <dt>The board question</dt>
                <dd>{homeEdition.boardQuestion}</dd>
              </div>
              <div data-motion-part="evidence">
                <dt>What to ask for</dt>
                <dd>{homeEdition.evidenceAsk}</dd>
              </div>
            </dl>
            <Link
              className="sgs-deadline-link"
              href={homeEdition.nearestDeadline.href}
              prefetch={false}
              data-motion-part="owner-deadline"
            >
              <span>Nearest deadline</span>
              <strong>
                {homeEdition.nearestDeadline.date} — {homeEdition.nearestDeadline.title}
              </strong>
              <small>{homeEdition.nearestDeadline.summary}</small>
            </Link>
          </aside>
        </section>

        <section
          className="sgs-handoff"
          aria-labelledby="handoff-title"
          data-home-motion="convergence"
        >
          <div className="sgs-section-heading" data-motion-part="orientation">
            <div>
              <p className="sgs-kicker">Signal to action</p>
              <h2 id="handoff-title">How public information becomes executive action</h2>
            </div>
            <p>
              The Virtual Officer is not a news feed. It carries a dated source through judgement,
              challenge, evidence, ownership, and the archived decision trail.
            </p>
          </div>
          <ol className="sgs-handoff-list">
            {handoffSteps.map((step, index) => (
              <li key={step.label} data-motion-stage={index + 1}>
                <span className="sgs-step-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{step.label}</p>
                  <h3>{step.title}</h3>
                  <span>{step.summary}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="sgs-top-five"
          aria-labelledby="top-five-title"
          data-home-motion="priority"
        >
          <div className="sgs-section-heading" data-motion-part="orientation">
            <div>
              <p className="sgs-kicker">Latest brief / {homeEdition.week}</p>
              <h2 id="top-five-title">{homeEdition.briefTitle}</h2>
            </div>
            <p>{homeEdition.briefStandfirst}</p>
          </div>
          <ol className="sgs-ranked-list">
            {homeTopSignals.map((signal) => (
              <li key={signal.rank} data-motion-rank={signal.rank}>
                <span className="sgs-rank">{String(signal.rank).padStart(2, "0")}</span>
                <Link href={signal.href} prefetch={false}>
                  {signal.title}
                </Link>
                <span>{signal.meta}</span>
              </li>
            ))}
          </ol>
          <Link className="sgs-text-link" href="/brief/" prefetch={false}>
            Read the full brief <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="sgs-streams" aria-labelledby="streams-title" data-home-motion="signal">
          <div className="sgs-section-heading" data-motion-part="orientation">
            <div>
              <p className="sgs-kicker">Signals library</p>
              <h2 id="streams-title">Eight streams, ranked and source-backed</h2>
            </div>
            <p>
              Each stream carries a Top 5 shortlist and five more source-backed rows, with control
              prompts for the questions worth testing internally.
            </p>
          </div>
          <div className="sgs-stream-grid">
            {homeTopicStreams.map((stream, index) => (
              <Link key={stream.slug} href={stream.href} prefetch={false} data-motion-source>
                <span className="sgs-step-number">{String(index + 1).padStart(2, "0")}</span>
                <p className="sgs-kicker">{stream.label}</p>
                <h3>{stream.title}</h3>
                <span>{stream.summary}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sgs-horizon" aria-labelledby="horizon-title" data-home-motion="time">
          <div className="sgs-section-heading" data-motion-part="orientation">
            <div>
              <p className="sgs-kicker">Reg Horizon</p>
              <h2 id="horizon-title">What is coming, and who needs to own it</h2>
            </div>
            <p>
              A weekly public-source scan of deadlines and consultations, turned into an owner
              prompt before the date arrives.
            </p>
          </div>
          <div className="sgs-horizon-grid">
            <Link href="/regulatory-horizon/" prefetch={false} data-motion-time="current">
              <span>This edition</span>
              <strong>6 material signals</strong>
              <p>Ranked items requiring business-impact triage.</p>
            </Link>
            <Link href="/regulatory-horizon/" prefetch={false} data-motion-time="themes">
              <span>Active themes</span>
              <strong>3 of 8 tracked themes</strong>
              <p>Digital money, customer outcomes, and market plumbing.</p>
            </Link>
            <Link href="/regulatory-horizon/" prefetch={false} data-motion-time="deadline">
              <span>Next deadline</span>
              <strong>14 Aug — needs an owner</strong>
              <p>Listing-rules consultation still open to influence.</p>
            </Link>
          </div>
        </section>

        <section className="sgs-audience" aria-labelledby="audience-title" data-motion-sequence>
          <div className="sgs-section-heading" data-motion-step>
            <div>
              <p className="sgs-kicker">Your starting point</p>
              <h2 id="audience-title">Enter through the risk you oversee</h2>
            </div>
            <p>
              Each route is grounded in the current brief, committee library, or the named
              dossier&apos;s approved audience and evidence context. Start there, then follow the
              source trail.
            </p>
          </div>
          <ul className="sgs-role-grid" aria-label="Role-based intelligence starting points">
            {executiveRoles.map((entry) => (
              <li key={entry.role} data-motion-step>
                <Link href={entry.href} prefetch={false}>
                  <p className="sgs-kicker">{entry.role}</p>
                  <h3>{entry.startLabel}</h3>
                  <span>{entry.summary}</span>
                  <strong>
                    Open starting point <span aria-hidden="true">→</span>
                  </strong>
                </Link>
              </li>
            ))}
          </ul>
          <div className="sgs-use-grid">
            {publicationUses.map((use) => (
              <article key={use.label} data-motion-step>
                <p className="sgs-kicker">{use.label}</p>
                <p>{use.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sgs-trust" aria-labelledby="trust-title" data-motion-sequence>
          <div className="sgs-section-heading" data-motion-step>
            <div>
              <p className="sgs-kicker">Why trust it</p>
              <h2 id="trust-title">
                Source discipline, archived judgement, two decades of practice
              </h2>
            </div>
            <p>
              The credibility comes from explicit judgement, not automation: primary sources are
              preferred, secondary reporting is labelled, and every issue is archived so the
              reasoning stays checkable.
            </p>
          </div>
          <div className="sgs-trust-grid">
            {trustSignals.map((item) => (
              <article key={item.label} data-motion-step>
                <p className="sgs-kicker">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <Link className="sgs-text-link" href="/about/" prefetch={false}>
            About The Virtual Officer <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
      <EditorialMotion />
    </SiteShell>
  );
}
