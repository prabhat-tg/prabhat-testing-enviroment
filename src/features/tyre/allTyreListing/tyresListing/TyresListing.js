// TyresListing.js - Pure Server-Rendered Display Component
import ListingCard from '@/src/features/tyre/allTyreListing/tyresListing/ListingCard';
import Link from 'next/link';
import React from 'react';

const TyresListing = ({
  basePath,
  initialTyres,
  totalTyresCount,
  currentPage,
  itemsPerPage,
  pageOrigin,
  activeFilters, // Used by buildPageLink
  translation,
  currentLang, // Used by buildPageLink
  currentDate, // Prop for "Data Last Updated On"
  // Props like tyreBrands, pageOrigin, brandName, tyreSize are removed unless used for direct display
}) => {
  const noDataFound = !initialTyres || initialTyres.length === 0;
  const totalPages = Math.ceil(totalTyresCount / itemsPerPage);

  const buildPageLink = pageNumber => {
    const queryParams = new URLSearchParams();

    if (activeFilters?.brand && pageOrigin !== 'brand')
      queryParams.set('brand', activeFilters.brand);
    if (activeFilters?.size) queryParams.set('size', activeFilters.size);
    if (activeFilters?.sortBy) queryParams.set('sortBy', activeFilters.sortBy);

    // Handle search query: activeFilters might have 'searchQuery' from client or 'search' from server
    if (activeFilters?.searchQuery) queryParams.set('search', activeFilters.searchQuery);
    else if (activeFilters?.search) queryParams.set('search', activeFilters.search);

    // Preserve language
    if (currentLang && currentLang !== 'en') {
      // Assuming 'en' is default and might not need to be in URL
      queryParams.set('lang', currentLang);
    } else if (activeFilters?.lang && activeFilters.lang !== 'en') {
      // If lang is part of activeFilters
      queryParams.set('lang', activeFilters.lang);
    }
    // Add other persistent searchParams from activeFilters if needed
    // Example: if pageType or pageOrigin needs to persist via activeFilters
    // if (activeFilters?.pageType) queryParams.set('pageType', activeFilters.pageType);
    if (pageNumber > 1) queryParams.set('page', pageNumber.toString());
    return `${basePath}${queryParams.size ? '?' : ''}${queryParams.toString()}`; // Adjust base path if necessary
  };

  return (
    // This component no longer defines the two-column layout.
    // It's expected to fill the space provided by its parent in app/(tyres)/tyres/page.js
    // The parent <div className="flex flex-col md:flex-row ..."> handles the layout.
    // So, this component itself doesn't need width classes like md:w-[68%]
    <div className="h-full w-full">
      {/* Existing No Data Found / Tyre Listings Section */}
      {noDataFound ? (
        <div className="my-10 text-center md:mt-40">
          {translation?.headings?.noResultFound || 'No Result Found'}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 lg:gap-3 xl:gap-4">
            {initialTyres.map((tyre, index) => (
              <ListingCard
                key={index}
                brandName={tyre.brand_name}
                popularTyre={tyre.popular_tyre}
                modelName={tyre.modal_name}
                imgUrl={tyre.images}
                tyreSize={tyre.tyre_size}
                tyreType={tyre.tyre_type}
                tyreUrl={tyre.tyre_url}
                pageUrl={tyre.page_url} // Ensure this is correctly used or removed if redundant
                brandId={tyre.id} // Assuming ListingCard uses this
                translation={translation}
                currentLang={currentLang} // Pass currentLang if ListingCard needs it
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && ( // Show pagination only if there's more than one page
            <div className="mt-8 flex items-center justify-center space-x-4 text-center">
              {currentPage > 1 && (
                <Link
                  href={buildPageLink(currentPage - 1)}
                  className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
                >
                  {translation?.buttons?.previous || 'Previous'}
                </Link>
              )}
              <span className="text-gray-700 text-lg">
                {translation?.headings?.page || 'Page'} {currentPage}{' '}
                {translation?.headings?.of || 'of'} {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={buildPageLink(currentPage + 1)}
                  className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
                >
                  {translation?.buttons?.next || 'Next'}
                </Link>
              )}
            </div>
          )}

          <div className="mt-1.5 text-center">
            <span className="mx-auto text-sm text-gray-main">
              {translation?.headings?.dataLastUpdatedOn || 'Data last updated on'}:{' '}
              {currentDate}{' '}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TyresListing;
