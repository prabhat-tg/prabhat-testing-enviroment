import WhatsAppTopButton from "@/src/features/tyreComponents/commonComponents/WhatsAppTopButton";
import TractorGyanOfferings from "@/src/components/shared/offerings/TractorGyanOfferings";
import AboutTractorGyanServer from "@/src/components/shared/about/AboutTractorGyanServer";
import JoinOurCommunityServer from "@/src/components/shared/community/JoinOurCommunityServer";

// TODO can change name of this component
export default function ClientComponentsWithoutAbout({
  tyreBrands,
  pageName,
  translation,
  prefLang,
}) {
  return (
    <>
      <WhatsAppTopButton
        translation={translation}
        defaultEnquiryType={"Tyre"}
        tyreBrands={tyreBrands}
      />
      <JoinOurCommunityServer
        translation={translation}
        currentLang={prefLang}
      />{" "}
      <TractorGyanOfferings translation={translation} />
      <AboutTractorGyanServer
        slug={pageName || "tyre-homepage"}
        translation={translation}
      />
    </>
  );
}
