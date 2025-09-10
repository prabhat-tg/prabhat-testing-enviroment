// "use client";

// import { useEffect, useState } from "react";
import MobileNavbar from '@/src/components/shared/navbar/MobileNavbar';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';

// Import CSS here to prevent server-side conflicts
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// TODO tyre-nav-components name should be changed
export default async function NavComponents({ isMobile, translation, prefLang, mobileTabs }) {
  // Handle client-side only rendering to prevent hydration mismatch
  // const [isMounted, setIsMounted] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth < 1024);
  //   };

  //   checkMobile();
  //   window.addEventListener("resize", checkMobile);

  //   return () => {
  //     window.removeEventListener("resize", checkMobile);
  //   };
  // }, []);

  // if (!isMounted) {
  //   // Return a placeholder with similar structure to prevent layout shift
  //   return (
  //     <>
  //       <div className="hidden lg:block" style={{ height: "159px" }}></div>
  //       <div className="block lg:hidden" style={{ height: "60px" }}></div>
  //     </>
  //   );
  // }

  return (
    <>
      {<DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />}
      {/* {!isMobile && <SecondNavbar />} */}
      {isMobile && mobileTabs && <MobileNavbar translation={translation} tabset={mobileTabs} />}
    </>
  );
}
