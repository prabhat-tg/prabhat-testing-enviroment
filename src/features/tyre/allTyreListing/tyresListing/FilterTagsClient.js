'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FilterTagsClient = ({ activeFilters, basePath, currentLang, tractorHPs }) => {
  // Function to get HP range display label from value
  const getHPRangeLabel = (hpValue) => {
    if (!tractorHPs || !Array.isArray(tractorHPs)) {
      return hpValue; // Fallback to original value
    }

    const hpOption = tractorHPs.find(hp => hp.page_url === hpValue);
    return hpOption ? hpOption.title : hpValue;
  };
  const router = useRouter();

  const removeFilter = filterType => {
    const queryParams = new URLSearchParams();

    // Copy all current filters except the one being removed
    if (activeFilters?.brand && filterType !== 'brand')
      queryParams.set('brand', activeFilters.brand);
    if (activeFilters?.size && filterType !== 'size') queryParams.set('size', activeFilters.size);
    if (activeFilters?.sortBy && filterType !== 'sortBy')
      queryParams.set('sortBy', activeFilters.sortBy);
    if (activeFilters?.search && filterType !== 'search')
      queryParams.set('search', activeFilters.search);

    // Preserve language parameter if present
    if (currentLang && currentLang !== 'en') {
      queryParams.set('lang', currentLang);
    }

    // Navigate to updated URL
    router.push(`${basePath}?${queryParams.toString()}`);
  };

  // Only show tags for brand and size filters
  const visibleFilters = [];
  if (activeFilters?.brand) {
    visibleFilters.push({
      type: 'brand',
      label: activeFilters.brand,
    });
  }
  if (activeFilters?.size) {
    visibleFilters.push({
      type: 'size',
      label: activeFilters.size,
    });
  }
  // Show filter tags for HP
  if (activeFilters?.hpRange) {
    visibleFilters.push({
      type: 'hpRange',
      label: getHPRangeLabel(activeFilters.hpRange), // For UI Purpose Only - shows proper label
    });
  }

  if (visibleFilters.length === 0) return null;

  return (
    <div className="flex w-full gap-2 overflow-scroll pt-3">
      {visibleFilters.map((filter, index) => (
        <div
          key={index}
          className="flex w-fit gap-2 rounded-full border border-gray-light bg-white px-3 py-2"
        >
          <span className="text-xs">{filter.label}</span>
          <button
            className="h-4 w-4 transition-all duration-150 hover:scale-110 hover:opacity-70 active:scale-95 active:opacity-50"
            onClick={() => removeFilter(filter.type)}
            aria-label={`Remove ${filter.type} filter`}
          >
            <Image
              src={
                'https://images.tractorgyan.com/uploads/114009/66a13c3da996e-langPopupClose.webp'
              }
              height={32}
              width={32}
              alt="clear-button-icon"
              title="clear-button-icon"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterTagsClient;
