import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import DealerFilterSection from '../tyreComponents/components/dealer/dealerFilterSection/DealerFilterSection';
import DealershipRegistrationForm from '../tyreComponents/components/dealer/dealershipRegistrationForm/DealershipRegistrationForm';
import TyreDealersByBrands from './tyresByBrands/TyreDealersByBrands';
import TyreDealersByStates from './TyreDealersByStates/TyreDealersByStates';
import TyreFAQs from './tyreFAQs/TyreFAQs';
import TyreDealerDetail from '../tyreComponents/components/dealer/dealerDetails/TyreDealerDetail';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getAllTyreDealerBrands } from '@/src/services/tyre/all-tyre-dealer-brands';
import { getAllStatesBySlug } from '@/src/services/geo/get-states-by-slug';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import { getAllDealerListing } from '@/src/services/tyre/all-dealer-listing';
import { getAllStates } from '@/src/services/tyre/all-state';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import { getAllSuggestedDealerListing } from '@/src/services/tyre/suggested-dealer-list';
import {
  TyreDealerBrandAndStateHtml,
  TyreDealerBrandOnlyHtml,
  TyreDealerBrandStateAndCityHtml,
  TyreDealerCityAndStateHtml,
  TyreDealerCityOnlyHtml,
  TyreDealerDetailPageHtml,
  TyreDealerStateOnlyHtml,
} from '@/src/data/about-data/static-html';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';

async function fetchTyreDealerDetail(dealerId) {
  const res = await fetch('https://staging.tractorgyan.com/api/dealer_detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: dealerId }),
  });

  if (!res.ok) throw new Error('Dealer not found');
  return res.json();
}

export default async function TyreDealersSlugPage({ params, searchParams }) {
  const routeSlug = await params;
  const searchParamsObj = await searchParams;
  const PAGE_SIZE = 15;

  const prefLang = await getSelectedLanguage();
  const seoSlug = `tyre-dealers/${routeSlug.slug.join('/')}`;
  const currentPage = Number(searchParamsObj?.page) || 1;

  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const tyreBrands = await getTyreBrands();
  const tyreDealerBrands = await getAllTyreDealerBrands({
    brand: null,
    state: null,
    city: null,
    lang: prefLang,
  });
  const states = await getAllStates();

  let staticData;

  const dealerStates = await getAllStatesBySlug({ pageSlug: 'tyre-dealers', lang: prefLang });
  console.log('dealerStates:', dealerStates);

  const faqs = await getTyreFAQs({
    langPrefix: prefLang,
    slug: 'tractor-dealers-in-india',
  });

  let dealerDetail = null;
  let dealerResult;
  let suggestedDealers;

  const numericSlug = routeSlug.slug.find(item => /^\d+$/.test(item));

  if (numericSlug) {
    try {
      dealerDetail = await fetchTyreDealerDetail(numericSlug);
      console.log('Fetched dealer detail:', dealerDetail);
    } catch (e) {
      console.error('Error fetching dealer:', e);
    }
    staticData = TyreDealerDetailPageHtml[prefLang]
      .replaceAll('{dealer-name}', dealerDetail?.data[0]?.dealership_name || 'Dealer')
      .replaceAll('{city-name}', dealerDetail?.data[0]?.city || 'City')
      .replaceAll('{state-name}', dealerDetail?.data[0]?.state || 'State');
  } else {
    [dealerResult, suggestedDealers] = await Promise.all([
      getAllDealerListing(encodeURIComponent(routeSlug.slug.join('/')), {
        start_limit: (currentPage - 1) * PAGE_SIZE,
        end_limit: PAGE_SIZE * (currentPage ?? 0),
        search_keyword: searchParamsObj?.search || '',
      }),
      getAllSuggestedDealerListing({ dealer_type: 'tyre' }),
    ]);

    console.log(dealerResult, 'dealerResult');

    let mode = '';
    if (dealerResult?.state) {
      mode = 'STATE';
    }
    if (dealerResult?.city) {
      mode = 'CITY';
    }
    if (dealerResult?.brand_name) {
      mode = 'BRAND';
    }
    if (dealerResult?.brand_name && dealerResult?.state) {
      mode = 'BRAND_STATE';
    }
    if (dealerResult?.brand_name && dealerResult?.state && dealerResult?.city) {
      mode = 'BRAND_STATE_CITY';
    }
    if (dealerResult.state && dealerResult.city) {
      mode = 'STATE_CITY';
    }

    if (dealerResult && dealerResult.brand_name && Array.isArray(tyreBrands)) {
      const matchedBrand = tyreBrands.find(tyreBrand => {
        const brandName = tyreBrand.name || '';
        const dealerBrand = dealerResult.brand_name || '';
        return (
          brandName.toUpperCase() === dealerBrand.toUpperCase() ||
          brandName === dealerBrand ||
          brandName.replace(/\b\w/g, c => c.toUpperCase()) ===
          dealerBrand.replace(/\b\w/g, c => c.toUpperCase()) ||
          brandName.toLowerCase() === dealerBrand.toLowerCase()
        );
      });
      if (matchedBrand) {
        dealerResult.brand_name = matchedBrand.name;
      }
    }

    (console.log('Mode is:', mode), dealerResult.city, dealerResult.state);

    setStaticData(mode);
  }

  function setStaticData(mode) {
    switch (mode) {
      case 'STATE':
        staticData = TyreDealerStateOnlyHtml[prefLang].replaceAll(
          '{state-name}',
          dealerResult.state
        );
        break;
      case 'CITY':
        staticData = TyreDealerCityOnlyHtml[prefLang].replaceAll('{city-name}', dealerResult.city);
        break;
      case 'BRAND':
        staticData = TyreDealerBrandOnlyHtml[prefLang].replaceAll(
          '{brand-name}',
          dealerResult.brand_name
        );
        break;
      case 'STATE_CITY':
        staticData = TyreDealerCityAndStateHtml[prefLang]
          .replaceAll('{state-name}', dealerResult.state)
          .replaceAll('{city-name}', dealerResult.city);
        break;
      case 'BRAND_STATE':
        staticData = TyreDealerBrandAndStateHtml[prefLang]
          .replaceAll('{brand-name}', dealerResult.brand_name)
          .replaceAll('{state-name}', dealerResult.state);
        break;
      case 'BRAND_STATE_CITY':
        staticData = TyreDealerBrandStateAndCityHtml[prefLang]
          .replaceAll('{brand-name}', dealerResult.brand_name)
          .replaceAll('{state-name}', dealerResult.state)
          .replaceAll('{city-name}', dealerResult.city);
        break;
      default:
    }
  }
  // let seoData = null;
  let seoRes;

  if (dealerDetail) {
    console.log('Fetching SEO for dealer detail page', routeSlug.slug[routeSlug.slug.length - 1]);

    seoRes = await getDetailPageHeaderSEO({
      id: routeSlug.slug[routeSlug.slug.length - 1],
      page_type: 'tyre-dealer-detail',
      lang: prefLang,
    });
  } else {
    seoRes = await getDetailPageHeaderSEO({
      page_type: 'dealer_listing_page',
      brand_name: dealerResult?.brand_name,
      state: dealerResult?.state,
      city: dealerResult?.city,
      lang: prefLang,
    });
  }
  return (
    <>
      <SeoHead seo={{}} seoHTMLDescription={seoRes ? seoRes.data : {}} preloadUrls={[]} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      {!dealerDetail && (
        <>
          <DealerFilterSection
            translation={translation}
            isMobile={isMobile}
            dealerResult={dealerResult}
            currentPage={currentPage}
            searchrouteSlug={routeSlug}
            tyreBrands={tyreBrands}
            states={states}
            routeSlug={routeSlug.slug}
            suggestedDealers={suggestedDealers.data}
            currentLang={prefLang}
          />
          <DealershipRegistrationForm translation={translation} />

          <TyreDealersByBrands
            translation={translation}
            isMobile={isMobile}
            bgColor={'bg-section-gray'}
            tyreDealerBrands={tyreDealerBrands}
            currentLang={prefLang}
          />
          <TyreDealersByStates
            dealerStates={dealerStates}
            translation={translation}
            isMobile={isMobile}
            prefLang={prefLang}
          />
          <TyreFAQs
            translation={translation}
            faqs={faqs}
            headingKey={'tyrefaqs.tractorTyreDealerHome'}
          />
        </>
      )}

      {dealerDetail && (
        <>
          <TyreDealerDetail
            dealerDetail={dealerDetail}
            translation={translation}
            currentLang={prefLang}
            dealerType="tyre"
            isMobile={isMobile}
          />
          <DealershipRegistrationForm translation={translation} />

          <TyreDealersByBrands
            translation={translation}
            isMobile={isMobile}
            bgColor={'bg-section-gray'}
            tyreDealerBrands={tyreDealerBrands}
            currentLang={prefLang}
          />
          <TyreDealersByStates
            dealerStates={dealerStates}
            translation={translation}
            isMobile={isMobile}
            prefLang={prefLang}
          />
          <TyreFAQs
            faqs={faqs}
            headingKey={'tyrefaqs.tractorTyreDealerHome'}
            translation={translation}
          />
        </>
      )}

      <WhatsAppTopButton
        translation={translation}
        currentLang={prefLang}
        tyreBrands={tyreBrands}
        defaultEnquiryType={'Tyre-Dealer'}
        isMobile={isMobile}
      />
      <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
      <TractorGyanOfferings translation={translation} />
      {staticData && (
        <AboutTractorGyanServer
          slug={`${prefLang == 'hi' ? 'hi/' : ''}tractor-dealers-in-india`}
          translation={translation}
          isStatic={true}
          staticData={staticData}
        />
      )}
      <FooterComponents translation={translation} />
    </>
  );
}
