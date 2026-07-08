(function () {
  const page = document.querySelector("[data-ai-signals-url]");
  const dataUrl = page ? page.getAttribute("data-ai-signals-url") : "../data/ai-signals.json";
  const sectionStyles = {
    model: "--section-color: var(--model); --section-fg: var(--model-fg);",
    feature: "--section-color: var(--feature); --section-fg: var(--feature-fg);",
    industry: "--section-color: var(--industry); --section-fg: var(--industry-fg);",
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderCard(card) {
    return `<article class="card">
      <div class="card-top">
        <h2 class="card-title">${escapeHtml(card.title)}</h2>
        <span class="badge">${escapeHtml(card.badge)}</span>
      </div>
      <p class="card-body">${escapeHtml(card.body)}</p>
      <div class="card-meta">
        <span>${escapeHtml(card.sourceName)}</span>
        <span>${escapeHtml(card.date)}</span>
      </div>
      <div class="source-row">
        <a href="${escapeHtml(card.source && card.source.url)}">${escapeHtml(card.source && card.source.label)}</a>
      </div>
    </article>`;
  }

  function renderSection(section) {
    const cards = Array.isArray(section.cards) ? section.cards : [];
    return `<section class="signal-section" data-section="${escapeHtml(section.id)}" style="${sectionStyles[section.id] || ""}">
      <p class="section-label">
        <span>${escapeHtml(section.order)} / ${escapeHtml(section.label)}</span>
        <span id="count-${escapeHtml(section.id)}">${cards.length} tracked</span>
      </p>
      <div class="grid" id="list-${escapeHtml(section.id)}">
        ${cards.map(renderCard).join("")}
      </div>
    </section>`;
  }

  function setFilter(filter) {
    document.querySelectorAll(".tab").forEach(function (tab) {
      const isActive = tab.dataset.filter === filter;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    document.querySelectorAll(".signal-section").forEach(function (section) {
      section.classList.toggle("hidden", filter !== "all" && section.dataset.section !== filter);
    });
  }

  function updateTabs(sections) {
    const counts = sections.reduce(
      function (accumulator, section) {
        accumulator[section.id] = Array.isArray(section.cards) ? section.cards.length : 0;
        accumulator.all += accumulator[section.id];
        return accumulator;
      },
      { all: 0 },
    );

    document.querySelectorAll(".tab").forEach(function (tab) {
      const count = counts[tab.dataset.filter] || 0;
      const label = tab.querySelector("span");
      if (label) label.textContent = count;
    });
  }

  function render(data) {
    const sections = Array.isArray(data.sections) ? data.sections : [];
    const editionLine = document.getElementById("edition-line");
    const editionDescriptor = document.getElementById("edition-descriptor");
    const feed = document.getElementById("ai-signals-feed");

    if (editionLine && data.edition && data.edition.line) {
      editionLine.textContent = data.edition.line;
    }

    if (editionDescriptor && data.edition && data.edition.descriptor) {
      editionDescriptor.textContent = data.edition.descriptor;
    }

    if (feed) {
      feed.innerHTML = sections.map(renderSection).join("");
    }

    updateTabs(sections);

    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setFilter(tab.dataset.filter);
      });
    });
  }

  fetch(dataUrl, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error(`Could not load ${dataUrl}`);
      return response.json();
    })
    .then(render)
    .catch(function () {
      const feed = document.getElementById("ai-signals-feed");
      if (feed) {
        feed.innerHTML = '<p class="load-state">AI Signals could not load. Check dashboard/data/ai-signals.json before publishing.</p>';
      }
    });
})();
