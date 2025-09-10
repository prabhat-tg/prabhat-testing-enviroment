import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, prepareTyreListingComponent } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import TyrePageHeader from '../tyre/allTyreListing/tyresListing/TyrePageHeader';
import TyresListingClient from '../tyre/allTyreListing/tyresListing/TyresListingClient';
import TyresListing from '../tyre/allTyreListing/tyresListing/TyresListing';
import OfferCategoryListingClient from './OffersCategoryListingClient';

export default async function OffersListingComponentData({
  params,
  searchParams,
  basePath,
  tyreBrands,
  showBrandFilter = false,
  showSizeFilter = false,
  showTractorHPFilter = false,
  showTyreBrandsSection = false,
  brandName = '',
}) {
  const param = await params;
  const searchParamsObj = await searchParams;
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const pageSlug = 'tyres';

  const { tyresListingClientProps, tyresListingProps } = await prepareTyreListingComponent({
    param: param,
    searchParamsObj: searchParamsObj,
    isMobile,
    showBrandFilter,
    showSizeFilter,
    showTractorHPFilter,
    showTyreBrandsSection,
    filterBySize: 'all',
    pageSlug,
    pageType: 'tyres',
    prefLang: currentLang,
    translation,
    tyreBrands,
    ITEMS_PER_PAGE: 14,
    basePathFromUrl: basePath,
  });

  // Extract pagination info for parent component
  const paginationInfo = {
    hasNextPage: tyresListingProps.hasNextPage || false,
    currentPage: tyresListingProps.currentPage || 1,
    totalPages: tyresListingProps.totalPages || 1,
    totalItems: tyresListingProps.totalItems || 0,
  };

  const TyreListingComponent = (
    <section className="">
      <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
        {!isMobile && (
          <div className="mt-[-20px] w-full">
            <OfferCategoryListingClient {...tyresListingClientProps} />
          </div>
        )}
      </div>
    </section>
  );

  return {
    component: TyreListingComponent,
    paginationInfo,
  };
}
