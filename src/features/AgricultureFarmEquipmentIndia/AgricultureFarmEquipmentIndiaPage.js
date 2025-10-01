import React from 'react'
import DesktopHeader from '@/src/components/shared/header/DesktopHeader'
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import FooterComponents from '../tyre/FooterComponents';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import { getTyreReels, getTyreVideos, getTyreWebstories } from '@/src/services/tyre/tyre-brand-webstore';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import AgricultureFarmEquipmentTopSection from './AgricultureFarmEquipmentTopSection';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import AgricultureFarmTractorsByBrands from './AgricultureFarmTractorsByBrands';
import AgricultureFarmTractorImplementTypes from './AgricultureFarmTractorImplementTypes';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';

// Helper to safely unwrap Promise.allSettled results with a fallback
const unwrap = (settledResult, fallback = null) => {
    return settledResult && settledResult.status === 'fulfilled' ? settledResult.value : fallback;
};

export default async function AgricultureFarmEquipmentIndiaPage({ searchParams }) {
    const apiUrl = getApiUrl();

    const [currentLang, isMobile] = await Promise.all([getSelectedLanguage(), isMobileView()]);

    const slugWithoutPrefix = 'agriculture-and-farm-equipment-in-india';
    const langPrefix = currentLang === 'hi' ? '/hi' : '';
    const seoSlug = `${currentLang === 'hi' ? 'hi/' : ''}${slugWithoutPrefix}`;
    const pageSlug = seoSlug;
    const serviceSlug = slugWithoutPrefix;
    // Now fetch SEO using the seoSlug
    let seoData = {};
    try {
        seoData = await getSEOByPage(seoSlug);
    } catch (err) {
        console.error('getSEOByPage failed:', err);
        seoData = {};
    }

    let allTractorBrands = [];
    // Tractor brands with fallback
    try {
        const allTractorBrandsData = await getTractorBrands(currentLang);
        allTractorBrands = allTractorBrandsData || [];
    } catch (error) {
        console.error('Error fetching tractor brands:', error);
    }

    const buildImageAbsolute = (rawPath) => {
        if (!rawPath) return '';
        // sometimes API returns "/109731/...." or "109731/..."
        const clean = String(rawPath).replace(/^\/+/, '');
        return `https://images.tractorgyan.com/uploads/${clean}`;
    };

    const normalizedTractorBrands = (allTractorBrands?.data ?? allTractorBrands ?? []).map((b) => {
        // API has various fields: name (could be Hindi), name_en (english),
        // image (path), image_logo (file), url (page url)
        const name_hi = b?.name ?? b?.name_hi ?? '';
        const name_en = b?.name_en ?? b?.name_en ?? b?.name_en ?? '';
        const fallbackName = name_en || name_hi || b?.title || '';
        // choose `name` as the Hindi label if available; keep name_hi separate
        return {
            id: b?.id ?? b?._id,
            name: name_hi || fallbackName,         // keep old behaviour if callers expect `name` to be Hindi
            name_hi: name_hi || fallbackName,      // explicit Hindi field
            name_en: name_en || fallbackName,      // explicit English field
            url: b?.url ?? b?.page_url ?? b?.pageUrl ?? '',
            image: buildImageAbsolute(b?.image ?? b?.image_logo ?? b?.image_logo_path ?? ''),
            __raw: b,
        };
    });


    const translation = await getDictionary(currentLang);

    // Fetch top content (server-side). Use defensive fallback.
    let topContent = {};
    try {
        // pass ad_title (plain slug) for both languages
        topContent =
            (await getTyreTopContent({
                ad_title: serviceSlug,
                currentLang: currentLang,
                device_type: isMobile ? 'mobile' : 'desktop',
            })) || {};
    } catch (err) {
        console.error('getTyreTopContent failed:', err);
        topContent = {};
    }

    const preloadUrls = [];
    const heroImgUrl =
        topContent?.hero_image_url ||
        topContent?.heroImage ||
        topContent?.hero?.url ||
        null;
    if (heroImgUrl) preloadUrls.push(heroImgUrl);

    // --- Parallel: videos, reels, webstories, and implement types ---
    const [videosSettled, reelsSettled, webstoriesSettled, implementsSettled] =
        await Promise.allSettled([
            getTyreVideos(serviceSlug),
            getTyreReels(serviceSlug),
            getTyreWebstories(serviceSlug),
            getAllImplementTypes(),
        ]);

    const videos = unwrap(videosSettled, []);
    const reels = unwrap(reelsSettled, []);
    const webstories = unwrap(webstoriesSettled, []);
    const allImplementTypes = unwrap(implementsSettled, []);

    let faqs;
    try {
        faqs = await getUsedTractorFAQs({
            langPrefix: langPrefix, // '/hi' or ''
            slug: serviceSlug,
        });
    } catch (error) {
        console.error('Error fetching data for AgricultureFarmEquipmentIndiaPage:', error);
        return <div>Error loading page.</div>;
    }

    return (
        <>
            <SeoHead
                seo={seoData}
                staticMetadata={{}}
                preloadUrls={preloadUrls}
                paginationLinks={{
                    canonical: `${apiUrl}/${pageSlug}`,
                }}
            />
            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={currentLang}
            />
            <main>
                <AgricultureFarmEquipmentTopSection
                    showBanner={true}
                    isMobile={isMobile}
                    translation={translation}
                    currentLang={currentLang}
                    headingKey={'headings.allTractorTyres'}
                    topContent={topContent}
                    deviceType={isMobile ? 'mobile' : 'desktop'}
                    tyreTopContent={topContent}
                />
                <AgricultureFarmTractorsByBrands
                    translation={translation}
                    allTractorBrands={normalizedTractorBrands}
                    toggleView={true}
                    langPrefix={langPrefix}
                    currentLang={currentLang}
                />
                <AgricultureFarmTractorImplementTypes
                    heading={translation.headerNavbar.implementsByTypes}
                    allImplementTypes={allImplementTypes}
                    floatingBg={false}
                    slider={false}
                    isMobile={isMobile}
                    translation={translation}
                    langPrefix={langPrefix}
                    currentLang={currentLang}
                />
                <UpdatesSection
                    videos={videos}
                    reels={reels}
                    webstories={webstories}
                    translation={translation}
                    slug={serviceSlug}
                    brandName={
                        translation.headings?.AgricultureandFarmEquipmentinIndia ||
                        'Agriculture and Farm Equipment in India'
                    }
                    bgColor={'bg-section-gray'}
                    linkUrls={{
                        videos: `${langPrefix}/tractor-videos`,
                        webstories: `${langPrefix}/web-story-in-india`,
                        reels: `${langPrefix}/tractor-reels-and-shorts`,
                    }}
                />
                <TyreFAQs
                    faqs={faqs}
                    translation={translation}
                    headingKey={'faqs.usedTractorfaqs'}
                    bgColor={'bg-section-white'}
                />
                <WhatsAppTopButton
                    translation={translation}
                    currentLang={currentLang}
                    defaultEnquiryType={'Tyre'}
                    isMobile={isMobile}
                />
                <JoinOurCommunityServer
                    translation={translation}
                    currentLang={currentLang}
                />

                <TractorGyanOfferings translation={translation} />

                <AboutTractorGyanServer slug={seoSlug} translation={translation} />
            </main>

            <FooterComponents translation={translation} />
            {isMobile && <MobileFooter translation={translation} />}
        </>
    );
}
