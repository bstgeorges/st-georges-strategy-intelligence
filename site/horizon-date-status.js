(function () {
  // Shared past-date handling for Reg Horizon lists (§5 of the 10 Jul 2026 fix spec).
  // On any "live" surface (homepage module, brief page module, Reg Horizon page
  // itself) a horizon row whose date has already passed should be struck through,
  // tagged "Closed", and moved below the still-open rows — but archived editions
  // must keep their original dates untouched, so this only ever runs against the
  // current, live-rendered list, never against a frozen archive snapshot.
  function applyHorizonDateStatus(container) {
    if (!container) return;
    const todayIso = new Date().toISOString().slice(0, 10);
    const items = Array.from(container.children).filter((el) => el.tagName === "LI");
    const open = [];
    const closed = [];

    for (const li of items) {
      const time = li.querySelector("time[datetime]");
      const iso = time ? time.getAttribute("datetime") : null;
      if (iso && iso < todayIso) {
        li.classList.add("is-closed");
        const spans = li.querySelectorAll("span");
        const last = spans[spans.length - 1];
        if (last && !last.querySelector(".closed-tag")) {
          const tag = document.createElement("span");
          tag.className = "closed-tag";
          tag.textContent = "Closed";
          last.prepend(tag, " ");
        }
        closed.push(li);
      } else {
        open.push(li);
      }
    }

    for (const li of [...open, ...closed]) container.appendChild(li);
  }

  window.applyHorizonDateStatus = applyHorizonDateStatus;

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".horizon-list[data-auto-status]").forEach(applyHorizonDateStatus);
  });
})();
