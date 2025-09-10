import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import SearchBarClient from './SearchBarClient'; // SearchBarClient is in the same directory
import React from 'react';
import TyresListingClient from './TyresListingClient';
import FilterTagsClient from './FilterTagsClient';

const TyrePageHeader = ({
  translation,
  activeFilters,
  brandName,
  tyresListingClientProps,
  isMobile,
  heading,
  searchPlaceholder,
  searchParam
}) => {
  const headingTitle = heading
    ? heading.replace('{brand}', brandName)
    : (translation?.headings?.topTractorTyresinIndia).replace('{brand}', brandName);

  return (
    <>
      <div className="mb-4 flex flex-col items-start justify-between md:mb-6 md:flex-row md:items-center">
        <MainHeadings text={headingTitle} marginBottom={'mb-4 md:mb-0'} />
        <div className="flex w-full gap-2 md:block md:w-[40%]">
          <div className="w-full flex-1">
            <SearchBarClient
              initialSearchQuery={activeFilters?.search || activeFilters?.searchQuery || ''}
              translation={translation}
              basePath={searchParam ? searchParam : tyresListingClientProps.basePath}
              searchPlaceholder={searchPlaceholder}
            />
          </div>
          <div className="max-w-[80px]">
            {isMobile && <TyresListingClient {...tyresListingClientProps} />}
          </div>
        </div>
        {/* Display active filters on mobile */}
        {isMobile && (
          <FilterTagsClient
            activeFilters={activeFilters}
            basePath={tyresListingClientProps.basePath}
            currentLang={tyresListingClientProps.currentLang}
            tractorHPs={tyresListingClientProps.tractorHPs}
          />
        )}
      </div>
    </>
  );
};

export default TyrePageHeader;
