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
import TG_Banner from '@/src/components/shared/bannners/Banner';

import DealershipEnquiryForm from '@/src/components/shared/dealership-enquiry/DealershipEnquiryForm';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import apiUrl from '@/src/services/apiUrl';

const TractorDealershipEnquiryPage = async () => {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + 'tractor-dealership-enquiry');
  const tractorBrands = await getAllTractorBrands();

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]}
        paginationLinks={{
          canonical: `${apiUrl}/${currentLang === 'hi' ? 'hi/' : ''}tractor-dealership-enquiry`,
        }} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title={translation.enquiryForm?.enquiryForDealership || 'Enquiry For Dealership'}
            breadcrumbs={[
              {
                label: translation?.breadcrubm.tractorGyanHome || 'Home',
                href: '/',
                title: translation?.breadcrubm.tractorGyanHome || 'Home',
              },
              {
                label: translation.enquiryForm?.enquiryForDealership || 'Enquiry For Dealership',
                title: translation.enquiryForm?.enquiryForDealership || 'Enquiry For Dealership',
                isCurrent: true,
              },
            ]}
          />
          {/* TODO:: Upload and Update Banner */}
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/120708/68a9913bdd2c4-enquiry-for-delership-desktop-(1).webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/120707/68a9912a9f898-enquiry-for-delership-mobile-(1).webp'
            }
            title={translation.enquiryForm?.enquiryForDealership || 'Enquiry For Dealership'}
            pageUrl={'/'}
          />
        </div>

        <DealershipEnquiryForm
          bgColor="bg-green-lighter"
          brands={tractorBrands}
          translation={translation}
          currentLang={currentLang}
          type="TRACTOR"
          submitBtnText={translation.enquiryForm?.submitEnquiry || 'Submit Enquiry'}
        />

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={(currentLang == 'hi' ? 'hi/' : '') + 'tractor-dealership-enquiry'}
          translation={translation}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorDealershipEnquiryPage;
