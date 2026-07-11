import Link from "next/link";
import type { ReactNode } from "react";

import { primaryNavigation, siteDisclaimer } from "@/content/editorial/home";

import { MobileNavigation } from "./mobile-navigation";
import { MotionControls } from "./motion-controls";

export function SiteShell({ children, currentPath }: { children: ReactNode; currentPath: string }) {
  return (
    <div className="sgs-site">
      <header className="sgs-header">
        <div className="sgs-header-inner">
          <Link
            className="sgs-wordmark"
            href="/"
            prefetch={false}
            aria-label="St Georges Strategy home"
          >
            <span className="sgs-mark" aria-hidden="true">
              SGS
            </span>
            <span>St Georges Strategy</span>
          </Link>
          <nav className="sgs-desktop-nav" aria-label="Primary">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                aria-current={item.href === currentPath ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <MotionControls />
          <MobileNavigation items={primaryNavigation} currentPath={currentPath} />
        </div>
      </header>
      {children}
      <footer className="sgs-footer">
        <div className="sgs-footer-inner">
          <div>
            <p className="sgs-kicker">The Virtual Officer</p>
            <h2>Weekly risk intelligence for financial-services leaders.</h2>
          </div>
          <div className="sgs-footer-links">
            <Link href="/brief/" prefetch={false}>
              Read the latest brief
            </Link>
            <Link href="/archive/" prefetch={false}>
              Trace the archive
            </Link>
            <Link href="/about/" prefetch={false}>
              Method and author
            </Link>
          </div>
          <div className="sgs-footer-meta">
            <p>
              Written by Ben St Georges, drawing on over two decades of financial-services risk,
              regulation, strategy, and transformation experience.
            </p>
            <p>
              <a href="mailto:ben@stgeorgesstrategy.com">ben@stgeorgesstrategy.com</a>
              {" · "}
              <a href="https://www.linkedin.com/in/benstgeorges/" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
            <p>{siteDisclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
