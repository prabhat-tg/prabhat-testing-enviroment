"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ReadMoreToggle = ({
  parentRef,
  collapsedLabel = "Read More",
  expandedLabel = "Read Less",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (parentRef?.current) {
      parentRef.current.style.transition = "max-height 0.3s ease-in-out";
      parentRef.current.style.overflow = "hidden";
      parentRef.current.style.maxHeight = isExpanded ? "2000px" : "150px";
    }
  }, [isExpanded, parentRef]);

  return (
    <div className="mt-2 text-end">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={
          isExpanded ? `${expandedLabel} button` : `${collapsedLabel} button`
        }
        className="font-medium text-base text-primary"
        type="button"
      >
        {isExpanded ? (
          <span className="flex gap-2 items-center justify-end text-red-main font-semibold">
            {expandedLabel}
            <Image
              src="https://images.tractorgyan.com/uploads/117537/678f49b7be407-arrow-red-icon.webp"
              height={20}
              width={20}
              alt="collapse"
              className="h-2 w-3 transition-transform rotate-180"
            />
          </span>
        ) : (
          <span className="flex gap-2 items-center justify-end text-primary font-medium">
            {collapsedLabel}
            <Image
              src="https://images.tractorgyan.com/uploads/117210/67723751b63af-green-down-arrow-icon_small.webp"
              height={20}
              width={20}
              alt="expand"
              className="h-2 w-3"
            />
          </span>
        )}
      </button>
    </div>
  );
};

export default ReadMoreToggle;
