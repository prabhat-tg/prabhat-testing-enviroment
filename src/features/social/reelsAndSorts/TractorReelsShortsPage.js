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
import ReelListingData from './ReelsListingData';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getBrandVideos } from '@/src/services/social/TyreBrandVideos';
import apiUrl from '@/src/services/apiUrl';

export default async function TractorReelShortsPage({ searchParams, porpsCurrentLang }) {
  const prefLang = porpsCurrentLang === 'hi' ? 'hi' : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const searchParam = await searchParams;

  const page = parseInt(searchParam.page || '1', 10);
  const start = (page - 1) * 12;
  const end = page * 12;

  let BrandReelData = [];
  let dataCount = 0;
  let reelError = false;
  let seoData = null;
  let hasNextPage = false;

  // 1. Fetch Reels Data
  try {
    const payload = {
      video_type: 'reels',
      start_limit: start,
      end_limit: end,
    };

    const response = await getBrandVideos(payload);

    if (response && response.data) {
      BrandReelData = response.data;
      dataCount = response.count || 0;
      hasNextPage = BrandReelData.length === end - start;
    } else {
      reelError = true;
    }
  } catch (err) {
    console.error('❌ Failed to fetch brand reels:', err);
    reelError = true;
  }

  // 2. Fetch SEO (independent of error)
  try {
    const seoSlug = `${porpsCurrentLang ? 'hi/' : ''}tractor-reels-and-shorts`;
    seoData = await getSEOByPage(seoSlug);
  } catch (err) {
    console.error('⚠️ Failed to fetch SEO:', err);
  }

  // 3. Construct URLs
  const currentSlug = `${porpsCurrentLang ? 'hi/' : ''}tractor-reels-and-shorts`;
  const baseUrl = `${apiUrl}${porpsCurrentLang ? '/hi' : ''}/tractor-reels-and-shorts`;

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
      <ScrollToTopOnNavigation />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />
      <main className="lg:mt-[0px]">
        <ReelListingData
          searchParams={searchParam}
          translation={translation}
          BrandReelData={BrandReelData}
          isMobile={isMobile}
          page={page}
          dataCount={dataCount}
          reelError={reelError}
          prefLang={prefLang}
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
