'use client';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';

const TyreContentToggle = ({ deviceType, maxHeight = 'max-h-44', maxMobileHeight = 'max-h-20' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef(null);

  const isMobile = deviceType === 'mobile';
  const collapsedHeight = isMobile ? 90 : 176; // 80px for mobile, 176px for desktop
  // const collapsedClass = isMobile ? 'max-h-20' : 'max-h-44'; // h-20 = 80px, h-44 = 176px
  const collapsedClass = isMobile ? maxMobileHeight : maxHeight; // h-20 = 80px, h-44 = 176px

  useLayoutEffect(() => {
    const contentDiv = document.querySelector('#tyre-top-content .tyre-top-content');
    if (contentDiv) {
      contentRef.current = contentDiv;
      // Check if the content is taller than the collapsed height
      if (contentDiv.scrollHeight > collapsedHeight) {
        setShowButton(true);
      }
    }
  }, [collapsedHeight]);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        contentRef.current.classList.remove(collapsedClass);
        contentRef.current.classList.add('max-h-full');
      } else {
        contentRef.current.classList.add(collapsedClass);
        contentRef.current.classList.remove('max-h-full');
      }
    }
  }, [isExpanded, collapsedClass]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.classList.add(collapsedClass, 'overflow-hidden');
    }
  }, [collapsedClass]);

  if (!showButton) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded(v => !v)}
        aria-label={isExpanded ? 'Read Less btn' : 'Read More btn'}
        className="ms-auto font-medium text-base"
        type="button"
      >
        {isExpanded ? (
          <span className="flex items-center gap-2 font-semibold text-red-main">
            Read Less
            <Image
              src="https://images.tractorgyan.com/uploads/117537/678f49b7be407-arrow-red-icon.webp"
              height={20}
              width={20}
              alt="open-button"
              title="open-button"
              className="w-3 h-2 rotate-180 transition-transform"
            />
          </span>
        ) : (
          <span className="flex items-center gap-2 font-medium text-primary">
            Read More
            <Image
              src="https://images.tractorgyan.com/uploads/117210/67723751b63af-green-down-arrow-icon_small.webp"
              height={20}
              width={20}
              alt="open-button"
              title="open-button"
              className="w-3 h-2"
            />
          </span>
        )}
      </button>
    </div>
  );
};

export default TyreContentToggle;
