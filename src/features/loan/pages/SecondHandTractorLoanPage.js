import { getDictionary } from "@/src/lib/dictonaries";
import { isMobileView } from "@/src/utils";
import { getTyreFAQs } from "@/src/services/tyre/tyre-faq";
import TyreFAQs from "@/src/features/tyre/tyreFAQs/TyreFAQs";
import WhatsAppTopButton from "@/src/features/tyreComponents/commonComponents/WhatsAppTopButton";
import TractorGyanOfferings from "@/src/components/shared/offerings/TractorGyanOfferings";
import JoinOurCommunityServer from "@/src/components/shared/community/JoinOurCommunityServer";
import AboutTractorGyanServer from "@/src/components/shared/about/AboutTractorGyanServer";
import FooterServer from "@/src/components/shared/footer/FooterServer";
import MobileFooter from "@/src/components/shared/footer/MobileFooter";
import { getSelectedLanguage } from "@/src/services/locale";
import EligibilityAndDocumentData from "@/src/data/loan-Eligibility-document-data/secondHandTractorLoan.json";
import DesktopHeader from "@/src/components/shared/header/DesktopHeader";
import SeoHead from "@/src/components/shared/header/SeoHead";
import { getApiUrl } from "@/src/utils/utils";
import { getSEOByPage } from "@/src/services/seo/get-page-seo";
import LoanBanner from "../LoanBanner";
import LoanDetailsForm from "../LoanDetailsForm";
import LoanEligibilityAndDocuments from "../loanEligibilityAndDocuments/LoanEligibilityAndDocuments";
import LoanFinanceSchemes from "../loanFinanceSchemes/LoanFinanceSchemes";

export default async function SecondHandTractorLoanPage({ propsPrefLang }) {
  const prefLang = propsPrefLang === "hi" ? "hi" : await getSelectedLanguage();
  const page = "second-hand-tractor-loan";
  const seoSlug = `${prefLang === "hi" ? "hi/" : ""}${page}`;
  const apiUrl = getApiUrl();

  // Init error flags
  let translationError = false;
  let isMobileError = false;
  let faqsError = false;
  let seoError = false;

  // Init data
  let translation = {};
  let isMobile = false;
  let faqs = [];
  let seoData = null;

  try {
    const [translationRes, isMobileRes, faqsRes, seoRes] =
      await Promise.allSettled([
        getDictionary(prefLang),
        isMobileView(),
        getTyreFAQs({ langPrefix: prefLang, slug: page }),
        getSEOByPage(seoSlug),
      ]);

    if (translationRes.status === "fulfilled") {
      translation = translationRes.value;
    } else {
      translationError = true;
      console.error("❌ Translation Error:", translationRes.reason);
    }

    if (isMobileRes.status === "fulfilled") {
      isMobile = isMobileRes.value;
    } else {
      isMobileError = true;
      console.error("❌ isMobile Error:", isMobileRes.reason);
    }

    if (faqsRes.status === "fulfilled") {
      faqs = faqsRes.value || [];
      console.log('---faq status 1')
    } else {
      console.log('---faq status 2')
      faqsError = true;
      console.error("❌ FAQs Error:", faqsRes.reason);
    }

    if (seoRes.status === "fulfilled") {
      seoData = seoRes.value;
      console.log('---fulfiled')
    } else {
      console.log('---else')
      seoError = true;
      console.error("❌ SEO Error:", seoRes.reason);
    }
  } catch (err) {
    console.log('---catch')
    console.error("❌ Unexpected error during data fetching:", err);
  }

  console.log('----faq error', faqsError)

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        paginationLinks={{
          canonical: `${apiUrl}/${seoSlug}`,
        }}
      />

      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />

      <main className="lg:mt-[159px]">
        <LoanBanner
          title={translation?.loan?.secondHandTractorLoan}
          page={page}
          translation={translation}
        />
        <LoanDetailsForm
          isMobile={isMobile}
          activeTab={page}
          description={"Old Tractor"}
          translation={translation}
        />
        <LoanEligibilityAndDocuments
          data={EligibilityAndDocumentData}
          currentLang={prefLang}
        />
        <LoanFinanceSchemes
          title={translation?.loan?.secondHandTractorLoanFinanceSchemes}
        />

        {faqs?.length > 0 && (<TyreFAQs
          faqs={faqs}
          prefLang={prefLang}
          translation={translation}
          headingKey={"loan.secondHandTractorLoanFaq"}
          faqsError={faqsError}
        />)}

        <WhatsAppTopButton translation={translation} currentLang={prefLang} isMobile={isMobile} />

        <JoinOurCommunityServer
          translation={translation}
          currentLang={prefLang}
        />

        <TractorGyanOfferings translation={translation} />

        <AboutTractorGyanServer slug={seoSlug} translation={translation} />
      </main>

      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
