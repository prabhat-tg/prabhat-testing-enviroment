'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import DesktopTractorsByBrands from '@/src/components/tractor/DesktopTractorsByBrands';
import GoogleAdVertical from '@/src/features/social/GoogleAdVertical/GoogleAdVertical';
import TyresByBrands from '../../TyresByBrands';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import SubCategoryTabs from '@/src/components/shared/sub-category-tabs/SubCategoryTabs';

// TODO:: Make this generic
const TyresListingClient = ({
  basePath,
  initialActiveFilters,
  tyreBrands,
  allSize,
  allImplementTypes,
  currentLang,
  translation,
  showBrandFilter,
  showSizeFilter,
  showTractorHPFilter,
  showTyreBrandsSection,
  showImplementBrandsSection,
  showImplementTypesSection,
  showLocationFilter,
  subcategories,
  filterBySize,
  brandName,
  isMobileViewProp,
  tractorHPs, // Add tractorHPs prop
  isMiniTractorPage = false, // New prop to identify mini tractor page
}) => {
  const router = useRouter();

  const [selectedBrand, setSelectedBrand] = useState(
    initialActiveFilters?.brand || brandName || null
  );
  const [selectedSize, setSelectedSize] = useState(initialActiveFilters?.size || null);
  const [selectedOption, setSelectedOption] = useState(initialActiveFilters?.sortBy || null);
  const [selectedHPRange, setSelectedHPRange] = useState(initialActiveFilters?.hpRange || null);
  const [filterPopup, setFilterPopup] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  // States and DIstrict Filter Realted Changes
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const states = [
    {
      name: 'Maharashtra',
      name_hi: 'महाराष्ट्र',
      districts: ['Pune', 'Mumbai', 'Nagpur'],
    },
    {
      name: 'Rajasthan',
      name_hi: 'राजस्थान',
      districts: ['Jaipur', 'Udaipur', 'Jodhpur'],
    },
    {
      name: 'Uttar Pradesh',
      name_hi: 'उत्तर प्रदेश',
      districts: ['Lucknow', 'Kanpur', 'Agra'],
    },
  ];
  // =======

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

  const applyFilters = ({ brand, size, option, hpRange }) => {
    console.log('Applying filters:', brand, size, option, hpRange);

    // Use current state if argument is undefined
    const finalBrand = typeof brand !== 'undefined' ? brand : selectedBrand;
    const finalSize = typeof size !== 'undefined' ? size : selectedSize;
    const finalOption = typeof option !== 'undefined' ? option : selectedOption;
    const finalHPRange = typeof hpRange !== 'undefined' ? hpRange : selectedHPRange;

    const queryParams = new URLSearchParams();
    if (finalBrand) queryParams.set('brand', finalBrand);
    if (finalSize) queryParams.set('size', finalSize);
    if (finalOption) queryParams.set('sortBy', finalOption);
    if (finalHPRange) queryParams.set('hpRange', finalHPRange);

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
            hpRange: selectedHPRange,
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
            hpRange: selectedHPRange,
          }),
        0
      );
    } else {
      setSelectedSize(formattedSize);
    }
  };

  const handleHPRangeSelect = hpRange => {
    if (hpRange === selectedHPRange) {
      setSelectedHPRange(null);
      // Immediately apply filters with HP range removed
      setTimeout(
        () =>
          applyFilters({
            brand: selectedBrand,
            size: selectedSize,
            option: selectedOption,
            hpRange: null,
          }),
        0
      );
    } else {
      setSelectedHPRange(hpRange);
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
    setSelectedHPRange(null);

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

      {/* Sub Category Filter */}
      {subcategories?.length && !isMobileViewProp && (
        <SubCategoryTabs heading={translation.headings.CombineHarvesterByCategory} subcategories={subcategories} />
      )}

      {/* Filter Section Panel */}
      {isFilterPanelVisible && (
        <>
          <div
            className={` ${isMobileViewProp
              ? 'min-h-1/2 fixed bottom-0 left-0 right-0 z-30 h-auto overflow-y-auto'
              : 'md:relative'
              } rounded-t-[32px] border-[1px] border-gray-light bg-white md:mb-4 md:rounded-2xl md:border-none md:bg-transparent`}
          >
            {/* Inner content with padding and structure */}
            <div className="w-full bg-white px-3 py-4 md:rounded-2xl md:border-[1px] md:border-gray-light">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold">{translation.headings.filterBy}</h3>
                {isMobileViewProp && ( // Show close button only on mobile when popup is open
                  <button onClick={handleFilterToggle} className="h-8 w-8">
                    <Image
                      src={
                        'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'
                      }
                      height={64}
                      width={64}
                      alt="cancel-button-image"
                      title="cancel-button-image"
                    />
                  </button>
                )}
              </div>

              <div className='overflow-y-auto md:overflow-y-visibile max-h-[80vh] md:max-h-none hide-scrollbar'>
                {/* BEGINS:: State & District Filters */}
                {showLocationFilter && (
                  <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">State</label>
                    <select
                      value={selectedState || ''}
                      onChange={e => {
                        setSelectedState(e.target.value);
                        setSelectedDistrict(null);
                      }}
                      className="block w-full rounded-md border border-gray-light p-2 text-sm focus:outline-none"
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states.map(state => (
                        <option key={state.name} value={state.name}>
                          {currentLang === 'hi' ? state.name_hi : state.name}
                        </option>
                      ))}
                    </select>

                    <label className="mb-1 mt-3 block text-sm font-medium">District</label>
                    <select
                      value={selectedDistrict || ''}
                      onChange={e => setSelectedDistrict(e.target.value)}
                      disabled={!selectedState}
                      className="block w-full rounded-md border border-gray-light p-2 text-sm focus:outline-none disabled:opacity-50"
                    >
                      <option value="" disabled>
                        Select District
                      </option>
                      {selectedState &&
                        states
                          .find(s => s.name === selectedState)
                          ?.districts.map(district => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                    </select>
                  </div>
                )}
                {/* ENDS:: State & District Filters */}

                {/* Size Filter */}
                {showSizeFilter && (
                  <div className="mb-2 md:mb-6">
                    <h4 className="mb-2 text-base font-semibold md:mb-4">
                      {translation.headings.size}
                    </h4>
                    <div className="flex flex-wrap gap-2 xl:gap-4">
                      {filteredSizes?.map((size, index) => (
                        <span
                          key={index}
                          className={`w-[30%] cursor-pointer rounded-full border-[1px] border-gray-light px-1.5 py-2 text-center text-xs hover:border-primary sm:w-[23%] md:w-[47%] xl:w-[30%] ${selectedSize === size.replace(/^(Front-|Rear-|अगला-|पिछला-)/, '')
                            ? 'bg-primary text-white'
                            : 'text-black'
                            } text-nowrap`}
                          onClick={() => handleSizeSelect(size)}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* HP Filter */}
                {showTractorHPFilter && tractorHPs && tractorHPs.length > 0 && (
                  <div className="mb-2 md:mb-6">
                    <h4 className="mb-2 text-base font-semibold md:mb-4">
                      {translation.headings.tractorHP}
                    </h4>
                    <div className="flex flex-wrap gap-x-1 gap-y-2 md:gap-2 xl:gap-4">
                      {tractorHPs.map((hp, index) => (
                        <span
                          key={index}
                          className={`w-[32%] md:w-[30%] cursor-pointer rounded-full border-[1px] border-gray-light px-1.5 py-2 text-center text-xs hover:border-primary ${selectedHPRange === hp.page_url ? 'bg-primary text-white' : 'text-black'
                            }`}
                          onClick={() => handleHPRangeSelect(hp.page_url)}
                        >
                          {hp.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brand Filter */}
                {showBrandFilter && tyreBrands && tyreBrands.length > 0 && (
                  <div className="mb-2 md:mb-6">
                    <h4 className="mb-2 text-base font-semibold md:mb-4">
                      {translation.headings.brand}
                    </h4>
                    <div className="flex flex-wrap gap-x-1 gap-y-2 md:gap-2 xl:gap-4">
                      {(showAllBrands ? tyreBrands : tyreBrands.slice(0, 12)).map((brand, index) => (
                        <span
                          key={index}
                          className={`w-[32%] md:w-[30%] cursor-pointer rounded-full border-[1px] border-gray-light px-1.5 py-2 text-center text-xs sm:w-[23%] md:w-[47%] xl:w-[30%] ${selectedBrand === brand.name ? 'bg-primary text-white' : 'text-black'
                            } flex items-center justify-center`}
                          onClick={() => handleBrandSelect(brand)}
                        >
                          {currentLang === 'hi' ? brand.name_hi : brand.name}
                        </span>
                      ))}
                    </div>
                    {tyreBrands.length > 9 && (
                      <div className="mt-3 text-center">
                        <button
                          onClick={() => setShowAllBrands(!showAllBrands)}
                          className="hover:text-primary-dark text-sm font-medium text-primary underline"
                        >
                          {showAllBrands
                            ? translation.buttons?.viewLess || 'View Less'
                            : translation.buttons?.viewAll || 'View All'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Sort By Filter */}
                <div>
                  <h6 className="md-1.5 text-base font-semibold md:mb-4">
                    {translation.headings.sortBy}
                  </h6>
                  <div className="md:space-y-2">
                    <label className="flex items-center space-x-3 border-b border-gray-light py-3">
                      <input
                        type="radio"
                        name="options"
                        value={`${translation.headings.popularity}`}
                        className="border-gray-300 h-5 w-5 text-black focus:ring-black"
                        checked={selectedOption === `${translation.headings.popularity}`}
                        onChange={handleSelection}
                      />
                      <span
                        className={`${selectedOption === `${translation.headings.popularity}`
                          ? 'font-semibold'
                          : 'font-semibold text-black'
                          } text-sm`}
                      >
                        {translation.headings.popularity}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 py-3">
                      {' '}
                      {/* Removed border-b for last item */}
                      <input
                        type="radio"
                        name="options"
                        value={`${translation.headings.latestLaunches}`}
                        className="text-blue-600 border-gray-300 focus:ring-blue-500 h-5 w-5"
                        checked={selectedOption === `${translation.headings.latestLaunches}`}
                        onChange={handleSelection}
                      />
                      <span
                        className={`${selectedOption === `${translation.headings.latestLaunches}`
                          ? 'font-semibold'
                          : 'font-semibold text-black'
                          } text-sm`}
                      >
                        {translation.headings.latestLaunches}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="mt-4 md:mt-6 flex gap-2.5">
                <button
                  className="flex w-[48%] justify-center rounded-lg bg-primary px-4 py-1.5 text-base text-white hover:bg-secondary"
                  onClick={() =>
                    applyFilters({
                      brand: selectedBrand,
                      size: selectedSize,
                      option: selectedOption,
                      hpRange: selectedHPRange,
                    })
                  }
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
          {showTractorHPFilter && (
            <div className="flex flex-wrap">
              <DesktopTractorsByBrands
                translation={translation}
                langPrefix={currentLang}
                allTractorBrands={tyreBrands}
                isMiniTractorPage={isMiniTractorPage}
                heading={isMiniTractorPage ? translation.headings.topMiniTractorBrands : translation.headings.topTractorBrands}
              />
              <GoogleAdVertical />
            </div>
          )}
          {showTyreBrandsSection && !isMobileViewProp && (
            // {true && (
            <div className="flex flex-wrap">
              <TyresByBrands
                prefLang={currentLang}
                isMobile={isMobileViewProp}
                translation={translation}
                tyreBrands={tyreBrands}
                title={''}
                placedInFilter={true}
              />
            </div>
          )}
          {showImplementBrandsSection && !isMobileViewProp && (
            <TractorImplementBrands
              bgColor={'bg-section-gray'}
              heading={translation.headings.ImplementsByBrands}
              allImplementBrands={tyreBrands}
              itemsShown={9}
              placedInFilter={true}
              prefLang={currentLang}
              translation={translation}
            />
          )}
          {showImplementTypesSection && !isMobileViewProp && (
            <TractorImplementTypes
              bgColor="bg-section-gray"
              heading={translation.headings.ImplementsByTypes}
              allImplementTypes={allImplementTypes}
              floatingBg={false}
              slider={false}
              placedInFilter={true}
              cta={translation.buttons.ViewAllImplements}
            />
          )}
        </>
      )}
      {/* The "Tyres by Brands" section that was in TyresListing.js's filter area is not included here, 
          as it's static content best kept in the server component or a separate client component if interactive.
          The current task is focused on the filter *inputs* and their logic. 
      */}
    </div>
  );
};

export default TyresListingClient;
