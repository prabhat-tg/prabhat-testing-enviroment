"use client";

import { useState } from "react";

const TG_ToggleSwitch = ({
  id,
  label,
  trackColor = 'bg-gray-silver',
  switchColor = 'bg-black',
  labelColor = 'text-black',
  variant = 'DEFAULT',
  onToggle
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const trackVariant = variant === 'OVERFLOW' ? 'h-4' : 'h-6 p-1';
  const switchVariant = variant === 'OVERFLOW' ? 'w-6 h-6 mt-[2-x] -ml-1 -mr-1' : 'w-4 h-4';

  const handleClick = () => {
    const newVal = !isHidden;
    setIsHidden(newVal);
    onToggle?.(newVal); // notify parent
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        // onClick={() => setIsHidden(!isHidden)}
        onClick={handleClick}
        className={`${trackColor} ${trackVariant} w-12 flex items-center rounded-full border border-section-gray shadow-bottom transition-colors duration-300 ${isHidden ? 'justify-end' : 'justify-start'
          }`}
      >
        <span className={`${switchColor} ${switchVariant} rounded-full shadow-md transition-transform duration-300`} />
      </button>

      <span className={`${labelColor} font-medium text-black`}>
        {label}
      </span>
    </div>
  );
};

export default TG_ToggleSwitch;
