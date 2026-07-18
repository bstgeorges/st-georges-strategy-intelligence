(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const path = window.location.pathname.replace(/index\.html$/, "");
  const page = path === "/" || path.endsWith("/site/") ? "home" : path.split("/").filter(Boolean).at(-1);
  document.documentElement.classList.add("js-motion", `page-${page || "home"}`);

  const observeOnce = (elements, onEnter, options = {}) => {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element, index) => onEnter(element, index));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onEnter(entry.target, elements.indexOf(entry.target));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%", ...options });
    elements.forEach((element) => observer.observe(element));

    // Content must never remain hidden if observer delivery is suspended or blocked.
    window.setTimeout(() => {
      elements.forEach((element, index) => {
        if (element.classList.contains("is-visible")) return;
        onEnter(element, index);
        observer.unobserve(element);
      });
    }, 3500);
  };

  if (page === "home") {
    const metrics = Array.from(document.querySelectorAll(".hero-metrics > div"));
    metrics.forEach((metric, index) => {
      metric.classList.add("hero-stat");
      metric.style.setProperty("--reveal-delay", `${index * 80}ms`);
      const value = metric.querySelector("strong");
      const end = Number(value?.textContent);
      if (!reducedMotion && value && Number.isFinite(end) && (index === 1 || index === 2)) {
        value.textContent = "0";
        setTimeout(() => {
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / 500, 1);
            value.textContent = String(Math.round(end * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, 220 + index * 80);
      }
    });
    requestAnimationFrame(() => metrics.forEach((metric) => metric.classList.add("is-visible")));

    const sections = Array.from(document.querySelectorAll("main .home-judgement, main .band"));
    sections.forEach((section) => {
      const children = Array.from(section.querySelectorAll(":scope > .section-heading, :scope > .judgement-header, :scope > .judgement-copy, :scope > ol, :scope > ul, :scope > .grid-3, :scope > .button-row"));
      (children.length ? children : [section]).forEach((child, index) => {
        child.classList.add("js-reveal");
        child.style.setProperty("--reveal-delay", `${index * 80}ms`);
      });
      observeOnce(children.length ? children : [section], (target) => target.classList.add("is-visible"));
    });

    const banner = document.querySelector(".site-banner");
    const hero = document.querySelector(".hero");
    if (banner && hero && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => banner.classList.toggle("is-past-hero", !entry.isIntersecting), { threshold: 0.02 }).observe(hero);
    }
  }

  if (page === "brief") {
    const progress = document.createElement("div");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");
    document.querySelector(".site-banner")?.append(progress);
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--reading-progress", `${available > 0 ? Math.min(scrollY / available, 1) * 100 : 0}%`);
    };
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress, { passive: true });
    updateProgress();

    const label = document.createElement("div");
    label.className = "reading-section-label";
    label.setAttribute("aria-live", "polite");
    document.body.append(label);
    const sections = Array.from(document.querySelectorAll("main > section.band"));
    const names = new Map(sections.map((section) => [section, section.querySelector(".eyebrow")?.textContent.trim() || "Weekly brief"]));
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) label.textContent = names.get(entry.target); });
      }, { rootMargin: "-20% 0px -68%" });
      sections.forEach((section) => sectionObserver.observe(section));
    }
  }

  if (page === "signals") {
    const topicCards = Array.from(document.querySelectorAll(".signal-stream-grid .signal-card")).slice(0, 8);
    topicCards.forEach((card, index) => {
      card.classList.add("topic-card-motion", "js-reveal");
      card.style.setProperty("--reveal-delay", `${index * 60}ms`);
    });
    if (topicCards.length) observeOnce(topicCards, (card) => card.classList.add("is-visible"), { threshold: 0.08 });

    const stack = document.querySelector(".brief-index");
    if (stack) {
      const canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      canvas.classList.add("signal-connectors");
      canvas.setAttribute("aria-hidden", "true");
      document.body.append(canvas);
      const clear = () => canvas.replaceChildren();
      stack.querySelectorAll("li").forEach((item) => {
        item.addEventListener("mouseenter", () => {
          clear();
          const slug = item.querySelector("a")?.getAttribute("href")?.split("/")[0];
          const card = document.querySelector(`.signal-card[data-topic="${slug}"]`);
          if (!card) return;
          const a = item.getBoundingClientRect();
          const b = card.getBoundingClientRect();
          const line = document.createElementNS(canvas.namespaceURI, "line");
          line.setAttribute("x1", String(a.right)); line.setAttribute("y1", String(a.top + a.height / 2 + scrollY));
          line.setAttribute("x2", String(b.left)); line.setAttribute("y2", String(b.top + b.height / 2 + scrollY));
          canvas.append(line);
        });
        item.addEventListener("mouseleave", clear);
      });
    }
  }

  if (page === "regulatory-horizon") {
    const enhanceHorizon = () => {
      const rows = Array.from(document.querySelectorAll(".horizon-list li"));
      const dated = rows.map((row) => ({ row, date: new Date(row.querySelector("time")?.dateTime || "") })).filter((item) => !Number.isNaN(item.date.valueOf()));
      const maxDays = Math.max(1, ...dated.map(({ date }) => Math.max(0, (date - new Date()) / 86400000)));
      dated.forEach(({ row, date }) => {
        const days = Math.max(0, (date - new Date()) / 86400000);
        row.style.setProperty("--urgency", `${Math.max(8, (1 - days / maxDays) * 100)}%`);
        row.classList.add(days <= 30 ? "is-near-term" : "is-far-term");
      });
      document.querySelectorAll("#horizon-watch-themes .card").forEach((card) => {
        if (/^active/i.test(card.querySelector(".meta")?.textContent.trim() || "")) card.classList.add("is-active-theme");
      });
    };
    enhanceHorizon();
    new MutationObserver(enhanceHorizon).observe(document.querySelector("main"), { childList: true, subtree: true });
  }

  if (page === "committee-questions") {
    document.querySelectorAll(".committee-question-card h3").forEach((question) => {
      const copy = document.createElement("button");
      copy.className = "question-copy";
      copy.type = "button";
      copy.textContent = "Copy ↗";
      copy.setAttribute("aria-label", "Copy question");
      copy.addEventListener("click", async () => {
        await navigator.clipboard.writeText(question.textContent.trim());
        copy.textContent = "Copied ✓";
        setTimeout(() => { copy.textContent = "Copy ↗"; }, 1200);
      });
      question.after(copy);
    });
    const headings = Array.from(document.querySelectorAll(".committee-domain .section-heading"));
    headings.forEach((heading) => heading.classList.add("theme-rule"));
    observeOnce(headings, (heading) => heading.classList.add("is-visible"));
  }

  if (page === "archive") {
    const grid = document.querySelector("main .archive-grid");
    if (grid) {
      grid.classList.add("archive-timeline");
      const entries = Array.from(grid.children);
      entries.forEach((entry, index) => {
        entry.classList.add("js-reveal");
        entry.style.setProperty("--reveal-delay", `${index * 70}ms`);
      });
      observeOnce(entries, (entry) => entry.classList.add("is-visible"), { threshold: 0.18, rootMargin: "0px 0px -4%" });
    }
  }

  if (page === "about") {
    document.body.classList.add("about-fade");
    requestAnimationFrame(() => document.body.classList.add("is-visible"));
  }
})();
