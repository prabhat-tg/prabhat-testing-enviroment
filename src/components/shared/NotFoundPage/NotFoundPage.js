import React from "react";
import "@/app/tyreGlobals.css";
import NotFound from "@/src/components/shared/NotFoundPage/NotFound";
import DesktopHeader from "@/src/components/shared/header/DesktopHeader";
import FooterServer from "@/src/components/shared/footer/FooterServer";
import MobileFooter from "@/src/components/shared/footer/MobileFooter";
import SeoHead from "@/src/components/shared/header/SeoHead";
import { isMobileView } from "@/src/utils";
import { getDictionary } from "@/src/lib/dictonaries";
import { getSelectedLanguage } from "@/src/services/locale";
import JoinOurCommunityServer from "@/src/components/shared/community/JoinOurCommunityServer";
import TractorGyanOfferings from "@/src/components/shared/offerings/TractorGyanOfferings";

// Lightweight static metadata for 404
const createNotFoundMetadata = () => ({
    title: "Page Not Found | TractorGyan",
    description: "Oops! The page you are looking for doesn't exist.",
    openGraph: {
        title: "404 | TractorGyan",
        description: "This page could not be found.",
        url: "https://tractorgyan.com/404",
        type: "website",
    },
});

const NotFoundPage = async () => {
    // Default fallbacks
    let prefLang = "en";
    let translation = { notFound: "Page Not Found" };
    let isMobile = false;

    try {
        // Language + translations (cacheable)
        prefLang = await getSelectedLanguage();
        translation = await getDictionary(prefLang);
        isMobile = await isMobileView();
    } catch (error) {
        console.error("404 fallback data error:", error);
    }

    const staticMetadata = createNotFoundMetadata();

    return (
        <>
            <SeoHead seo={null} staticMetadata={staticMetadata} seoHTMLDescription={null} />

            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={prefLang}
            />

            <main className="md:mt-[160px]">
                <NotFound currentLang={prefLang} translation={translation} />

                {/* ✅ Both community + offerings kept */}
                <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
                <TractorGyanOfferings translation={translation} />
            </main>

            <FooterServer translation={translation} />
            {isMobile && <MobileFooter translation={translation} />}
        </>
    );
};

export default NotFoundPage;
