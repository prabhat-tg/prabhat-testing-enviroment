import DesktopHeader from '@/src/components/shared/header/DesktopHeader'
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import React from 'react'
import FooterComponents from '../tyre/FooterComponents';
import FeedBackForm from './FeedBackForm';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import ConnectUsSection from './ConnectUsSection';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';

export default async function OurContactPage({ searchParams }) {
    const apiUrl = getApiUrl();
    const seoSlug = `our-contacts`;
    const seoData = await getSEOByPage(seoSlug);
    const currentLang = await getSelectedLanguage(); // Server-side language detection
    const translation = await getDictionary(currentLang);
    const isMobile = await isMobileView();

    return (
        <>
            <SeoHead
                seo={seoData}
                staticMetadata={{}}
                preloadUrls={[]}
                paginationLinks={{
                    canonical: `${apiUrl}/our-contacts`,
                }}
            />
            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={currentLang}
                showLanguageSelector={false}
            />
            <main>
                <FeedBackForm
                    isMobile={isMobile}
                    translation={translation}
                    bgColor={"bg-blue-lightest"}
                />
                <ConnectUsSection
                    isMobile={isMobile}
                    bgColor={"bg-blue-lightest"} />
                <WhatsAppTopButton translation={translation} currentLang={currentLang} isMobile={isMobile} />
            </main>
            <FooterComponents translation={translation} />
            {isMobile && <MobileFooter translation={translation} />}
        </>
    )
}

