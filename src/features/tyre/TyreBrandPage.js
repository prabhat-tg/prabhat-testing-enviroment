import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import TyreListingData from './allTyreListing/tyresListing/TyreListingData';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import UpdatesData from '../tyreComponents/components/updatesAbouteTyre/UpdatesData';
import TyreFaqsData from './tyreFAQs/TyreFaqsData';
import { getCurrentPageTyreBrand } from '@/src/utils/tyre';
import TyresPriceList from './tyre-price/ListingMainSection';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';

export default async function TyreBrandPage({ params, searchParams }) {
  const param = await params;
  const searchParamsObj = await searchParams;
  const basePath = `/tyre/${param.brandSlug}`;

  // Extract page from searchParams
  const page = parseInt(searchParamsObj?.page) || 1;

  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const tyreBrands = await getTyreBrands();
  const brand = getCurrentPageTyreBrand(tyreBrands, 'tyre/' + param.brandSlug);
  const pageSlug = prefLang === 'en' ? brand.url : `${prefLang}/${brand.url}`;
  const seoData = await getSEOByPage(pageSlug);

  const tyreTopContent = await getTyreTopContent({
    ad_title: brand.url,
    currentLang: prefLang,
    device_type: isMobile ? 'mobile' : 'desktop',
  });

  const priceList = await getAllPriceList({
    lang: prefLang,
    tyre_slug: brand.url,
  });
  param.brand = brand.name;

  // Get pagination info from TyreListingData
  const { component: TyreListingComponent, paginationInfo } = await TyreListingData({
    params: param,
    searchParams: searchParamsObj,
    basePath,
    tyreBrands,
    showBrandFilter: false,
    showSizeFilter: true,
    showTyreBrandsSection: true,
    brandName: prefLang === 'hi' ? brand?.name_hi : brand?.name,
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Breadcrumbs for Tyre Brand Page (home/tractorTyres/brandName)
  const breadcrumbs = [
    {
      label: translation.breadcrubm.home,
      href: prefLang === 'hi' ? '/hi' : '/',
      title: translation.breadcrubm.home,
    },
    {
      label: translation.headerNavbar.tyreHome,
      href: prefLang === 'hi' ? '/hi/tractor-tyre-in-india' : '/tractor-tyre-in-india',
      title: translation.headerNavbar.tyreHome,
    },
    {
      label: prefLang === 'hi' ? brand?.name_hi : brand?.name,
      title: prefLang === 'hi' ? brand?.name_hi : brand?.name,
      isCurrent: true,
    },
  ];

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang === "en" ? '' : "/hi"}/tyre/${param.brandSlug}?page=${currentPage}`
              : `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang === "en" ? '' : "/hi"}/tyre/${param.brandSlug}`,
          prev:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang === "en" ? '' : "/hi"}/tyre/${param.brandSlug}?page=${currentPage - 1}`
              : null,
          next: hasNextPage
            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang === "en" ? '' : "/hi"}/tyre/${param.brandSlug}?page=${currentPage + 1}`
            : null,
        }}
        hreflang={{
          en:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/${param.brandSlug}`,
          hi:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/hi/tyre/${param.brandSlug}`
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />{' '}
      <div className="lg:mt-[159px]">
        <TyresPriceList
          brandName={prefLang === 'hi' ? brand?.name_hi : brand?.name}
          tyreTopContent={tyreTopContent}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          currentLang={prefLang}
          priceList={priceList}
          translation={translation}
          adTitleUrl={brand.url}
          headingTitle={translation.headings.allBrandTractorTyresHeading.replace(
            '{brand}',
            prefLang === 'hi' ? brand?.name_hi : brand?.name || 'N/A'
          )}
          pageName={brand.name.replace(/\s+/g, '-').toLowerCase()}
          breadcrumbs={breadcrumbs}
        />
        {TyreListingComponent}
        <TyrePriceInquireForm
          translation={translation}
          currentLang={prefLang}
          brandName={
            (prefLang === 'hi' ? brand?.name_hi : brand?.name) +
            ' ' +
            translation.tractorgyanOfferings.tractorTyre
          }
          tyreBrands={tyreBrands}
          heading={'headings.inquireforTyrePrice'}
          isMobile={isMobile}
        />
        <UpdatesData
          slug={brand.url}
          brandName={
            (prefLang === 'hi' ? brand?.name_hi : brand?.name) +
            ' ' +
            translation.tractorgyanOfferings.tractor +
            ' '
          }
          linkUrls={{
            videos: `${prefLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${prefLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${prefLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />
        <TyreFaqsData
          pageSlug={brand.url}
          brandName={prefLang === 'hi' ? brand?.name_hi : brand?.name}
          headingKey={'tyrefaqs.allBrandTractorTyres'}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={'Tyre'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={`${prefLang == 'en' ? '' : 'hi/'}${brand.url}`}
          translation={translation}
        />
      </div>
      <FooterComponents translation={translation} />
    </>
  );
}
