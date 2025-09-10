import ForgetPasswordMain from "@/src/components/auth/forget-password/ForgetPasswordMain";
import FooterServer from "@/src/components/shared/footer/FooterServer";
import MobileFooter from "@/src/components/shared/footer/MobileFooter";
import DesktopHeader from "@/src/components/shared/header/DesktopHeader";
import { getDictionary } from "@/src/lib/dictonaries";
import { getSelectedLanguage } from "@/src/services/locale";
import { isMobileView } from "@/src/utils";

const page = async () => {
  const prefLang = await getSelectedLanguage();
  const isMobile = await isMobileView();
  const translation = await getDictionary(prefLang);
  return (
    <>
      <DesktopHeader
        showLanguageSelector={false}
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />
      <ForgetPasswordMain translation={translation} currentLang={prefLang} />
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};
export default page;
