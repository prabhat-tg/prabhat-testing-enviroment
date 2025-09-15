import React from 'react';
import dynamic from 'next/dynamic';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import { getAllTyreDealerBrands } from '@/src/services/tyre/all-tyre-dealer-brands';
import { getAllStatesBySlug } from '@/src/services/geo/get-states-by-slug';
import { getAllDealerListing } from '@/src/services/tyre/all-dealer-listing';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getAllSuggestedDealerListing } from '@/src/services/tyre/suggested-dealer-list';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';

const DesktopHeader = dynamic(() => import('@/src/components/shared/header/DesktopHeader'));
const DealershipRegistrationForm = dynamic(() => import('../tyreComponents/components/dealer/dealershipRegistrationForm/DealershipRegistrationForm'));
const WhatsAppTopButton = dynamic(() => import('@/src/features/tyreComponents/commonComponents/WhatsAppTopButton'));

const TyreDealersByBrands = dynamic(() => import('./tyresByBrands/TyreDealersByBrands'));
const TyreDealersByStates = dynamic(() => import('./TyreDealersByStates/TyreDealersByStates'));
const TyreFaqsData = dynamic(() => import('./tyreFAQs/TyreFaqsData'));
const JoinOurCommunityServer = dynamic(() => import('@/src/components/shared/community/JoinOurCommunityServer'));
const TractorGyanOfferings = dynamic(() => import('@/src/components/shared/offerings/TractorGyanOfferings'));
const AboutTractorGyanServer = dynamic(() => import('@/src/components/shared/about/AboutTractorGyanServer'));
const FooterComponents = dynamic(() => import('@/src/features/tyre/FooterComponents'));

import DealerFilterSection from '../tyreComponents/components/dealer/dealerFilterSection/DealerFilterSection';

function unwrapSettled(res, fallback = null) {
  if (!res) return fallback;
  return res.status === 'fulfilled' ? res.value : fallback;
}

export default async function TractorTyreDealersPage({ params, searchParams }) {
  const currentLang = await getSelectedLanguage().catch(() => 'en');

  const searchParamsObj = searchParams || {};
  const currentPage = Number(searchParamsObj?.page) || 1;
  const PAGE_SIZE = 15;
  const start_limit = (currentPage - 1) * PAGE_SIZE;
  const end_limit = PAGE_SIZE * (currentPage ?? 0);

  const [
    isMobileSettled,
    dictionarySettled,
    seoSettled,
    tyreBrandsSettled,
    dealerStatesSettled,
    tyreDealerBrandsSettled,
    dealerListingSettled,
    suggestedDealersSettled,
    statesSettled,
  ] = await Promise.allSettled([
    isMobileView(),
    getDictionary(currentLang),
    getSEOByPage(`${currentLang === 'en' ? 'tractor-tyre-dealers-in-india' : `${currentLang}/tractor-tyre-dealers-in-india`}`),
    getTyreBrands(),
    getAllStatesBySlug({ pageSlug: 'tyre-dealers' }),
    getAllTyreDealerBrands({ brand: null, state: null, city: null }),
    getAllDealerListing('', {
      start_limit,
      end_limit,
      search_keyword: searchParamsObj?.search || '',
    }),
    getAllSuggestedDealerListing({ dealer_type: 'tyre' }),
    getAllStates(),
  ]);

  const isMobile = unwrapSettled(isMobileSettled, false);
  const translation = unwrapSettled(dictionarySettled, {});
  const seoData = unwrapSettled(seoSettled, null);
  const tyreBrands = unwrapSettled(tyreBrandsSettled, []);
  const dealerStates = unwrapSettled(dealerStatesSettled, []);
  const tyreDealerBrands = unwrapSettled(tyreDealerBrandsSettled, { data: [] });
  const dealerResult = unwrapSettled(dealerListingSettled, { data: [], count: 0 });
  const suggestedDealers = unwrapSettled(suggestedDealersSettled, { data: [] });
  const states = unwrapSettled(statesSettled, []);

  const safeTyreBrands = Array.isArray(tyreBrands) ? tyreBrands : tyreBrands.data ?? [];
  const safeSuggestedDealers = suggestedDealers?.data ?? [];
  const safeStates = Array.isArray(states) ? states : states?.data ?? [];
  const safeTyreDealerBrands = tyreDealerBrands?.data ?? tyreDealerBrands ?? [];

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} />

      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />

      <DealerFilterSection
        translation={translation}
        isMobile={isMobile}
        dealerResult={dealerResult}
        currentPage={currentPage}
        searchrouteSlug={params}
        tyreBrands={safeTyreBrands}
        states={safeStates}
        suggestedDealers={safeSuggestedDealers}
        currentLang={currentLang}
      />

      <DealershipRegistrationForm translation={translation} />

      <TyreDealersByBrands
        translation={translation}
        isMobile={isMobile}
        bgColor={'bg-section-gray'}
        tyreDealerBrands={safeTyreDealerBrands}
        currentLang={currentLang}
      />

      <TyreDealersByStates
        translation={translation}
        isMobile={isMobile}
        dealerStates={dealerStates}
        prefLang={currentLang}
      />

      <TyreFaqsData pageSlug={'tractor-dealers-in-india'} headingKey={'tyrefaqs.tractorTyreDealerHome'} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={safeTyreBrands}
        defaultEnquiryType={'Tyre'}
        isMobile={isMobile}
      />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={`${currentLang == 'hi' ? 'hi/' : ''}tractor-dealers-in-india`} translation={translation} />

      <FooterComponents translation={translation} />
    </>
  );
}