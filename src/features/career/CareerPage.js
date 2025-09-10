import React, { Suspense } from 'react';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import nextDynamic from 'next/dynamic';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import CareerPerksBenifits from './CareerPerksBenifits';
import CareerJoinUs from './CareerJoinUs';
import CareerCoreValue from './CareerCoreValue';
import CareerStayUpdated from './CareerStayUpdated';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import CareerSliderData from './CareerSliderData';
import CarouselSkeletonUI from '@/src/components/ui/listingSkeleton/CaroselSkeleton';
import CareerJobOpeneingsData from './CareerJobOpeneingsData';

const MobileFooter = nextDynamic(() => import('@/src/components/shared/footer/MobileFooter'), {
  ssr: true,
});

const FooterServer = nextDynamic(() => import('@/src/components/shared/footer/FooterServer'), {
  ssr: true,
});

export const dynamic = 'force-dynamic';

const CareerPage = async () => {
  let prefLang = 'en';
  let translation = {};
  let isMobile = false;
  let seoData = null;
  const apiUrl = getApiUrl();

  try {
    prefLang = await getSelectedLanguage();
  } catch (error) {
    console.error('Error fetching selected language:', error);
  }

  try {
    translation = await getDictionary(prefLang);
  } catch (error) {
    console.error('Error fetching dictionary:', error);
  }

  try {
    isMobile = await isMobileView();
  } catch (error) {
    console.error('Error determining mobile view:', error);
  }

  try {
    const seoSlug = `career`;
    seoData = await getSEOByPage(seoSlug);
  } catch (err) {
    console.error('⚠️ Failed to fetch SEO:', err);
  }

  const currentSlug = `career`;
  const baseUrl = `${apiUrl}/career`;

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        currentSlug={currentSlug}
        fullUrl={baseUrl}
        paginationLinks={{
          canonical: baseUrl,
        }}
      />
      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
        showLanguageSelector={false}
      />
      <main className="lg:mt-[159px]">
        <ScrollToTopNavigate />
        <section className="pt-0">
          <Suspense fallback={<CarouselSkeletonUI />}>
            <CareerSliderData params={'career'} translation={translation} />
          </Suspense>

          <div className={`container`}>
            <CareerPerksBenifits />
            <CareerJoinUs isMobile={isMobile} />
            <CareerCoreValue />
          </div>
          <Suspense fallback={<CarouselSkeletonUI />}>
            <CareerJobOpeneingsData params={'career'} translation={translation} />
          </Suspense>
          <CareerStayUpdated isMobile={isMobile} />
        </section>
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={[]}
          defaultEnquiryType={'Tractor'}
          isMobile={isMobile}
        />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};
export default CareerPage;
