"use client";

import { useEffect, useState } from "react";

type MotionMode = "full" | "reduced";

const preferenceKey = "sgs-motion-preference";

function storedMode(): MotionMode | null {
  try {
    const stored = window.localStorage.getItem(preferenceKey);
    if (stored === "full" || stored === "reduced") return stored;
  } catch {
    // Storage is optional.
  }
  return null;
}

function applyMotionMode(mode: MotionMode, source: "system" | "user") {
  document.documentElement.dataset.motion = mode;
  document.documentElement.dataset.motionSource = source;
  window.dispatchEvent(new CustomEvent("sgs-motion-change", { detail: { mode, source } }));
}

export function MotionControls() {
  const [mode, setMode] = useState<MotionMode>("full");

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const synchronise = () => {
      const stored = storedMode();
      const nextMode = stored ?? (reduceQuery.matches ? "reduced" : "full");
      applyMotionMode(nextMode, stored ? "user" : "system");
      setMode(nextMode);
    };

    synchronise();
    reduceQuery.addEventListener("change", synchronise);
    return () => reduceQuery.removeEventListener("change", synchronise);
  }, []);

  const updateMode = (nextMode: MotionMode) => {
    setMode(nextMode);
    applyMotionMode(nextMode, "user");
    try {
      window.localStorage.setItem(preferenceKey, nextMode);
    } catch {
      // Storage is optional.
    }
  };

  return (
    <fieldset className="sgs-motion-controls">
      <legend>Motion</legend>
      {(["full", "reduced"] as const).map((value) => (
        <label key={value}>
          <input
            type="radio"
            name="site-motion"
            value={value}
            checked={mode === value}
            onChange={() => updateMode(value)}
          />
          <span>{value === "full" ? "Full" : "Reduced"}</span>
        </label>
      ))}
    </fieldset>
  );
}
