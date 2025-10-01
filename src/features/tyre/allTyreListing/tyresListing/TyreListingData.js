import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, prepareTyreListingComponent } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import TyresListing from './TyresListing';
import TyresListingClient from './TyresListingClient';
import TyrePageHeader from './TyrePageHeader';

export default async function TyreListingData({
  params,
  searchParams,
  basePath,
  tyreBrands,
  showBrandFilter = false,
  showSizeFilter = false,
  showTractorHPFilter = false,
  showTyreBrandsSection = false,
  brandName = '',
  pageType = 'tyres',
}) {
  const param = await params;
  const searchParamsObj = await searchParams;
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const pageSlug = basePath || 'tyres';

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
    pageType: pageType,
    prefLang: currentLang,
    translation,
    tyreBrands,
    ITEMS_PER_PAGE: 14,
    basePathFromUrl: (basePath === "tyre/rear" && "/tyre/rear" || basePath === "tyre/front" && "/tyre/front") || basePath,
  });

  // Extract pagination info for parent component
  const paginationInfo = {
    hasNextPage: tyresListingProps.hasNextPage || false,
    currentPage: tyresListingProps.currentPage || 1,
    totalPages: tyresListingProps.totalPages || 1,
    totalItems: tyresListingProps.totalItems || 0,
  };

  const TyreListingComponent = (
    <section className="bg-section-gray py-6 md:py-8 lg:py-10">
      <div className="container mx-auto">
        <TyrePageHeader
          isMobile={isMobile}
          brandName={brandName}
          translation={translation}
          activeFilters={tyresListingProps.activeFilters}
          tyresListingClientProps={tyresListingClientProps}
        />
        <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
          {!isMobile && (
            <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
              <TyresListingClient {...tyresListingClientProps} />
            </div>
          )}
          <div className="flex-1">
            <TyresListing {...tyresListingProps} />
          </div>
        </div>
      </div>
    </section>
  );

  return {
    component: TyreListingComponent,
    paginationInfo,
  };
}
