"use client";

import { useEffect } from "react";

export function EditorialMotion() {
  useEffect(() => {
    const running = new Set<Animation>();
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = () =>
      document.documentElement.dataset.motion === "reduced" ||
      (document.documentElement.dataset.motion !== "full" && reduceQuery.matches);

    const cancel = () => {
      running.forEach((animation) => animation.cancel());
      running.clear();
    };

    const play = (region: Element): boolean => {
      if (region.hasAttribute("data-motion-played")) return true;
      if (reduced() || document.hidden) return false;
      region.setAttribute("data-motion-played", "");
      region.querySelectorAll<HTMLElement>("[data-motion-step]").forEach((step, index) => {
        const animation = step.animate(
          [
            { opacity: 0.84, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 520,
            delay: Math.min(index, 5) * 65,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
        );
        running.add(animation);
        animation.finished.catch(() => {}).finally(() => running.delete(animation));
      });
      return true;
    };

    const regions = Array.from(document.querySelectorAll("[data-motion-sequence]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (play(entry.target)) observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );
    regions.forEach((region) => observer.observe(region));

    const onPreference = () => {
      cancel();
      if (!reduced()) regions.forEach((region) => observer.observe(region));
    };
    const onVisibility = () => {
      if (document.hidden) cancel();
    };
    window.addEventListener("sgs-motion-change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      cancel();
      window.removeEventListener("sgs-motion-change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
