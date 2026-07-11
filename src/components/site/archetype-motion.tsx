"use client";

import { useEffect } from "react";

type MotionKind = "orientation" | "priority" | "signal" | "translation" | "time" | "archive";

const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

function motionKind(element: HTMLElement): MotionKind | undefined {
  const kind = element.dataset.editorialMotion;
  if (
    kind === "orientation" ||
    kind === "priority" ||
    kind === "signal" ||
    kind === "translation" ||
    kind === "time" ||
    kind === "archive"
  ) {
    return kind;
  }
  return undefined;
}

export function ArchetypeMotion() {
  useEffect(() => {
    const running = new Set<Animation>();
    const isReduced = () => document.documentElement.dataset.motion === "reduced";

    const track = (
      element: HTMLElement,
      frames: Keyframe[],
      options: KeyframeAnimationOptions,
      settledState: string,
    ) => {
      element.dataset.motionState = "active";
      const animation = element.animate(frames, { fill: "none", easing, ...options });
      running.add(animation);
      animation.finished
        .then(() => {
          element.dataset.motionState = settledState;
        })
        .catch(() => {
          delete element.dataset.motionState;
        })
        .finally(() => running.delete(animation));
    };

    const playOrientation = (element: HTMLElement) => {
      const parts = element.querySelectorAll<HTMLElement>(
        ":scope > :is(.eyebrow, .edition-line, h1, .dek, .masthead-purpose, .button-row)",
      );
      (parts.length ? Array.from(parts) : [element]).forEach((part, index) => {
        track(
          part,
          [{ transform: "translateY(14px)" }, { transform: "translateY(0)" }],
          { duration: 520, delay: Math.min(index, 4) * 65 },
          "oriented",
        );
      });
      element.dataset.motionState = "reading-order-established";
    };

    const playSignal = (element: HTMLElement) => {
      const provenance = element.matches(".top-source")
        ? element
        : element.querySelector<HTMLElement>(":scope > :is(.meta, .top-source, time)");
      const implication = element.matches(".top-source")
        ? (element.previousElementSibling as HTMLElement | null)
        : element.querySelector<HTMLElement>(":scope > :is(a, h3, p:not(.meta))");

      if (provenance) {
        track(
          provenance,
          [{ transform: "translateX(-12px)" }, { transform: "translateX(0)" }],
          { duration: 300 },
          "source-visible",
        );
      }
      if (implication) {
        track(
          implication,
          [{ transform: "translateX(10px)" }, { transform: "translateX(0)" }],
          { duration: 380, delay: provenance ? 90 : 0 },
          "implication-linked",
        );
      }
      element.dataset.motionState = "source-linked";
    };

    const playPriority = (element: HTMLElement) => {
      const label = element.querySelector<HTMLElement>(":scope > .meta");
      const claim = element.querySelector<HTMLElement>(":scope > :is(h2, h3, a)");
      if (label) {
        track(
          label,
          [{ transform: "scale(0.88)" }, { transform: "scale(1)" }],
          { duration: 240 },
          "rank-visible",
        );
      }
      track(
        claim ?? element,
        [{ transform: "translateY(8px)" }, { transform: "translateY(0)" }],
        { duration: 360, delay: label ? 45 : 0 },
        "priority-settled",
      );
      element.dataset.motionState = "prioritised";
    };

    const playTranslation = (element: HTMLElement) => {
      const questions = element.matches("li")
        ? [element]
        : Array.from(
            element.querySelectorAll<HTMLElement>(":scope > li, :scope > div, :scope > p"),
          );
      (questions.length ? questions : [element]).forEach((question, index) => {
        track(
          question,
          [
            { transform: `translateX(${index % 2 === 0 ? 12 : 18}px)` },
            { transform: "translateX(0)" },
          ],
          { duration: 360, delay: Math.min(index, 4) * 55 },
          index === 0 ? "question-settled" : "evidence-settled",
        );
      });
      element.dataset.motionState = "question-to-evidence";
    };

    const playTime = (element: HTMLElement) => {
      const points = Array.from(
        element.querySelectorAll<HTMLElement>(":scope > li, :scope > article"),
      );
      (points.length ? points : [element]).forEach((point, index) => {
        track(
          point,
          [{ transform: "translateY(10px)" }, { transform: "translateY(0)" }],
          { duration: 360, delay: Math.min(index, 4) * 70 },
          "time-point-settled",
        );
      });
      element.dataset.motionState = "timeline-advanced";
    };

    const playArchive = (element: HTMLElement) => {
      const cards = element.matches(".archive-card")
        ? [element]
        : Array.from(element.querySelectorAll<HTMLElement>(":scope > .archive-card"));
      (cards.length ? cards : [element]).forEach((card, index) => {
        const historicalContent = Array.from(
          card.querySelectorAll<HTMLElement>(":scope > :is(h2, h3, p:not(.meta))"),
        );
        (historicalContent.length ? historicalContent : [card]).forEach((content) => {
          track(
            content,
            [{ transform: "translateY(12px)" }, { transform: "translateY(0)" }],
            { duration: 380, delay: Math.min(index, 4) * 55 },
            "history-settled",
          );
        });
        card.dataset.motionState = "archive-depth-settled";
      });
      element.dataset.motionState = "chronology-visible";
    };

    const play = (element: HTMLElement): boolean => {
      if (element.dataset.motionPlayed === "true") return true;
      if (isReduced() || document.hidden) return false;
      const kind = motionKind(element);
      if (!kind) return true;
      element.dataset.motionPlayed = "true";
      if (kind === "orientation") playOrientation(element);
      if (kind === "signal") playSignal(element);
      if (kind === "priority") playPriority(element);
      if (kind === "translation") playTranslation(element);
      if (kind === "time") playTime(element);
      if (kind === "archive") playArchive(element);
      return true;
    };

    const cancel = () => {
      running.forEach((animation) => animation.cancel());
      running.clear();
    };

    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>("[data-editorial-motion]"),
    );
    const elements = candidates.filter((element) => {
      const ancestor = element.parentElement?.closest<HTMLElement>("[data-editorial-motion]");
      return !ancestor || motionKind(ancestor) !== motionKind(element);
    });
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
      if (!isReduced()) {
        elements
          .filter((element) => element.dataset.motionPlayed !== "true")
          .forEach((element) => observer.observe(element));
      }
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
