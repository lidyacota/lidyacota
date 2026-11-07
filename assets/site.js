(() => {
  "use strict";

  const panels = Array.from(document.querySelectorAll("section.panel"));
  const menu = document.querySelector(".sections");
  if (!panels.length || !menu) return;

  const links = menu.querySelectorAll("a[data-target]");

  function markCurrent(panel, value) {
    for (const link of links) {
      if (link.dataset.target === panel.id) link.setAttribute("aria-current", value);
      else link.removeAttribute("aria-current");
    }
  }

  // Each section page is complete in its HTML. Its links and fragments are native.
  if (panels.length === 1) {
    markCurrent(panels[0], "page");
    return;
  }

  // Both homepages still accept their original section and heading bookmarks.
  function showHomeSection() {
    const hash = location.hash.slice(1);
    const target = document.getElementById(hash === "literatura" ? "literatura-digital" : hash);
    const linkedPanel = target?.closest("section.panel");
    const skipToContent = hash === "contenido" || hash === "content";
    const active = linkedPanel || (skipToContent && panels.find(panel => !panel.hidden)) || panels[0];

    for (const panel of panels) panel.hidden = panel !== active;
    markCurrent(active, "location");

    // The browser may have tried to scroll to the bookmark while its panel was hidden.
    if (linkedPanel) {
      (target === linkedPanel ? menu : target).scrollIntoView({ block: "start" });
    }
  }

  window.addEventListener("hashchange", showHomeSection);
  showHomeSection();
})();
