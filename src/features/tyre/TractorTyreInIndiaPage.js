import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import HomeBanner from './HomeBanner';
import { getTyreHomeBanner } from '@/src/services/tyre/home-banner.js';
import { getUniqueTyreSize } from '@/src/services/tyre/tyre-size.js';
import TyresByBrands from './TyresByBrands';
import PopularTyres from '../tyreComponents/components/popularTyres/PopularTyres';
import { getTyrePopularDetails } from '@/src/services/tyre/tyre-popular-details.js';
import TractorsByBrands from '../../components/tractor/TractorsByBrands.js';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands.js';
import GoogleAdds from '../../components/shared/googleAdds/GoogleAdds';
import UpdatesData from '../tyreComponents/components/updatesAbouteTyre/UpdatesData.js';
import NewsSection from './tyreNews/NewsSection.js';
import { getTyreNewsByBrand } from '@/src/services/tyre/tyre-news-by-brand.js';
import TyreFaqsData from './tyreFAQs/TyreFaqsData.js';
import MobileFooter from '../../components/shared/footer/MobileFooter';
import TyresBySizes from '../tyreComponents/components/tyresBySize/TyresBySizes';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';

export default async function TractorTyreInIndiaPage() {
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  let seoData;
  let seoHTMLDescription;
  if (prefLang === 'en') {
    seoData = await getSEOByPage(
      `${prefLang === 'en' ? 'tyre-homepage' : `${prefLang}/tyre-homepage`}`
    );
  }
  if (prefLang === 'hi') {
    seoHTMLDescription = await getDetailPageHeaderSEO({
      page_type: 'hindi_tyre_homepage',
    });
  }
  const tyreBrands = await getTyreBrands();
  const homeBanners = await getTyreHomeBanner(isMobile ? 'mobile' : 'desktop');
  const uniqueTyreSize = await getUniqueTyreSize();
  const popularTyres = await getTyrePopularDetails(prefLang);
  const allTractorBrands = await getAllTractorBrands();
  const news = await getTyreNewsByBrand('tyre-news,mrf,jk,apollo,ceat');

  const staticMetadata = {
    title: 'Tractor Tyres in India | Complete Guide & Price List',
    description:
      'Explore tractor tyres available in India. Find the best tyre sizes, brands, and prices to make an informed purchase for your tractor.',
    openGraph: {
      title: 'Tractor Tyres in India | Tractor Gyan',
      description:
        'Find the best tractor tyres in India with expert recommendations and price guides.',
      url: 'https://tractorgyan.com/tractor-tyre-in-india',
      type: 'website',
      images: [
        {
          url: 'https://tractorgyan.com/images/tractor-tyres-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Tractor Tyres Collection',
        },
      ],
    },
  };

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={staticMetadata}
        preloadUrls={homeBanners.length > 0 && [homeBanners[0].slider_image]}
        seoHTMLDescription={seoHTMLDescription?.data}
        canonical={`${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang === "en" ? '' : "/hi"}/tractor-tyre-in-india`}
        hreflang={{
          en:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tractor-tyre-in-india`,
          hi:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/hi/tractor-tyre-in-india`
        }}
      />
      <NavComponents
        translation={translation}
        isMobile={isMobile}
        prefLang={prefLang}
        mobileTabs="TYRE"
      />
      <main className="lg:mt-[159px]">
        <HomeBanner
          translation={translation}
          currentLang={prefLang}
          homeBanners={homeBanners}
          tyreBrands={tyreBrands}
          uniqueTyreSize={uniqueTyreSize}
        />
        <TyresBySizes langPrefix={prefLang} translation={translation} bgColor={'bg-section-gray'} />
        <TyresByBrands
          isMobile={isMobile}
          translation={translation}
          tyreBrands={tyreBrands}
          placedInFilter={false}
          title={''}
          prefLang={prefLang}
        />
        <PopularTyres
          langPrefix={prefLang}
          popularTyres={popularTyres}
          isMobile={isMobile}
          translation={translation}
          bgColor={'bg-section-gray'}
        />
        <TractorsByBrands
          translation={translation}
          langPrefix={prefLang}
          allTractorBrands={allTractorBrands}
        />
        <GoogleAdds />
        <UpdatesData
          slug="tractor-tyre-in-india"
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
          bgColor={'bg-section-gray'}
          title={translation.headings.tyreNews}
        />
        <TyreFaqsData pageSlug={'tractor-tyre-in-india'} headingKey={'tyrefaqs.tractorTyreHome'} />
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={'Tyre'}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={`${prefLang === 'en' ? '' : `${prefLang}/`}tyre-homepage`}
          translation={translation}
        />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
