(() => {
  "use strict";

  const tools = document.querySelector(".share-tools");
  const menu = document.querySelector(".sections");
  if (!tools || !menu) return;

  const button = tools.querySelector(".share-button");
  const status = tools.querySelector(".share-status");
  const field = tools.querySelector(".share-url");
  const links = Array.from(menu.querySelectorAll("a[data-target]"));
  if (!button || !status || !field || !links.length) return;

  const english = document.documentElement.lang.startsWith("en");
  const label = english ? "Share" : "Compartir";
  const fieldLabel = english ? "Section link" : "Enlace del apartado";

  function activeLink() {
    return links.find(link => link.hasAttribute("aria-current")) ||
      links.find(link => document.getElementById(link.dataset.target)?.hidden === false) ||
      links[0];
  }

  function updateControl() {
    const section = activeLink().textContent.trim();
    button.setAttribute("aria-label", label + " " + section);
    status.textContent = "";
    field.value = "";
    field.hidden = true;
  }

  async function shareSection() {
    const link = activeLink();
    const title = link.textContent.trim() + " | Lidya Cota";
    const url = "https://www.lidyacota.com" + new URL(link.href).pathname;
    updateControl();

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    if (link !== activeLink()) return;
    try {
      await navigator.clipboard.writeText(url);
      if (link === activeLink()) {
        status.textContent = english ? "Link copied." : "Enlace copiado.";
      }
    } catch {
      if (link !== activeLink()) return;
      field.value = url;
      field.hidden = false;
      status.textContent = english ? "Copy this link." : "Copia este enlace.";
      field.focus();
      field.select();
    }
  }

  button.textContent = label;
  field.setAttribute("aria-label", fieldLabel);
  button.addEventListener("click", shareSection);
  new MutationObserver(updateControl).observe(menu, {
    attributes: true,
    attributeFilter: ["aria-current"],
    subtree: true
  });
  updateControl();
  tools.hidden = false;
})();
