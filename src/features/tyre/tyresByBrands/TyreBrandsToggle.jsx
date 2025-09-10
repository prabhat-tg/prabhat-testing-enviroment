"use client";
import React, { useState, useEffect } from "react";

const TyreBrandsToggle = ({ translation }) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const list = document.querySelector("#tyre-brands-list .tyre-brands-list");
    if (list) {
      if (showAll) {
        list.classList.add("expanded");
        list.classList.remove("collapsed");
      } else {
        list.classList.add("collapsed");
        list.classList.remove("expanded");
      }
    }
  }, [showAll]);

  return (
    <button
      onClick={() => setShowAll((v) => !v)}
      className="mx-auto mt-4 flex rounded-lg bg-primary px-4 py-2 text-lg text-white md:hidden"
      type="button"
    >
      {showAll
        ? translation?.buttons?.viewLessBrands || "View Less"
        : translation?.buttons?.viewAllBrands || "View All"}
    </button>
  );
};

export default TyreBrandsToggle;
