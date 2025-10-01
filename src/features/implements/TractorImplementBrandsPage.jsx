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
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';
import { getPopularImplements } from '@/src/services/implement/popular-implements';

const TractorImplementBrandsPage = async () => {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + 'tractor-implements-brands-in-india');
  // const tyreBrands = await getTyreBrands();

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
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} paginationLinks={{
        canonical: (currentLang == 'hi' ? 'https://tractorgyan.com/hi/tractor-implements-brands-in-india' : 'https://tractorgyan.com/tractor-implements-brands-in-india'),
      }} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title={translation.headings.allImplementBrands}
            breadcrumbs={[
              {
                label: translation?.breadcrubm.tractorGyanHome || 'Home',
                href: (currentLang == 'hi' ? '/hi' : '') + '/',
                title: translation?.breadcrubm.tractorGyanHome || 'Home',
              },
              {
                label: translation.headerNavbar.tractorImplements,
                href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-implements-in-india',
                title: translation.headerNavbar.tractorImplements,
              },
              {
                label: translation.headings.allImplementBrands,
                title: translation.headings.allImplementBrands,
                isCurrent: true,
              },
            ]}
          />
        </div>

        <TractorImplementBrands

          allImplementBrands={allImplementBrands}
          showAll={true}
          translation={translation}
          prefLang={currentLang}
        />

        <TractorImplementTypes
          heading={translation.headerNavbar.implementsByTypes}
          allImplementTypes={allImplementTypes}
          floatingBg={true}
          slider={true}
          isMobile={isMobile}
          currentLang={currentLang}
        />

        <PopularSection
          heading={translation.headerNavbar.popularImplements}
          cta={translation.headerNavbar.viewAllPopularImplements}
          popularData={popularData}
          popularDataError={popularTractorsError}
          translation={translation}
          langPrefix={currentLang}
          isMobile={isMobile}
          bgColor="bg-section-gray"
          type='implement'
          redirectRoute={`/tractor-implements-in-india`}
        />

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={(currentLang == 'hi' ? 'hi/' : '') + 'tractor-implements-in-india'} translation={translation} />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          defaultEnquiryType={'Tractor'}
          isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorImplementBrandsPage;


