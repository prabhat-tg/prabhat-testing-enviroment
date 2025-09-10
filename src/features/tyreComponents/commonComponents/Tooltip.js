"use client"
import React, { useState, useEffect, useRef } from 'react';

const Tooltip = props => {
  let timeout;
  const [active, setActive] = useState(false);
  const wrapperRef = useRef(null);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const toggleTip = () => {
    if (active) {
      hideTip();
    } else {
      showTip();
    }
  };

  // Handle click outside to close tooltip on mobile
  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        hideTip();
      }
    };

    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [active]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="Tooltip-Wrapper relative"
        // Desktop hover events
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        // Mobile touch events
        onClick={toggleTip}
        onTouchStart={e => {
          // Prevent the click event from firing on touch devices
          e.preventDefault();
          toggleTip();
        }}
      >
        {/* Wrapping */}
        {props.children}
        {active && (
          <div className={`Tooltip-Tip`}>
            <span className="absolute left-[min(140px,_50%)] top-10 z-50 w-[280px] -translate-x-1/2 transform md:-left-[80px] md:w-auto md:min-w-[180px] md:translate-x-0">
              <div className="shadow-lg w-full rounded-2xl bg-green-mint p-3 font-normal text-gray-dark">
                <div className="absolute -top-2 left-1/2 -z-[1] h-6 w-6 -translate-x-1/2 rotate-45 transform bg-green-mint md:left-20 md:translate-x-0"></div>
                <span className="text-xs leading-4">{props.content} </span>
              </div>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Tooltip;
