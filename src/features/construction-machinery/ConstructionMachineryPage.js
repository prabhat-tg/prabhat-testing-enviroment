import React from 'react';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import FooterComponents from '../tyre/FooterComponents';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import ConstructionMachineryTopSection from './ConstructionMachineryTopSection';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import { getConstructionMachineryBrand } from '@/src/services/construction-machinery-brand/construction-machinery-brand';
import { getTyreReels, getTyreVideos, getTyreWebstories } from '@/src/services/tyre/tyre-brand-webstore';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import ConstructionMachineryBrands from './ConstructionMachineryBrands';
import GoogleAdHorizontalClientWrapper from '../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper';

const unwrap = (settledResult, fallback = null) => {
  return settledResult && settledResult.status === 'fulfilled' ? settledResult.value : fallback;
};

export default async function ConstructionMachineryPage({ searchParams }) {
  const apiUrl = getApiUrl();

  // Stage 1: get language and device info (parallel)
  const [langSettled, mobileSettled] = await Promise.allSettled([getSelectedLanguage(), isMobileView()]);
  const currentLang = unwrap(langSettled, 'en');
  const isMobile = unwrap(mobileSettled, false);

  const slugWithoutPrefix = 'construction-machinery-and-equipment-in-india';
  const langPrefix = currentLang === 'hi' ? '/hi' : '';
  const seoSlug = `${currentLang === 'hi' ? 'hi/' : ''}${slugWithoutPrefix}`;
  const pageSlug = seoSlug;
  const serviceSlug = slugWithoutPrefix;

  const deviceType = isMobile ? 'mobile' : 'desktop';
  const [
    seoSettled,
    dictSettled,
    topContentSettled,
    videosSettled,
    reelsSettled,
    webstoriesSettled,
    faqsSettled,
    brandsSettled,
  ] = await Promise.allSettled([
    getSEOByPage(seoSlug),
    getDictionary(currentLang),
    getTyreTopContent({ ad_title: serviceSlug, currentLang: currentLang, device_type: deviceType }),
    getTyreVideos(serviceSlug),
    getTyreReels(serviceSlug),
    getTyreWebstories(serviceSlug),
    getUsedTractorFAQs({ langPrefix: langPrefix, slug: serviceSlug }),
    getConstructionMachineryBrand(),
  ]);

  const seoData = unwrap(seoSettled, {});
  const translation = unwrap(dictSettled, {});
  const topContent = unwrap(topContentSettled, {});
  const videos = unwrap(videosSettled, []);
  const reels = unwrap(reelsSettled, []);
  const webstories = unwrap(webstoriesSettled, []);
  const faqs = unwrap(faqsSettled, []);
  const allImplementBrandsRaw = unwrap(brandsSettled, []);

  // normalize implement brands so TractorImplementBrands can use them unchanged
  const rawBrands = allImplementBrandsRaw?.data ?? allImplementBrandsRaw ?? [];
  const stripLeadingSlash = (s) => (typeof s === 'string' ? s.replace(/^\/+/, '') : s || '');
  const normalizedImplementBrands = rawBrands.map((it) => ({
    id: it.id ?? it._id ?? undefined,
    image: stripLeadingSlash(it.image ?? it.img ?? it.logo ?? ''),
    page_url: it.page_url ?? it.pageUrl ?? it.url ?? it.page_url ?? '',
    name: it.name ?? it.title ?? '',
    name_hi: it.name_hi ?? it.title_hi ?? '',
    __raw: it,
  }));

  const preloadUrls = [];
  const heroImgUrl =
    topContent?.hero_image_url ||
    topContent?.heroImage ||
    topContent?.hero?.url ||
    null;
  if (heroImgUrl) preloadUrls.push(heroImgUrl);

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={preloadUrls}
        paginationLinks={{
          canonical: `${apiUrl}/${pageSlug}`,
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
          topContent={topContent}
          deviceType={deviceType}
        />

        {/* Tractor Implement Brands */}
        <ConstructionMachineryBrands
          heading={translation.headings?.ConstructionMachineryByBrands}
          allImplementBrands={normalizedImplementBrands}
          translation={translation}
          bgColor={'bg-section-gray'}
          prefLang={currentLang}
          toggleView={true}
        />
        {isMobile && (
          <GoogleAdHorizontalClientWrapper />
        )}

        <TyreFAQs
          faqs={faqs}
          translation={translation}
          headingKey={'faqs.usedTractorfaqs'}
          bgColor={'bg-section-white'}
        />

        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          defaultEnquiryType={'Tyre'}
          isMobile={isMobile}
        />

        <JoinOurCommunityServer
          translation={translation}
          currentLang={currentLang}
        />

        <TractorGyanOfferings translation={translation} />

        <AboutTractorGyanServer slug={pageSlug} translation={translation} />
      </main>

      <FooterComponents translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
