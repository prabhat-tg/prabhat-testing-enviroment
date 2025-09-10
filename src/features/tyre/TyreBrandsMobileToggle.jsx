"use client";
import { useState, useEffect } from "react";

export default function TyreBrandsMobileToggle({ total, translation }) {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll(
      "#tyre-brands-list .tyre-brand-item",
    );
    items.forEach((el, idx) => {
      if (!showAll && idx >= 6) {
        el.classList.add("hidden");
      } else {
        el.classList.remove("hidden");
      }
    });
  }, [showAll]);

  if (total <= 6) return null;

  return (
    <button
      onClick={() => setShowAll((v) => !v)}
      className="mx-auto mt-4 flex rounded-lg bg-primary px-4 py-2 text-lg text-white"
    >
      {showAll
        ? translation?.buttons?.viewLessBrands || "View Less"
        : translation?.buttons?.viewAllBrands || "View All"}
    </button>
  );
}
