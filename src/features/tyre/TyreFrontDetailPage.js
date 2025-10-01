import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, prepareTyreListingComponent } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import UpdatesData from '../tyreComponents/components/updatesAbouteTyre/UpdatesData';
import TyreFaqsData from './tyreFAQs/TyreFaqsData';
import ClientComponentsWithoutAbout from './ClientComponents';
import TyresPriceList from './tyre-price/ListingMainSection';
import TyreListingData from './allTyreListing/tyresListing/TyreListingData';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';

export default async function TyreFrontDetailPage({ params, searchParams }) {
  const param = await params;
  const searchParamsObj = await searchParams;
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const pageSlug = `tyre/front/${param.sizeSlug}/${param.id}`;
  const priceListSlug = `front/${param.sizeSlug}/${param.id}`;
  const seoData = await getSEOByPage(pageSlug);
  const tyreBrands = await getTyreBrands();

  const tyreTopContent = await getTyreTopContent({
    ad_title: `tyre/front/${param.sizeSlug}/${param.id}`,
    currentLang: currentLang,
    device_type: isMobile ? 'mobile' : 'desktop',
  });

  const priceList = await getAllPriceList({
    lang: currentLang,
    tyre_slug: priceListSlug,
  });

  function formatTyreSize(input) {
    const parts = input.toLowerCase().split('-');
    if (parts?.length >= 5) {
      const formatted = `${parts[0]}.${parts[1]}x${parts[3]}`;
      return formatted;
    }
    if (currentLang === 'hi') {
      return input.replace(/size/gi, 'आकार');
    }
    return input;
  }
  const tyreSize = formatTyreSize(param.sizeSlug);

  // Get pagination info from TyreListingData
  const { component: TyreListingComponent, paginationInfo } = await TyreListingData({
    params: param,
    searchParams: searchParamsObj,
    basePath: `tyre/front/${param.sizeSlug}/${param.id}`,
    tyreBrands,
    showBrandFilter: true,
    showSizeFilter: false,
    filterBySize: 'front',
    pageType: 'tyre_type_size_page',
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Breadcrumbs for Front Tyre Detail Page (home/tractorTyres/front/size)
  const breadcrumbs = [
    {
      label: translation.breadcrubm.home,
      href: currentLang === 'hi' ? '/hi' : '/',
      title: translation.breadcrubm.home,
    },
    {
      label: translation.headerNavbar.tyreHome,
      href: currentLang === 'hi' ? '/hi/tractor-tyre-in-india' : '/tractor-tyre-in-india',
      title: translation.headerNavbar.tyreHome,
    },
    {
      label: translation.breadcrubm.frontTyres || translation.headings.front,
      href: currentLang === 'hi' ? '/hi/tyre/front' : '/tyre/front',
      title: translation.breadcrubm.frontTyres || translation.headings.front,
    },
    {
      label: tyreSize,
      title: tyreSize,
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
          canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/${pageSlug}`,
          prev:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/${pageSlug}?page=${currentPage - 1}`
              : null,
          next: hasNextPage
            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/${pageSlug}?page=${currentPage + 1}`
            : null,
        }}
        hreflang={{
          en:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/${pageSlug}`,
          hi:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/hi/${pageSlug}`
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="lg:mt-[159px]">
        <TyresPriceList
          brandName={translation?.common?.front + ' ' + tyreSize || 'Front'}
          tyreTopContent={tyreTopContent}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          currentLang={currentLang}
          priceList={priceList}
          translation={translation}
          adTitleUrl={pageSlug}
          headingTitle={`${translation?.tyre?.tractorFront || 'Tractor Front'} ${tyreSize} ${translation?.common?.tyre || 'Size Tyre'}`}
          pageName={priceListSlug}
          breadcrumbs={breadcrumbs}
        />
        {TyreListingComponent}
        <TyrePriceInquireForm
          tyreBrands={tyreBrands}
          heading={'headings.inquireforTyrePrice'}
          translation={translation}
          currentLang={currentLang}
          brandName={`${translation?.tyre?.tractorFront || 'Tractor Front'} ${tyreSize} ${translation?.tyre?.sizeTyre || 'Size Tyre'}`}
          isMobile={isMobile}
        />
        <UpdatesData
          slug={pageSlug}
          brandName={translation?.common?.front || 'Front'}
          linkUrls={{
            videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />
        <TyreFaqsData pageSlug={pageSlug} headingKey={'tyrefaqs.allFrontTractorTyres'} />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={translation?.common?.tyre || 'Tyre'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={pageSlug} translation={translation} />
        {/* <ClientComponentsWithoutAbout
          translation={translation}
          pageName={pageSlug}
          prefLang={currentLang}
        /> */}
      </div>
      <FooterComponents translation={translation} />
    </>
  );
}
