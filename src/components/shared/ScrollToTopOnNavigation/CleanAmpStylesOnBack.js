"use client";
import { useEffect } from "react";

const CleanAmpStylesOnBack = () => {
  useEffect(() => {
    const cleanupAmpEffects = () => {
      const html = document.documentElement;
      const body = document.body;

      html.classList.remove(
        "i-amphtml-singledoc",
        "i-amphtml-fie",
        "amp-mode-mouse",
      );

      html.removeAttribute("style");
      body.removeAttribute("style");

      const cssResetStyle = document.createElement("style");
      cssResetStyle.setAttribute("id", "amp-cleanup-style");
      cssResetStyle.innerHTML = `
        html, body {
          transform: none !important;
          zoom: 1 !important;
          scale: 1 !important;
          overflow: auto !important;
          height: auto !important;
          font-size: 100% !important;
          max-width: 100vw !important;
        }
      `;
      const oldStyle = document.getElementById("amp-cleanup-style");
      if (oldStyle) oldStyle.remove();
      document.head.appendChild(cssResetStyle);

      document
        .querySelectorAll(
          "style[amp-boilerplate], noscript > style[amp-boilerplate]",
        )
        .forEach((el) => el.remove());

      window.scrollTo(0, 0);
    };

    cleanupAmpEffects();
    window.addEventListener("pageshow", cleanupAmpEffects);

    return () => {
      window.removeEventListener("pageshow", cleanupAmpEffects);
    };
  }, []);

  return null;
};

export default CleanAmpStylesOnBack;
