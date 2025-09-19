import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import DealershipRegistrationForm from '../tyreComponents/components/dealer/dealershipRegistrationForm/DealershipRegistrationForm';
import TyreDealersByBrands from './tyresByBrands/TyreDealersByBrands';
import { getAllTyreDealerBrands } from '@/src/services/tyre/all-tyre-dealer-brands';
import TyreDealersByStates from './TyreDealersByStates/TyreDealersByStates';
import { getAllStatesBySlug } from '@/src/services/geo/get-states-by-slug';
import TyreFaqsData from './tyreFAQs/TyreFaqsData';
import DealerFilterSection from '../tyreComponents/components/dealer/dealerFilterSection/DealerFilterSection';
import { getAllDealerListing } from '@/src/services/tyre/all-dealer-listing';
import { getAllStates } from '@/src/services/tyre/all-state';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getAllSuggestedDealerListing } from '@/src/services/tyre/suggested-dealer-list';

export default async function TractorTyreDealersPage({ params, searchParams }) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage(
    `${currentLang === 'en' ? 'tractor-tyre-dealers-in-india' : `${currentLang}/tractor-tyre-dealers-in-india`}`
  );
  const tyreBrands = await getTyreBrands();
  const dealerStates = await getAllStatesBySlug({ pageSlug: 'tyre-dealers' });
  const tyreDealerBrands = await getAllTyreDealerBrands({
    brand: null,
    state: null,
    city: null,
  });
  const searchParamsObj = await searchParams;
  const currentPage = Number(searchParamsObj?.page) || 1;
  const PAGE_SIZE = 15;
  const dealerResult = await getAllDealerListing('', {
    start_limit: (currentPage - 1) * PAGE_SIZE,
    end_limit: PAGE_SIZE * (currentPage ?? 0),
    search_keyword: searchParamsObj?.search || '',
  });
  const suggestedDealers = await getAllSuggestedDealerListing({ dealer_type: 'tyre' });
  const states = await getAllStates();

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <DealerFilterSection
        translation={translation}
        isMobile={isMobile}
        dealerResult={dealerResult}
        currentPage={currentPage}
        searchrouteSlug={params}
        tyreBrands={tyreBrands}
        states={states}
        suggestedDealers={suggestedDealers.data}
        currentLang={currentLang}
      />
      <DealershipRegistrationForm translation={translation} />
      <TyreDealersByBrands
        translation={translation}
        isMobile={isMobile}
        bgColor={'bg-section-gray'}
        tyreDealerBrands={tyreDealerBrands}
        currentLang={currentLang}
      />
      <TyreDealersByStates
        translation={translation}
        isMobile={isMobile}
        dealerStates={dealerStates}
        prefLang={currentLang}
      />
      <TyreFaqsData
        pageSlug={'tractor-dealers-in-india'}
        headingKey={'tyrefaqs.tractorTyreDealerHome'}
      />
      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrands}
        defaultEnquiryType={'Tyre'}
        isMobile={isMobile}
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer
        slug={`${currentLang == 'hi' ? 'hi/' : ''}tractor-dealers-in-india`}
        translation={translation}
      />
      <FooterComponents translation={translation} />
    </>
  );
}
