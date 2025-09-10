import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import React from 'react';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import FooterComponents from '../tyre/FooterComponents';
import { getApiUrl } from '@/src/utils/utils';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import DealershipTopSection from './DealershipTopSection';
import LatestTractorListing from './LatestTractorListing';
import OffersEventsSection from './OffersAndEventsSection';
import BuyUsedTractorSection from './BuyUsedTractorSection';
import AboutDealerSection from './AboutDealerSection';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import {
  getTyreReels,
  getTyreVideos,
  getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import ContactAndTeamSection from './ContactAndTeamSection';

export default async function DealershipPage({ searchParams }) {
  const apiUrl = getApiUrl();
  const seoSlug = `about`;
  const seoData = await getSEOByPage(seoSlug);
  const isMobile = await isMobileView();
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos('tractor-tyre-in-india'),
    getTyreReels('tractor-tyre-in-india'),
    getTyreWebstories('tractor-tyre-in-india'),
  ]);

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/about`,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />
      <main>
        <DealershipTopSection
          isMobile={isMobile}
          translation={translation}
          currentLang={currentLang}
        />
        <LatestTractorListing
          isMobile={isMobile}
          translation={translation}
          currentLang={currentLang}
        />
        <OffersEventsSection
          isMobile={isMobile}
          translation={translation}
          currentLang={currentLang}
        />
        <BuyUsedTractorSection
          isMobile={isMobile}
          translation={translation}
          currentLang={currentLang}
        />
        <AboutDealerSection
          isMobile={isMobile}
          translation={translation}
          currentLang={currentLang}
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
        <ContactAndTeamSection
          isMobile={isMobile}
          translation={translation}
          currentLang={currentLang}
        />
      </main>
      <FooterComponents translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
