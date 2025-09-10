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
import ReelsDetailSectionData from './ReelsDetailSectionData';
import { postVideoReelDetails } from '@/src/services/social/VideoReelDetail';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import { getSocialMediaSubsCount } from '@/src/services/social/SubscriberCounts';
import SeoHead from '@/src/components/shared/header/SeoHead';

export default async function TractorReelShortsDetailPage({ params }) {
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  const param = params?.slug;

  let reelDetailData = null;
  let seoDescription = null;
  let youtubeCount = null;

  let reelDetailError = false;
  let seoError = false;
  let youtubeError = false;

  // 1. Fetch reel detail
  try {
    const payload = {
      video_url: param,
      video_type: 'reels',
    };

    const reelDetails = await postVideoReelDetails(payload);

    if (reelDetails) {
      reelDetailData = reelDetails;
    } else {
      reelDetailError = true;
    }
  } catch (err) {
    console.error('❌ Failed to fetch reel detail:', err);
    reelDetailError = true;
  }

  // 2. Fetch SEO (always runs)
  try {
    const seoPayload = {
      video_url: param,
      page_type: 'reel_detail',
      video_type: 'reels',
    };

    const seoData = await getDetailPageHeaderSEO(seoPayload);
    seoDescription = seoData?.data || null;
  } catch (err) {
    console.error('⚠️ SEO fetch failed:', err);
    seoError = true;
  }

  // 3. Fetch YouTube subscriber count
  try {
    const response = await getSocialMediaSubsCount();
    youtubeCount = response?.youtube_count ?? null;
    if (!youtubeCount) youtubeError = true;
  } catch (err) {
    console.error('⚠️ YouTube count fetch failed:', err);
    youtubeError = true;
  }

  return (
    <>
      <SeoHead seo={{}} staticMetadata={{}} preloadUrls={[]} seoHTMLDescription={seoDescription} />
      <DesktopHeader
        showLanguageSelector={false}
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />

      <ScrollToTopOnNavigation />

      <main className="lg:mt-[0px]">
        <ReelsDetailSectionData
          param={param}
          reelDetailData={reelDetailData}
          isMobile={isMobile}
          youtubeCount={youtubeCount}
          reelDetailError={reelDetailError}
          youtubeError={youtubeError}
          seoError={seoError}
        />
        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'tractor-reels-and-shorts'} translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
