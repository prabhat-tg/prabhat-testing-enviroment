import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView, prepareTyreListingComponent } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations

import UpdatesSection from '@/src/features/tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import {
  getTyreReels,
  getTyreVideos,
  getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';

import SecondHandMainSection from '@/src/features/secondHand/secondHandTopSection/SecondHandTopSection';

import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import NewsSection from '../tyre/tyreNews/NewsSection';
import { getTyreNewsByBrand } from '@/src/services/tyre/tyre-news-by-brand';
import { getAllTractorSubsidyStates } from '@/src/services/geo/get-subsidy-states';
import SearchUsedModal from '@/src/components/shared/search-used-modal/SearchUsedModal';
import SecondHandMiniTractorCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorCards';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import SecondHandMiniTractorMobileCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorMobileCards';
import TyrePageHeader from '../tyre/allTyreListing/tyresListing/TyrePageHeader';
import TyresListingClient from '../tyre/allTyreListing/tyresListing/TyresListingClient';
import TractorListing from '../tractors/listing/TractorListing';
import SecondHandTractorListing from './SecondHandTractorListing';
import { getSecondHandTopContent } from '@/src/services/second-hand-tractors/SecondHandTractorTopContent';
import { getSecondHandTractorPriceList } from '@/src/services/second-hand-tractors/SecondHandTractorPriceList';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import TyreDealersByStates from '../tyre/TyreDealersByStates/TyreDealersByStates';
export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

const usedTractorModels = [
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Swaraj 744 XT',
    url: '/used-tractors/swaraj-744-xt',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Swaraj 744 XT',
    url: '/used-tractors/swaraj-744-xt',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
  {
    text: 'Swaraj 744 XT',
    url: '/used-tractors/swaraj-744-xt',
  },
  {
    text: 'Farmtrac 6605',
    url: '/used-tractors/farmtrac-6605',
  },
];

export default async function SecondHandTractorsPage({ params, searchParams }) {
  const param = await params;
  const searchParamObj = await searchParams; // Get the search params from the request
  const allTractorBrandsData = await getAllTractorBrands();
  const allTractorBrands = allTractorBrandsData || [];

  // const seoData = await getSEOByPage("tyres");
  const news = await getTyreNewsByBrand('tyre-news,mrf,jk,apollo,ceat');
  const dealerStates = await getAllTractorSubsidyStates({
    pageSlug: 'tractor-dealers',
  });

  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);
  console.log('seprams', searchParams);

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = 'second-hand-tractor'; // Static for this page

  const searchParamsObj = await searchParams;

  const tyreBrandsData = await getTyreBrands();
  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos('tractor-tyre-in-india'),
    getTyreReels('tractor-tyre-in-india'),
    getTyreWebstories('tractor-tyre-in-india'),
  ]);
  // const priceList = await getAllPriceList({
  //   lang: currentLang,
  //   tyre_slug: pageSlug,
  // });

  const basePath = '/used-tractors';

  const tractorBrands = await getAllTractorBrands();

  let topContent;
  let priceList;
  let faqs;

  try {
    topContent = await getSecondHandTopContent({
      ad_title: pageSlug,
      currentLang: currentLang,
      device_type: isMobile ? 'mobile' : 'desktop',
    });
    priceList = await getSecondHandTractorPriceList({});
    faqs = await getUsedTractorFAQs({
      langPrefix: currentLang,
      slug: pageSlug,
    });
  } catch (error) {
    console.error('Error fetching data for FrontTyrePage:', error);
    return <div>Error loading page.</div>;
  }

  const { tyresListingClientProps, tyresListingProps } = await prepareTyreListingComponent({
    param: params,
    isMobile,
    pageOrigin: 'tractorsByBrand',
    pageSlug,
    pageType: 'used_tractors',
    prefLang: currentLang,
    translation,
    tyreBrands: tractorBrands,
    ITEMS_PER_PAGE: 16,
    searchParamsObj: searchParamObj,
    showTractorHPFilter: true,
    showLocationFilter: true,
  });

  return (
    <>
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />
      <main>
        <div className="lg:mt-[159px]">
          <SecondHandMainSection
            headingTitle={translation.headings.secondHandTractors}
            currentLang={currentLang}
            translation={translation}
            priceList={priceList}
            topContent={topContent}
            isMobile={isMobile}
          />

          <section className="mt-10 bg-section-gray py-6 md:py-8 lg:py-10">
            <div className="container mx-auto">
              <TyrePageHeader
                isMobile={isMobile}
                brandName="Usedd"
                translation={translation}
                heading={translation?.headings?.allTractorsByBrand}
                activeFilters={tyresListingProps.activeFilters}
                tyresListingClientProps={tyresListingClientProps}
                searchPlaceholder="Search for Used Tractors"
              />
              <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
                {/* Filters Column */}
                {!isMobile && (
                  // TODO:: Check layout in all screens and update post confirmation
                  <div className="w-1/4">
                    {/* <div className="md:w-[32%] lg:w-[25%] xl:w-[30%]"> */}
                    <TyresListingClient {...tyresListingClientProps} />
                  </div>
                )}

                {/* Results Column */}
                <div className="flex-1">
                  {/* Use new API-based listing for used_tractors only */}
                  {tyresListingProps.pageType === 'used_tractors' ? (
                    <SecondHandTractorListing
                      brand={tyresListingProps.activeFilters?.brand}
                      state={tyresListingProps.activeFilters?.state}
                      district={tyresListingProps.activeFilters?.district}
                      search={tyresListingProps.activeFilters?.searchQuery || tyresListingProps.activeFilters?.search}
                      page={tyresListingProps.currentPage}
                      itemsPerPage={tyresListingProps.itemsPerPage}
                    />
                  ) : (
                    <TractorListing {...tyresListingProps} />
                  )}
                </div>
              </div>
            </div>
          </section>

          {isMobile && (
            <TractorsByBrands
              translation={translation}
              langPrefix={currentLang}
              allTractorBrands={allTractorBrands}
              heading={translation.secondHandTractors.topSecondHandTractorBrands}
              bgColor={'bg-white'}
            />
          )}

          <SearchUsedModal
            langPrefix={currentLang}
            isMobile={isMobile}
            translation={translation}
            data={usedTractorModels}
            heading={translation.secondHandTractors.searchUsedByModels}
            buttonText="View All Models"
          />
          {/* TODO replace this with tyredealers by state */}

          <TyreDealersByStates
            title="Second Hand Tractors By State"
            translation={translation}
            isMobile={isMobile}
            dealerStates={dealerStates}
            buttonText={'View All States'}
          />

          {isMobile ? (
            <>
              <SecondHandMiniTractorMobileCards
                langPrefix={currentLang}
                isMobile={isMobile}
                translation={translation}
                data={usedTractorModels}
                heading={translation.secondHandTractors.buySecondHandMiniTractors}
                bgColor={'bg-section-gray'}
                buttonText={'View All Second Hand Tractors'}
              />
            </>
          ) : (
            <>
              <SecondHandMiniTractorCards
                langPrefix={currentLang}
                isMobile={isMobile}
                translation={translation}
                data={usedTractorModels}
                buttonText={'View All Second Hand Tractors'}
                heading={translation.secondHandTractors.buySecondHandMiniTractors}
              />
            </>
          )}

          {isMobile && (
            <TyreFAQs faqs={faqs} translation={translation} headingKey={'faqs.usedTractorfaqs'} />
          )}
          <NewsSection
            title={translation.secondHandTractors.news}
            translation={translation}
            langPrefix={currentLang}
            news={news}
            bgColor={'bg-section-white'}
          />
          <UpdatesSection
            videos={videos}
            reels={reels}
            webstories={webstories}
            translation={translation}
            slug={'tractor-tyre-in-india'}
            brandName={'Tractors'}
            bgColor={'bg-section-gray'}
            linkUrls={{
              videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
              webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
              reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
            }}
          />
          {!isMobile && (
            <TyreFAQs
              faqs={faqs}
              translation={translation}
              headingKey={'faqs.usedTractorfaqs'}
              bgColor={'bg-section-white'}
            />
          )}
          <WhatsAppTopButton
            translation={translation}
            currentLang={currentLang}
            tyreBrands={tyreBrandsData}
            defaultEnquiryType={'Tyre'}
            isMobile={isMobile}
          />
          <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
          <TractorGyanOfferings translation={translation} />
          <AboutTractorGyanServer slug={pageSlug} translation={translation} />
        </div>
      </main>
      <FooterComponents translation={translation} />
    </>
  );
}
