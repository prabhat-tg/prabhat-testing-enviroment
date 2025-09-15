import React from 'react';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import StockSummary from './stocksListing/StocksSummary';
import NewsFeed from './news/NewsFeed';
import StockDetail from './stocksDetail/StockDetail';

// Helper function to create default static metadata
const createDefaultMetadata = () => ({
    title: 'Tractor Price, Mileage, Specifications, Reviews, Comparison & Latest Models in India',
    description:
        'Explore the latest tractor models, prices, specifications, and reviews in India. Compare tractors and find the best deals at TractorGyan.',
    openGraph: {
        title: 'Tractors in India | TractorGyan',
        description: 'Find the best tractors in India with expert recommendations and price guides.',
        url: 'https://tractorgyan.com',
        type: 'website',
        images: [
            {
                url: 'https://tractorgyan.com/images/tractor-homepage-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Tractors Collection',
            },
        ],
    },
});

const TG_StocksDetailPage = async () => {
    let prefLang = await getSelectedLanguage(); // Default language
    let translation = {};
    let isMobile = false;
    const page = 'homepage';
    let seoData = null;
    let htmlSEO = null;

    // Core data that should always be available
    try {
        translation = await getDictionary(prefLang);
        isMobile = await isMobileView();
    } catch (error) {
        console.error('Error fetching core data:', error);
    }

    // SEO data with fallback
    try {
        seoData = await getSEOByPage(`${prefLang === 'en' ? 'homepage' : `${prefLang}/homepage`}`);
    } catch (error) {
        console.error('Error fetching SEO data:', error);
    }

    // Hindi SEO data
    if (prefLang === 'hi') {
        try {
            htmlSEO = await getDetailPageHeaderSEO({ page_type: 'hindi_main_homepage' });
        } catch (error) {
            console.error('Error fetching Hindi SEO data:', error);
        }
    }



    const staticMetadata = createDefaultMetadata();

    return (
        <>
            <SeoHead seo={seoData} staticMetadata={staticMetadata} seoHTMLDescription={htmlSEO?.data} />

            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={prefLang}
            />
            <main className="md:mt-[160px]">

                <StockDetail isMobile={isMobile} />
                <WhatsAppTopButton
                    translation={translation}
                    currentLang={prefLang}
                    defaultEnquiryType={'Tractor'}
                />

                <AboutTractorGyanServer slug={page} translation={translation} />
            </main>

            <FooterServer translation={translation} />

            {isMobile && <MobileFooter translation={translation} />}
        </>
    );
};

export default TG_StocksDetailPage;
