import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, prepareTractorListingComponent } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import TractorListing from '@/src/features/tractors/listing/TractorListing';
import TyresListingClient from '@/src/features/tyre/allTyreListing/tyresListing/TyresListingClient';
import TyrePageHeader from '@/src/features/tyre/allTyreListing/tyresListing/TyrePageHeader';

export default async function TractorListingData({
  params,
  searchParams,
  basePath,
  tractorBrands,
  showBrandFilter = false,
  showSizeFilter = false,
  showTractorHPFilter = true, // Default to true for tractor pages
  showTyreBrandsSection = false,
  brandName = '',
  isSeriesListing = false, // New parameter for series listing
  seriesName = null, // New parameter for series name
  hpRange = null, // New parameter for HP range
  page_url = null
}) {
  const param = await params;
  const searchParamsObj = await searchParams;
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const pageSlug = 'tractors';

  const { tractorListingClientProps, tractorListingProps } = await prepareTractorListingComponent({
    param: param,
    searchParamsObj: searchParamsObj,
    pageSlug,
    prefLang: currentLang,
    translation,
    showBrandFilter,
    showTractorHPFilter,
    isMobile,
    ITEMS_PER_PAGE: 16,
    tractorBrands,
    basePathFromUrl: basePath,
    isSeriesListing, // Pass through series listing flag
    seriesName, // Pass through series name
    hpRange, // Pass through HP range
    page_url
  });

  // Extract pagination info for parent component
  const paginationInfo = {
    hasNextPage: tractorListingProps.hasNextPage || false,
    currentPage: tractorListingProps.currentPage || 1,
    totalPages: tractorListingProps.totalPages || 1,
    totalItems: tractorListingProps.totalItems || 0,
  };

  const TractorListingComponent = (
    <section className="bg-section-gray py-6 md:py-8 lg:py-10">
      <div className="container mx-auto">
        <TyrePageHeader
          isMobile={isMobile}
          brandName={brandName}
          translation={translation}
          heading={translation?.headings?.allTractorsByBrand}
          activeFilters={tractorListingProps.activeFilters}
          searchPlaceholder={translation?.placeholder?.searchTractors}
          tyresListingClientProps={tractorListingClientProps}
        />
        <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
          {!isMobile && (
            <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
              <TyresListingClient {...tractorListingClientProps} />
            </div>
          )}
          <div className="flex-1">
            <TractorListing {...tractorListingProps} isMobile={isMobile} reel={tractorListingProps.reel} />
          </div>
        </div>
      </div>
    </section>
  );

  return {
    component: TractorListingComponent,
    paginationInfo,
  };
}
