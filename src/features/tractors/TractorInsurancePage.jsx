import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
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
import TG_Banner from '@/src/components/shared/bannners/Banner';
import TractorInsuranceForm from '@/src/components/tractor/TractorInsuranceForm';
import InsuranceBrands from '@/src/components/shared/insurance-brands/InsuranceBrands';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import apiUrl from '@/src/services/apiUrl';

const TractorInsurancePage = async () => {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage((currentLang == "hi" ? "hi/" : "") + 'tractor-insurance');

  const popularData = await getTractorPopularDetails(currentLang);
  const popularTractorsError = false;

  const faqs = await getTyreFAQs({
    langPrefix: currentLang,
    slug: 'tractor-insurance',
    // slug: pageSlug,
  });

  const dummyInsuranceBrandImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Star_Health_and_Allied_Insurance.svg/2560px-Star_Health_and_Allied_Insurance.svg.png';
  const insuranceBrands = [
    {
      image: dummyInsuranceBrandImg,
      name: 'Star Insurance',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'Bajal Allianz',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'SBI Capital',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'Star Insurance',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'Bajal Allianz',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'SBI Capital',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'Star Insurance',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'Bajal Allianz',
      name_hi: '',
      url: '',
    },
    {
      image: dummyInsuranceBrandImg,
      name: 'SBI Capital',
      name_hi: '',
      url: '',
    },
  ];

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/${currentLang === 'hi' ? 'hi/' : ''}tractor-insurance`,
        }} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title={translation.headerNavbar.tractorInsurance}
            breadcrumbs={[
              {
                label: translation?.breadcrubm.tractorGyanHome || 'Home',
                href: '/',
                title: translation?.breadcrubm.tractorGyanHome || 'Home',
              },
              {
                label: translation.headerNavbar.tractorInsurance,
                title: translation.headerNavbar.tractorInsurance,
                isCurrent: true,
              },
            ]}
          />
          {/* TODO:: Upload and Update Banner */}
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/120704/68a98a90afba3-tractor-insurance-desktop-(1).webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/120703/68a98a8490b2d-tractor-insurance-mobile-(1).webp'
            }
            title={'Tractor On Road Price'}
            pageUrl={'/'}
          />
        </div>

        <TractorInsuranceForm
          bgColor="bg-green-lighter"
          translation={translation}
          currentLang={currentLang}
        />

        {/* TODO product commentted this component for now */}

        {/* <InsuranceBrands
          brands={insuranceBrands}
          langPrefix={currentLang}
          isMobile={isMobile}
          translation={translation}
          sectionClasses={'pb-12 md:pb-6'}
        /> */}

        <PopularSection
          popularData={popularData}
          popularDataError={popularTractorsError}
          translation={translation}
          langPrefix={currentLang}
          isMobile={isMobile}
          redirectRoute={`${currentLang == 'hi' ? '/hi' : ''}/tractors`}
        />

        <TyreFAQs
          faqs={faqs}
          translation={translation}
          headingKey={'faqs.insurance'}
          bgColor="bg-white"
        />

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={(currentLang == 'hi' ? 'hi/' : '') + 'tractor-insurance'} translation={translation} />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          defaultEnquiryType={'Tractor'} isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorInsurancePage;
