import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, tg_getTittleFromNestedKey } from '@/src/utils';
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
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import PopularTyres from '../tyreComponents/components/popularTyres/PopularTyres';
import MobileFooter from '../../components/shared/footer/MobileFooter';
import { getTyrePopularDetails } from '@/src/services/tyre/tyre-popular-details';
import TyresByBrands from './TyresByBrands';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import TyreFaqsData from './tyreFAQs/TyreFaqsData';

export default async function TyrePricePage() {
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const seoData = await getSEOByPage((prefLang == 'en' ? '' : `${prefLang}/`) + 'tyre-price');
  const tyreBrands = await getTyreBrands();
  const popularTyres = await getTyrePopularDetails(prefLang);

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        paginationLinks={{
          canonical:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}${prefLang === "en" ? '' : "/hi"}/tyre-price`,
        }}
        hreflang={{
          en:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/tyre-price`,
          hi:
            `${process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com'}/hi/tyre-price`
        }} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={prefLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title={translation.headings.getTyreOnRoadPrice}
            breadcrumbs={[
              {
                label: translation?.breadcrubm.home || 'Home',
                href: prefLang === 'hi' ? '/hi' : '/',
                title: translation?.breadcrubm.home || 'Home',
              },
              {
                label: translation.headerNavbar.tyreHome,
                href: prefLang === 'hi' ? '/hi' : '/tractor-tyre-in-india',
                title: translation.headerNavbar.tyreHome,
              },
              {
                label: translation.tyre.tyrePrice || 'Tyre Price',
                title: translation.tyre.tyrePrice || 'Tyre Price',
                isCurrent: true,
              },
            ]}
          />
        </div>
        <TyrePriceInquireForm
          tyreBrands={tyreBrands}
          translation={translation}
          currentLang={prefLang}
          isMobile={isMobile}
        />
        <PopularTyres
          langPrefix={prefLang}
          popularTyres={popularTyres}
          isMobile={isMobile}
          translation={translation}
          bgColor={'bg-section-gray'}
        />
        <TyresByBrands
          prefLang={prefLang}
          isMobile={isMobile}
          translation={translation}
          tyreBrands={tyreBrands}
        />
        <TyreFaqsData
          pageSlug={'tyre-price'}
          headingKey={'tyrefaqs.tractorTyreDealerHome'}
        />
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer slug={'tyre-price'} translation={translation} />
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={tyreBrands}
          defaultEnquiryType={'Tyre'}
          isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
}
