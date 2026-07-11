"use client";

import { useEffect } from "react";

type MotionKind = "orientation" | "priority" | "signal" | "translation" | "time" | "archive";

const frames: Record<MotionKind, Keyframe[]> = {
  orientation: [
    { opacity: 0.82, transform: "translateY(14px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  priority: [
    { opacity: 0.86, transform: "translateY(10px) scale(0.995)" },
    { opacity: 1, transform: "translateY(0) scale(1)" },
  ],
  signal: [
    { opacity: 0.84, transform: "translateX(-12px)" },
    { opacity: 1, transform: "translateX(0)" },
  ],
  translation: [
    { opacity: 0.84, transform: "translateX(12px)" },
    { opacity: 1, transform: "translateX(0)" },
  ],
  time: [
    { opacity: 0.86, transform: "translateY(8px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  archive: [
    { opacity: 0.82, transform: "translateY(12px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
};

export function ArchetypeMotion() {
  useEffect(() => {
    const running = new Set<Animation>();
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReduced = () =>
      document.documentElement.dataset.motion === "reduced" ||
      (document.documentElement.dataset.motion !== "full" && reduceQuery.matches);

    const cancel = () => {
      running.forEach((animation) => animation.cancel());
      running.clear();
    };

    const play = (element: HTMLElement): boolean => {
      if (element.dataset.motionPlayed === "true") return true;
      if (isReduced() || document.hidden) return false;
      const kind = element.dataset.editorialMotion as MotionKind | undefined;
      if (!kind || !frames[kind]) return true;
      element.dataset.motionPlayed = "true";
      const animation = element.animate(frames[kind], {
        duration: kind === "orientation" ? 560 : 380,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
      running.add(animation);
      animation.finished.catch(() => {}).finally(() => running.delete(animation));
      return true;
    };

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-editorial-motion]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (play(entry.target as HTMLElement)) observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));

    const onMotionChange = () => {
      cancel();
      if (!isReduced()) elements.forEach((element) => observer.observe(element));
    };
    const onVisibility = () => {
      if (document.hidden) cancel();
    };
    window.addEventListener("sgs-motion-change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      cancel();
      window.removeEventListener("sgs-motion-change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
