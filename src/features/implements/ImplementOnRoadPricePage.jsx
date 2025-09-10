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
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import LoanCalculator from '../loan/loanCalculator/LoanCalculator';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import { tgb_implement_on_road_price, tgb_implement_on_road_price_mobile } from '@/src/utils/assets/banners';

const ImplementOnRoadPricePage = async () => {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage('tyre-price');
  const tyreBrands = await getTyreBrands();

  const popularData = await getTractorPopularDetails(currentLang);
  const popularTractorsError = false;

  const payload = {
    pageSlug: 'tractor-dealers',
  };

  const allImplementTypes = await getAllImplementTypes();

  const allImplementBrands = [
    {
      title: 'Agristar',
      imgSrc: 'https://images.tractorgyan.com/uploads/implement_brand_logo/agristar.jpg',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Escorts',
      imgSrc: 'https://images.tractorgyan.com/uploads/114335/66b48e312a1a7-escorts-Kubota-200x200-logo-01.png',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc: 'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Agristar',
      imgSrc: 'https://images.tractorgyan.com/uploads/implement_brand_logo/agristar.jpg',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Escorts',
      imgSrc: 'https://images.tractorgyan.com/uploads/114335/66b48e312a1a7-escorts-Kubota-200x200-logo-01.png',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc: 'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Agristar',
      imgSrc: 'https://images.tractorgyan.com/uploads/implement_brand_logo/agristar.jpg',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'Escorts',
      imgSrc: 'https://images.tractorgyan.com/uploads/114335/66b48e312a1a7-escorts-Kubota-200x200-logo-01.png',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc: 'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
    {
      title: 'John Deere',
      imgSrc: 'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
      url: '/tractor-implements/agristar',
    },
  ];

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title="Get Implement On Road Price"
            breadcrumbs={[
              {
                label: translation?.breadcrubm.home || 'Home',
                href: '/',
                title: translation?.breadcrubm.home || 'Home',
              },
              {
                label: 'Implement On Road Price',
                title: 'Implement On Road Price',
                isCurrent: true,
              },
            ]}
          />
          <TG_Banner
            imgUrl={tgb_implement_on_road_price}
            mobileImgUrl={tgb_implement_on_road_price_mobile}
            title={'Implement On Road Price'}
            additionalClasses={'max-h-auto'}
            imageClasses={'max-h-[260px]'}
          />
        </div>

        <TyrePriceInquireForm
          hideBanner={true}
          bgColor="bg-green-lighter"
          formTitle="Implement On Road Price"
          tyreBrands={tyreBrands}
          translation={translation}
          currentLang={currentLang}
          type='IMPLEMENT'
          submitBtnText='₹ Get Implement Price'
          isMobile={isMobile}
        />

        <TractorImplementTypes
          heading='Implements By Types'
          allImplementTypes={allImplementTypes}
          floatingBg={true}
          slider={true}
          isMobile={isMobile}
        />

        <TractorImplementBrands
          bgColor={'bg-section-gray'}
          heading='Implements By Brands'
          allImplementBrands={allImplementBrands}
          itemsShown={isMobile ? 9 : 12}
        />

        <div className="mt-4">
          <LoanCalculator
            title={'Calculate EMI'}
            allSectionUse={true}
            translation={translation}
            currentLang={currentLang}
            isMobile={isMobile}
          />
        </div>

        <PopularSection
          heading="Popular Implements"
          cta="View All Popular Implements"
          popularData={popularData}
          popularDataError={popularTractorsError}
          translation={translation}
          langPrefix={currentLang}
          isMobile={isMobile}
          bgColor="bg-section-gray"
        />

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'tyre-price'} translation={translation} />
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

export default ImplementOnRoadPricePage;

