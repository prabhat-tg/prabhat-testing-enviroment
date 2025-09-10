import React, { Suspense } from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getAllStatesBySlug } from '@/src/services/geo/get-states-by-slug';
import DealerFilterSection from '../tyreComponents/components/dealer/dealerFilterSection/DealerFilterSection';
import { getAllTractorDealerListing } from '@/src/services/tractor/get-all-tractor-dealer-listing';
import { getAllStates } from '@/src/services/tyre/all-state';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getTractorSuggestedDealerList } from '@/src/services/tractor/get-tractor-suggested-dealer-list';
import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';
import DealershipRegistrationForm from '../tyreComponents/components/dealer/dealershipRegistrationForm/DealershipRegistrationForm';
import TyreDealersByStates from '../tyre/TyreDealersByStates/TyreDealersByStates';
import TyreFaqsData from '../tyre/tyreFAQs/TyreFaqsData';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import DealershipEnquiryForm from '@/src/components/shared/dealership-enquiry/DealershipEnquiryForm';
import { getTractorDealerUrls } from '@/src/services/tractor/get-tractor-dealer-urls';

export default async function TractorDealersPage({ params, searchParams, url_slug }) {
  let currentLang = 'en';
  let translation = {};
  let isMobile = false;
  let seoData = {};
  let seoHtmlDescription;
  let tyreBrands = [];
  let dealerStates = [];
  let dealerResult = { data: [], count: 0 };
  let suggestedDealers = null;
  let states = [];
  let allTractorBrands = [];
  let tractorDealerUrls = [];

  console.log("url_slug:", url_slug);

  try {
    currentLang = await getSelectedLanguage();
  } catch (error) {
    console.error('Error fetching selected language:', error);
  }

  try {
    translation = await getDictionary(currentLang);
  } catch (error) {
    console.error('Error fetching dictionary:', error);
  }

  try {
    isMobile = await isMobileView();
  } catch (error) {
    console.error('Error checking mobile view:', error);
  }

  try {
    if (url_slug == 'tractor-dealers-in-india') {
      seoData = await getSEOByPage(
        `${currentLang === 'en' ? 'tractor-dealers-in-india' : `${currentLang}/tractor-dealers-in-india`}`
      );
    } else {
      seoHtmlDescription = await getDetailPageHeaderSEO({
        page_type: 'tractor_dealer_listing_page',
        url_slug: 'tractor-dealers/' + url_slug,
        lang: currentLang,
      });
    }
  } catch (error) {
    console.error('Error fetching SEO data:', error);
  }

  try {
    tyreBrands = await getTyreBrands();
  } catch (error) {
    console.error('Error fetching tyre brands:', error);
  }

  try {
    dealerStates = await getAllStatesBySlug({ pageSlug: 'tractor-dealers' });
  } catch (error) {
    console.error('Error fetching dealer states:', error);
  }

  const searchParamsObj = await searchParams;
  const paramObj = await params;
  const currentPage = Number(searchParamsObj?.page) || 1;
  const PAGE_SIZE = 23;

  // Use tractor dealer API instead of tyre dealer API
  try {
    dealerResult = await getAllTractorDealerListing({
      url_slug, // Pass the page URL slug
      brand_name: searchParamsObj?.brand || null,
      state: searchParamsObj?.state || null,
      city: searchParamsObj?.city || null,
      search_keyword: searchParamsObj?.search || '',
      start_limit: (currentPage - 1) * PAGE_SIZE,
      end_limit: PAGE_SIZE,
    });
  } catch (error) {
    console.error('Error fetching tractor dealer listing:', error);
  }

  if (dealerResult.data.length === 0) {

    try {
      suggestedDealers = await getTractorSuggestedDealerList({
        dealer_type: 'tractor',
        start_limit: 0,
        end_limit: 10
      });
    } catch (error) {
      console.error('Error fetching suggested tractor dealers:', error);
    }
  }

  try {
    states = await getAllStates();
  } catch (error) {
    console.error('Error fetching states:', error);
  }

  try {
    allTractorBrands = await getAllTractorBrands();
  } catch (error) {
    console.error('Error fetching tractor brands:', error);
  }

  // Fetch tractor dealer URLs for brands section
  try {
    tractorDealerUrls = await getTractorDealerUrls({
      lang: currentLang,
      isStatePage: true
    });
  } catch (error) {
    console.error('Error fetching tractor dealer URLs:', error);
  }

  return (
    <main className="pt-4">
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        seoHTMLDescription={seoHtmlDescription?.data}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />

      <DealerFilterSection
        page="tractor"
        translation={translation}
        isMobile={isMobile}
        dealerResult={dealerResult}
        currentPage={currentPage}
        searchrouteSlug={params}
        tyreBrands={allTractorBrands}
        states={states}
        suggestedDealers={suggestedDealers?.data || []}
        currentLang={currentLang}
        routeSlug={url_slug == 'tractor-dealers-in-india' ? [] : url_slug.split('/')}
        dealerType="tractor"
        urlSlug="tractor-dealers-in-india"
      />

      <div id="dealer-registration">
        <DealershipEnquiryForm
          bgColor="bg-green-lighter"
          brands={allTractorBrands}
          translation={translation}
          currentLang={currentLang}
          type="TRACTOR"
          submitBtnText={translation.enquiryForm?.submitEnquiry || 'Submit Enquiry'}
        />
      </div>

      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={allTractorBrands}
        bgColor="bg-section-gray"
        toggleView={true}
        heading={translation?.tractorDealers?.brandsDealers || 'Tractor Dealers by Brands'}
      />

      <TyreDealersByStates
        translation={translation}
        isMobile={isMobile}
        dealerStates={dealerStates}
        prefLang={currentLang}
        title={translation?.tractorDealers?.title || 'Tractor Dealers in India'}
        buttonText={translation?.buttons?.viewAllStates || 'View All States'}
      />

      <TyreFaqsData
        pageSlug={'tractor-dealers-in-india'}
        headingKey={'tyrefaqs.tractorTyreDealerHome'}
      />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={allTractorBrands}
        defaultEnquiryType={translation?.tractorDealers?.title || 'Tractor Dealer'}
        isMobile={isMobile}
      />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer
        slug={`${currentLang == 'hi' ? 'hi/' : ''}tractor-dealers-in-india`}
        translation={translation}
        isTractorDealer={url_slug == 'tractor-dealers-in-india' ? false : true}
        tractorDealerPayload={{
          lang: currentLang,
          ...dealerResult.brand_name && { brand_name: dealerResult.brand_name },
          ...dealerResult.state && { state: dealerResult.state },
          ...dealerResult.city && { city: dealerResult.city },
        }}
      />
      <FooterComponents translation={translation} />
    </main>
  );
}
