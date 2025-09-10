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
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import VideoListingData from './VideoListingData';
import SeoHead from '@/src/components/shared/header/SeoHead';
import apiUrl from '@/src/services/apiUrl';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getBrandVideos } from '@/src/services/social/TyreBrandVideos';

export default async function TractorVideosPage({ searchParams, porpsCurrentLang }) {
  const prefLang = porpsCurrentLang ? 'hi' : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  let seoData = null;
  let hasNextPage = false;
  let brandVideoData = [];
  let storyError = false;

  const page = parseInt(searchParams.page || '1', 10);
  const currentSlug = `${porpsCurrentLang ? 'hi/' : ''}tractor-videos`;
  const baseUrl = `${apiUrl}${porpsCurrentLang ? '/hi' : ''}/tractor-videos`;
  try {
    const seoSlug = `${porpsCurrentLang ? 'hi/' : ''}tractor-videos`;
    seoData = await getSEOByPage(seoSlug);
  } catch (err) {
    console.error('⚠️ Failed to fetch video listing SEO:', err);
  }

  try {
    const start = (page - 1) * 10;
    const end = page * 10;

    const payload = {
      video_type: 'videos',
      start_limit: start,
      end_limit: end,
    };

    const response = await getBrandVideos(payload);

    if (response && response.data) {
      brandVideoData = response.data;
      hasNextPage = brandVideoData.length === end - start;
    } else {
      storyError = true;
    }
  } catch (err) {
    console.error('❌ Failed to fetch brand videos:', err);
    storyError = true;
  }

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        currentSlug={currentSlug}
        fullUrl={`${baseUrl}?page=${page}`}
        paginationLinks={{
          canonical: baseUrl,
          prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
          next: hasNextPage ? `${baseUrl}?page=${page + 1}` : null,
        }}
      />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      <ScrollToTopNavigate />

      <main className="lg:mt-[155px]">
        <VideoListingData
          brandVideoData={brandVideoData}
          isMobile={isMobile}
          page={page}
          translation={translation}
          prefLang={prefLang}
          storyError={storyError}
        />
        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} currentLang={prefLang} />
        <AboutTractorGyanServer slug={'tractor-videos'} translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
