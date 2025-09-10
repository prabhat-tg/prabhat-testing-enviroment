"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReadMoreButton({ targetId, translation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    // toggle the max-height utility
    el.classList.toggle("max-h-[500px]");
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {!isExpanded && (
        <div className="pointer-events-none relative -mt-20 h-20 bg-gradient-to-t from-section-gray to-transparent" />
      )}
      <button
        onClick={handleClick}
        aria-label={isExpanded ? "Read Less" : "Read More"}
        className="text-base font-medium"
      >
        {isExpanded ? (
          <span className="flex items-center gap-2 text-red-main">
            {translation?.buttons.readLess}
            <Image
              src="https://images.tractorgyan.com/uploads/117537/678f49b7be407-arrow-red-icon.webp"
              height={20}
              width={20}
              alt="collapse content"
              title="collapse content"
              className="h-2 w-3 rotate-180 transition-transform"
            />
          </span>
        ) : (
          <span className="flex items-center gap-2 text-primary">
            {translation?.buttons.readMore}
            <Image
              src="https://images.tractorgyan.com/uploads/117210/67723751b63af-green-down-arrow-icon_small.webp"
              height={20}
              width={20}
              alt="expand content"
              title="expand content"
              className="h-2 w-3"
            />
          </span>
        )}
      </button>
    </>
  );
}
