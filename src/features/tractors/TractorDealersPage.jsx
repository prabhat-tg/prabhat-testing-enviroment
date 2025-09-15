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
import { getTractorDealerDetail } from '@/src/services/tractor/get-tractor-dealer-detail';
import TyreDealerDetail from '../tyreComponents/components/dealer/dealerDetails/TyreDealerDetail';
import { TractorDealerDetailPageHtml } from '@/src/data/about-data/tractor-dealer-static-html';

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
  let dealerDetail = null;
  let staticData = null;

  console.log("url_slug:", url_slug);

  // Check if this is a dealer detail page (contains numeric ID at the end)
  const urlParts = url_slug ? url_slug.split('/') : [];
  const numericId = urlParts.find(part => /^\d+$/.test(part));
  const isDetailPage = !!numericId;

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
    } else if (isDetailPage) {
      // For detail pages, use different SEO approach
      seoHtmlDescription = await getDetailPageHeaderSEO({
        id: numericId,
        page_type: 'tractor-dealer-detail',
        lang: currentLang,
      });
    } else {
      seoHtmlDescription = await getDetailPageHeaderSEO(
        isDetailPage ? {
          page_type: 'tractor-dealer-detail',
          id: dealerDetail?.data?.[0]?.id,
          lang: 'en'
        } : {
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

  // Fetch dealer detail if this is a detail page
  if (isDetailPage) {
    try {
      dealerDetail = await getTractorDealerDetail(numericId);
      console.log('Fetched tractor dealer detail:', dealerDetail);

      // Generate static data for dealer detail page
      if (dealerDetail?.data?.[0]) {
        const dealer = dealerDetail.data[0];
        staticData = TractorDealerDetailPageHtml[currentLang]
          .replaceAll('{dealer-name}', dealer.dealership_name || 'Dealer')
          .replaceAll('{city-name}', dealer.city || 'City')
          .replaceAll('{state-name}', dealer.state || 'State')
          .replaceAll('{city-name-lower}', (dealer.city || 'city').toLowerCase())
          .replaceAll('{state-name-lower}', (dealer.state || 'state').toLowerCase());
      }
    } catch (error) {
      console.error('Error fetching tractor dealer detail:', error);
    }
  }

  // Use tractor dealer API instead of tyre dealer API (only for listing pages)
  if (!isDetailPage) {
    try {
      dealerResult = await getAllTractorDealerListing({
        url_slug, // Pass the page URL slug
        brand_name: searchParamsObj?.brand || null,
        state: searchParamsObj?.state || null,
        city: searchParamsObj?.city || null,
        search_keyword: searchParamsObj?.search || '',
        start_limit: (currentPage - 1) * PAGE_SIZE,
        end_limit: PAGE_SIZE * currentPage,
      });
    } catch (error) {
      console.error('Error fetching tractor dealer listing:', error);
    }
  }

  if (dealerResult.data.length === 0 && !isDetailPage) {

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

  // Debug: Log current translation structure for FAQ keys
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Current translation tractorfaqs keys:', translation?.tractorfaqs);

    // Check which keys are missing
    const requiredKeys = [
      'tractorDealer',
      'tractorDealerDetail',
      'tractorDealerBrand',
      'tractorDealerState',
      'tractorDealerCity',
      'tractorDealerBrandState',
      'tractorDealerStateCity',
      'tractorDealerBrandStateCity'
    ];

    const missingKeys = requiredKeys.filter(key => !translation?.tractorfaqs?.[key]);
    if (missingKeys.length > 0) {
      console.warn('Missing FAQ translation keys:', missingKeys);
    }
  }

  // Function to generate dynamic FAQ heading key based on page context
  const getFaqHeadingKey = () => {
    // Helper function to check if translation key exists
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((current, key) => current?.[key], obj);
    };

    // For detail pages, use dealer-specific context
    if (isDetailPage && dealerDetail?.data?.[0]) {
      const key = 'tractorfaqs.tractorDealerDetail';
      return getNestedValue(translation, key) ? key : 'tractorfaqs.tractorDealer';
    }

    // For main page
    if (url_slug === 'tractor-dealers-in-india') {
      return 'tractorfaqs.tractorDealer';
    }

    // For listing pages, use dealerResult context
    const hasBrand = dealerResult.brand_name;
    const hasState = dealerResult.state;
    const hasCity = dealerResult.city;

    // Try specific combinations first, fallback to simpler ones if translation doesn't exist

    // Brand + State + City
    if (hasBrand && hasState && hasCity) {
      const key = 'tractorfaqs.tractorDealerBrandStateCity';
      if (getNestedValue(translation, key)) return key;
      // Fallback to Brand + State
      const fallbackKey = 'tractorfaqs.tractorDealerBrandState';
      if (getNestedValue(translation, fallbackKey)) return fallbackKey;
    }

    // Brand + State
    if (hasBrand && hasState) {
      const key = 'tractorfaqs.tractorDealerBrandState';
      if (getNestedValue(translation, key)) return key;
      // Fallback to Brand only
      const fallbackKey = 'tractorfaqs.tractorDealerBrand';
      if (getNestedValue(translation, fallbackKey)) return fallbackKey;
    }

    // State + City
    if (hasState && hasCity) {
      const key = 'tractorfaqs.tractorDealerStateCity';
      if (getNestedValue(translation, key)) return key;
      // Fallback to State only
      const fallbackKey = 'tractorfaqs.tractorDealerState';
      if (getNestedValue(translation, fallbackKey)) return fallbackKey;
    }

    // Brand only
    if (hasBrand) {
      const key = 'tractorfaqs.tractorDealerBrand';
      if (getNestedValue(translation, key)) return key;
    }

    // State only
    if (hasState) {
      const key = 'tractorfaqs.tractorDealerState';
      if (getNestedValue(translation, key)) return key;
    }

    // City only
    if (hasCity) {
      const key = 'tractorfaqs.tractorDealerCity';
      if (getNestedValue(translation, key)) return key;
    }

    // Default fallback - this should always exist
    return 'tractorfaqs.tractorDealer';
  };

  return (
    <main className={isMobile ? "pt-4" : "pt-8"}>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        seoHTMLDescription={seoHtmlDescription?.data}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />

      {/* Render dealer detail page */}
      {isDetailPage && dealerDetail && (
        <>
          <TyreDealerDetail
            dealerDetail={dealerDetail}
            translation={translation}
            currentLang={currentLang}
            dealerType="tractor"
            isMobile={isMobile}
          />
          <div id="dealer-registration">
            {/* <DealershipEnquiryForm
              bgColor="bg-green-lighter"
              brands={allTractorBrands}
              translation={translation}
              currentLang={currentLang}
              type="TRACTOR"
              submitBtnText={translation.enquiryForm?.submitEnquiry || 'Submit Enquiry'}
            /> */}
            <DealershipRegistrationForm translation={translation} dealerType="tractor" showBanner={true} />

          </div>

          <TractorsByBrands
            translation={translation}
            langPrefix={currentLang}
            allTractorBrands={allTractorBrands}
            bgColor="bg-section-gray"
            toggleView={true}
            isDealerPage={true}
            heading={translation?.headings?.tractorDealersByBrands || 'Tractor Dealers by Brands'}
          />

          <TyreDealersByStates
            translation={translation}
            isMobile={isMobile}
            dealerStates={dealerStates}
            prefLang={currentLang}
            title={translation?.tractorDealers?.title || 'Tractor Dealers in India'}
            buttonText={translation?.buttons?.viewAllStates || 'View All States'}
          />
        </>
      )}

      {/* Render listing page */}
      {!isDetailPage && (
        <>
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
            {/* <DealershipEnquiryForm
              bgColor="bg-green-lighter"
              brands={allTractorBrands}
              translation={translation}
              currentLang={currentLang}
              type="TRACTOR"
              submitBtnText={translation.enquiryForm?.submitEnquiry || 'Submit Enquiry'}
            /> */}
            <DealershipRegistrationForm translation={translation} dealerType={'tractor'} showBanner={true} />

          </div>

          <TractorsByBrands
            translation={translation}
            langPrefix={currentLang}
            allTractorBrands={allTractorBrands}
            bgColor="bg-section-gray"
            toggleView={true}
            isDealerPage={true}
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

        </>
      )}
      <TyreFaqsData
        headingKey={getFaqHeadingKey()}
        pageSlug={url_slug == 'tractor-dealers-in-india' ? false : true}
        tractorDealerPayload={{
          lang: currentLang,
          // For detail pages, use dealer detail data
          ...(isDetailPage && dealerDetail?.data?.[0] && {
            brand_name: dealerDetail.data[0].brand_name,
            state: dealerDetail.data[0].state,
            city: dealerDetail.data[0].city,
            dealership_name: dealerDetail.data[0].dealership_name
          }),
          // For listing pages, use dealerResult data
          ...(!isDetailPage && {
            ...dealerResult.brand_name && { brand_name: dealerResult.brand_name },
            ...dealerResult.state && { state: dealerResult.state },
            ...dealerResult.city && { city: dealerResult.city },
          })
        }}
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
        isStatic={isDetailPage}
        staticData={staticData}
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
