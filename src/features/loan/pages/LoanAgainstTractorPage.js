// Client components - should be moved to separate files
import NavComponents from "@/src/features/tyre/NavComponents";
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
import EligibilityAndDocumentData from "@/src/data/loan-Eligibility-document-data/loanAgainstTractor.json";
import DesktopHeader from "@/src/components/shared/header/DesktopHeader";
import SeoHead from "@/src/components/shared/header/SeoHead";
import { getApiUrl } from "@/src/utils/utils";
import { getSEOByPage } from "@/src/services/seo/get-page-seo";
import LoanBanner from "../LoanBanner";
import LoanDetailsForm from "../LoanDetailsForm";
import LoanEligibilityAndDocuments from "../loanEligibilityAndDocuments/LoanEligibilityAndDocuments";
import LoanFinanceSchemes from "../loanFinanceSchemes/LoanFinanceSchemes";

export default async function LoanAgainstTractorPage({ propsPrefLang }) {
  const prefLang = propsPrefLang === "hi" ? "hi" : await getSelectedLanguage();
  const seoSlug = `${prefLang === "hi" ? "hi/" : ""}loan-against-tractor`;
  const apiUrl = getApiUrl();
  const page = "loan-against-tractor";

  // Run API calls in parallel
  const [translationRes, isMobileRes, faqsRes, seoRes] =
    await Promise.allSettled([
      getDictionary(prefLang),
      isMobileView(),
      getTyreFAQs({ langPrefix: prefLang, slug: page }),
      getSEOByPage(seoSlug),
    ]);

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

  // Handle results
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
  } else {
    faqsError = true;
    console.error("❌ Tyre FAQ Error:", faqsRes.reason);
  }

  if (seoRes.status === "fulfilled") {
    seoData = seoRes.value;
  } else {
    seoError = true;
    console.error("❌ SEO Error:", seoRes.reason);
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

      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />

      <main className="lg:mt-[159px]">
        <LoanBanner
          title={
            translation?.loan?.loanAgainstTractor || "Loan Against Tractor"
          }
          page={page}
          translation={translation}
        />

        <LoanDetailsForm
          isMobile={isMobile}
          activeTab={"loan-against-tractor"}
          description={"Loan Against Tractor Loan"}
          translation={translation}
        />

        <LoanEligibilityAndDocuments
          data={EligibilityAndDocumentData}
          currentLang={prefLang}
        />

        <LoanFinanceSchemes
          title={translation?.loan?.loanAgainstTractorFinanceSchemes || ""}
        />

        {faqs?.length > 0 && (<TyreFAQs
          headingKey={"loan.loanAgainstTractorFaq"}
          translation={translation}
          faqs={faqs}
          error={faqsError}
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
