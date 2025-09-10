import React from 'react';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import { getSelectedLanguage } from '@/src/services/locale';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import VideosDetailsSectionData from './VideosDetailsSectionData';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';

export default async function TractorVideosDetailPage({ params }) {
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  let seoDescription = null;

  const param = params?.slug;

  try {
    const seoPayload = {
      video_url: param,
      page_type: 'video_detail',
      video_type: 'videos',
    };

    const seoData = await getDetailPageHeaderSEO(seoPayload);
    seoDescription = seoData?.data || null;
  } catch (err) {
    console.error('⚠️ SEO fetch failed:', err);
  }

  return (
    <>
      <DesktopHeader
        showLanguageSelector={false}
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />

      <ScrollToTopNavigate />

      <SeoHead seo={{}} staticMetadata={{}} preloadUrls={[]} seoHTMLDescription={seoDescription} />

      <main className="lg:mt-[0px]">
        <VideosDetailsSectionData params={params} />
        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} currentLang={prefLang} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
