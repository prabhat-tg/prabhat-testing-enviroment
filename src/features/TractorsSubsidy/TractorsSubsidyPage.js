import React, { Suspense } from 'react';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import nextDynamic from 'next/dynamic';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TractorSubsidyBanner from './TractorSubsidyBanner';
import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';
import TractorSubsidyData from './TractorSubsidyData';

const MobileFooter = nextDynamic(() => import('@/src/components/shared/footer/MobileFooter'), {
  ssr: true,
});
const JoinOurCommunityServer = nextDynamic(
  () => import('@/src/components/shared/community/JoinOurCommunityServer'),
  { ssr: true }
);
const TractorGyanOfferings = nextDynamic(
  () => import('@/src/components/shared/offerings/TractorGyanOfferings'),
  { ssr: true }
);
const FooterServer = nextDynamic(() => import('@/src/components/shared/footer/FooterServer'), {
  ssr: true,
});

export const dynamic = 'force-dynamic';

export default async function TractorsSubsidyPage({ searchParams, prefLangs }) {
  let prefLang = 'en'; // Default language
  let translation = {};
  let isMobile = false;

  try {
    prefLang = prefLangs ? 'hi' : (await getSelectedLanguage()) || 'en';
  } catch (error) {
    console.error('Error fetching selected language:', error);
    // prefLang remains 'en' (default)
  }

  try {
    translation = await getDictionary(prefLang);
  } catch (error) {
    console.error('Error fetching dictionary:', error);
    // translation remains {}
    // This might cause downstream errors if components rely heavily on translation without fallbacks
  }

  try {
    isMobile = await isMobileView();
  } catch (error) {
    console.error('Error determining mobile view:', error);
    // isMobile remains false (default)
  }

  return (
    <>
      <DesktopHeader
        isMobile={isMobile}
        translation={translation} // translation will be {} if fetch failed
        currentLang={prefLang}
      />
      <main className="lg:mt-[159px]">
        <ScrollToTopNavigate />


        <TractorSubsidyBanner translation={translation} />
        {/* <Suspense fallback={<ListingSkeleton />}> */}
        <TractorSubsidyData searchParams={searchParams} porpsCurrentLang={prefLangs} />
        {/* </Suspense> */}

        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={[]}
          defaultEnquiryType={'Tractor'}
          isMobile={isMobile}
        />
        {/* These components are assumed to handle their own errors or not be critical if parent data fails */}
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={`${prefLang === 'hi' ? 'hi/' : ''}tractors-subsidy-in-india`}
          translation={translation} // Pass translation, About component should handle if it's empty
        />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
