// Retold.me — Embed Script (v1)
// Responsible only for:
// - discovering widgets
// - inserting iframes synchronously
// - resizing iframes securely

(function () {
  "use strict";

  /* ================================
   * CONFIG
   * ================================ */

  const WIDGET_ORIGIN = "https://widget.retold.me";
  const DEFAULT_HEIGHT = 300;
  const MIN_HEIGHT = 100;
  const MAX_HEIGHT = 5000;

  /* ================================
   * STATE
   * ================================ */

  /* ================================
   * UTILITIES
   * ================================ */

  function getPublishableKey() {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (!src) continue;

      try {
        const url = new URL(src);
        if (!url.pathname.endsWith("embed.js")) continue;
        return url.searchParams.get("publishable_key");
      } catch (_) {}
    }
    return null;
  }

  /* ================================
   * MESSAGE HANDLING (GLOBAL, ONCE)
   * ================================ */

  /* ================================
   * IFRAME CREATION
   * ================================ */

  function createIframe(widgetId, publishableKey, element) {
    const iframe = document.createElement("iframe");

    const src =
      WIDGET_ORIGIN +
      "/?widget_id=" +
      encodeURIComponent(widgetId) +
      "&publishable_key=" +
      encodeURIComponent(publishableKey);

    iframe.src = src;
    iframe.style.width = "100%";
    iframe.style.height = DEFAULT_HEIGHT + "px";
    iframe.style.border = "0";
    // iframe.style.overflow = "hidden";
    iframe.loading = "lazy";
    iframe.scrolling = "no";
    iframe.setAttribute("frameborder", "0");

    // Preserve user styles/classes
    iframe.className = element.className;
    iframe.style.minWidth = "100%";
    iframe.dataset.widgetId = widgetId;

    let lastHeight = 0;

    window.addEventListener("message", function (event) {
      // Security: only accept messages from widget origin
      if (event.origin !== WIDGET_ORIGIN) return;

      if (event.data.type === "resized" && event.data.height) {
        // Validate height to prevent malicious resizing

        const newHeight = Math.max(
          parseInt(MIN_HEIGHT),
          Math.min(parseInt(MAX_HEIGHT), parseInt(event.data.height)),
        );
        // Only update if the height changed significantly
        if (Math.abs(newHeight - lastHeight) > 5) {
          lastHeight = newHeight;
          iframe.style.height = newHeight + "px";
        }
      }
    });
    return iframe;
  }

  /* ================================
   * INITIALIZATION
   * ================================ */

  function mountWidgets() {
    const publishableKey = getPublishableKey();
    if (!publishableKey) return;

    const elements = document.querySelectorAll("[data-widget]");

    elements.forEach((element) => {
      const widgetId = element.getAttribute("data-widget");
      if (!widgetId) return;

      // ✅ Safe check: does correct iframe already exist?
      const existingIframe = element.querySelector(
        `iframe[data-widget-id="${widgetId}"]`,
      );

      if (existingIframe) {
        return; // already mounted correctly
      }

      // ✅ If wrong iframe exists (edge case), clean container
      element.innerHTML = "";

      const iframe = createIframe(widgetId, publishableKey, element);

      // attach identifier for routing & safety
      iframe.setAttribute("data-widget-id", widgetId);

      element.appendChild(iframe);
    });
  }

  function observeDOM() {
    const observer = new MutationObserver(function () {
      mountWidgets();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function boot() {
    mountWidgets();
    observeDOM();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
