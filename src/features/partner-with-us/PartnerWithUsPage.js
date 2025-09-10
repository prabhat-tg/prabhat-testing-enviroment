import React from 'react';
import nextDynamic from 'next/dynamic';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { isMobileView } from '@/src/utils';
import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import GrowBusinessSection from './GrowBusinessSection';
import WhyJoinUsSection from './WhyJoinUsSection';
import DigitalPresenceSection from './DigitalPresenceSection';
import SocialPresenceSection from './SocialPresenceSection';
import OurBrandsSection from './OurBrandsSection';
import HelpingMechaniseSection from './HelpingMechaniseSection';
import ImplementPromotionSection from './ImplementPromotionSection';
import TyrePromotionSection from './TyrePromotionSection';
import InsuranceFinanceSection from './InsuranceFinanceSection';
import BusinessContactForm from './BusinessContactForm';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
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

const TG_PartnerWithUsPage = async ({ prefLangs }) => {
  let prefLang = 'en'; // Default language
  let translation = {};
  let isMobile = false;
  try {
    prefLang = prefLangs ? 'hi' : (await getSelectedLanguage()) || 'en';
    translation = await getDictionary(prefLang);
    isMobile = await isMobileView();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const apiUrl = getApiUrl();
  const seoSlug = `partner`;
  const seoData = await getSEOByPage(seoSlug);

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/partner`,
        }}
      />
      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
        showLanguageSelector={false}
      />
      <ScrollToTopNavigate />
      <main className="lg:mt-[159px]">
        <GrowBusinessSection />
        <WhyJoinUsSection />
        <SocialPresenceSection />
        <DigitalPresenceSection />
        <OurBrandsSection />
        <HelpingMechaniseSection />
        <ImplementPromotionSection />

        <TyrePromotionSection />
        <InsuranceFinanceSection />
        <BusinessContactForm isMobile={isMobile} />
        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TG_PartnerWithUsPage;
