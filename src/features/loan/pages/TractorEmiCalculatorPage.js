import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import { getSelectedLanguage } from '@/src/services/locale';
import SelectHP from '@/src/components/shared/selectHp/SelectHP';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import { getApiUrl } from '@/src/utils/utils';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import LoanBanner from '../LoanBanner';
import LoanCalculator from '../loanCalculator/LoanCalculator';

export default async function TractorEmiCalculatorPage({ propsPrefLang }) {
  const prefLang = propsPrefLang === 'hi' ? 'hi' : await getSelectedLanguage();
  const page = 'tractor-emi-calculator';
  const seoSlug = `${prefLang === 'hi' ? 'hi/' : ''}${page}`;
  const apiUrl = getApiUrl();

  // Init error flags
  let translationError = false;
  let tyreBrandsError = false;
  let allTractorBrandsError = false;
  let popularDataError = false;
  let isMobileError = false;
  let faqsError = false;
  let seoError = false;

  // Init data
  let translation = {};
  let tyreBrands = [];
  let allTractorBrands = [];
  let popularData = [];
  let isMobile = false;
  let faqs = [];
  let seoData = null;

  try {
    const [
      translationRes,
      tyreBrandsRes,
      allTractorBrandsRes,
      popularTractorRes,
      isMobileRes,
      faqsRes,
      seoRes,
    ] = await Promise.allSettled([
      getDictionary(prefLang),
      getTyreBrands(),
      getAllTractorBrands(),
      getTractorPopularDetails(prefLang),
      isMobileView(),
      getTyreFAQs({ langPrefix: prefLang, slug: page }),
      getSEOByPage(seoSlug),
    ]);

    if (translationRes.status === 'fulfilled') {
      translation = translationRes.value;
    } else {
      translationError = true;
      console.error('❌ Translation Error:', translationRes.reason);
    }

    if (tyreBrandsRes.status === 'fulfilled') {
      tyreBrands = tyreBrandsRes.value || [];
    } else {
      tyreBrandsError = true;
      console.error('❌ Tyre Brands Error:', tyreBrandsRes.reason);
    }

    if (allTractorBrandsRes.status === 'fulfilled') {
      allTractorBrands = allTractorBrandsRes.value || [];
    } else {
      allTractorBrandsError = true;
      console.error('❌ Tractor Brands Error:', allTractorBrandsRes.reason);
    }

    if (popularTractorRes.status === 'fulfilled') {
      popularData = popularTractorRes.value || [];
    } else {
      popularDataError = true;
      console.error('❌ Popular Tractors Error:', popularTractorRes.reason);
    }

    if (isMobileRes.status === 'fulfilled') {
      isMobile = isMobileRes.value;
    } else {
      isMobileError = true;
      console.error('❌ isMobile Error:', isMobileRes.reason);
    }

    if (faqsRes.status === 'fulfilled') {
      faqs = faqsRes.value || [];
    } else {
      faqsError = true;
      console.error('❌ FAQs Error:', faqsRes.reason);
    }

    if (seoRes.status === 'fulfilled') {
      seoData = seoRes.value;
    } else {
      seoError = true;
      console.error('❌ SEO Error:', seoRes.reason);
    }
  } catch (err) {
    console.error('❌ Unexpected error during data fetching:', err);
  }

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        paginationLinks={{
          canonical: `${apiUrl}/${seoSlug}`,
        }}
      />

      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />

      <main className="lg:mt-[159px]">
        <LoanBanner
          title={translation?.loan?.emiLoanCalculator}
          translation={translation}
          page={page}
          isMobile={isMobile}
        />

        <LoanCalculator translation={translation} currentLang={prefLang} isMobile={isMobile} />

        <SelectHP langPrefix={prefLang} isMobile={isMobile} translation={translation} />

        <PopularSection
          langPrefix={prefLang}
          popularData={popularData}
          popularDataError={popularDataError}
          isMobile={isMobile}
          translation={translation}
          bgColor={'bg-section-gray'}
          redirectRoute="/tractors"
        />

        <TractorsByBrands
          translation={translation}
          langPrefix={prefLang}
          allTractorBrands={allTractorBrands}
        />

        <TyreFAQs
          headingKey={'loan.tractorLoanFaq'}
          translation={translation}
          faqs={faqs}
          faqsError={faqsError}
        />

        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          isMobile={isMobile}
        />

        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />

        <TractorGyanOfferings translation={translation} />

        <AboutTractorGyanServer slug={seoSlug} translation={translation} />
      </main>

      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
