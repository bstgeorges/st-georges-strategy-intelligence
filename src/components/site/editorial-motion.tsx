"use client";

import { useEffect } from "react";

type HomeMotionFamily =
  "orientation" | "signal" | "convergence" | "translation" | "priority" | "time";

const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

function familyFor(region: HTMLElement): HomeMotionFamily | undefined {
  const family = region.dataset.homeMotion;
  if (
    family === "orientation" ||
    family === "signal" ||
    family === "convergence" ||
    family === "translation" ||
    family === "priority" ||
    family === "time"
  ) {
    return family;
  }
  return undefined;
}

export function EditorialMotion() {
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

    const playOrientation = (region: HTMLElement) => {
      region.querySelectorAll<HTMLElement>("[data-motion-part]").forEach((part, index) => {
        track(
          part,
          [{ transform: "translateY(14px)" }, { transform: "translateY(0)" }],
          { duration: 520, delay: Math.min(index, 4) * 65 },
          "oriented",
        );
      });
    };

    const playSignal = (region: HTMLElement) => {
      region.querySelectorAll<HTMLElement>("[data-motion-source]").forEach((source, index) => {
        const provenance = source.querySelector<HTMLElement>(".sgs-kicker");
        const implication = source.querySelector<HTMLElement>("h3");
        if (provenance) {
          track(
            provenance,
            [{ transform: "translateX(-12px)" }, { transform: "translateX(0)" }],
            { duration: 310, delay: Math.min(index, 3) * 45 },
            "source-visible",
          );
        }
        if (implication) {
          track(
            implication,
            [{ transform: "translateX(10px)" }, { transform: "translateX(0)" }],
            { duration: 380, delay: 90 + Math.min(index, 3) * 45 },
            "implication-linked",
          );
        }
        source.dataset.motionState = "linked";
      });
    };

    const playConvergence = (region: HTMLElement) => {
      const heading = region.querySelector<HTMLElement>("[data-motion-part='orientation']");
      if (heading) {
        track(
          heading,
          [{ transform: "translateY(10px)" }, { transform: "translateY(0)" }],
          { duration: 420 },
          "oriented",
        );
      }

      const stageFrames: Keyframe[][] = [
        [{ transform: "translateX(-16px)" }, { transform: "translateX(0)" }],
        [{ transform: "translateX(-10px)" }, { transform: "translateX(0)" }],
        [{ transform: "translateY(12px)" }, { transform: "translateY(0)" }],
        [{ transform: "scale(0.992)" }, { transform: "scale(1)" }],
        [{ transform: "translateX(10px)" }, { transform: "translateX(0)" }],
        [{ transform: "translateX(16px)" }, { transform: "translateX(0)" }],
      ];
      region.querySelectorAll<HTMLElement>("[data-motion-stage]").forEach((stage, index) => {
        track(
          stage,
          stageFrames[index] ?? stageFrames[2],
          {
            duration: index === 3 ? 520 : 440,
            delay: 80 + index * 65,
          },
          `stage-${index + 1}-settled`,
        );
      });
      region.dataset.motionState = "converged";
    };

    const playTranslation = (region: HTMLElement) => {
      const parts = Array.from(region.querySelectorAll<HTMLElement>("[data-motion-part]"));
      parts.forEach((part, index) => {
        const kind = part.dataset.motionPart;
        const start =
          kind === "question"
            ? "translateX(14px)"
            : kind === "evidence"
              ? "translateX(20px)"
              : kind === "owner-deadline"
                ? "translateY(10px)"
                : "translateX(-8px)";
        track(
          part,
          [{ transform: start }, { transform: "translate(0, 0)" }],
          {
            duration: kind === "judgement" ? 400 : 360,
            delay: Math.min(index, 5) * 60,
          },
          `${kind ?? "translation"}-settled`,
        );
      });
      region.dataset.motionState = "translated";
    };

    const playPriority = (region: HTMLElement) => {
      region.querySelectorAll<HTMLElement>("[data-motion-rank]").forEach((item, index) => {
        const rank = item.querySelector<HTMLElement>(".sgs-rank");
        const claim = item.querySelector<HTMLElement>("a");
        if (rank) {
          track(
            rank,
            [{ transform: "scale(0.84)" }, { transform: "scale(1)" }],
            { duration: 260, delay: Math.min(index, 4) * 65 },
            "rank-settled",
          );
        }
        if (claim) {
          track(
            claim,
            [{ transform: "translateY(8px)" }, { transform: "translateY(0)" }],
            { duration: 380, delay: 45 + Math.min(index, 4) * 65 },
            "claim-settled",
          );
        }
        item.dataset.motionState = "prioritised";
      });
    };

    const playTime = (region: HTMLElement) => {
      region.querySelectorAll<HTMLElement>("[data-motion-time]").forEach((item, index) => {
        track(
          item,
          [{ transform: `translateY(${index === 2 ? 14 : 8}px)` }, { transform: "translateY(0)" }],
          { duration: 380, delay: index * 90 },
          `${item.dataset.motionTime ?? "time"}-settled`,
        );
      });
      region.dataset.motionState = "deadline-visible";
    };

    const play = (region: HTMLElement): boolean => {
      if (region.dataset.motionPlayed === "true") return true;
      if (isReduced() || document.hidden) return false;
      const family = familyFor(region);
      if (!family) return true;
      region.dataset.motionPlayed = "true";
      if (family === "orientation") playOrientation(region);
      if (family === "signal") playSignal(region);
      if (family === "convergence") playConvergence(region);
      if (family === "translation") playTranslation(region);
      if (family === "priority") playPriority(region);
      if (family === "time") playTime(region);
      return true;
    };

    const cancel = () => {
      running.forEach((animation) => animation.cancel());
      running.clear();
    };

    const regions = Array.from(document.querySelectorAll<HTMLElement>("[data-home-motion]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (play(entry.target as HTMLElement)) observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );
    regions.forEach((region) => observer.observe(region));

    const onPreference = () => {
      cancel();
      if (!isReduced()) {
        regions
          .filter((region) => region.dataset.motionPlayed !== "true")
          .forEach((region) => observer.observe(region));
      }
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
