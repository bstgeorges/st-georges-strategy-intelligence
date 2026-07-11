(() => {
  const concepts = [...document.querySelectorAll("[data-direction]")];
  const directionLinks = [...document.querySelectorAll("[data-direction-link]")];
  const motionInputs = [...document.querySelectorAll('input[name="motion"]')];
  const streamButtons = [...document.querySelectorAll("[data-stream]")];
  const lensRecords = [...document.querySelectorAll("[data-lens-record]")];
  const runningAnimations = new Set();
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const validDirections = new Set(concepts.map((concept) => concept.dataset.direction));
  const preferenceKey = "sgs-business-prototype-motion";

  let explicitMotionPreference = null;

  try {
    const savedPreference = window.localStorage.getItem(preferenceKey);
    if (savedPreference === "full" || savedPreference === "reduced") {
      explicitMotionPreference = savedPreference;
    }
  } catch {
    // Storage is optional; the visible control and system preference remain authoritative.
  }

  function resolvedMotion() {
    return explicitMotionPreference ?? (motionQuery.matches ? "reduced" : "full");
  }

  function setMotionControl(value) {
    const input = motionInputs.find((candidate) => candidate.value === value);
    if (input) input.checked = true;
    document.documentElement.dataset.motion = value;
  }

  function track(animation) {
    runningAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => runningAnimations.delete(animation));
    return animation;
  }

  function cancelAnimations() {
    runningAnimations.forEach((animation) => animation.cancel());
    runningAnimations.clear();
  }

  function motionIsReduced() {
    return resolvedMotion() === "reduced";
  }

  function animateHandoff() {
    cancelAnimations();
    if (motionIsReduced() || document.hidden) return;

    document.querySelectorAll(".handoff-step").forEach((step, index) => {
      track(
        step.animate(
          [
            { opacity: 0.84, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 540,
            delay: index * 65,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
        ),
      );
    });
  }

  function animateLens() {
    if (motionIsReduced() || document.hidden) return;
    const readout = document.querySelector(".lens-readout");
    const activeRecord = lensRecords.find((record) => !record.hidden);
    if (!readout || !activeRecord) return;

    track(
      activeRecord.animate(
        [
          { opacity: 0.84, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      ),
    );
  }

  function selectStream(stream) {
    streamButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.stream === stream));
    });
    lensRecords.forEach((record) => {
      record.hidden = record.dataset.lensRecord !== stream;
    });
    animateLens();
  }

  function selectDirection(direction, { updateHash = false, moveViewport = false } = {}) {
    const nextDirection = validDirections.has(direction) ? direction : "spine";

    concepts.forEach((concept) => {
      concept.hidden = concept.dataset.direction !== nextDirection;
    });
    directionLinks.forEach((link) => {
      if (link.dataset.directionLink === nextDirection) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (updateHash) history.replaceState(null, "", `#${nextDirection}`);
    if (moveViewport) document.querySelector("#prototype-content")?.scrollIntoView();

    if (nextDirection === "spine") animateHandoff();
    if (nextDirection === "observatory") animateLens();
  }

  directionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      selectDirection(link.dataset.directionLink, { updateHash: true, moveViewport: true });
    });
  });

  streamButtons.forEach((button) => {
    button.addEventListener("click", () => selectStream(button.dataset.stream));
  });

  document.querySelector('[data-replay="handoff"]')?.addEventListener("click", animateHandoff);

  motionInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      explicitMotionPreference = input.value;
      setMotionControl(input.value);
      try {
        window.localStorage.setItem(preferenceKey, input.value);
      } catch {
        // Storage is optional.
      }

      cancelAnimations();
      if (input.value === "full") {
        const activeDirection = concepts.find((concept) => !concept.hidden)?.dataset.direction;
        if (activeDirection === "spine") animateHandoff();
        if (activeDirection === "observatory") animateLens();
      }
    });
  });

  motionQuery.addEventListener("change", () => {
    if (explicitMotionPreference === null) setMotionControl(resolvedMotion());
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimations();
  });

  window.addEventListener("hashchange", () => {
    selectDirection(window.location.hash.slice(1));
  });

  setMotionControl(resolvedMotion());
  selectStream("ai");
  selectDirection(window.location.hash.slice(1));

  window.prototypeMotion = {
    cancel: cancelAnimations,
    finish() {
      runningAnimations.forEach((animation) => animation.finish());
    },
    get mode() {
      return resolvedMotion();
    },
  };
})();
