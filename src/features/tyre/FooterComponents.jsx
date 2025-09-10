// "use client";
import MobileFooter from "@/src/components/shared/footer/MobileFooter";
import Footer from "@/src/components/shared/footer/Footer";
import { isMobileView } from "@/src/utils";
import FooterServer from "@/src/components/shared/footer/FooterServer";

export default async function FooterComponents({ translation }) {
  const isMobile = await isMobileView();

  return (
    <>
      {translation ? <FooterServer translation={translation} /> : <Footer />}
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
