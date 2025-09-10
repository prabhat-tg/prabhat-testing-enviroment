

import DesktopHeader from '@/src/components/shared/header/DesktopHeader'
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import React from 'react'
import FooterComponents from '../tyre/FooterComponents';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import ConstructionMachineryTopSection from './ConstructionMachineryTopSection';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import { getTyreReels, getTyreVideos, getTyreWebstories } from '@/src/services/tyre/tyre-brand-webstore';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getSecondHandTopContent } from '@/src/services/second-hand-tractors/SecondHandTractorTopContent';
import { getSecondHandTractorPriceList } from '@/src/services/second-hand-tractors/SecondHandTractorPriceList';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';

export default async function ConstructionMachineryPage({ searchParams }) {
  const apiUrl = getApiUrl();
  const seoSlug = `construction-machinery-and-equipment-in-india`;
  const seoData = await getSEOByPage(seoSlug);
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  let faqs;
  const pageSlug = 'tyres';
  const topContent = await getTyreTopContent({
    ad_title: pageSlug,
    currentLang: currentLang,
    device_type: isMobile ? 'mobile' : 'desktop',
  });

  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos('tractor-tyre-in-india'),
    getTyreReels('tractor-tyre-in-india'),
    getTyreWebstories('tractor-tyre-in-india'),
  ]);
  try {

    faqs = await getUsedTractorFAQs({
      langPrefix: currentLang,
      slug: pageSlug,
    });
  } catch (error) {
    console.error('Error fetching data for FrontTyrePage:', error);
    return <div>Error loading page.</div>;
  }
  const allImplementBrands = [
    {
      title: 'Bull Logo',
      imgSrc: 'https://images.tractorgyan.com/uploads/120644/68a328c1817f0-bull-machine-logo.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'Bull',
    },
    {
      title: 'JCB Logo',
      imgSrc: 'https://images.tractorgyan.com/uploads/120645/68a328d7e6382-JCB_(company)-Logo.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'JCB',
    },
    {
      title: 'Escorts',
      imgSrc: 'https://images.tractorgyan.com/uploads/120646/68a328ea84dd0-image-26.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'Escorts',
    },
    {
      title: 'Bull Logo',
      imgSrc: 'https://images.tractorgyan.com/uploads/120644/68a328c1817f0-bull-machine-logo.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'Bull',
    },
    {
      title: 'JCB Logo',
      imgSrc: 'https://images.tractorgyan.com/uploads/120645/68a328d7e6382-JCB_(company)-Logo.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'JCB',
    },
    {
      title: 'Escorts',
      imgSrc: 'https://images.tractorgyan.com/uploads/120646/68a328ea84dd0-image-26.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'Escorts',
    },
    {
      title: 'Bull Logo',
      imgSrc: 'https://images.tractorgyan.com/uploads/120644/68a328c1817f0-bull-machine-logo.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'Bull',
    },
    {
      title: 'JCB Logo',
      imgSrc: 'https://images.tractorgyan.com/uploads/120645/68a328d7e6382-JCB_(company)-Logo.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'JCB',
    },
    {
      title: 'Escorts',
      imgSrc: 'https://images.tractorgyan.com/uploads/120646/68a328ea84dd0-image-26.webp',
      url: '/tractor-implements/agristar',
      brand_name: 'Escorts',
    },

  ];

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/our-contacts`,
        }}
      />
      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={currentLang}
      />
      <main>
        <ConstructionMachineryTopSection
          showBanner={true}
          isMobile={isMobile}
          translation={translation}
          currentLang={currentLang}
          headingKey={'headings.allTractorTyres'}
          topContent={topContent}
          deviceType={isMobile ? 'mobile' : 'desktop'}
          tyreTopContent={topContent}

        />
        <TractorImplementBrands
          bgColor={'bg-section-gray'}
          heading='Construction Machinery By Brands'
          allImplementBrands={allImplementBrands}
          itemsShown={isMobile ? 9 : 12}
        />
        <UpdatesSection
          videos={videos}
          reels={reels}
          webstories={webstories}
          translation={translation}
          slug={'tractor-tyre-in-india'}
          brandName={'Tractors'}
          bgColor={'bg-section-gray'}
          linkUrls={{
            videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />
        <TyreFAQs
          faqs={faqs}
          translation={translation}
          headingKey={'faqs.usedTractorfaqs'}
          bgColor={'bg-section-white'}
        />

        <WhatsAppTopButton translation={translation} currentLang={currentLang}
          defaultEnquiryType={'Tyre'} isMobile={isMobile} />
        <JoinOurCommunityServer
          translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={pageSlug} translation={translation} />
      </main>
      <FooterComponents translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  )
}

