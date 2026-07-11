"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress({ label = "Reading progress" }: { label?: string }) {
  const progressRef = useRef<HTMLProgressElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = progressRef.current;
      if (!progress) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.value = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside className="sgs-reading-progress-region" aria-label={label}>
      <progress
        ref={progressRef}
        className="sgs-reading-progress"
        max="1"
        value="0"
        aria-label={label}
      />
    </aside>
  );
}
