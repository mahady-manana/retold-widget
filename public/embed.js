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

  // widgetId -> iframe
  const iframeRegistry = Object.create(null);

  /* ================================
   * UTILITIES
   * ================================ */

  function clampHeight(height) {
    return Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height));
  }

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

    iframeRegistry[widgetId] = iframe;

    let lastHeight = 0;

    window.addEventListener("message", function (event) {
      console.log("====================================");
      console.log(event);
      console.log("====================================");
      // Security: only accept messages from widget origin
      if (event.origin !== WIDGET_ORIGIN) return;
      console.log("====================================");
      console.log("Pass origin");
      console.log("====================================");

      if (event.data.type === "resized" && event.data.height) {
        // Validate height to prevent malicious resizing
        console.log("Pass check");
        const newHeight = Math.max(
          parseInt(MIN_HEIGHT),
          Math.min(parseInt(MAX_HEIGHT), parseInt(event.data.height)),
        );

        console.log("====================================");
        console.log({ newHeight });
        console.log("====================================");
        // Only update if the height changed significantly
        if (Math.abs(newHeight - lastHeight) > 5) {
          lastHeight = newHeight;
          console.log({ lastHeight });
          iframe.style.height = newHeight + "px";
        }
      }
    });
    return iframe;
  }

  /* ================================
   * INITIALIZATION
   * ================================ */

  function init() {
    const publishableKey = getPublishableKey();
    if (!publishableKey) {
      console.error(
        "Retold.me widget: Missing publishable_key in embed.js URL",
      );
      return;
    }

    const elements = document.querySelectorAll("[data-widget]");

    elements.forEach(function (element) {
      const widgetId = element.getAttribute("data-widget");
      if (!widgetId) return;

      // Prevent double mounting
      if (iframeRegistry[widgetId]) return;

      const iframe = createIframe(widgetId, publishableKey, element);
      element.replaceWith(iframe);
    });
  }

  /* ================================
   * BOOT
   * ================================ */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
