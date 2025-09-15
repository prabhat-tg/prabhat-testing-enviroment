// Tractor Implement By Type Page
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
import Link from 'next/link';
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
import { getImplementTypeTopContent } from '@/src/services/implement/get-implement-type-top-content';
import { getImplementTypePriceList } from '@/src/services/implement/implemet-type-price-list';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import TractorListingData from '../tractors/listing/TractorListingData';

export const dynamic = 'force-dynamic'; // Ensure the page is always rendered dynamically

export default async function TractorImplementTypePage({ params, searchParams }) {
  const param = await params; // Get the params from the request
  const searchParamObj = await searchParams; // Get the search params from the request
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  const pageSlug = `tractor-implements-in-india/${param.slug}`; // Static for this page
  // const pageSlug = 'tyres'; // Temporary as data is not fetched for above slug

  // const params = await params;

  const tractorBrands = await getAllTractorBrands();

  // TODO::
  // const brand = getBrandFromSlug('Massey-ferguson', tractorBrands);
  const brand = {
    name: param?.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  };

  let news;
  try {
    news = await getImplementNews(`${param.slug}`);
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

  const priceList = await getImplementTypePriceList({
    // lang: currentLang,
    implement_type: param.slug,
  });

  // const seoData = await getSEOByPage("tyres");

  let topContent;
  try {
    topContent = await getImplementTypeTopContent({
      ad_title: `tractor-implements-in-india/${param.slug}`, //param.slug
      ad_type_content_lang: currentLang,
      device_type: isMobile ? 'mobile' : 'desktop',
    })
  } catch (error) {
    console.error('Failed to fetch implement top content::', error);
    allImplementBrands = [];
  }

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
      category_slug: param.slug, // 'seeding-and-planting'
      lang: currentLang,
    });
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }

  // TODO:: For UI Only
  const subcategories = [
    { name: translation.headerNavbar.selfPropelled, img: tgi_implement_combine_harvester },
    { name: translation.headerNavbar.tractorMounted, img: tgi_implement_combine_harvester },
    { name: translation.headerNavbar.sugarcane, img: tgi_implement_combine_harvester }
  ];

  const { tyresListingClientProps, tyresListingProps } = await prepareTyreListingComponent({
    param: param,
    searchParamsObj: searchParamObj,
    pageType: 'implements',
    pageSlug,
    prefLang: currentLang,
    translation,
    allImplementTypes: allImplementTypes,
    showBrandFilter: true,
    showSizeFilter: false,
    showTyreBrandsSection: false,
    showImplementBrandsSection: true,
    showImplementTypesSection: true,
    showLocationFilter: false,
    subcategories: subcategories,
    showTractorHPFilter: false,
    filterBySize: false,
    isMobile,
    ITEMS_PER_PAGE: 16,
    tyreBrands: allImplementBrands,
    brandPageUrl: null,
    basePathFromUrl: null,
    basePath: param.slug
  });

  // Extract pagination data from tyresListingProps
  const { hasNextPage, currentPage, totalPages } = tyresListingProps;

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
              key: translation.headings.implementModel,
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
              key: translation.headings.implementPower,
              width: 'w-[25%]',
              dataKey: item => item.implement_power,
            },
            {
              key: translation.headings.implementPrice,
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
              label: translation.headerNavbar.tractorImplements,
              href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-implements-in-india',
              title: translation.headerNavbar.tractorImplements,
            },
            {
              label: `${translation.common.tractor} ${brand.name} ${translation.headerNavbar.implement}`,
              title: `${translation.common.tractor} ${brand.name} ${translation.headerNavbar.implement}`,
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
          {/* Sub Category Filter */}
          {subcategories?.length && isMobile && (
            <SubCategoryTabs heading={translation.headerNavbar.combineHarvesterByCategory} subcategories={subcategories} />
          )}
          <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
            {!isMobile && (
              <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
                <TyresListingClient {...tyresListingClientProps} basePath={param.slug} />
              </div>
            )}

            <div className="flex-1">
              <TractorListing {...tyresListingProps} basePath={param.slug} />
            </div>
          </div>
        </div>
      </section>
      {/* TODO:: Update the props to make them generic */}
      <TyrePriceInquireForm
        bgColor="bg-green-lighter"
        formTitle={`${translation.headings.getImplementPrice || 'Get'} ${brand.name} ${translation.headerNavbar.implement}`}
        tyreBrands={tractorBrands}
        translation={translation}
        currentLang={currentLang}
        banner={tgb_implement_on_road_price}
        mobileBanner={tgb_implement_on_road_price_mobile}
        isMobile={isMobile}
      />
      <NewsSection
        translation={translation}
        langPrefix={currentLang}
        news={news}
        title={`${brand.name} ${translation.headings.ImplementBlogsNews}`}
        bgColor={'bg-section-gray'}
        showFilter={false}
      />
      <UpdatesSection
        bgColor={'bg-section-gray'}
        videos={videos}
        reels={reels}
        webstories={webstories}
        translation={translation}
        slug={'tractor-implements-in-india'}
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
        headingKey={'tyrefaqs.allTractorTyres'}
        bgColor="bg-white"
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={`${currentLang === 'hi' ? 'hi/' : ''}tractor-implements-in-india/${param.slug}`} translation={translation} />
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
