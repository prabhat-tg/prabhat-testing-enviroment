import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js'; // For language
import { isMobileView } from '@/src/utils'; // For mobile detection
import { getDictionary } from '@/src/lib/dictonaries'; // For translations
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import TyreListingData from './allTyreListing/tyresListing/TyreListingData';
import TyrePriceData from './tyre-price/TyrePriceData';
import UpdatesData from '../tyreComponents/components/updatesAbouteTyre/UpdatesData';
import TyreFaqsData from './tyreFAQs/TyreFaqsData';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';

export const dynamic = 'force-dynamic';

export default async function TyresPage({ params, searchParams }) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage(`${currentLang === 'en' ? '' : `${currentLang}/`}tyres`);
  console.log('Seo data for tyres page:', seoData);

  const tyreBrandsData = await getTyreBrands();

  // Get pagination info from TyreListingData
  const { component: TyreListingComponent, paginationInfo } = await TyreListingData({
    params,
    searchParams,
    basePath: '/tyres',
    tyreBrands: tyreBrandsData,
    showBrandFilter: true,
    showSizeFilter: true,
  });

  // Extract pagination data
  const { hasNextPage, currentPage } = paginationInfo;

  return (
    <main>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyres`,
          prev:
            currentPage > 1
              ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyres?page=${currentPage - 1}`
              : null,
          next: hasNextPage
            ? `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyres?page=${currentPage + 1}`
            : null,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="lg:mt-[159px]">
        <TyrePriceData />
        {TyreListingComponent}
        <TyrePriceInquireForm
          tyreBrands={tyreBrandsData}
          heading={translation.headerNavbar.tyre + ' ' + translation.headings.inquireforTyrePrice}
          translation={translation}
          currentLang={currentLang}
          brandName={''}
          isMobile={isMobile}
        />
        <UpdatesData
          slug="tyres"
          linkUrls={{
            videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />
        <TyreFaqsData headingKey={'tyrefaqs.allTractorTyres'} pageSlug={'tyres'} />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          tyreBrands={tyreBrandsData}
          defaultEnquiryType={'Tyre'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'tyres'} translation={translation} />
      </div>
      <FooterComponents translation={translation} />
    </main>
  );
}
