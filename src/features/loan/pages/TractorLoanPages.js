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
import EligibilityAndDocumentData from '@/src/data/loan-Eligibility-document-data/tractorLoan.json';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { getApiUrl } from '@/src/utils/utils';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import LoanBanner from '../LoanBanner';
import LoanDetailsForm from '../LoanDetailsForm';
import LoanEligibilityAndDocuments from '../loanEligibilityAndDocuments/LoanEligibilityAndDocuments';
import LoanFinanceSchemes from '../loanFinanceSchemes/LoanFinanceSchemes';
import SeoHead from '@/src/components/shared/header/SeoHead';
const TractorLoanPages = async ({ propsPrefLang }) => {
  const prefLang = propsPrefLang === 'hi' ? 'hi' : await getSelectedLanguage();
  const page = 'tractor-loan';
  const seoSlug = `${prefLang === 'hi' ? 'hi/' : ''}${page}`;
  const apiUrl = getApiUrl();

  let translationError = false;
  let isMobileError = false;
  let faqsError = false;
  let seoError = false;

  let translation = {};
  let isMobile = false;
  let faqs = [];
  let seoData = null;

  try {
    const [translationRes, isMobileRes, faqsRes, seoRes] = await Promise.allSettled([
      getDictionary(prefLang),
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
    console.error('❌ Unexpected error:', err);
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
          title={translation?.loan?.tractorLoan}
          page={page}
          translation={translation}
          currentLang={prefLang}
          isMobile={isMobile}
        />
        <LoanDetailsForm
          isMobile={isMobile}
          activeTab="new-tractor-loan"
          description="New Tractor"
          translation={translation}
          currentLang={prefLang}
        />
        <LoanEligibilityAndDocuments
          data={EligibilityAndDocumentData}
          translation={translation}
          currentLang={prefLang}
        />
        <LoanFinanceSchemes title={translation?.loan?.tractorLoanFinanceSchemes} />

        {faqs?.length > 0 && (
          <TyreFAQs
            faqs={faqs}
            prefLang={prefLang}
            translation={translation}
            headingKey="loan.tractorLoanFaq"
            faqsError={faqsError}
          />
        )}

        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          isMobile={isMobile}
        // tyreBrands={...}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={seoSlug} translation={translation} />
      </main>

      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorLoanPages;
