import React from 'react';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import { getSelectedLanguage } from '@/src/services/locale';
import ScrollToTopOnNavigation from '@/src/components/shared/ScrollToTopOnNavigation/ScrollToTopOnNavigation';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import WebStoryInIndiaData from './WebstoryListingData';

export default async function WebStoryInIndiaPage({ searchParams, porpsCurrentLang }) {
  const prefLang = porpsCurrentLang ? 'hi' : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  return (
    <>
      <ScrollToTopOnNavigation />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      <main className="lg:mt-[0px]">
        <WebStoryInIndiaData
          searchParams={searchParams}
          porpsCurrentLang={porpsCurrentLang}
          isMobile={isMobile}
          title={'Web-stories-in-india'}
          isShowCategory={true}
          parent={'webstory'}
          translation={translation}
          currentLang={prefLang}
          placeholder={translation.placeholder.SearchforWebstory}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          isMobile={isMobile}
        // tyreBrands={tyreBrands}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'web-story-in-india'} translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
