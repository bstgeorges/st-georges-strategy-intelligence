"use client";

import { useEffect, useState } from "react";

type MotionMode = "full" | "reduced";

const preferenceKey = "sgs-motion-preference";

function resolveInitialMode(): MotionMode {
  try {
    const stored = window.localStorage.getItem(preferenceKey);
    if (stored === "full" || stored === "reduced") return stored;
  } catch {
    // Storage is optional.
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full";
}

function applyMotionMode(mode: MotionMode) {
  document.documentElement.dataset.motion = mode;
  window.dispatchEvent(new CustomEvent("sgs-motion-change", { detail: mode }));
}

export function MotionControls() {
  const [mode, setMode] = useState<MotionMode>("full");

  useEffect(() => {
    const initialMode = resolveInitialMode();
    applyMotionMode(initialMode);
    queueMicrotask(() => setMode(initialMode));
  }, []);

  const updateMode = (nextMode: MotionMode) => {
    setMode(nextMode);
    applyMotionMode(nextMode);
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
