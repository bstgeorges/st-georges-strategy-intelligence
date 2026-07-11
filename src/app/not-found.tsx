import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";

export default function NotFound() {
  return (
    <SiteShell currentPath="">
      <main id="main-content" className="sgs-not-found">
        <p className="sgs-kicker">404 · Route not found</p>
        <h1>This page is not in the brief.</h1>
        <p>
          Return to the current executive judgement, browse the signal streams, or trace an earlier
          edition through the archive.
        </p>
        <nav aria-label="Page recovery">
          <Link className="sgs-button sgs-button-primary" href="/">
            Current judgement
          </Link>
          <Link className="sgs-button sgs-button-secondary" href="/signals/">
            Explore Signals
          </Link>
          <Link className="sgs-text-link" href="/archive/">
            Browse the archive
          </Link>
        </nav>
      </main>
    </SiteShell>
  );
}
