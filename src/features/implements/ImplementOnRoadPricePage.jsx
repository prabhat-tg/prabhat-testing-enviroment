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
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';
import { getPopularImplements } from '@/src/services/implement/popular-implements';
import { getLatestImplements } from '@/src/services/implement/get-latest-implements';
import { getAllImplementDetails } from '@/src/services/implement/get-all-implement-details';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';

const ImplementOnRoadPricePage = async ({ params = {}, searchParams = {} }) => {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();

  // Handle dynamic implement on-road-price URLs
  const isImplementSpecific = params.implementSlug && params.implementId;
  // const tyreBrands = await getTyreBrands();

  // Fetch implement details if this is an implement-specific page
  const seoSlug = isImplementSpecific
    ? `${params.implementSlug}/${params.priceType}/${params.implementId}`
    : 'implement-on-road-price';

  let seoData = {}, seoHtml;
  let implementDetail = null;
  if (isImplementSpecific && params.implementId) {
    try {
      implementDetail = await getAllImplementDetails(params.priceType.replaceAll('-on-road-price', ''), params.implementId, currentLang);

      implementDetail.brand_name = currentLang === 'en' ? implementDetail.brand_name_en : implementDetail.brand_name_hi;
      implementDetail.model_name = currentLang === 'en' ? implementDetail.model : implementDetail.model_hi;
    } catch (error) {
      console.error('Error fetching implement detail:', error);
    }
    seoHtml = await getDetailPageHeaderSEO({
      page_type: 'implement_dynamic_on_road_price',
      id: params.implementId,
      page_url: `${params.implementSlug}/${params.priceType}/${params.implementId}`,
      lang: currentLang,
      implement_type: params.priceType.replaceAll('-on-road-price', '')

    })

  } else {
    seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + seoSlug);
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
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} seoHTMLDescription={seoHtml?.data} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title={isImplementSpecific
              ? `${implementDetail.brand_name} ${implementDetail?.model_name || params.implementSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${translation.headings.implementOnRoadPrice}`
              : translation.headings.implementOnRoadPrice
            }
            breadcrumbs={isImplementSpecific ? [
              {
                label: translation?.breadcrubm?.tractorGyanHome || 'Home',
                href: currentLang == 'hi' ? '/hi' : '/',
                title: translation?.breadcrumbs?.home || 'Home'
              },
              {
                label: translation?.headerNavbar?.tractorImplements || 'Tractor Implements',
                href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-implements-in-india',
                title: translation?.headerNavbar?.tractorImplements || 'Tractor Implements',
              },
              {
                label: translation?.breadcrumbs?.implementBrands || 'Implements Brands',
                href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-implements-brands-in-india',
                title: translation?.breadcrumbs?.implementBrands || 'Implements Brands',
              },
              {
                label: `${implementDetail.brand_name} ${translation?.whatsappPopup?.implements || 'Implements'}`,
                title: `${implementDetail.brand_name} ${translation?.whatsappPopup?.implements || 'Implements'}`,
                href: `${currentLang == 'hi' ? '/hi' : ''}/tractor-implements/${(implementDetail.brand_name_en).replaceAll(/\s+/g, '-').toLowerCase()}`,
              },
              {
                label: `${implementDetail.brand_name} ${implementDetail?.model_name}`,
                title: `${implementDetail.brand_name} ${implementDetail?.model_name}`,
                href: `${currentLang == 'hi' ? '/hi' : ''}/tractor-implements/${params.priceType.replaceAll('-on-road-price', '')}/${params.implementSlug}/${params.implementId}`,
              },
              {
                label: `${implementDetail.brand_name} ${implementDetail?.model_name} ${translation?.headings.implementOnRoadPrice || 'On Road Price'}`,
                title: `${implementDetail.brand_name} ${implementDetail?.model_name} - ${translation.headings.implementOnRoadPrice}`,
                isCurrent: true,
              },
            ] : [
              {
                label: translation?.breadcrubm.tractorGyanHome || 'Home',
                href: currentLang == 'hi' ? '/hi' : '/',
                title: translation?.breadcrubm.tractorGyanHome || 'Home',
              },
              {
                label: translation?.headings.implementOnRoadPrice || 'Implement On Road Price',
                title: translation?.headings.implementOnRoadPrice || 'Implement On Road Price',
                isCurrent: true,
              },
            ]}
          />
          <TG_Banner
            imgUrl={tgb_implement_on_road_price}
            mobileImgUrl={tgb_implement_on_road_price_mobile}
            title={isImplementSpecific
              ? `${implementDetail.brand_name} ${implementDetail?.model_name || params.implementSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${translation?.headings.implementOnRoadPrice || 'Implement On Road Price'}`
              : translation?.headings.implementOnRoadPrice || 'Implement On Road Price'
            }
            additionalClasses={'max-h-auto'}
            imageClasses={'max-h-[260px]'}
          />
        </div>

        <TyrePriceInquireForm
          hideBanner={true}
          bgColor="bg-green-lighter"
          formTitle={isImplementSpecific
            ? `${implementDetail.brand_name} ${implementDetail?.model_name || params.implementSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${translation?.headings.implementOnRoadPrice || 'Implement On Road Price'}`
            : translation?.headings.implementOnRoadPrice || 'Implement On Road Price'
          }
          tyreBrands={allImplementBrands}
          translation={translation}
          currentLang={currentLang}
          type='IMPLEMENT'
          implementType={isImplementSpecific ? params.priceType.replaceAll('-on-road-price', '') : null}
          showImplementTypeSelector={!isImplementSpecific}
          // implementTypeId={isMobile ? 95 : 96}
          implementDetail={implementDetail}
          preFilledBrand={implementDetail?.brand_name_en}
          preFilledModel={implementDetail?.model}
          preFilledModelId={implementDetail?.id}
          submitBtnText={'₹ ' + translation.enquiryForm.getImplementPrice}
          isMobile={isMobile}
        />

        <div className='mt-4'>

          <TractorImplementTypes
            heading={translation.headings.ImplementsByTypes}
            allImplementTypes={allImplementTypes}
            floatingBg={true}
            slider={true}
            isMobile={isMobile}
            currentLang={currentLang}
          />
        </div>

        <TractorImplementBrands
          bgColor={'bg-section-gray'}
          heading={translation.headings.ImplementsByBrands}
          allImplementBrands={allImplementBrands}
          itemsShown={isMobile ? 9 : 12}
          translation={translation}
          prefLang={currentLang}
        />

        <div className="mt-4">
          <LoanCalculator
            title={translation?.emiCalcytranslate?.CalculateEMI || 'Calculate EMI'}
            allSectionUse={true}
            translation={translation}
            currentLang={currentLang}
            isMobile={isMobile}
          />
        </div>

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

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={(currentLang == 'hi' ? 'hi/' : '') + (isImplementSpecific ? seoSlug : 'implement-on-road-price')}
          translation={translation}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          defaultEnquiryType={'Implement'}
          isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default ImplementOnRoadPricePage;

