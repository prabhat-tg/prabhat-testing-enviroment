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
import { getSelectedLanguage } from '@/src/services/locale';
import TyreListingData from './allTyreListing/tyresListing/TyreListingData';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';

const FrontTyrePage = async ({ params, searchParams }) => {
  const param = await params;
  const searchParamsObj = await searchParams;
  const prefLang = await getSelectedLanguage();
  const seoSlug = prefLang === 'en' ? 'tyre/front' : `${prefLang}/tyre/front`;

  let seoData;
  let tyreBrands;
  let videos;
  let reels;
  let webstories;
  let tyreTopContent;
  let priceList;
  let faqs;

  const pageSlug = `tyre/front`;
  const isMobile = await isMobileView();

  const translation = await getDictionary(prefLang);

  try {
    faqs = await getTyreFAQs({
      langPrefix: prefLang,
      slug: 'tyre/front',
    });

    seoData = await getSEOByPage(seoSlug);
    tyreBrands = await getTyreBrands();
    const [videoData, reelData, webstoryData] = await Promise.all([
      getTyreVideos('tractor-tyre-in-india'),
      getTyreReels('tractor-tyre-in-india'),
      getTyreWebstories('tractor-tyre-in-india'),
    ]);
    videos = videoData;
    reels = reelData;
    webstories = webstoryData;

    tyreTopContent = await getTyreTopContent({
      ad_title: pageSlug,
      currentLang: prefLang,
      device_type: isMobile ? 'mobile' : 'desktop',
    });

    priceList = await getAllPriceList({
      lang: prefLang,
      tyre_slug: pageSlug,
    });
  } catch (error) {
    console.error('Error fetching data for FrontTyrePage:', error);
    return <div>Error loading page.</div>;
  }

  function formatTyreSize(input) {
    if (!input) return '';
    const parts = input.toLowerCase().split('-');
    if (parts?.length >= 5) {
      const formatted = `${parts[0]}.${parts[1]}x${parts[3]}`;
      return formatted;
    }
    return input;
  }
  const tyreSize = formatTyreSize(searchParamsObj.sizeSlug);

  // Get pagination info from TyreListingData
  const { component: TyreListingComponent, paginationInfo } = await TyreListingData({
    params: param,
    searchParams,
    basePath: 'tyre/front',
    tyreBrands,
    showBrandFilter: true,
    showSizeFilter: false,
    filterBySize: 'front',
    pageType: 'tyre_type_page',
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Breadcrumbs for Front Tyre Page
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
      label: translation.breadcrubm.frontTyres || translation.headings.front,
      title: translation.breadcrubm.frontTyres || translation.headings.front,
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
          canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/front`,
          prev:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/front?page=${currentPage - 1}`
              : null,
          next: hasNextPage
            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/front?page=${currentPage + 1}`
            : null,
        }}
      />
      {/* <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />{' '} */}
      {/* <div className="lg:mt-[159px]">
        <TyresPriceList
          brandName={translation.headings.front}
          tyreTopContent={tyreTopContent}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          currentLang={prefLang}
          priceList={priceList}
          translation={translation}
          adTitleUrl="tyre/front"
          headingTitle={translation.headings.frontTyreHeading.replace('{size}', tyreSize)}
          pageName="front"
          breadcrumbs={breadcrumbs}
        />
        {TyreListingComponent}
        <TyrePriceInquireForm
          tyreBrands={tyreBrands}
          heading={'headings.inquireforTyrePrice'}
          translation={translation}
          currentLang={prefLang}
          brandName={translation.headings.frontTyre}
          isMobile={isMobile}
        />
        <UpdatesSection
          videos={videos}
          reels={reels}
          webstories={webstories}
          translation={translation}
          slug="tyre/front"
          brandName={translation.headings.front + ' ' + (param.sizeSlug || '')}
          linkUrls={{
            videos: `${prefLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${prefLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${prefLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />
        <TyreFAQs
          translation={translation}
          headingKey={'tyrefaqs.allFrontTractorTyres'}
          pageName="tyre/front"
          faqs={faqs}
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
          slug={`${prefLang === 'en' ? '' : `${prefLang}/`}tyre/front`}
          translation={translation}
        />

      </div>
      <FooterComponents translation={translation} /> */}
    </>
  );
};

export default FrontTyrePage;
