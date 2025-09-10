import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import { getAllImplementBrands } from '@/src/services/implement/all-implement-brands';
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';
import { getPopularImplements } from '@/src/services/implement/popular-implements';

const TractorImplementBrandsPage = async () => {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage('tyre-price');
  const tyreBrands = await getTyreBrands();

  const popularData = await getPopularImplements(currentLang);
  const popularTractorsError = false;

  const allImplementTypes = await getAllImplementTypes();

  let allImplementBrands;
  try {
    allImplementBrands = await getAllImplementBrandsDetail();
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
    allImplementBrands = [];
  }

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title="All Implement Brands"
            breadcrumbs={[
              {
                label: translation?.breadcrubm.home || 'Home',
                href: '/',
                title: translation?.breadcrubm.home || 'Home',
              },
              {
                label: 'Tractor Implements',
                href: '/tractor-implements-in-india',
                title: 'Tractor Implements',
              },
              {
                label: 'All Implement Brands',
                title: 'All Implement Brands',
                isCurrent: true,
              },
            ]}
          />
        </div>

        <TractorImplementBrands
          allImplementBrands={allImplementBrands}
          showAll={true}
        />

        <TractorImplementTypes
          heading='Implements By Types'
          allImplementTypes={allImplementTypes}
          floatingBg={true}
          slider={true}
          isMobile={isMobile}
        />

        <PopularSection
          heading="Popular Implements"
          cta="View All Popular Implements"
          popularData={popularData}
          popularDataError={popularTractorsError}
          translation={translation}
          langPrefix={currentLang}
          isMobile={isMobile}
          bgColor="bg-section-gray"
          type='implement'
        />

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'tractor-implements-in-india'} translation={translation} />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={'Tyre'}
          isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorImplementBrandsPage;


