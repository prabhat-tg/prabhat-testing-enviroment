import React from 'react';
import { fetchData } from '@/src/services/apiMethods';
import { getApiUrl } from '@/src/utils/utils';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSelectedLanguage } from '@/src/services/locale';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getBrandWebStory } from '@/src/services/social/BrandWebstory';
import WebStoryCategoryListing from '@/src/features/social/category/WebStoryCategoryListing';
import WebstoryCategoryData from './WebStoryCategoryData';

export default async function WebStoryCategoryPage({ params, searchParams, porpsCurrentLang }) {
  const prefLang = porpsCurrentLang ? 'hi' : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  return (
    <>
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      <ScrollToTopNavigate />
      <main className="lg:mt-[0px]">
        <WebstoryCategoryData
          searchParams={searchParams}
          params={params}
          porpsCurrentLang={porpsCurrentLang}
          isMobile={isMobile}
          title={`Web-Stories`}
          isShowCategory={true}
          parent={'webstory_slug_category'}
        />
        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'web-story-in-india'} translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
