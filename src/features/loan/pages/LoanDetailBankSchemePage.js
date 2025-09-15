import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
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
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getApiUrl } from '@/src/utils/utils';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import LoanFinanceSchemes from '../loanFinanceSchemes/LoanFinanceSchemes';
import LoanSchemeDetailPage from '../loanSchemeDetailPage/LoanSchemeDetailPage';

export default async function LoanDetailBankSchemePage({ params, propsPrefLang }) {
  const routeParams = await params;
  const slug = routeParams?.slug;
  const prefLang = propsPrefLang === 'hi' ? 'hi' : await getSelectedLanguage();
  const page = 'tractor-loan';
  const seoSlug = `${prefLang === 'hi' ? 'hi/' : ''}tractor-loan/${slug}`;
  const apiUrl = getApiUrl();

  // Flags
  let translationError = false;
  let isMobileError = false;
  let tyreBrandsError = false;
  let allTractorBrandsError = false;
  let popularTractorsError = false;
  let seoError = false;
  let faqsError = false;

  // Data
  let translation = {};
  let isMobile = false;
  let tyreBrands = [];
  let allTractorBrands = [];
  let popularData = [];
  let seoData = {};
  let faqs = [];

  try {
    // Run parallel API calls
    const [
      translationRes,
      isMobileRes,
      tyreBrandsRes,
      allTractorBrandsRes,
      popularTractorsRes,
      seoRes,
      faqsRes,
    ] = await Promise.allSettled([
      getDictionary(prefLang),
      isMobileView(),
      getTyreBrands(),
      getAllTractorBrands(),
      getTractorPopularDetails(prefLang),
      getSEOByPage(seoSlug),
      getTyreFAQs({ langPrefix: prefLang, slug: page }),
    ]);

    // Handle each
    if (translationRes.status === 'fulfilled') {
      translation = translationRes.value;
    } else {
      translationError = true;
      console.error('❌ Translation Error:', translationRes.reason);
    }

    if (isMobileRes.status === 'fulfilled') {
      isMobile = isMobileRes.value;
    } else {
      isMobileError = true;
      console.error('❌ isMobile Error:', isMobileRes.reason);
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

    if (popularTractorsRes.status === 'fulfilled') {
      popularData = popularTractorsRes.value || [];
    } else {
      popularTractorsError = true;
      console.error('❌ Popular Tractors Error:', popularTractorsRes.reason);
    }

    if (seoRes.status === 'fulfilled') {
      seoData = seoRes.value;
    } else {
      seoError = true;
      console.error('❌ SEO Error:', seoRes.reason);
    }

    if (faqsRes.status === 'fulfilled') {
      faqs = faqsRes.value || [];
    } else {
      faqsError = true;
      console.error('❌ FAQs Error:', faqsRes.reason);
    }
  } catch (err) {
    console.error('❌ Unexpected error in data fetching:', err);
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
        <LoanSchemeDetailPage
          allTractorBrands={allTractorBrands}
          allTractorBrandsError={allTractorBrandsError}
          translation={translation}
          langPrefix={prefLang}
          isMobile={isMobile}
          slug={slug}
        />

        <PopularSection
          popularData={popularData}
          popularDataError={popularTractorsError}
          translation={translation}
          langPrefix={prefLang}
          isMobile={isMobile}
          bgColor="bg-section-gray"
        />

        <LoanFinanceSchemes
          title={translation?.loan?.tractorLoanFinanceSchemes || 'Loan Schemes'}
        />

        <TyreFAQs
          faqs={faqs}
          faqsError={faqsError}
          prefLang={prefLang}
          translation={translation}
          headingKey="loan.tractorLoanFaq"
        />

        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          tyreBrandsError={tyreBrandsError}
          isMobile={isMobile}
        />

        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={slug} translation={translation} />
      </main>

      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
