

import DesktopHeader from '@/src/components/shared/header/DesktopHeader'
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import React from 'react'
import FooterComponents from '../tyre/FooterComponents';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getApiUrl } from '@/src/utils/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import { getTyreTopContent } from '@/src/services/tyre/top-content';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import { getTyreReels, getTyreVideos, getTyreWebstories } from '@/src/services/tyre/tyre-brand-webstore';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getUsedTractorFAQs } from '@/src/services/second-hand-tractors/used-tractor-faqs';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import ConstructionMachineryTopSection from '../construction-machinery/ConstructionMachineryTopSection';
import { getTractorBrands } from '@/src/services/tractor/all-tractor-brands-v2';
import { getTractorBrandBlogNews } from '@/src/services/tractor/get-tractor-brand-blog-news';
import NewsSection from '../tyre/tyreNews/NewsSection';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';

export default async function ItlTractorsPage({ searchParams, isSeriesListing = false,
    seriesName = null,
    hpRange = null,
    hpTitle = null }) {
    const apiUrl = getApiUrl();
    const seoSlug = `itl-tractors-in-india`;
    const seoData = await getSEOByPage(seoSlug);
    const currentLang = await getSelectedLanguage(); // Server-side language detection
    const translation = await getDictionary(currentLang);
    const isMobile = await isMobileView();
    let faqs;
    let allTractorBrands;
    const pageSlug = 'itl-tractors-in-india';

    let staticTopContent;

    if (currentLang === "hi") {
        staticTopContent = {
            ad_content: `
      <p>
        इंटरनेशनल ट्रैक्टर्स लिमिटेड (ITL), जिसकी स्थापना 1969 में हुई थी और जिसका मुख्यालय होशियारपुर, पंजाब में है, भारत के सबसे बड़े ट्रैक्टर निर्माताओं में से एक है और वैश्विक कृषि मशीनरी बाजार में एक प्रमुख खिलाड़ी है। ITL दो मजबूत ब्रांड्स – सोनालिका और सोलिस के माध्यम से काम करता है, जो 150 से अधिक देशों के किसानों को भरोसेमंद और उच्च प्रदर्शन वाले ट्रैक्टर उपलब्ध कराता है।
      </p>

      <p>
        सोनालिका मुख्य रूप से भारतीय बाजार को पूरा करता है, जिसमें 20 एचपी से 120 एचपी तक के ट्रैक्टर शामिल हैं। यह ट्रैक्टर उत्कृष्ट ईंधन दक्षता, मजबूत बॉडी क्वालिटी और आधुनिक फीचर्स के लिए जाने जाते हैं, जो विभिन्न कृषि कार्यों के लिए उपयुक्त हैं। यह ब्रांड भारतीय किसानों को विश्वसनीय और किफायती समाधान प्रदान करने के लिए मशहूर है।
      </p>

      <p>
        सोलिस, ITL का अंतरराष्ट्रीय ब्रांड है, जिसे वैश्विक खेती मानकों को पूरा करने के लिए डिजाइन किया गया है। इसमें 20 एचपी से 90+ एचपी तक के ट्रैक्टर शामिल हैं। सोलिस ट्रैक्टर उन्नत तकनीक, टिकाऊपन और विभिन्न भौगोलिक परिस्थितियों और खेती की ज़रूरतों के अनुसार अनुकूलन क्षमता के लिए दुनिया भर में सराहे जाते हैं। यह ITL की एक भरोसेमंद और नवाचारी कृषि ब्रांड के रूप में प्रतिष्ठा को मजबूत करता है।
      </p>
    `
        };
    } else {
        staticTopContent = {
            ad_content: `
      <p>
        International Tractors Limited (ITL), established in 1969 and headquartered in Hoshiarpur, Punjab, is one of India’s largest tractor manufacturers and a key player in the global agricultural machinery market. ITL operates through two strong brands - Sonalika and Solis delivering reliable, high-performance tractors to farmers in over 150 countries.
      </p>

      <p>
        Sonalika caters primarily to the Indian market with tractors ranging from 20 HP to 120 HP, offering excellent fuel efficiency, strong build quality, and modern features suitable for a variety of farming tasks. The brand is known for providing dependable and affordable solutions for Indian farmers.
      </p>

      <p>
        Solis, ITL’s international brand, is designed to meet global farming standards, with tractors in the 20 HP to 90+ HP range. Solis tractors are appreciated worldwide for their advanced technology, durability, and adaptability across different terrains and farming needs, reinforcing ITL’s reputation as a trusted and innovative agricultural brand.
      </p>
    `
        };
    }

    const [videos, reels, webstories, allTractorBrandsRes] = await Promise.all([
        getTyreVideos('tractor-tyre-in-india'),
        getTyreReels('tractor-tyre-in-india'),
        getTyreWebstories('tractor-tyre-in-india'),
        getTractorBrands(currentLang)
    ]);
    try {

        faqs = await getUsedTractorFAQs({
            langPrefix: currentLang,
            slug: pageSlug,
        });
    } catch (error) {
        console.error('Error fetching data for FrontTyrePage:', error);
        return <div>Error loading page.</div>;
    }

    if (allTractorBrandsRes.length > 0) {
        console.log('----old allTractorBrandsRes', allTractorBrandsRes)
        allTractorBrands = allTractorBrandsRes || [];
    } else {
        console.error("❌ Tractor Brands Error:", allTractorBrandsRes.reason);
    }

    const allTractorListingBrands = allTractorBrands.map((brand) => ({
        title: brand.name,
        brand_name: brand.name,
        imgSrc: brand.image,
        url: brand.url,
    }));

    const brandName = currentLang === "hi" ? 'itl' : 'itl';

    const brandByLang = brandName;

    const popularData = await getTractorPopularDetails(currentLang);
    const popularTractorsError = false;

    return (
        <>
            <SeoHead
                seo={seoData}
                staticMetadata={{}}
                preloadUrls={[]}
                paginationLinks={{
                    canonical: `${apiUrl}${currentLang === 'hi' ? '/hi' : ''}/itl-tractor-in-india`,
                }}
            />
            <DesktopHeader
                isMobile={isMobile}
                translation={translation}
                currentLang={currentLang}
            />
            <main>
                <ConstructionMachineryTopSection
                    showBanner={true}
                    isMobile={isMobile}
                    translation={translation}
                    currentLang={currentLang}
                    headingKey={'headings.allTractorTyres'}
                    topContent={staticTopContent}
                    deviceType={isMobile ? 'mobile' : 'desktop'}
                    heading={translation.headings.itlTractorsinIndia}
                    parent={"brand-leading"}
                    parentHeading={'itl'}
                />
                <TractorImplementBrands
                    bgColor={'bg-section-gray'}
                    heading={translation.headings.TractorByBrands}
                    allImplementBrands={allTractorListingBrands}
                    itemsShown={isMobile ? 9 : 12}
                    translation={translation}
                    prefLang={currentLang}
                    parent={"brand-leading"}
                />
                <PopularSection
                    popularData={popularData}
                    popularDataError={popularTractorsError}
                    translation={translation}
                    langPrefix={currentLang}
                    isMobile={isMobile}
                />
                <UpdatesSection
                    bgColor={'bg-section-gray'}
                    videos={videos}
                    reels={reels}
                    webstories={webstories}
                    translation={translation}
                    slug={'itl-tractors-in-india'}
                    brandName={
                        isSeriesListing
                            ? brandByLang +
                            ' ' +
                            seriesName
                                .replace(/-/g, ' ')
                                .replace(/\b\w/g, l => l.toUpperCase())
                                .replace('Tractors', '')
                            : brandByLang
                    }
                    linkUrls={{
                        videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
                        webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
                        reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
                    }}
                    moduleType="tractor"
                />
                <TyreFAQs
                    faqs={faqs}
                    translation={translation}
                    headingKey={'faqs.usedTractorfaqs'}
                    bgColor={'bg-section-white'}
                />

                <WhatsAppTopButton translation={translation} currentLang={currentLang}
                    defaultEnquiryType={'Tyre'} />
                <JoinOurCommunityServer
                    translation={translation} currentLang={currentLang} />
                <TractorGyanOfferings translation={translation} />
                <AboutTractorGyanServer slug={pageSlug} translation={translation} />
            </main>
            <FooterComponents translation={translation} />
            {isMobile && <MobileFooter translation={translation} />}
        </>
    )
}

