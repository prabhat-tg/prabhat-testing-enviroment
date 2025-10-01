import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import LatestTractorSection from '@/src/components/shared/latestSection/LatestTractorSection';
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import ImplementsCategorySlider from '@/src/components/implements/ImplementsCategorySlider';
import SeoHead from '@/src/components/shared/header/SeoHead';
import ImplementHomePageBanner from './ImplementHomePageBanner';
import NavComponents from '../tyre/NavComponents';
import FooterComponents from '../tyre/FooterComponents';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import NewsSection from '../tyre/tyreNews/NewsSection';
import LoanCalculator from '../loan/loanCalculator/LoanCalculator';

import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getPopularImplements } from '@/src/services/implement/popular-implements';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import { getAllImplementCategories } from '@/src/services/implement/all-implement-categories';
import { getImplementNews } from '@/src/services/implement/implement-news';
import { getImplementHomeBanner } from '@/src/services/implement/get-implement-home-banner';
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';
import { getLatestImplements } from '@/src/services/implement/get-latest-implements';
import { getImplementReels, getImplementVideos, getImplementWebstories } from '@/src/services/implement/implement-updates';
import GoogleAdVertical from '../social/GoogleAdVertical/GoogleAdVertical';
import GoogleAdHorizontal from '../social/GoogleAdHorizontal/GoogleAdHorizontal';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getImplementBrandFAQs } from '@/src/services/implement/get-all-implement-brand-faqs';

export const dynamic = 'force-dynamic';
export default async function TractorImplementsPage({ params }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView();
  const [videosData, reelsData, webstoriesData] = await Promise.all([
    getImplementVideos('tractor-implements-in-india'),
    getImplementReels('tractor-implements-in-india'),
    getImplementWebstories('tractor-implements-in-india'),
  ]);
  const videos = videosData || [];
  const reels = reelsData || [];
  const webstories = webstoriesData || [];

  const seoSlug = (currentLang == 'hi' ? 'hi/' : '') + 'tractor-implements-in-india';

  // TODO:: Update this
  const staticMetadata = {
    title: `${seoSlug}`,
    description:
      currentLang === 'hi'
        ? 'भारत में नवीनतम ट्रैक्टर समाचार, कृषि समाचार, लेख | ट्रैक्टर समाचार, समीक्षा, नया ट्रैक्टर लॉन्च, कृषि समाचार, ट्रैक्टर फार्मिंग और बहुत कुछ के बारे में जानें | ट्रैक्टर ब्लॉग | ट्रैक्टरज्ञान'
        : 'Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan',
    openGraph: {
      title:
        currentLang === 'hi'
          ? 'भारत में नवीनतम ट्रैक्टर समाचार, कृषि समाचार, लेख | ट्रैक्टर ब्लॉग | ट्रैक्टरज्ञान'
          : 'Latest Tractor News, Agriculture News, Article  in India | Tractor Blog | Tractorgyan',
      description:
        currentLang === 'hi'
          ? 'भारत में नवीनतम ट्रैक्टर समाचार, कृषि समाचार, लेख | ट्रैक्टर समाचार, समीक्षा, नया ट्रैक्टर लॉन्च, कृषि समाचार, ट्रैक्टर फार्मिंग और बहुत कुछ के बारे में जानें | ट्रैक्टर ब्लॉग | ट्रैक्टरज्ञान'
          : 'Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan',
      url: `https://tractorgyan.com/tractor-industry-news-blogs/category/${seoSlug}`,
      type: 'website',
      images: [
        {
          url: 'https://tractorgyan.com/images/tractor-tyres-og.jpg',
          width: 1200,
          height: 630,
          alt: currentLang === 'hi' ? 'ट्रैक्टर ज्ञान ब्लॉग्स' : 'Tractor Gyan Blogs',
        },
      ],
    },
  };
  let seoData = {};
  try {
    seoData = await getSEOByPage(seoSlug);
  } catch (error) {
    console.error('Error fetching SEO data:', error);
  }

  let popularData;
  try {
    popularData = await getPopularImplements(currentLang);
  } catch (error) {
    popularData = [];
  }

  let latestData;
  try {
    latestData = await getLatestImplements(currentLang);
    // console.log('latest implements = ', latestData);
  } catch (error) {
    latestData = [];
  }


  let faqs = [];
  try {
    const faqResponse = await getImplementBrandFAQs(
      {
        faq_tag: 'tractor-implements-in-india', // 'seeding-and-planting'
        faq_lang: currentLang,
      }
    );
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }


  const allImplementTypes = await getAllImplementTypes({ lang: currentLang });

  let banner;
  try {
    banner = await getImplementHomeBanner({ device_type: isMobile ? 'mobile' : 'desktop' });
    // console.log('banner::',banner[0].slider_image);
  } catch (error) {
    banner = [];
  }

  let implementCategories;
  try {
    implementCategories = await getAllImplementCategories();
  } catch (error) {
    implementCategories = [];
  }

  let allImplementBrandsWithDetails;
  try {
    allImplementBrandsWithDetails = await getAllImplementBrandsDetail({ lang: currentLang });
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
    allImplementBrandsWithDetails = [];
  }

  let news;
  try {
    news = await getImplementNews('implement-news');
  } catch (error) {
    news = [];
  }

  return (
    <main className="md:mt-[160px]">
      {/* TODO:: Update SEO Data */}
      <SeoHead
        seo={seoData}
        preloadUrls={[]}
        paginationLinks={{
          canonical: `https://tractorgyan.com/${currentLang === 'hi' ? 'hi/' : ''}tractor-implements-in-india`,
        }}
      />
      <NavComponents
        translation={translation}
        isMobile={isMobile}
        prefLang={currentLang}
        mobileTabs="IMPLEMENTS"
        showMobileTab={true}
      />

      <ImplementHomePageBanner translation={translation} banner={banner} isMobile={isMobile} currentLang={currentLang} />

      <TractorImplementTypes
        heading={translation.headerNavbar.implementsByTypes}
        allImplementTypes={allImplementTypes}
        floatingBg={true}
        slider={true}
        isMobile={isMobile}
        currentLang={currentLang}
      />

      <TractorImplementBrands
        bgColor={'bg-section-gray'}
        heading={translation.headerNavbar.implementsByBrands}
        allImplementBrands={allImplementBrandsWithDetails}
        itemsShown={isMobile ? 9 : 9}
        translation={translation}
        prefLang={currentLang}
      />

      <ImplementsCategorySlider
        isMobile={isMobile}
        heading={translation.headerNavbar.implementByCategory}
        categories={implementCategories}
        currentLang={currentLang}
      />

      <PopularSection
        type={'implement'}
        heading={translation.headerNavbar.popularImplements}
        langPrefix={currentLang}
        popularData={popularData}
        isMobile={isMobile}
        translation={translation}
        redirectRoute="/tractors"
        cta={translation.headerNavbar.viewAllPopularImplements}
        showViewAll={false}
      />

      <LatestTractorSection
        langPrefix={currentLang}
        popularData={latestData}
        isMobile={isMobile}
        translation={translation}
        bgColor={'bg-section-gray'}
        redirectRoute="/tractors"
        heading={translation.headerNavbar.latestImplements}
        cta={translation.headerNavbar.viewAllLatestImplements}
        type='implement'
        showViewAll={false}
      />

      {/* TODO:: Upload and Replace Banner Image */}
      {/* <GoogleAdVertical /> */}
      <GoogleAdHorizontal />
      {/* <section className="container">
        </section> */}

      {/* <TG_Banner
          imgUrl={
            'https://images.tractorgyan.com/uploads/120752/1756192422tractor-finance.webp'
          }
          mobileImgUrl={
            'https://images.tractorgyan.com/uploads/120752/1756192422tractor-finance.webp'
          }
          title={translation.headerNavbar.tractorLoanBanner}
          additionalClasses={'my-6 md:my-10'}
        /> */}

      <div className="mt-4">
        <LoanCalculator
          title={translation.emiCalcytranslate.CalculateEMI}
          allSectionUse={true}
          bgColor={'bg-section-gray'}
          translation={translation}
          currentLang={currentLang}
          isMobile={isMobile}
        />
      </div>

      <UpdatesSection
        moduleType='implement'
        videos={videos}
        reels={reels}
        webstories={webstories}
        translation={translation}
        slug={'tractor-implements-in-india'}
        brandName={''}
        linkUrls={{
          videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
          webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
          reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
        }}
      />

      <NewsSection
        translation={translation}
        langPrefix={currentLang}
        news={news}
        title={translation.headings.implementNewsAndUpdates}
        bgColor={'bg-section-gray'}
        showFilter={false}
      />

      <TyreFAQs
        faqs={faqs}
        translation={translation}
        headingKey={'faqs.implements'}
        bgColor="bg-white"
        brandName={' '}
        isDynamicTitle={true}
      />
      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <AboutTractorGyanServer slug={(currentLang == 'hi' ? 'hi/' : '') + 'tractor-implements-in-india'} translation={translation} />

      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        defaultEnquiryType={'Implement'}
        isMobile={isMobile}
      />
    </main>
  );
}
