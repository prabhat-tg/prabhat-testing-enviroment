'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// TODO:: Make this generic
const OffersCategoryListingClient = ({
  basePath,
  initialActiveFilters,
  allSize,
  currentLang,
  translation,
  showSizeFilter,
  filterBySize,
  brandName,
  isMobileViewProp,
}) => {
  const router = useRouter();

  const [selectedBrand, setSelectedBrand] = useState(
    initialActiveFilters?.brand || brandName || null
  );
  const [selectedSize, setSelectedSize] = useState(initialActiveFilters?.size || null);
  const [selectedOption, setSelectedOption] = useState(initialActiveFilters?.sortBy || null);
  const [filterPopup, setFilterPopup] = useState(false);

  const filteredSizes =
    filterBySize === 'front'
      ? allSize.filter(size => size.startsWith(translation.buttons.front))
      : filterBySize === 'rear'
        ? allSize.filter(size => size.startsWith(translation.buttons.rear))
        : allSize;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setFilterPopup(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Runs once on mount

  const applyFilters = ({ brand, size, option }) => {
    console.log('Applying filters:', brand, size, option);

    // Use current state if argument is undefined
    const finalBrand = typeof brand !== 'undefined' ? brand : selectedBrand;
    const finalSize = typeof size !== 'undefined' ? size : selectedSize;
    const finalOption = typeof option !== 'undefined' ? option : selectedOption;

    const queryParams = new URLSearchParams();
    if (finalBrand) queryParams.set('brand', selectedBrand);
    if (finalSize) queryParams.set('size', selectedSize);
    if (finalOption) queryParams.set('sortBy', selectedOption);

    if (currentLang && currentLang !== 'en') {
      queryParams.set('lang', currentLang);
    } else if (router.query?.lang) {
      queryParams.set('lang', router.query.lang);
    }

    router.push(`${basePath}?${queryParams.toString()}`);
    if (isMobileViewProp) {
      setFilterPopup(false);
    }
  };

  const handleBrandSelect = brand => {
    if (brand.name === selectedBrand) {
      setSelectedBrand(null);
      // Immediately apply filters with brand removed
      setTimeout(
        () =>
          applyFilters({
            brand: null,
            size: selectedSize,
            option: selectedOption,
          }),
        0
      );
    } else {
      setSelectedBrand(brand.name);
    }
  };

  const handleSizeSelect = size => {
    const formattedSize = size.replace(/^(Front-|Rear-|अगला-|पिछला-)/, '');
    if (formattedSize === selectedSize) {
      setSelectedSize(null);
      // Immediately apply filters with size removed
      setTimeout(
        () =>
          applyFilters({
            brand: selectedBrand,
            size: null,
            option: selectedOption,
          }),
        0
      );
    } else {
      setSelectedSize(formattedSize);
    }
  };

  const handleSelection = event => {
    setSelectedOption(event.target.value);
  };

  const handleFilterToggle = () => {
    // Toggles filter popup, primarily for mobile
    setFilterPopup(prev => !prev);
  };

  const resetFilters = () => {
    setSelectedBrand(brandName || null);
    setSelectedSize(null);
    setSelectedOption(null);

    const queryParams = new URLSearchParams();
    // If it's a brand-specific page context, retain brand in query on reset
    // if (pageOrigin === 'brand' && brandName) {
    //   queryParams.set('brand', brandName);
    // }
    if (currentLang && currentLang !== 'en') {
      queryParams.set('lang', currentLang);
    } else if (router.query?.lang) {
      queryParams.set('lang', router.query.lang);
    }

    // const basePath = "/tyres";
    router.push(`${basePath}?${queryParams.toString()}`);
    if (isMobileViewProp) {
      // Close popup on mobile
      setFilterPopup(false);
    }
  };

  // Determine if the filter panel should be visible
  // On desktop (isMobileViewProp is false), it's always "visible" in terms of layout (sticky).
  // On mobile (isMobileViewProp is true), its visibility is controlled by filterPopup state.
  const isFilterPanelVisible = !isMobileViewProp || filterPopup;

  return (
    // This main div takes the styling for width and stickiness previously in TyresListing.js's filter section
    <div className="w-full md:sticky md:top-0 md:min-h-screen">
      {/* <div className="w-full md:sticky md:top-0 md:h-screen md:overflow-y-auto"> */}
      {/* Mobile Filter Toggle Button */}
      {isMobileViewProp && (
        <button
          onClick={handleFilterToggle}
          className="flex max-w-[100px] items-center rounded-lg bg-primary px-2.5 py-2 text-white md:mb-4 md:hidden" // md:hidden to ensure it's only on mobile
        >
          <Image
            src="https://images.tractorgyan.com/uploads/114019/66a360469d323-filterIcon.webp"
            height={16}
            width={16}
            title="filter icon"
            alt="filter icon"
            className="me-1.5 h-4 w-auto text-white brightness-0 invert"
          />
          {translation.buttons.filter}
        </button>
      )}

      {/* Overlay for mobile filter popup */}
      {isMobileViewProp && filterPopup && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-[#151414] bg-opacity-30 md:hidden"
          onClick={handleFilterToggle} // Close on overlay click
        ></div>
      )}

      {/* Filter Section Panel */}
      {isFilterPanelVisible && (
        <>
          <div
            className={` ${
              isMobileViewProp
                ? 'min-h-1/2 fixed bottom-0 left-0 right-0 z-30 h-auto overflow-y-auto'
                : 'md:relative'
            } rounded-t-[32px] border-[1px] border-gray-light bg-white md:mb-4 md:rounded-2xl md:border-none md:bg-transparent`}
          >
            {/* Inner content with padding and structure */}
            <div className="w-full bg-white px-3 py-4 md:rounded-2xl md:border-[1px] md:border-gray-light">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  {' '}
                  {/* Removed text-center */}
                  {translation.headings.filterBy}
                </h3>
                {isMobileViewProp && ( // Show close button only on mobile when popup is open
                  <button onClick={handleFilterToggle} className="h-8 w-8">
                    <Image
                      src={
                        'https://images.tractorgyan.com/uploads/114009/66a13c3da996e-langPopupClose.webp'
                      }
                      height={32}
                      width={32}
                      alt="cancel-button-image"
                      title="cancel-button-image"
                    />
                  </button>
                )}
              </div>

              {/* Size Filter */}
              {showSizeFilter && (
                <div className="mb-2 md:mb-6">
                  <h4 className="mb-2 text-base font-semibold md:mb-4">State</h4>
                  <div className="flex flex-wrap gap-2 xl:gap-4">
                    <span
                      className={`w-[30%] cursor-pointer text-nowrap rounded-full border-[1px] border-gray-light px-1.5 py-2 text-center text-xs hover:border-primary sm:w-[23%] md:w-[47%] xl:w-[30%]`}
                    >
                      MRF
                    </span>
                    <span
                      className={`w-[30%] cursor-pointer text-nowrap rounded-full border-[1px] border-gray-light px-1.5 py-2 text-center text-xs hover:border-primary sm:w-[23%] md:w-[47%] xl:w-[30%]`}
                    >
                      Apollo
                    </span>
                  </div>
                </div>
              )}

              {showSizeFilter && (
                <div className="mb-2 md:mb-6">
                  <h4 className="mb-2 text-base font-semibold md:mb-4">Brand</h4>
                  <div className="flex flex-wrap gap-2 xl:gap-4">
                    <span
                      className={`w-[30%] cursor-pointer rounded-full border-[1px] border-gray-light px-1.5 py-2 text-center text-xs hover:border-primary sm:w-[23%] md:w-[47%] xl:w-[30%]`}
                    >
                      MRF
                    </span>
                    <span
                      className={`w-[30%] cursor-pointer rounded-full border-[1px] border-gray-light px-1.5 py-2 text-center text-xs hover:border-primary sm:w-[23%] md:w-[47%] xl:w-[30%]`}
                    >
                      Indore
                    </span>
                  </div>
                </div>
              )}

              {/* Filter Buttons */}
              <div className="mt-6 flex gap-2.5">
                <button
                  className="flex w-[48%] justify-center rounded-lg bg-primary px-4 py-1.5 text-base text-white hover:bg-secondary"
                  onClick={applyFilters}
                >
                  {translation.buttons.applyFilter}
                </button>
                <button
                  className="flex w-[48%] justify-center rounded-lg border-[1px] border-primary bg-white px-4 py-1.5 text-base text-primary hover:border-secondary hover:text-secondary"
                  onClick={resetFilters}
                >
                  {translation.buttons.clearFilter}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OffersCategoryListingClient;
