import React from 'react';
import HomePageBanner from './HomePageBanner';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getSelectedLanguage } from '@/src/services/locale';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import UpdatesSection from '../tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import NewsSection from '../tyre/tyreNews/NewsSection';
import { getHomeVideos } from '@/src/services/home/home-videos';
import { getAllTractorNews } from '@/src/services/tractor/all-tractor-news';
import SelectHP from '@/src/components/shared/selectHp/SelectHP';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import LoanCalculator from '../loan/loanCalculator/LoanCalculator';
import LatestTractorSection from '@/src/components/shared/latestSection/LatestTractorSection';
import SecondHandMiniTractorCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorCards';
import CompareTractorsSection from '@/src/components/tractor/CompareTractorsSection';
import MiniTractorSlider from '@/src/components/tractor/MiniTractorSlider';
import NavComponents from '../tyre/NavComponents';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import { getLatestTractors } from '@/src/services/tractor/get-latest-tractors';
import { getHomeMiniTractors } from '@/src/services/tractor/home-mini-tractor';
import { getHomeSecondHandTractors } from '@/src/services/tractor/home-second-hand-tractor';
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';

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

const TG_HomePage = async ({ searchParams, prefLangs }) => {
  let prefLang = await getSelectedLanguage(); // Default language
  let translation = {};
  let isMobile = false;
  const page = 'homepage';
  let videos = [];
  let news = [];
  let seoData = null;
  let htmlSEO = null;
  let allTractorBrands = [];
  let popularData = [];
  let latestData = [];
  let allImplementTypes = [];
  let miniTractors = [];
  let secondHandTractors = [];

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
  if (prefLang == 'hi') {
    try {
      htmlSEO = await getDetailPageHeaderSEO({ page_type: 'hindi_main_homepage' });
    } catch (error) {
      console.error('Error fetching Hindi SEO data:', error);
    }
  }

  // Home videos with fallback
  try {
    const videosData = await getHomeVideos('videos');
    videos = videosData || [];
  } catch (error) {
    console.error('Error fetching home videos:', error);
  }

  // Tractor news with fallback
  try {
    news = await getAllTractorNews('tractor-news');
  } catch (error) {
    console.error('Error fetching tractor news:', error);
    news = [];
  }

  // Tractor brands with fallback
  try {
    const allTractorBrandsData = await getAllTractorBrands();
    allTractorBrands = allTractorBrandsData || [];
  } catch (error) {
    console.error('Error fetching tractor brands:', error);
  }

  // Popular tractor data with fallback
  try {
    const popularTractorData = await getTractorPopularDetails(prefLang);
    popularData = popularTractorData || [];
  } catch (error) {
    console.error('Error fetching popular tractor data:', error);
  }

  // Latest tractor data with fallback
  try {
    const latestTractorData = await getLatestTractors(prefLang);
    latestData = latestTractorData || [];
  } catch (error) {
    console.error('Error fetching latest tractor data:', error);
  }

  // Implement types with fallback
  try {
    allImplementTypes = await getAllImplementTypes();
  } catch (error) {
    console.error('Error fetching implement types:', error);
    allImplementTypes = [];
  }

  // Mini tractors with fallback
  try {
    miniTractors = await getHomeMiniTractors(prefLang);
  } catch (error) {
    console.error('Error fetching mini tractors:', error);
    miniTractors = [];
  }

  // Second hand tractors with fallback
  try {
    secondHandTractors = await getHomeSecondHandTractors(prefLang);
  } catch (error) {
    console.error('Error fetching second hand tractors:', error);
    secondHandTractors = [];
  }

  const staticMetadata = createDefaultMetadata();

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={staticMetadata} seoHTMLDescription={htmlSEO?.data} />
      <NavComponents
        isMobile={isMobile}
        translation={translation}
        prefLang={prefLang}
        mobileTabs="TRACTOR"
      />
      <main className="md:mt-[160px]">
        <HomePageBanner isMobile={isMobile} currentLang={prefLang} />

        <TractorsByBrands
          translation={translation}
          langPrefix={prefLang}
          allTractorBrands={allTractorBrands}
          cta={'View All Brands'}
        />

        <SelectHP
          langPrefix={prefLang}
          isMobile={isMobile}
          translation={translation}
          sectionClasses={'pb-12 md:pb-6'}
        />

        <PopularSection
          langPrefix={prefLang}
          popularData={popularData}
          isMobile={isMobile}
          translation={translation}
          redirectRoute="/tractors"
        />

        <LatestTractorSection
          langPrefix={prefLang}
          popularData={latestData}
          isMobile={isMobile}
          translation={translation}
          bgColor={'bg-section-gray'}
          redirectRoute="/tractors"
          cta={'View All Latest Tractors'}
        />

        <MiniTractorSlider
          heading="Mini Tractors"
          tractors={miniTractors}
          cta="View All Mini Tractors"
          isMobile={isMobile}
        />

        <SecondHandMiniTractorCards
          heading={'Buy Used Tractor'}
          showEmi={false}
          bgColor="bg-section-gray"
          buttonText="View All Second Hand Tractors"
          isMobile={isMobile}
          translation={translation}
          data={secondHandTractors.splice(0, 4)}
        />

        <section>
          <CompareTractorsSection
            viewMode={false}
            heading="Compare Tractors"
            cta="Compare Tractors"
            currentLang={prefLang}
            tractorbrands={allTractorBrands}
          />
        </section>

        {/* TODO:: Upload and Replace Banner Image */}
        <section className="container">
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/118934/6818661332f2b-tyre-banner-homepage-desktop.webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/118935/6818662e4a356-tyre-banner-homepage-mobile.webp'
            }
            title={'Banner Title'}
            additionalClasses={'mb-6 md:mb-10'}
          />
        </section>

        <div className="mt-4">
          <LoanCalculator
            title={'Calculate EMI'}
            allSectionUse={true}
            bgColor={'bg-section-gray'}
            translation={translation}
            currentLang={prefLang}
            isMobile={isMobile}
          />
        </div>

        {/* TODO:: Upload and Replace Banner Image */}
        <section className="container">
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/118934/6818661332f2b-tyre-banner-homepage-desktop.webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/118935/6818662e4a356-tyre-banner-homepage-mobile.webp'
            }
            title={'Banner Title'}
            additionalClasses={'my-10'}
          />
        </section>

        <TractorImplementTypes
          bgColor={'bg-section-gray'}
          heading="Implements"
          allImplementTypes={allImplementTypes}
          cta="View All Implements"
        />

        <UpdatesSection
          videos={videos}
          reels={[]}
          webstories={[]}
          translation={translation}
          slug={'tractor-tyre-in-india'}
          brandName={''}
          showFilters={false}
          linkUrls={{
            videos: `${prefLang === 'hi' ? '/hi' : ''}/tractor-videos`,
            webstories: `${prefLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
            reels: `${prefLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
          }}
        />

        <NewsSection
          translation={translation}
          langPrefix={prefLang}
          news={news}
          title={'News'}
          bgColor={'bg-section-gray'}
          showFilter={false}
        />

        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          defaultEnquiryType={'Tractor'}
          isMobile={isMobile}
        />

        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />

        <TractorGyanOfferings translation={translation} />

        <AboutTractorGyanServer slug={page} translation={translation} />
      </main>

      <FooterServer translation={translation} />

      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TG_HomePage;
