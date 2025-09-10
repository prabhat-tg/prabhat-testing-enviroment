// Tractor Implement By Category Page
import React from 'react';

import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView, prepareTyreListingComponent } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations

import TyresPriceList from '@/src/features/tyre/tyre-price/ListingMainSection';
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
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import TractorListing from '@/src/features/tractors/listing/TractorListing';
import NewsSection from '@/src/features/tyre/tyreNews/NewsSection';
import Link from 'next/link';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import {
  tgb_implement_on_road_price,
  tgb_implement_on_road_price_mobile,
} from '@/src/utils/assets/banners';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import { getImplementNews } from '@/src/services/implement/implement-news';
import { getAllImplementBrandsByType } from '@/src/services/implement/all-implement-brands-by-type';
import { getImplementFAQs } from '@/src/services/implement/get-implement-faqs';
import { getImplementCategoryTopContent } from '@/src/services/implement/get-implement-category-top-content';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import TractorListingData from '../tractors/listing/TractorListingData';
import { getImplementCategoryPriceList } from '@/src/services/implement/implemet-category-price-list';
import { getAllImplementCategoryListing } from '@/src/services/implement/get-all-implement-category-listing';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function TractorImplementCategoryPage({ params, searchParams }) {
  const param = await params; // Get the params from the request
  const searchParamObj = await searchParams; // Get the search params from the request
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = `tractor-implements/category/${param.slug}`; // Static for this page

  // const params = await params;

  const tractorBrands = await getAllTractorBrands();

  const brand = {
    name: param?.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  };

  let news;
  try {
    news = await getImplementNews('implement news');
    // news = await getImplementNews(`${param.slug}`);
    // news = await getImplementNews(`tractor-implements/category/${param.slug}`);
  } catch (error) {
    news = [];
  }

  const headingTitle = `${param?.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Implements`;

  const category = 'Implements';

  const tyreBrandsData = await getTyreBrands();
  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos(pageSlug),
    getTyreReels(pageSlug),
    getTyreWebstories(pageSlug),
  ]);

  const priceList = await getImplementCategoryPriceList({
    // lang: currentLang,
    category_slug: param.slug,
  });

  let topContent;
  try {
    topContent = await getImplementCategoryTopContent({
      category_slug: param.slug,
      ad_type_content_lang: currentLang,
      device_type: isMobile ? 'mobile' : 'desktop',
    })
  } catch (error) {
    console.error('Failed to fetch implement top content::', error);
    allImplementBrands = [];
  }

  // TODO:: Update as per API
  let allImplementBrands;
  try {
    allImplementBrands = await getAllImplementBrandsByType(`${param.slug}`);
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
    allImplementBrands = [];
  }

  const allImplementTypes = await getAllImplementTypes();

  let faqs = [];
  try {
    const faqResponse = await getImplementFAQs({
      category_slug: param.slug,
      lang: currentLang,
    });
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }

  const { tyresListingClientProps, tyresListingProps } = await prepareTyreListingComponent({
    param: params,
    isMobile,
    pageOrigin: 'tractorsByBrand',
    pageSlug,
    pageType: 'implements',
    prefLang: currentLang,
    translation,
    tyreBrands: allImplementBrands,
    allImplementTypes: allImplementTypes,
    ITEMS_PER_PAGE: 16,
    searchParamsObj: searchParamObj,
    showImplementBrandsSection: true,
    showImplementTypesSection: true,
    showBrandFilter: true,
    basePath: param.slug
  });

  // Get pagination info from TractorListingData
  const { component: TractorListingComponent, paginationInfo } = await TractorListingData({
    params: param,
    searchParams: searchParamObj,
    tractorBrands,
    // showBrandFilter: hpRange ? true : false,
    showSizeFilter: false,
    showTyreBrandsSection: false,
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Generate base URL for pagination
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com';
  const langPrefix = currentLang == 'hi' ? '/hi' : '';

  let pageUrl = `${langPrefix}/tractor-implements-in-india/${param.slug}`

  const canonicalUrl = currentPage > 1 ? `${baseUrl}${pageUrl}?page=${currentPage}` : `${baseUrl}${pageUrl}`;
  const prevUrl = currentPage > 1
    ? currentPage === 2
      ? `${baseUrl}${pageUrl}`
      : `${baseUrl}${pageUrl}?page=${currentPage - 1}`
    : null;
  const nextUrl = hasNextPage ? `${baseUrl}${pageUrl}?page=${currentPage + 1}` : null;

  const seoData = await getSEOByPage(pageSlug);

  const ITEMS_PER_PAGE = 16;

  const page = Number(searchParamObj?.page) || 1;
  const searchKeyword = searchParamObj?.search || '';
  const brandName = searchParamObj?.brand || null;
  const sortBy = searchParamObj?.sortBy || '';

  const startLimit = (page - 1) * ITEMS_PER_PAGE;
  const endLimit = startLimit + ITEMS_PER_PAGE;

  let latestImplement = 'no';
  let popularImplement = 'no';

  if (sortBy.toLowerCase() === 'popularity') {
    popularImplement = 'yes';
  }
  if (sortBy.toLowerCase() === 'latest launches') {
    latestImplement = 'yes';
  }

  const getAllImplementTypeListingData = await getAllImplementCategoryListing({
    category_slug: param.slug,
    search_keyword: searchKeyword,
    start_limit: startLimit,
    end_limit: endLimit,
    latest_implement: latestImplement,
    popular_implement: popularImplement,
    brand_name: brandName,
    lang: currentLang,
  });

  return (
    <main>
      {' '}
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
      <div className="lg:mt-[159px]">
        <TyresPriceList
          showBanner={true}
          headingTitle={headingTitle}
          currentLang={currentLang}
          translation={translation}
          priceList={priceList}
          tyreTopContent={topContent}
          brandName={brand.name}
          category={category}
          tableHeaders={[
            {
              key: 'implementModel',
              width: 'w-[45%]',
              dataKey: item => (
                <Link
                  href={(currentLang == 'hi' ? '/hi' : '') + (item.page_url || '#')}
                  className="hover:text-primary-dark font-bold text-primary transition-colors duration-200"
                  title={`${item.brand_name} ${item.modal_name}`}
                >
                  {`${item.brand_name} ${item.modal_name}`}
                </Link>
              ),
            },
            {
              key: 'implementPower',
              width: 'w-[25%]',
              dataKey: item => item.power,
              // dataKey: item => item.implement_power,
            },
            {
              key: 'implementPrice',
              width: 'w-[30%]',
              dataKey: item => item.price,
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
              title: 'Tractor Implements',
            },
            {
              label: `${brand.name} Implements`,
              title: `${brand.name} Implements`,
              isCurrent: true,
            },
          ]}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          productType="implement"
        />
      </div>
      {/* Tyre Listing Section with Two-Column Layout */}
      <section className="mt-10 bg-section-gray py-6 md:py-8 lg:py-10">
        <div className="container mx-auto">
          <TyrePageHeader
            isMobile={isMobile}
            brandName={brand.name}
            translation={translation}
            heading={translation?.headings?.allTractorsByBrand}
            activeFilters={tyresListingProps.activeFilters}
            tyresListingClientProps={tyresListingClientProps}
            searchPlaceholder={translation.placeholder.SearchForImplements}
            searchParam={pageUrl}
          />
          <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
            {!isMobile && (
              <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
                <TyresListingClient {...tyresListingClientProps} basePath={param.slug} />
              </div>
            )}

            <div className="flex-1">
              <TractorListing {...tyresListingProps} initialTyres={getAllImplementTypeListingData} basePath={param.slug} />
            </div>
          </div>
        </div>
      </section>
      {/* TODO:: Update the props to make them generic */}
      <TyrePriceInquireForm
        bgColor="bg-green-lighter"
        formTitle={`Get ${brand.name} Implement Price`}
        tyreBrands={tractorBrands}
        translation={translation}
        currentLang={currentLang}
        banner={tgb_implement_on_road_price}
        mobileBanner={tgb_implement_on_road_price_mobile}
        isMobile={isMobile}
      />
      {news.length ? (
        <NewsSection
          translation={translation}
          langPrefix={currentLang}
          news={news}
          title={`${brand.name} ${translation.headings.ImplementBlogsNews}`}
          bgColor={'bg-section-gray'}
          showFilter={false}
        />
      ) : null
      }
      <UpdatesSection
        bgColor={'bg-section-gray'}
        videos={videos}
        reels={reels}
        webstories={webstories}
        translation={translation}
        slug={`${currentLang === 'hi' ? 'hi/' : ''}tractor-implements/category/${param.slug}`}
        // slug={'tractor-implements-in-india'}
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
        bgColor="bg-white"
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={`${currentLang === 'hi' ? 'hi/' : ''}tractor-implements/category/${param.slug}`} translation={translation} />
      <FooterComponents translation={translation} />
      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={'Implement'}
        isMobile={isMobile}
      />
    </main>
  );
}

