import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TG_Banner from '@/src/components/shared/bannners/Banner';
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
import { getAllImplementBrands } from '@/src/services/implement/all-implement-brands';
import { getImplementHomeBanner } from '@/src/services/implement/get-implement-home-banner';
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';
import { getLatestImplements } from '@/src/services/implement/get-latest-implements';
import { getImplementReels, getImplementVideos, getImplementWebstories } from '@/src/services/implement/implement-updates';

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

  const seoSlug = 'tractor-implements-in-india';

  // TODO:: Update this
  const staticMetadata = {
    title: `${seoSlug}`,
    description:
      'Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan',
    openGraph: {
      title:
        'Latest Tractor News, Agriculture News, Article  in India | Tractor Blog | Tractorgyan',
      description:
        'Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan',
      url: `https://tractorgyan.com/tractor-industry-news-blogs/category/${seoSlug}`,
      type: 'website',
      images: [
        {
          url: 'https://tractorgyan.com/images/tractor-tyres-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Tractor Gyan Blogs',
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
  } catch (error) {
    latestData = [];
  }

  const allImplementTypes = await getAllImplementTypes();

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

  let allImplementBrands;
  try {
    allImplementBrands = await getAllImplementBrands();
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
    allImplementBrands = [];
  }

  let allImplementBrandsWithDetails;
  try {
    allImplementBrandsWithDetails = await getAllImplementBrandsDetail();
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
        staticMetadata={staticMetadata}
        preloadUrls={[]}
      />
      <NavComponents
        translation={translation}
        isMobile={isMobile}
        prefLang={currentLang}
        mobileTabs="IMPLEMENTS"
        showMobileTab={true}
      />

      <ImplementHomePageBanner banner={banner} isMobile={isMobile} currentLang={currentLang} />

      <TractorImplementTypes
        heading="Implements By Types"
        allImplementTypes={allImplementTypes}
        floatingBg={true}
        slider={true}
        isMobile={isMobile}
      />

      <TractorImplementBrands
        bgColor={'bg-section-gray'}
        heading="Implements By Brands"
        allImplementBrands={allImplementBrandsWithDetails}
        itemsShown={isMobile ? 9 : 10}
      />

      <ImplementsCategorySlider
        isMobile={isMobile}
        heading="Implement By Category"
        categories={implementCategories}
      />

      <PopularSection
        type={'implement'}
        heading="Popular Implements"
        langPrefix={currentLang}
        popularData={popularData}
        isMobile={isMobile}
        translation={translation}
        redirectRoute="/tractors"
        cta="View All Popular Implements"
      />

      <LatestTractorSection
        langPrefix={currentLang}
        popularData={latestData}
        isMobile={isMobile}
        translation={translation}
        bgColor={'bg-section-gray'}
        redirectRoute="/tractors"
        heading="Latest Implements"
        cta={'View All Latest Implements'}
        type='implement'
      />

      {/* TODO:: Upload and Replace Banner Image */}
      <section className="container">
        <TG_Banner
          imgUrl={
            'https://images.tractorgyan.com/uploads/120752/1756192422tractor-finance.webp'
          }
          mobileImgUrl={
            'https://images.tractorgyan.com/uploads/120752/1756192422tractor-finance.webp'
          }
          title={'Tractor Loan Banner'}
          additionalClasses={'my-6 md:my-10'}
        />
      </section>

      <div className="mt-4">
        <LoanCalculator
          title={'Calculate EMI'}
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
          videos: `${currentLang === 'hi' ? '/hi' : ''}/implement-videos`,
          webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
          reels: `${currentLang === 'hi' ? '/hi' : ''}/implement-reels-and-shorts`,
        }}
      />

      <NewsSection
        translation={translation}
        langPrefix={currentLang}
        news={news}
        title={'News'}
        bgColor={'bg-section-gray'}
        showFilter={false}
      />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <AboutTractorGyanServer slug={'tractor-implements-in-india'} translation={translation} />

      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        defaultEnquiryType={'Implements'}
        isMobile={isMobile}
      />
    </main>
  );
}
