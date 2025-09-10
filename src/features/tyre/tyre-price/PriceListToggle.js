'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const PriceListToggle = ({ isMobile, brandName, langPrefix, productType = 'tyre' }) => {
  // console.log('lang prsdadfa d', langPrefix);

  const [isExpanded, setIsExpanded] = useState(false);

  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  const getHeading = () => {
    const year = getCurrentYear();

    if (productType === 'tractor') {
      return langPrefix === 'hi'
        ? `भारत में लोकप्रिय ${brandName} ट्रैक्टर प्राइस लिस्ट ${year}`
        : `Popular ${brandName} Tractors Price List ${year} in India`;
    }

    // Default to tyre heading
    return langPrefix === 'hi'
      ? `भारत में लोकप्रिय ${brandName} टायर प्राइस लिस्ट ${year}`
      : `Popular ${brandName} Tyres Price List ${year} in India`;
  };

  useEffect(() => {
    const priceListContent = document.getElementById('price-list-content');
    if (priceListContent && isMobile) {
      if (isExpanded) {
        priceListContent.classList.remove('max-h-0');
        priceListContent.classList.add('max-h-96', 'overflow-y-scroll');
      } else {
        priceListContent.classList.remove('max-h-96', 'overflow-y-scroll');
        priceListContent.classList.add('max-h-0');
      }
    }
  }, [isExpanded, isMobile]);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div
      className={`flex w-full items-center justify-center gap-2 rounded-t-lg bg-green-mid p-2 text-base font-semibold text-secondary shadow-main md:cursor-auto md:text-lg ${isMobile ? 'cursor-pointer' : ''
        }`}
      onClick={isMobile ? handleToggle : undefined}
      role={isMobile ? 'button' : undefined}
      tabIndex={isMobile ? 0 : undefined}
      onKeyDown={
        isMobile
          ? e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }
          : undefined
      }
      aria-label={isMobile ? (isExpanded ? 'Hide price list' : 'Show price list') : undefined}
    >
      <h2 className="text-center">{getHeading()} </h2>

      {/* Mobile Toggle Icon */}
      {isMobile && (
        <div className="flex items-center justify-center p-1 transition-transform duration-300">
          <Image
            src={
              isExpanded
                ? 'https://images.tractorgyan.com/uploads/117537/678f49b7be407-arrow-red-icon.webp'
                : 'https://images.tractorgyan.com/uploads/117210/67723751b63af-green-down-arrow-icon_small.webp'
            }
            height={20}
            width={20}
            title="Toggle Price List"
            alt={isExpanded ? 'collapse icon' : 'expand icon'}
            className={`h-3 w-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
          />
        </div>
      )}
    </div>
  );
};

export default PriceListToggle;
