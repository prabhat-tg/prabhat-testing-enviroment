import React from 'react';

import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView, prepareTyreListingComponent } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations

import TyresListingClient from '@/src/features/tyre/allTyreListing/tyresListing/TyresListingClient';
import TyrePageHeader from '@/src/features/tyre/allTyreListing/tyresListing/TyrePageHeader';
import UpdatesSection from '@/src/features/tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import {
  getTyreReels,
  getTyreVideos,
  getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import ListingHeroSection from '@/src/components/shared/listingHeroSection/ListingHeroSection';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import TractorListing from '@/src/features/tractors/listing/TractorListing';
import NewsSection from '@/src/features/tyre/tyreNews/NewsSection';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import {
  tgb_implement_on_road_price,
  tgb_implement_on_road_price_mobile,
} from '@/src/utils/assets/banners';
import { tgi_implement_combine_harvester } from '@/src/utils/assets/icons';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import SubCategoryTabs from '@/src/components/shared/sub-category-tabs/SubCategoryTabs';
import { getImplementNews } from '@/src/services/implement/implement-news';
import { getAllImplementBrandsByType } from '@/src/services/implement/all-implement-brands-by-type';
import { getImplementFAQs } from '@/src/services/implement/get-implement-faqs';
import { getImplementCategoryTopContent } from '@/src/services/implement/get-implement-category-top-content';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import TractorListingData from '../tractors/listing/TractorListingData';
import { getAllImplementTypeListing } from '@/src/services/implement/get-all-implement-type-listing';
import { getImplementBrandFAQs } from '@/src/services/implement/get-all-implement-brand-faqs';
import { getImplementCategoryFilter } from '@/src/services/implement/get-implement-category-filter';
import { getAllImplementBrandListing } from '@/src/services/implement/get-all-implement-brand-listing';
import TyresPriceList from '../tyre/tyre-price/ListingMainSection';
import Link from 'next/link';
import { getImplementTypeTopContent } from '@/src/services/implement/get-implement-type-top-content';
import { checkImplementSlug } from '@/src/services/implement/check-implement-slug';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function TractorImplementByBrandPage({ params, searchParams }) {
  const param = await params; // Get the params from the request
  const searchParamObj = await searchParams; // Get the search params from the request
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = `tractor-implements/${param.brand}`; // Static for this page
  // const pageSlug = 'tyres'; // Temporary as data is not fetched for above slug

  // const params = await params;

  console.log('---params', param.brand)

  // const tractorBrands = await getAllTractorBrands();

  let brand_name;
  try {
    const check = await checkImplementSlug({
      slug: param.brand
    });
    // if (check[0].is_implement_type == '1') {
    //   brand_en = check[0].implement_type_en.charAt(0).toUpperCase() + check[0].implement_type_en.slice(1);
    //   brand_hi = check[0].implement_type_hi;
    // }
    if (check[0].is_brand == '1') {
      brand_name = currentLang == 'hi' ? check[0].brand_hi : check[0].brand_en.charAt(0).toUpperCase() + check[0].brand_en.slice(1);

    }
    console.log("check::", check);

  }
  catch (error) {
    console.log("Error in slug check::", error);
  }

  // TODO::
  // const brand = getBrandFromSlug('Massey-ferguson', tractorBrands);
  const brand = { name: `${param?.brand}` };

  let news;
  try {
    news = await getImplementNews(`${param.brand}`);
  } catch (error) {
    news = [];
  }

  const headingTitle = `${brand_name} ${translation.whatsappPopup.implements}`;

  const category = 'Implements';

  const tyreBrandsData = await getTyreBrands();
  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos(pageSlug),
    getTyreReels(pageSlug),
    getTyreWebstories(pageSlug),
  ]);

  // Get price list data using implement brand API (same as main listing)
  let priceList = [];
  try {
    const priceListResponse = await getAllImplementBrandListing({
      brand: param.brand,
      start_limit: 0,
      end_limit: 10, // Get first 10 items for price list display
      lang: currentLang,
    });
    priceList = priceListResponse.items || [];
  } catch (error) {
    console.error('Failed to fetch price list:', error);
    priceList = [];
  }

  // const seoData = await getSEOByPage("tyres");

  let topContent;
  try {
    topContent = await getImplementTypeTopContent({
      ad_title: `tractor-implements/${param.brand}`,
      device_type: isMobile ? 'mobile' : 'desktop',
      ad_type_content_lang: currentLang == 'en' ? 'english' : 'hindi',
    })



  } catch (error) {
    console.error('Failed to fetch implement top content:', error);
    topContent = null;
  }

  let allImplementBrands;
  try {
    allImplementBrands = await getAllImplementBrandsByType(`${param.brand}`);
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
    allImplementBrands = [];
  }

  const allImplementTypes = await getAllImplementTypes();

  let faqs = [];
  try {
    const faqResponse = await getImplementBrandFAQs({
      faq_tag: pageSlug, // 'seeding-and-planting'
      faq_lang: currentLang,
    });
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }

  // Fetch subcategories dynamically
  let subcategories = [];
  try {
    const categoryFilterResponse = await getImplementCategoryFilter({
      implement_type: param.brand,
      lang: currentLang,
    });
    if (categoryFilterResponse && categoryFilterResponse.success) {
      subcategories = categoryFilterResponse.data.map(item => ({
        name: item.name,
        name_en: item.name_en,
        img: item.image,
        url: item.url,
        sr_no: item.sr_no,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch subcategories:', error);
    // Fallback to hardcoded subcategories
  }

  const { tyresListingClientProps, tyresListingProps } = await prepareTyreListingComponent({
    param: params,
    isMobile,
    pageOrigin: 'tractorsByBrand',
    pageSlug,
    pageType: 'implement-brand',
    prefLang: currentLang,
    translation,
    tyreBrands: allImplementTypes, // Pass types instead of brands for filter
    allImplementTypes: allImplementTypes,
    ITEMS_PER_PAGE: 16,
    searchParamsObj: searchParamObj,
    showImplementBrandsSection: false, // Hide brands section
    showImplementTypesSection: true, // Show types section
    subcategories: subcategories,
    showBrandFilter: true,
    basePath: param.brand
  });

  // Get pagination info from TractorListingData
  // const { component: TractorListingComponent, paginationInfo } = await TractorListingData({
  //   params: param,
  //   searchParams: searchParamObj,
  //   // basePath: hpRange
  //   //   ? `${currentLang == 'hi' ? '/hi/' : '/'}${hpRange}`
  //   //   : `${currentLang == 'hi' ? '/hi' : ''}/tractor/${param['brand-name']}${isSeriesListing && seriesName ? `/${seriesName}` : ''}`,
  //   tractorBrands,
  //   // showBrandFilter: hpRange ? true : false,
  //   showSizeFilter: false,
  //   showTyreBrandsSection: false,
  //   // brandName: isSeriesListing
  //   //   ? brandByLang.name +
  //   //   ' ' +
  //   //   seriesName
  //   //     .replace(/-/g, ' ')
  //   //     .replace(/\b\w/g, l => l.toUpperCase())
  //   //     .replace('Tractors', '')
  //   //   : hpRange ? hpTitle : brandByLang.name,
  // });

  // Extract pagination data
  const { hasNextPage, currentPage, totalPages } = tyresListingProps;

  // Generate base URL for pagination
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com';
  const langPrefix = currentLang == 'hi' ? '/hi' : '';

  let pageUrl = `${langPrefix}/tractor-implements/${param.brand}`

  const canonicalUrl = currentPage > 1 ? `${baseUrl}${pageUrl}?page=${currentPage}` : `${baseUrl}${pageUrl}`;
  const prevUrl = currentPage > 1
    ? currentPage === 2
      ? `${baseUrl}${pageUrl}`
      : `${baseUrl}${pageUrl}?page=${currentPage - 1}`
    : null;
  const nextUrl = hasNextPage ? `${baseUrl}${pageUrl}?page=${currentPage + 1}` : null;

  const seoData = await getSEOByPage(pageSlug);

  const ITEMS_PER_PAGE = 16;

  return (
    <main>
      {/* Using main as the root layout element */}
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        paginationLinks={{
          canonical: canonicalUrl,
          prev: prevUrl,
          next: nextUrl,
        }}
      />
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      {/* TODO:: Setup Common Layout Class */}
      <div className="lg:mt-[159px]">
        <TyresPriceList
          showBanner={true}
          headingTitle={headingTitle}
          currentLang={currentLang}
          translation={translation}
          priceList={priceList}
          tyreTopContent={topContent}
          brandName={brand_name}
          category={category}
          tableHeaders={[
            {
              key: 'implementModel',
              width: 'w-[45%]',
              dataKey: item => (
                <Link
                  href={(currentLang == 'hi' ? '/hi' : '') + (item.page_url || '#')}
                  className="hover:text-primary-dark font-bold text-primary transition-colors duration-200"
                  title={`${item.brand_name} ${item.model}`}
                >
                  {`${item.brand_name} ${item.model}`}
                </Link>
              ),
            },
            {
              key: 'implementPower',
              width: 'w-[25%]',
              dataKey: item => item.implement_power,
            },
            {
              key: 'implementPrice',
              width: 'w-[30%]',
              dataKey: item => item.price === 'No' ? 'Price on Request' : item.price,
            },
          ]}
          breadcrumbs={[
            {
              label: translation.breadcrubm.tractorGyanHome,
              href: (currentLang == 'hi' ? '/hi' : '') + '/',
              title: translation.breadcrubm.tractorGyanHome
            },
            {
              label: translation.breadcrumbs.implementBrands,
              href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-implements-in-india',
              title: translation.breadcrumbs.implementBrands,
            },
            {
              label: `${brand_name} ${translation.whatsappPopup.implements}`,
              title: `${brand_name} ${translation.whatsappPopup.implements}`,
              isCurrent: true,
            },
          ]}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          productType="implement"
        />

      </div>
      {/* Tyre Listing Section with Two-Column Layout */}
      <section className="bg-section-gray py-6 md:py-8 lg:py-10">
        <div className="container mx-auto">
          <TyrePageHeader
            isMobile={isMobile}
            brandName={brand_name}
            translation={translation}
            heading={translation?.headings?.allTractorsByBrand}
            activeFilters={tyresListingProps.activeFilters}
            tyresListingClientProps={tyresListingClientProps}
            searchPlaceholder={translation.placeholder.SearchForImplements}
            searchParam={pageUrl}
          />
          {/* Sub Category Filter */}
          {(subcategories?.length && isMobile) ? (
            <SubCategoryTabs heading="Combine Harvester By Category" subcategories={subcategories} currentLang={currentLang} />
          ) : null}
          <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
            {!isMobile && (
              <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
                <TyresListingClient {...tyresListingClientProps} basePath={param.brand} />
              </div>
            )}

            <div className="flex-1">
              <TractorListing {...tyresListingProps} basePath={param.brand} />
            </div>
          </div>
        </div>
      </section>
      {/* TODO:: Update the props to make them generic */}
      <TyrePriceInquireForm
        bgColor="bg-green-lighter"
        formTitle={`${(translation.enquiryForm.getImplementPriceByType).replace('{type}', brand_name)}`}

        tyreBrands={allImplementBrands}
        translation={translation}
        currentLang={currentLang}
        banner={tgb_implement_on_road_price}
        mobileBanner={tgb_implement_on_road_price_mobile}
        type={'IMPLEMENT'}
        submitBtnText={'₹ ' + translation.enquiryForm.getImplementPrice}
        isMobile={isMobile}
        preFilledBrand={param.brand}
        implementTypeId={isMobile ? 115 : 114}
        showImplementTypeSelector={true}
      />
      <NewsSection
        translation={translation}
        langPrefix={currentLang}
        news={news}
        title={`${brand_name} ${translation.headings.ImplementBlogsNews}`}
        bgColor={'bg-section-gray'}
        showFilter={false}
      />
      <UpdatesSection
        bgColor={'bg-section-gray'}
        videos={videos}
        reels={reels}
        webstories={webstories}
        translation={translation}
        slug={'tractor-implements'}
        moduleType={'implement'}
        brandName={''}
        linkUrls={{
          videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
          webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
          reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
        }}
      />
      <TyreFAQs
        faqs={faqs}
        translation={translation}
        headingKey={'faqs.implements'}
        isDynamicTitle={true}
        brandName={brand_name}
        bgColor="bg-white"
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={`${currentLang === 'hi' ? 'hi/' : ''}tractor-implements/${param.brand}`} translation={translation} />
      <FooterComponents translation={translation} />
      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={'Tyre'}
        isMobile={isMobile}
      />
    </main>
  );
}
