import Link from 'next/link';
import React from 'react';
import TG_HorizontalCard from '@/src/components/ui/cards/ListingCard';
import SecondHandTractorCard from '@/src/components/ui/cards/secondHandTractorCards/SecondHandTractorCard';
import { TG_ReelsCard } from '@/src/components/ui/cards/reels/ReelsCards';
import ClientVideoWrapper from '@/src/components/ui/video/ClientVideoWrapper';

const TractorListing = ({
  pageType,
  initialTyres,
  totalTyresCount,
  currentPage,
  itemsPerPage,
  activeFilters, // Used by buildPageLink
  translation,
  currentLang, // Used by buildPageLink
  currentDate, // Prop for "Data Last Updated On"
  basePath, // Add basePath prop for correct URL building
  pageOrigin, // Add pageOrigin to determine URL structure
  isMobile,
  reel // <-- Accept reel prop
}) => {
  const noDataFound = !initialTyres || initialTyres.length === 0;
  const totalPages = Math.ceil(totalTyresCount / itemsPerPage);
  const showReelAfter = isMobile ? 1 : 3;

  const buildPageLink = pageNumber => {
    const queryParams = new URLSearchParams();
    if (activeFilters?.brand) queryParams.set('brand', activeFilters.brand);
    if (activeFilters?.size) queryParams.set('size', activeFilters.size);
    if (activeFilters?.sortBy) queryParams.set('sortBy', activeFilters.sortBy);
    if (activeFilters?.hpRange) queryParams.set('hpRange', activeFilters.hpRange);

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

    // queryParams.set('page', pageNumber.toString());

    // Use basePath if provided, otherwise default to tyres
    if (pageNumber > 1) queryParams.set('page', pageNumber.toString());
    return `${basePath}${queryParams.size ? '?' : ''}${queryParams.toString()}`;

    // const baseUrl = basePath || '/tyres';
    // return `${baseUrl}?${queryParams.toString()}`;
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
          {pageType === 'tractors' && (
            <>
              {/* BEGINS::Handling Reels Section */}
              {reel ? (
                <div
                  className="flex flex-col md:flex-row flex-wrap items-stretch gap-4 lg:gap-4 mb-4"
                  itemScope
                  itemType="https://schema.org/ItemList"
                >
                  {/* Width to be kept in sync with TG_HorizontalCard */}
                  <div className='flex flex-1 flex-col gap-4 lg:gap-4 w-full max-w-[420px]'>
                    {initialTyres.slice(0, showReelAfter).map((tractor, index) => (
                      <TG_HorizontalCard
                        key={tractor.id}
                        title={`${tractor.brand} ${tractor.model}`}
                        total_reviews={tractor.total_reviews || tractor.total_review || 0}
                        avg_review={tractor.avg_review || 0}
                        imageSrc={`https://images.tractorgyan.com/uploads${tractor.image}`}
                        detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
                        specs={{
                          [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
                          [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
                          [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
                        }}
                        buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
                        buttonPrefix="₹ "
                        isPopular={tractor.popular_tractor === '1'}
                        showRatingOnTop={pageType === 'tractors'}
                        translation={translation}
                        position={index + 1 + (currentPage - 1) * itemsPerPage}
                        tractorId={tractor.id}
                      />
                    ))}
                  </div>
                  <div className='flex flex-1 w-full max-w-[420px] items-stretch'>
                    {reel && (
                      reel.url_of_video && reel.featured_image && !reel.image ? (
                        <div className="relative rounded-2xl border border-gray-light p-4 w-full h-full flex flex-col justify-between bg-white min-h-[360px] md:min-h-[540px]">
                          <ClientVideoWrapper
                            videoUrl={reel.url_of_video}
                            title={reel.title}
                            isMobile={isMobile}
                            className="bg-gray-lighter w-full h-full flex-1 rounded-xl overflow-hidden relative min-h-[200px] md:min-h-[360px]"
                          // onUserInteraction={() => {
                          //   console.log('User scrolled - audio enabled for video');
                          // }}
                          />
                        </div>
                      ) : (
                        <TG_ReelsCard data={reel} />
                      )
                    )}
                  </div>
                </div>
              ) : null}
              {/* ENDS::Handling Reels Section */}
              <div
                className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4"
                itemScope
                itemType="https://schema.org/ItemList"
              >
                {/* Hidden ItemList metadata */}
                <meta itemProp="numberOfItems" content={totalTyresCount} />
                <meta itemProp="itemListOrder" content="https://schema.org/ItemListOrderAscending" />

                {(reel ? initialTyres.slice(showReelAfter) : initialTyres).map((tractor, index) => (
                  <div
                    key={tractor.id}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={(index + 1 + (currentPage - 1) * itemsPerPage).toString()} />

                    <div itemProp="item" itemScope itemType="https://schema.org/Product">
                      <meta itemProp="name" content={`${tractor.brand} ${tractor.model}`} />
                      <link itemProp="url" href={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url} />
                      <TG_HorizontalCard
                        // key={tractor.id}
                        title={`${tractor.brand} ${tractor.model}`}
                        total_reviews={tractor.total_reviews || tractor.total_review || 0}
                        avg_review={tractor.avg_review || 0}
                        imageSrc={`https://images.tractorgyan.com/uploads${tractor.image}`}
                        detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
                        specs={{
                          [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
                          [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
                          [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
                        }}
                        buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
                        buttonPrefix="₹ "
                        isPopular={tractor.popular_tractor === '1'}
                        showRatingOnTop={pageType === 'tractors'}
                        translation={translation}
                        position={index + 1 + (currentPage - 1) * itemsPerPage}
                        tractorId={tractor.id}
                      />
                    </div>
                  </div>
                  // <TG_HorizontalCard
                  //   key={tractor.id}
                  //   title={`${tractor.brand} ${tractor.model}`}
                  //   total_reviews={tractor.total_reviews || tractor.total_review || 0}
                  //   avg_review={tractor.avg_review || 0}
                  //   imageSrc={`https://images.tractorgyan.com/uploads${tractor.image}`}
                  //   detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
                  //   specs={{
                  //     [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
                  //     [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
                  //     [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
                  //   }}
                  //   buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
                  //   buttonPrefix="₹ "
                  //   isPopular={tractor.popular_tractor === '1'}
                  //   showRatingOnTop={pageType === 'tractors'}
                  //   translation={translation}
                  //   position={index + 1 + (currentPage - 1) * itemsPerPage}
                  //   tractorId={tractor.id}
                  // />
                ))}
              </div>
            </>
          )}

          {pageType === 'used_tractors' && (
            <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
              {initialTyres.map((tractor, index) => (
                <SecondHandTractorCard data={tractor} />
              ))}
            </div>
          )}

          {pageType === 'implements' && (
            <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
              {initialTyres?.map((implement, index) => (
                <TG_HorizontalCard
                  title={`${implement.brand_name} ${implement.model}`}
                  imageSrc={`https://images.tractorgyan.com/uploads${implement.image}`}
                  detailUrl={implement?.page_url}
                  specs={{ HP: implement?.implement_power }}
                  buttonText={translation.headerNavbar.ViewPrice}
                  buttonPrefix="₹ "
                  isPopular={implement?.popular_implement === "Yes" ? true : false}
                  translation={translation} // Pass translation
                />
              ))}
            </div>
          )}

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

export default TractorListing;
