import DesktopHeader from '@/src/components/shared/header/DesktopHeader'
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import React from 'react'
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import FooterComponents from '../tyre/FooterComponents';
import AboutHeading from './AboutHeading';
import LeaderPage from './LeaderSection';
import JourneyPage from './JourneySection';
import ExtendedPage from './ExtendedSection';
import AwardsAndRecognitionsPage from './AwardsAndRecognitionsSection';
import NewsAndMediaPage from './NewsAndMediaSection';
import LifeAtTractorGyan from './LifeAtTractorGyan';
import JoinOurTeamPage from './JoinOurTeamSection';
import RapsaGroupMembersPage from './RapsaGroupMembersSection';
import BrandsPage from './BrandsSection';
import { getApiUrl } from '@/src/utils/utils';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import VisionSection from './VisionSection';
import LeaderSection from './LeaderSection';
import BrandsSection from './BrandsSection';
import ExtendedSection from './ExtendedSection';
import AwardsAndRecognitionsSection from './AwardsAndRecognitionsSection';
import JoinOurTeamSection from './JoinOurTeamSection';
import RapsaGroupMembersSection from './RapsaGroupMembersSection';
import JourneySection from './JourneySection';
import NewsAndMediaSection from './NewsAndMediaSection';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';

export default async function AboutPage({ searchParams }) {
    const apiUrl = getApiUrl();
    const seoSlug = `about`;
    const seoData = await getSEOByPage(seoSlug);
    const isMobile = await isMobileView();
    const currentLang = await getSelectedLanguage();
    const translation = await getDictionary(currentLang);

    return (
        <>
            <SeoHead
                seo={seoData}
                staticMetadata={{}}
                preloadUrls={[]}
                paginationLinks={{
                    canonical: `${apiUrl}/about`,
                }}
            />
            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={currentLang}
                showLanguageSelector={false}
            />
            <main>
                <AboutHeading isMobile={isMobile} />
                <VisionSection isMobile={isMobile} />
                <LeaderSection isMobile={isMobile} />
                <JourneySection isMobile={isMobile} />
                <BrandsSection isMobile={isMobile} />
                <ExtendedSection isMobile={isMobile} currentLang={currentLang} />
                <AwardsAndRecognitionsSection isMobile={isMobile} />
                <NewsAndMediaSection isMobile={isMobile} />
                <LifeAtTractorGyan isMobile={isMobile} />
                <JoinOurTeamSection isMobile={isMobile} />
                <RapsaGroupMembersSection isMobile={isMobile} />
                <WhatsAppTopButton translation={translation} currentLang={currentLang} isMobile={isMobile} />

            </main>
            <FooterComponents translation={translation} />
            {isMobile && <MobileFooter translation={translation} />}
        </>
    )
}

