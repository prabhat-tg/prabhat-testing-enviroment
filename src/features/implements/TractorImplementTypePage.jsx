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
import { checkImplementSlug } from '@/src/services/implement/check-implement-slug';
import { getImplementEnquiryTypeId } from '@/src/services/implement/get-implement-enquiry-type-id';
import { t } from 'i18next';
import { getImplementCategoryFilter } from '@/src/services/implement/get-implement-category-filter';
import ImplementsCategorySlider from '@/src/components/implements/ImplementsCategorySlider';
import { getAllImplementCategories } from '@/src/services/implement/all-implement-categories';
import { getImplementBrandFAQs } from '@/src/services/implement/get-all-implement-brand-faqs';

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
  let type_en, type_hi, type_id;

  try {
    const check = await checkImplementSlug({
      slug: param?.slug
    });
    if (check[0].is_implement_type == '1') {
      type_en = check[0].implement_type_en.charAt(0).toUpperCase() + check[0].implement_type_en.slice(1);
      type_hi = check[0].implement_type_hi;
    }
    if (check[0].is_brand == '1') {
      type_en = check[0].brand_en.charAt(0).toUpperCase() + check[0].brand_en.slice(1);
      type_hi = check[0].brand_hi;
    }
    console.log("check::", check);

  }
  catch (error) {
    console.log("Error in slug check::", error);
  }

  // Fetch type_id for enquiry form
  try {
    const enquiryTypeResponse = await getImplementEnquiryTypeId({
      implement_type: param.slug,
      device_type: isMobile ? 'mobile' : 'desktop',
    });
    if (enquiryTypeResponse && enquiryTypeResponse.success) {
      type_id = enquiryTypeResponse.enquiry_id;
    }
  } catch (error) {
    console.error('Failed to fetch enquiry type ID:', error);
    type_id = null;
  }
  // const tractorBrands = await getAllTractorBrands();

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

  const headingTitle = `${currentLang == 'hi' ? type_hi : type_en} ${translation.whatsappPopup.implements}`;

  const category = 'Implements';

  let implementCategories;
  try {
    implementCategories = await getAllImplementCategories();
  } catch (error) {
    implementCategories = [];
  }


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
    const faqResponse = await getImplementBrandFAQs(
      {
        faq_tag: pageSlug, // 'seeding-and-planting'
        faq_lang: currentLang,
      }
    );
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }

  // TODO:: For UI Only
  let subcategories = [];
  try {
    const categoryFilterResponse = await getImplementCategoryFilter({
      implement_type: param.slug,
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

  const seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + pageSlug);

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
          brandName={currentLang === 'hi' ? type_hi : type_en}
          category={category}
          showOutline={true}
          tableHeaders={[
            {
              key: `implementModel`,
              width: 'w-[40%]',
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
              key: `implementPower`,
              width: 'w-[20%]',
              dataKey: item => item.implement_power,
            },
            {
              key: `implementPrice`,
              width: 'w-[40%]',
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
              label: `${translation.common.tractor} ${currentLang === 'hi' ? type_hi : type_en} ${translation.headerNavbar.implement}`,
              title: `${translation.common.tractor} ${currentLang === 'hi' ? type_hi : type_en} ${translation.headerNavbar.implement}`,
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
            brandName={currentLang === 'hi' ? type_hi : type_en}
            translation={translation}
            heading={translation?.headings?.allImplementsByBrand}
            activeFilters={tyresListingProps.activeFilters}
            tyresListingClientProps={tyresListingClientProps}
            searchPlaceholder={translation.placeholder.SearchForImplements}
            searchParam={pageUrl}
          />
          {/* Sub Category Filter */}
          {(subcategories.length && isMobile) ? (
            <SubCategoryTabs heading={translation.headerNavbar.combineHarvesterByCategory} subcategories={subcategories} currentLang={currentLang} />
          ) : null}
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
        formTitle={`${(translation.enquiryForm.getImplementPriceByType).replace('{type}', (currentLang === 'hi' ? type_hi : type_en))}`}
        tyreBrands={allImplementBrands}
        translation={translation}
        currentLang={currentLang}
        banner={tgb_implement_on_road_price}
        mobileBanner={tgb_implement_on_road_price_mobile}
        isMobile={isMobile}
        implementTypeId={22}
        type='IMPLEMENT'
        pageName={'implement_brand'}
        pageSource={`/tractor-implements-in-india/${param.slug}`}
        implementType={type_en}

      // implementStaticPayload={
      //   {
      //     "page_name": "implement_brand",
      //     "page_source": `/tractor-implements-in-india/${param.slug}`,
      //     "implement_type": type_en,
      //     "type_id": type_id
      //   }
      // }
      />

      <ImplementsCategorySlider
        bgColor='bg-section-gray'
        isMobile={isMobile}
        heading={translation.headerNavbar.implementByCategory}
        categories={implementCategories}
        currentLang={currentLang}
      />

      <NewsSection
        translation={translation}
        langPrefix={currentLang}
        news={news}
        title={`${currentLang === 'hi' ? type_hi : type_en} ${translation.headings.ImplementBlogsNews}`}
        bgColor={'bg-section-white'}
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
        brandName={currentLang === 'hi' ? type_hi : type_en}
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
        brandName={currentLang === 'hi' ? type_hi : type_en}
        isDynamicTitle={true}
        bgColor="bg-white"
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer slug={`${currentLang === 'hi' ? 'hi/' : ''}tractor-implements-in-india/${param.slug}`} translation={translation} />
      <FooterComponents translation={translation} />
      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        defaultEnquiryType={'Implement'}
        isMobile={isMobile}
      />
    </main>
  );
}
