(() => {
  "use strict";

  // Without JavaScript, every section and its native anchor is available.
  const panels = Array.from(document.querySelectorAll("section.panel"));
  const menu = document.querySelector(".sections");
  if (!panels.length || !menu) return;

  const links = Array.from(menu.querySelectorAll("a[data-target]"));
  const home = document.querySelector(".hero");
  const aliases = { literatura: "literatura-digital" };

  function showPanel() {
    const hash = location.hash.slice(1);
    const target = document.getElementById(aliases[hash] || hash);
    const linkedPanel = target?.closest("section.panel");
    const currentPanel = panels.find(panel => !panel.hidden);
    const isSkipLink = hash === "contenido" || hash === "content";
    const active = linkedPanel || (isSkipLink && currentPanel) || panels[0];

    for (const panel of panels) panel.hidden = panel !== active;
    for (const link of links) {
      if (link.dataset.target === active.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }

    // A bookmarked section may have been hidden when native fragment navigation ran.
    if (linkedPanel) {
      (target === linkedPanel ? menu : target).scrollIntoView({ block: "start" });
    } else if (!hash || target === home) {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", showPanel);
  showPanel();
})();
