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
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import { isMobileView } from '@/src/utils';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getAllPriceList } from '@/src/services/tyre/all-price-list';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import TyreListingData from './allTyreListing/tyresListing/TyreListingData';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getSelectedLanguage } from '@/src/services/locale';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';

const RearTyrePage = async ({ params, searchParams }) => {
  let seoData;
  let tyreBrands;
  let videos;
  let reels;
  let webstories;
  let faqs;
  let isMobile;
  let tyreTopContent;
  let priceList;
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const seoSlug = prefLang === 'en' ? 'tyre/rear' : `${prefLang}/tyre/rear`;

  try {
    seoData = await getSEOByPage(seoSlug);
    const pageSlug = 'tyre/rear';
    tyreBrands = await getTyreBrands();
    const [videoData, reelData, webstoryData] = await Promise.all([
      getTyreVideos('tractor-tyre-in-india'),
      getTyreReels('tractor-tyre-in-india'),
      getTyreWebstories('tractor-tyre-in-india'),
    ]);
    videos = videoData;
    reels = reelData;
    webstories = webstoryData;
    faqs = await getTyreFAQs({
      langPrefix: prefLang,
      slug: 'tyre/rear',
    });
    isMobile = await isMobileView();
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
    console.error('Error fetching data for RearTyrePage:', error);
    return <div>{translation.error_messages.errorLoadingPage}</div>;
  }

  // Get pagination info from TyreListingData
  const { component: TyreListingComponent, paginationInfo } = await TyreListingData({
    params,
    searchParams,
    basePath: 'tyre/rear',
    tyreBrands,
    showBrandFilter: true,
    showSizeFilter: true,
    filterBySize: 'rear',
    pageType: 'tyre_type_page',
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  // Breadcrumbs for Rear Tyre Page (home/tractorTyres/rear)
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
      title: translation.breadcrubm.rearTyres || translation.headings.rear,
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
          canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/rear`,
          prev:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/rear?page=${currentPage - 1}`
              : null,
          next: hasNextPage
            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre/rear?page=${currentPage + 1}`
            : null,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />{' '}
      <div className="lg:mt-[159px]">
        <TyresPriceList
          brandName={translation.headings.rear}
          tyreTopContent={tyreTopContent}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          currentLang={prefLang}
          priceList={priceList}
          translation={translation}
          adTitleUrl="tyre/rear"
          headingKey={'headings.allRearTractorTyres'}
          pageName="rear"
          breadcrumbs={breadcrumbs}
        />

        {TyreListingComponent}
        <TyrePriceInquireForm
          tyreBrands={tyreBrands}
          heading={'headings.inquireforTyrePrice'}
          translation={translation}
          currentLang={prefLang}
          brandName={translation.headings.rearTyre}
          isMobile={isMobile}
        />
        <UpdatesSection
          videos={videos}
          reels={reels}
          webstories={webstories}
          translation={translation}
          slug="tyre/rear"
          brandName={translation.headings.rear}
          linkUrls={{
            videos: `${prefLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${prefLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${prefLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />
        <TyreFAQs
          faqs={faqs}
          translation={translation}
          headingKey={'tyrefaqs.allRearTractorTyres'}
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
          slug={`${prefLang === 'en' ? '' : `${prefLang}/`}tyre/rear`}
          translation={translation}
        />

        {/* <ClientComponentsWithoutAbout
          translation={translation}
          pageName="tyre/rear"
          prefLang={prefLang}
        /> */}
      </div>
      <FooterComponents translation={translation} />
    </>
  );
};

export default RearTyrePage;
