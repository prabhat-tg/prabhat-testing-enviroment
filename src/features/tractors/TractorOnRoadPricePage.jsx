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
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import SelectHP from '@/src/components/shared/selectHp/SelectHP';
import LoanCalculator from '../loan/loanCalculator/LoanCalculator';
import { getAllTractorSubsidyStates } from '@/src/services/geo/get-subsidy-states';
import { getTractorDealerUrls } from '@/src/services/tractor/get-tractor-dealer-urls';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import TyreDealersByStates from '../tyre/TyreDealersByStates/TyreDealersByStates';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import { getTractorDetail } from '@/src/services/tractor/tractor-detail';
import apiUrl from '@/src/services/apiUrl';

const TractorOnRoadPricePage = async ({ params, searchParams }) => {
  const routeParams = await params;
  const searchParamObj = await searchParams;
  console.log("Params:", routeParams, "Search Params:", searchParamObj);

  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  const isMobile = await isMobileView();
  let seoData;
  let htmlSeo;
  if (routeParams && routeParams['brand-model'] && routeParams['modelId']) {
    htmlSeo = await getDetailPageHeaderSEO({
      page_type: 'tractor-on-road-price',
      lang: currentLang,
      page_url: `${(currentLang == 'hi' ? 'hi/' : '') + routeParams['brand-model']}/tractor-on-road-price/${routeParams['modelId']}`,
      id: routeParams['modelId']
    })
  } else {
    seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + 'tractor-on-road-price');
  }

  let tractorDetail;
  try {
    tractorDetail = await getTractorDetail({
      productId: routeParams['modelId'],
      lang: currentLang,
    });
  } catch (error) {
    console.error('Error fetching tractor detail:', error);
    tractorDetail = null;
  }


  // const tyreBrands = await getTyreBrands();

  const allTractorBrands = await getAllTractorBrands();

  const popularData = await getTractorPopularDetails(currentLang);
  const popularTractorsError = false;

  // Get tractor dealer states/brands data
  const tractorDealerStates = await getTractorDealerUrls({
    lang: currentLang === 'hi' ? 'hi' : 'en',
  });

  // Transform data for TyreDealersByStates component
  // Group by state and create state objects
  const dealerStatesMap = new Map();

  tractorDealerStates.forEach(dealer => {
    if (!dealerStatesMap.has(dealer.state_name)) {
      dealerStatesMap.set(dealer.state_name, {
        state_name: dealer.state_name,
        page_url: dealer.page_url,
        images: dealer.state_logo,
      });
    }
  });

  const dealerStates = Array.from(dealerStatesMap.values());
  console.log('Dealer States:', dealerStates);

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={{}} preloadUrls={[]} seoHTMLDescription={htmlSeo?.data}
        paginationLinks={{
          canonical: `${routeParams['brand-model'] ? `${apiUrl}/${currentLang === 'hi' ? 'hi/' : ''}${routeParams['brand-model']}/tractor-on-road-price/${routeParams['modelId']}` : apiUrl + '/' + (currentLang === 'hi' ? 'hi/' : '') + 'tractor-on-road-price'}`,
        }} />
      <DesktopHeader isMobile={isMobile} translation={translation} currentLang={currentLang} />{' '}
      <div className="pt-4 md:mt-[164px]">
        <div className="container">
          <TittleAndCrumbs
            title={routeParams['brand-model'] ? translation?.tractorOnRoadPrice.byModel.replace('{brandName}', `${tractorDetail.brand} ${tractorDetail.model}`) : translation?.tractorOnRoadPrice?.title || 'Get Tractor On Road Price'}
            breadcrumbs={routeParams && routeParams['brand-model'] && routeParams['modelId'] ?
              [
                {
                  label: translation?.breadcrubm?.tractorGyanHome || 'Home',
                  href: currentLang === 'hi' ? '/hi' : '/',
                  title: translation?.breadcrubm?.tractorGyanHome || 'Home',
                },
                {
                  label: translation.breadcrumbs.tractorBrands,
                  href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-brands',
                  title: translation.breadcrumbs.tractorBrands,
                },
                {
                  label: tractorDetail.brand + ' ' + translation.common.tractors,
                  href: (currentLang == 'hi' ? '/hi' : '') + '/tractor/' + (tractorDetail.brand_name_en.replaceAll(' ', '-')),
                  title: tractorDetail.brand + ' ' + translation.common.tractors,
                },

                {
                  label: tractorDetail.brand + ' ' + tractorDetail.model,
                  href: (currentLang == 'hi' ? '/hi' : '') + `/tractor/${routeParams['brand-model']}/${routeParams['modelId']}`,
                  title: tractorDetail.brand + ' ' + tractorDetail.model
                },
                {
                  label: routeParams['brand-model'] ? translation?.tractorOnRoadPrice.byModel.replace('{brandName}', `${tractorDetail.brand} ${tractorDetail.model}`) : translation?.breadcrubm?.tractorOnRoadPrice || 'Tractor On Road Price',
                  title: routeParams['brand-model'] ? translation?.tractorOnRoadPrice.byModel.replace('{brandName}', `${tractorDetail.brand} ${tractorDetail.model}`) : translation?.breadcrubm?.tractorOnRoadPrice || 'Tractor On Road Price',
                  isCurrent: true,
                },

              ]
              : [
                {
                  label: translation?.breadcrubm?.tractorGyanHome || 'Home',
                  href: currentLang === 'hi' ? '/hi' : '/',
                  title: translation?.breadcrubm?.tractorGyanHome || 'Home',
                },
                {
                  label: routeParams['brand-model'] ? translation?.tractorOnRoadPrice.byModel.replace('{brandName}', `${tractorDetail.brand} ${tractorDetail.model}`) : translation?.breadcrubm?.tractorOnRoadPrice || 'Tractor On Road Price',
                  title: routeParams['brand-model'] ? translation?.tractorOnRoadPrice.byModel.replace('{brandName}', `${tractorDetail.brand} ${tractorDetail.model}`) : translation?.breadcrubm?.tractorOnRoadPrice || 'Tractor On Road Price',
                  isCurrent: true,
                },
              ]}
          />
          {/* TODO:: Upload and Update Banner */}
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/120363/1754067655Tractor-On-Road-Price.webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/120364/1754067673Tractor-On-Road-Price-Mobile.webp'
            }
            title={translation?.tractorOnRoadPrice?.pageTitle || 'Tractor On Road Price'}
            pageUrl={currentLang === 'hi' ? '/hi/tractor-on-road-price' : '/tractor-on-road-price'}
          />
        </div>

        <TyrePriceInquireForm
          preFilledBrand={tractorDetail?.brand_name_en}
          preFilledModel={tractorDetail?.model_name_en}
          preFilledModelId={routeParams['modelId']}
          hideBanner={true}
          bgColor="bg-green-lighter"
          formTitle={routeParams['brand-model'] ? translation?.tractorOnRoadPrice.byModel.replace('{brandName}', `${tractorDetail.brand} ${tractorDetail.model}`) : translation?.tractorOnRoadPrice?.formTitle || 'Tractor On Road Price'}
          tyreBrands={allTractorBrands}
          translation={translation}
          currentLang={currentLang}
          type="TRACTOR"
          isMobile={isMobile}
        />

        <SelectHP
          langPrefix={currentLang}
          isMobile={isMobile}
          translation={translation}
          sectionClasses={'pb-12 md:pb-6'}
        />
        {/* TODO replace this with tyredealers by state */}

        <TyreDealersByStates
          title={(translation?.tractorDetails?.tractorDealers).replace('{brandName}', '') || 'Tractor Dealers'}
          translation={translation}
          isMobile={isMobile}
          dealerStates={dealerStates}
          buttonText={
            translation?.tractorOnRoadPrice?.viewAllTractorDealers || 'View All Tractor Dealers'
          }
          prefLang={currentLang}
        />

        <TractorsByBrands
          bgColor={'bg-section-gray'}
          translation={translation}
          langPrefix={currentLang}
          allTractorBrands={allTractorBrands}
        />

        <div className="mt-4">
          <LoanCalculator
            title={translation?.emiCalcytranslate?.CalculateEMI}
            allSectionUse={true}
            translation={translation}
            currentLang={currentLang}
            isMobile={isMobile}
          />
        </div>

        <PopularSection
          popularData={popularData}
          popularDataError={popularTractorsError}
          translation={translation}
          langPrefix={currentLang}
          isMobile={isMobile}
          redirectRoute="/tractors"
          bgColor="bg-section-gray"
        />

        <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={(currentLang == 'hi' ? 'hi/' : '') + (routeParams.hasOwnProperty('brand-model') ? `${routeParams['brand-model']}/tractor-on-road-price/${routeParams['modelId']}` : 'tractor-on-road-price')}
          translation={translation}
        />
        <WhatsAppTopButton
          translation={translation}
          currentLang={currentLang}
          tyreBrands={allTractorBrands}
          defaultEnquiryType={translation?.common?.tractor || 'Tractor'}
          isMobile={isMobile}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default TractorOnRoadPricePage;
