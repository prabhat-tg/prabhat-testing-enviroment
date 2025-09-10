import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';
import TractorQuestionsSearchBar from '../tractors-question-hub/TractorQuestionsSearchBar';
import TyreListingData from '../tyre/allTyreListing/tyresListing/TyreListingData';
import OfferPageFilter from './OffersPageFilter';
import OffersByToggle from './OffersByToggle';
import OfferCardContainer from './OffersCardContainer';
import OffersCategoryPage from './OffersCategoryPage';
import React, { Suspense } from 'react';
import OfferListingComponentData from './OffersPageFilter';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';

const OffersDataContianer = async ({ translation, params, searchParams }) => {
  const tyreBrandsData = await getTyreBrands();

  const { component: offerListingComponent, paginationInfo } = await OfferListingComponentData({
    params,
    searchParams,
    basePath: '/offers',
    tyreBrands: tyreBrandsData,
    showBrandFilter: true,
    showSizeFilter: true,
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  return (
    <>
      <div>
        <div className="mb-8 grid gap-6 md:flex md:justify-between">
          <OffersByToggle />
          <TractorQuestionsSearchBar translation={translation} />
        </div>
        <div className="flex w-full items-start justify-between">
          <div className="hidden w-[23%] md:block">
            <Suspense fallback={<ListingSkeleton />}>{offerListingComponent}</Suspense>
          </div>
          <div className="relative w-full md:w-[75%]">
            <OfferCardContainer translation={translation} />
          </div>
        </div>
      </div>
    </>
  );
};
export default OffersDataContianer;
