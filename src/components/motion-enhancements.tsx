"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".band > .section-heading",
  ".band > .brief-note",
  ".band > .brief-index",
  ".band > .grid-3",
  ".band > .grid-4",
  ".signal-stream-grid > *",
  ".archive-grid > *",
  ".topic-layout > *",
  ".author-block > *",
];

export function MotionEnhancements() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.motion = reduced ? "reduced" : "full";

    if (reduced || !("IntersectionObserver" in window)) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors.join(",")));
    items.forEach((item, index) => {
      item.classList.add("motion-item");
      item.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
}

