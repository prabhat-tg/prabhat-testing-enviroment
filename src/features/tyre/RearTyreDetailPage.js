import React from 'react';
import TyrePriceInquireForm from '@/src/features/tyreComponents/components/forms/InquireForm';
import UpdatesSection from '@/src/features/tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import TyresPriceList from '@/src/features/tyre/tyre-price/ListingMainSection';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import {
  getTyreReels,
  getTyreVideos,
  getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import ClientComponentsWithoutAbout from '@/src/features/tyre/ClientComponents';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import TyreListingData from './allTyreListing/tyresListing/TyreListingData';
import { getSelectedLanguage } from '@/src/services/locale';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';

const RearTyreDetailPage = async ({ params, searchParams }) => {
  const param = await params;
  const searchParamsObj = await searchParams;
  const { sizeSlug, id } = param;
  const prefLang = await getSelectedLanguage();
  const seoSlug = `${prefLang === 'en' ? '' : `${prefLang}/`}tyre/rear/${sizeSlug}/${id}`;
  let seoData;
  let tyreBrands;
  let videos;
  let reels;
  let webstories;
  let translation;
  let isMobile;
  let tyreTopContent;
  let priceList;
  let tyreSize;

  try {
    seoData = await getSEOByPage(seoSlug);
    const priceListSlug = `rear/${param.sizeSlug}/${param.id}`;
    const pageSlug = `${prefLang === 'en' ? '' : `${prefLang}/`}tyre/rear/${param.sizeSlug}/${param.id}`;
    tyreBrands = await getTyreBrands();
    const [videoData, reelData, webstoryData] = await Promise.all([
      getTyreVideos('tractor-tyre-in-india'),
      getTyreReels('tractor-tyre-in-india'),
      getTyreWebstories('tractor-tyre-in-india'),
    ]);
    videos = videoData;
    reels = reelData;
    webstories = webstoryData;

    translation = await getDictionary(prefLang);
    isMobile = await isMobileView();

    tyreTopContent = await getTyreTopContent({
      ad_title: `tyre/rear/${param.sizeSlug}/${param.id}`,
      currentLang: prefLang,
      device_type: isMobile ? 'mobile' : 'desktop',
    });

    priceList = await getAllPriceList({
      lang: prefLang,
      tyre_slug: priceListSlug,
    });

    function formatTyreSize(input) {
      const parts = input.toLowerCase().split('-');
      if (parts?.length >= 5) {
        const formatted = `${parts[0]}.${parts[1]}x${parts[3]}`;
        return formatted;
      }
      return input;
    }
    tyreSize = formatTyreSize(param.sizeSlug);
  } catch (error) {
    console.error('Error fetching data for RearTyreDetailPage:', error);
    const fallbackTranslation = await getDictionary(prefLang || 'en');
    return <div>{fallbackTranslation?.error_messages?.pageLoadError || 'Error loading page.'}</div>;
  }

  // Get pagination info from TyreListingData
  const { component: TyreListingComponent, paginationInfo } = await TyreListingData({
    params: param,
    searchParams: searchParamsObj,
    basePath: `tyre/rear/${sizeSlug}/${id}`,
    tyreBrands,
    showBrandFilter: true,
    showSizeFilter: false,
    filterBySize: 'rear',
    pageType: 'tyre_type_size_page',
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Breadcrumbs for Rear Tyre Detail Page (home/tractorTyres/rear/size)
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
      label: translation.breadcrubm.rearTyres || translation.headings.rear,
      href: prefLang === 'hi' ? '/hi/tyre/rear' : '/tyre/rear',
      title: translation.breadcrubm.rearTyres || translation.headings.rear,
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
          canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/rear/${sizeSlug}/${id}`,
          prev:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/rear/${sizeSlug}/${id}?page=${currentPage - 1}`
              : null,
          next: hasNextPage
            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/rear/${sizeSlug}/${id}?page=${currentPage + 1}`
            : null,
        }}
        hreflang={{
          en:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/rear/${sizeSlug}/${id}`,
          hi:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/hi/tyre/rear/${sizeSlug}/${id}`
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />{' '}
      <div className="lg:mt-[159px]">
        <TyresPriceList
          brandName={translation?.common?.rear + ' ' + tyreSize || 'Rear'}
          tyreTopContent={tyreTopContent}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          currentLang={prefLang}
          priceList={priceList}
          translation={translation}
          adTitleUrl={`tyre/rear/${sizeSlug}/${id}`}
          headingTitle={`${translation?.tyre?.tractorRear || 'Tractor Rear'} ${tyreSize} ${translation?.tyre?.sizeTyre || 'Size Tyre'}`}
          pageName={`rear/${sizeSlug}/${id}`}
          breadcrumbs={breadcrumbs}
        />
        {TyreListingComponent}
        <TyrePriceInquireForm
          tyreBrands={tyreBrands}
          heading={'headings.inquireforTyrePrice'}
          translation={translation}
          currentLang={prefLang}
          brandName={`${translation?.tyre?.tractorRear || 'Tractor Rear'} ${tyreSize} ${translation?.tyre?.sizeTyre || 'Size Tyre'}`}
          isMobile={isMobile}
        />
        <UpdatesSection
          videos={videos}
          reels={reels}
          webstories={webstories}
          translation={translation}
          slug={`tyre/rear/${sizeSlug}/${id}`}
          brandName={`${translation?.common?.rear || 'rear'} ${sizeSlug}`}
          linkUrls={{
            videos: `${prefLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${prefLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${prefLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />
        <TyreFAQs
          translation={translation}
          headingKey={'tyrefaqs.allRearTractorTyres'}
          pageName={`tyre/rear/${sizeSlug}/${id}`}
          faqs={[]}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={translation?.common?.tyre || 'Tyre'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={`${prefLang === 'en' ? '' : `${prefLang}/`}tyre/rear/${sizeSlug}/${id}`}
          translation={translation}
        />
        {/* <ClientComponentsWithoutAbout
          translation={translation}
          pageName={`tyre/rear/${sizeSlug}/${id}`}
          prefLang="en"
        /> */}
      </div>
      <FooterComponents translation={translation} />
    </>
  );
};

export default RearTyreDetailPage;
