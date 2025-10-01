import './globals.css';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../../tyre/NavComponents';
import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import FooterComponents from '../../tyre/FooterComponents';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '../../tyreComponents/commonComponents/WhatsAppTopButton';
import TyreFAQs from '../../tyre/tyreFAQs/TyreFAQs';
import { getModelDetailFAQ } from '@/src/services/tractor/model-detail-faq';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import TractorDetailsCard from '../TractorDetailsCard';
import TractorDetailsSpecs from './TractorModelSpecs';
import LoanCalculator from '../../loan/loanCalculator/LoanCalculator';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import InquireForm from '../../tyreComponents/components/forms/InquireForm';
import TyreRatingAndReviews from '../../tyreComponents/components/tyreRatingAndReviews/TyreRatingAndReviews';
import RelatedTyres from '../../tyre/relatedTyres/RelatedTyres';
import { getOtherTractorModels } from '@/src/services/tractor/other-tractor-models';
import { getTractorDetail } from '@/src/services/tractor/tractor-detail';
import { getSimilarSecondHandTractors } from '@/src/services/tractor/similar-second-hand-tractors';
import SecondHandMiniTractorCards from '@/src/components/ui/cards/secondHandMiniTractorCards/secondHandMiniTractorCards';
import MainHeadings from '../../tyreComponents/commonComponents/MainHeadings';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import {
  getRelatedTractorList,
  getCompareTractorsByHP,
} from '@/src/services/tractor/related-tractors';
import CompareTractorsSlider from '@/src/components/tractor/CompareTractorsSlider';
import { getTractorDealerUrls } from '@/src/services/tractor/get-tractor-dealer-urls';
import TyreDealersByStates from '../../tyre/TyreDealersByStates/TyreDealersByStates';
import { getTractorDetailBrandContent } from '@/src/services/tractor/tractor-detail-brand-content';

export const dynamic = 'force-dynamic';
export default async function TractorModelPage({ params }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  // Extract product ID from params
  const { 'brand-name': brandName, modelOrSeries } = await params;
  const productId = modelOrSeries;

  // Fetch tractor detail from API
  let tractorDetail;
  try {
    tractorDetail = await getTractorDetail({
      productId: productId,
      lang: currentLang,
    });
    console.log("tractorDetail : ", tractorDetail);

  } catch (error) {
    console.error('Error fetching tractor detail:', error);
    tractorDetail = null;
  }

  if (!tractorDetail) {
    // Handle case when tractor detail is not found
    return <div>{translation?.error_messages?.tractorNotFound || 'Tractor not found'}</div>;
  }

  const pageSlugTemp = 'tyres'; // Temporary as data is not fetched for above slug

  const headingTitle = `${tractorDetail.brand} ${tractorDetail.model}`;

  const brand = {
    name: tractorDetail.brand || translation?.common?.unknownBrand || 'Unknown Brand',
  };
  const brand_en = {
    name: tractorDetail.brand_name_en || translation?.common?.unknownBrand || 'Unknown Brand',
  };

  let allTractorBrands = [];
  try {
    allTractorBrands = await getAllTractorBrands();
  } catch (error) {
    console.error('Error fetching all tractor brands:', error);
  }

  const tractorId = tractorDetail.id;

  let otherTractorModels = [];
  try {
    otherTractorModels = await getOtherTractorModels({
      id: tractorDetail.id,
      lang: currentLang,
      startLimit: 0,
      endLimit: 5,
    });
  } catch (error) {
    console.error('Error fetching other tractor models:', error);
  }

  let dealerStates = [];
  let tractorDealerStates;

  try {
    tractorDealerStates = await getTractorDealerUrls({ brand_name: brand_en.name, lang: currentLang, isStatePage: true });
  } catch (error) {
    console.error('Error fetching dealer states:', error);
  }

  const dealerStatesMap = new Map();
  if (tractorDealerStates && tractorDealerStates.length > 0) {
    tractorDealerStates.forEach(dealer => {
      if (!dealerStatesMap.has(dealer.state_name)) {
        dealerStatesMap.set(dealer.state_name, {
          state_name: dealer.state_name,
          page_url: dealer.page_url,
          images: dealer.state_logo,
        });
      }
    });

    dealerStates = Array.from(dealerStatesMap.values());
  }

  // Fetch similar second hand tractors
  let similarSecondHandTractors = [];
  try {
    similarSecondHandTractors = await getSimilarSecondHandTractors({
      productId: productId,
      lang: currentLang,
    });
  } catch (error) {
    console.error('Error fetching similar second hand tractors:', error);
  }

  let seoData = {};
  try {
    seoData = await getDetailPageHeaderSEO({
      page_type: 'tractor_detail',
      id: productId,
      lang: currentLang,
      page_url: `tractor/${brandName}/${productId}`,
    });
  } catch (error) {
    console.error('Error fetching SEO data:', error);
  }

  // Fetch compare tractors based on current tractor's HP
  let compareTractors = [];
  try {
    compareTractors = await getCompareTractorsByHP({
      productId: tractorDetail.id,
      hp: tractorDetail.hp,
      lang: currentLang,
    });
    console.log('Found compare tractors', compareTractors.length, 'compare tractors');
  } catch (error) {
    console.error('Error fetching compare tractors:', error);
  }
  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[550px]">
      <div className="pe-4">
        <h2 className="border-b-3 mb-4 inline-block border-secondary pb-1 text-lg font-semibold md:mb-6 lg:text-2xl">
          {`${currentLang == 'en' ? translation?.tractorDetails?.about : ''} ${tractorDetail.brand}  ${tractorDetail.model} ${currentLang == 'hi' ? translation?.tractorDetails?.about : ''}`}
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[360px] overflow-auto pe-4 text-sm font-normal text-gray-dark md:max-h-[460px]">
        {tractorDetail?.about_tractor ? (
          <div
            className="tg-html-content"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: isMobile
                  ? tractorDetail.mob_about_tractor || tractorDetail.about_tractor
                  : tractorDetail.about_tractor,
              }}
            />
          </div>
        ) : (
          <div>
            <p className="mb-3">
              {translation?.tractorDetails?.helpDescription
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `With the help of ${tractorDetail.brand} ${tractorDetail.model}, it's easy for a farmer to move the tractor in a field and use different kinds of implements.`}
            </p>
            <p className="mb-3">
              {translation?.tractorDetails?.compatibilityDescription
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `This tractor is compatible with leading tractor models of brands like Mahindra, Sonalika, John Deere, New Holland, and many more. It comes at an affordable price and is easily available all over India. Buying this tractor is a great decision for agriculture and commercial farmers. TractorGyan provides updated information related to ${tractorDetail.brand} ${tractorDetail.model} prices, ${tractorDetail.brand} ${tractorDetail.model} features, and ${tractorDetail.brand} ${tractorDetail.model} warranty.`}
            </p>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              {translation?.tractorDetails?.whyBestTractor
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `Why is ${tractorDetail.brand} ${tractorDetail.model} the Best Tractor in India?`}
            </h3>
            <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
              <li>
                {translation?.tractorDetails?.tractionDescription
                  ?.replace('{tractorBrand}', tractorDetail.brand)
                  ?.replace('{tractorModel}', tractorDetail.model) ||
                  `${tractorDetail.brand} ${tractorDetail.model} can provide traction that a tractor requires to move and operate in various types of fields like uneven fields and wet farms.`}
              </li>
              <li>
                {translation?.tractorDetails?.loadDescription ||
                  `This tractor is designed to carry heavy loads without any hassle. Farmers can attach compatible implements with the tractor and use them effectively.`}
              </li>
              <li>
                {translation?.tractorDetails?.engineeringDescription
                  ?.replace('{tractorBrand}', tractorDetail.brand)
                  ?.replace('{tractorModel}', tractorDetail.model) ||
                  `${tractorDetail.brand} ${tractorDetail.model} is prepared using modern engineering and distributes the tractor weight equally. Because of this, soil compaction is low and soil structure is maintained.`}
              </li>
              <li>
                {translation?.tractorDetails?.comfortDescription ||
                  `This tractor absorbs the shocks from uneven ground and provides a better and more comfortable ride experience.`}
              </li>
              <li>
                {translation?.tractorDetails?.durabilityDescription
                  ?.replace('{tractorBrand}', tractorDetail.brand)
                  ?.replace('{tractorModel}', tractorDetail.model) ||
                  `${tractorDetail.brand} ${tractorDetail.model} is built with premium quality materials and can operate in rough farming conditions without any issues.`}
              </li>
              <li>
                {translation?.tractorDetails?.farmingTasksDescription ||
                  `It supports all sorts of farming tasks such as ploughing, seeding, mulching, and harvesting.`}
              </li>
            </ul>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              {translation?.tractorDetails?.priceHeading
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `What is the ${tractorDetail.brand} ${tractorDetail.model} Price in India in 2024?`}
            </h3>
            <p className="mb-3">
              {translation?.tractorDetails?.priceDescription
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `The ${tractorDetail.brand} ${tractorDetail.model} price is affordable and fully justified, seeing the features and benefits it offers to its users. Farmers can check the updated ${tractorDetail.brand} ${tractorDetail.model} price in India on TractorGyan. Here, you can learn about tractor prices, their features, and other related information under one roof, saving time & effort.`}
            </p>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              {translation?.tractorDetails?.featuresHeading
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `${tractorDetail.brand} ${tractorDetail.model} Features & Specifications`}
            </h3>
            <p className="mb-3">
              {translation?.tractorDetails?.featuresDescription
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `This tractor comes with advanced features that make it durable and efficient. The design of ${tractorDetail.brand} ${tractorDetail.model} is suitable for all farming and commercial-related tasks. It has modern features to enhance productivity during operation.`}
            </p>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              {translation?.tractorDetails?.maintenanceHeading
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `How to Maintain a ${tractorDetail.brand} ${tractorDetail.model}?`}
            </h3>
            <p className="mb-3">
              {translation?.tractorDetails?.maintenanceDescription ||
                `Farmers can increase the life of a tractor if they follow the below-mentioned tractor maintenance tips.`}
            </p>
            <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
              <li>
                {translation?.tractorDetails?.maintenanceTip1 ||
                  `Check the tractor regularly and replace or fix it if you see any signs of damage, wear, or mechanical issues.`}
              </li>
              <li>
                {translation?.tractorDetails?.maintenanceTip2 ||
                  `The tractor must be properly serviced so that any kind of damage is avoided.`}
              </li>
              <li>
                {translation?.tractorDetails?.maintenanceTip3 ||
                  `Never exceed the recommended load capacity. Overloading can cause damage and increases the risk of mechanical failure.`}
              </li>
            </ul>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              {translation?.tractorDetails?.tractorGyanHelpHeading
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `How can TractorGyan help you buy ${tractorDetail.brand} ${tractorDetail.model} in India?`}
            </h3>
            <p className="mb-3">
              {translation?.tractorDetails?.tractorGyanHelpDescription
                ?.replace('{tractorBrand}', tractorDetail.brand)
                ?.replace('{tractorModel}', tractorDetail.model) ||
                `TractorGyan is a leading online platform that provides information on tractors, implements, tyres, and more in India. It also helps farmers to know about updated ${tractorDetail.brand} ${tractorDetail.model} prices, features, warranties, and specifications. This information can help you make a wise decision and get an ideal tractor on an affordable budget.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  let faqs = [];
  try {
    faqs = await getModelDetailFAQ({
      product_id: tractorDetail.id,
      faq_lang: currentLang,
    });
  } catch (error) {
    console.error('Error fetching model detail FAQs:', error);
  }

  let tyreBrandsData = [];
  try {
    tyreBrandsData = await getTyreBrands();
  } catch (error) {
    console.error('Error fetching tyre brands data:', error);
  }

  let releatedTractors = [];
  let popularTractorsError = false;
  try {
    releatedTractors = await getRelatedTractorList({
      productId: tractorDetail.id,
      lang: currentLang,
    });
  } catch (error) {
    console.error('Error fetching related tractor details:', error);
    popularTractorsError = true;
  }

  let banners = [];
  try {
    const pageURL = `tractor/${brandName}/${productId}`; // WIP
    const tractorDetailTopContent = await getTractorDetailBrandContent({
      ad_title: pageURL,
      ad_type_image_lang: currentLang,
      device_type: isMobile ? 'mobile' : 'desktop'
    });
    banners = tractorDetailTopContent?.banner || [];
    console.log("banners : ", banners);

  } catch (error) {
    console.error('Error fetching tyre brands data:', error);
  }

  return (
    <main>
      <SeoHead
        seo={{}}
        staticMetadata={{}}
        preloadUrls={[]}
        seoHTMLDescription={seoData.data}
      />

      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      {/* TODO:: Setup Common Layout Class */}
      <div className="container mx-auto pt-4 md:mt-[164px]">
        {
          <div className="mt-2 md:mt-[170px]">
            {/* Banner removed as per request */}
            <TittleAndCrumbs
              showBack={true}
              hideTitle={true}
              {...isMobile && { tooltipContent: `${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.priceRange || 'Price range is between Rs'} ${tractorDetail.price_range || 'NA'}*. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.horsepower || 'horsepower is'} ${tractorDetail.hp} ${translation?.tractorSpecs?.hp || 'hp'}. ${translation?.tractorDetails?.tooltipContent?.fuelTank || 'Its Fuel tank capacity is'} ${tractorDetail.fuel_tank_capacity || 'NA'}. ${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.tooltipContent?.hasCylinders || 'has'} ${tractorDetail.cylinder} ${translation?.tractorDetails?.tooltipContent?.cylinders || 'cylinders'}, ${tractorDetail.displacement_cc} ${translation?.tractorDetails?.tooltipContent?.engine || 'engine'}. ${translation?.tractorDetails?.tooltipContent?.otherSpecs || 'Other key specifications include'} ${tractorDetail.pto_hp || 'NA'} PTO ${translation?.tractorSpecs?.hp || 'hp'}, ${tractorDetail.lifting_capacity} ${translation?.tractorDetails?.tooltipContent?.liftingCap || 'lifting capacity'}, ${tractorDetail.number_of_gears} ${translation?.tractorDetails?.tooltipContent?.gears || 'gears'}.` }}
              title={`${tractorDetail.brand} ${tractorDetail.model}`}
              breadcrumbs={[
                {
                  label: translation?.breadcrubm?.tractorGyanHome,
                  href: currentLang == 'hi' ? '/hi' : '/',
                  title: translation?.breadcrubm?.tractorGyanHome || 'Home',
                },
                {
                  label: translation.breadcrumbs.tractorBrands,
                  href: (currentLang == 'hi' ? '/hi' : '') + '/tractor-brands',
                  title: translation.breadcrumbs.tractorBrands,
                },
                {
                  label: `${brand.name} ${translation?.common?.tractors || 'Tractors'}`,
                  href: `${currentLang == 'hi' ? '/hi' : ''}/tractor/${brand_en.name.replaceAll(' ', '-')}`,
                  title: `${brand.name} ${translation?.common?.tractors || 'Tractors'}`,
                },
                {
                  label: `${tractorDetail.brand} ${tractorDetail.model}`,
                  title: `${tractorDetail.brand} ${tractorDetail.model}`,
                  isCurrent: true,
                },
              ]}
            />
          </div>
        }
        <div className="gap-8 lg:flex">
          <div className="flex w-full flex-col gap-8 md:w-3/4">
            <TractorDetailsCard
              tractorId={tractorId}
              tractorDetail={tractorDetail}
              currentLang={currentLang}
              isMobile={isMobile}
              translation={translation}
              primaryBtnText={translation?.buttons?.checkPrice || 'Check Price'}
              secondaryBtnText={`${translation?.buttons?.compare || 'Compare'} ${tractorDetail.brand} ${tractorDetail.model}`}
            />
            <div className="hidden lg:block">{aboutSectionSlot}</div>
          </div>
          <div className="relative h-full w-full md:w-1/4">
            <TractorDetailsSpecs
              currentLang={currentLang}
              translation={translation}
              tractorDetail={tractorDetail}
              bannerDetail={{
                imgUrl: banners && banners.length > 0 ? banners[0].image : null,
                imageClasses: 'max-h-[200px]',
                unoptimized: true
              }}
            />
          </div>
          <div className="block lg:hidden">{aboutSectionSlot}</div>
        </div>
      </div>

      <div className="mt-10">
        <RelatedTyres
          tyreId={tractorId}
          tyres={otherTractorModels}
          isMobile={isMobile}
          tyreDetail={tractorDetail}
          translation={translation}
          currentLang={currentLang}
          mode="tractor"
          customHeading={`${translation?.tractorSpecs?.others || 'Others'} ${tractorDetail.brand} ${tractorDetail.model} ${translation?.common?.tractors || 'Tractors'}`}
        />
      </div>

      <LoanCalculator
        title={translation?.emiCalcytranslate?.CalculateEMI || 'Calculate EMI'}
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
        allSectionUse={true}
        bgColor={'bg-white'}
        loanAmount={500000}
      />

      <TyreRatingAndReviews
        reviewData={[]}
        headingTitleKey={'headings.tyreRatingAndReviews'}
        dynamicTitle={`${tractorDetail.brand} ${tractorDetail.model}`}
        translation={translation}
        reviewTitleKey={'headings.tyreUserReview'}
        bgColor={'bg-section-gray'}
        brand={tractorDetail.brand_name_en}
        modelId={tractorId}
        model={tractorDetail.model_name_en}
        showUserReviewTitle={isMobile}
        isTractorReviewPage={true}
        noReviewImg="https://images.tractorgyan.com/uploads/120828/68b2a79244bd5-tractor-review-image.webp"
      />

      {/* TODO:: Update it to make it generic */}
      <InquireForm
        translation={translation}
        currentLang={currentLang}
        brandName={tractorDetail.brand + ' ' + tractorDetail.model}
        tyreBrands={allTractorBrands}
        heading={'headings.inquireforTyrePrice'}
        type="TRACTOR"
        preFilledBrand={tractorDetail.brand_name_en}
        preFilledModel={tractorDetail?.model_name_en}
        preFilledModelId={tractorDetail.id}
        imgUrl="https://images.tractorgyan.com/uploads/120363/1754067655Tractor-On-Road-Price.webp"
        mobileImgUrl="https://images.tractorgyan.com/uploads/120364/1754067673Tractor-On-Road-Price-Mobile.webp"
      />

      {compareTractors.length > 0 ? (
        <section className="bg-white">
          <div className="container">
            <MainHeadings text={translation?.headings?.compareTractorWith.replace('{modelName}', tractorDetail.brand + ' ' + tractorDetail.model) || 'Compare Tractors'} />

            <CompareTractorsSlider
              cta={translation?.buttons?.compareTractor || 'Compare Tractors'}
              currentTractor={tractorDetail}
              compareTractors={compareTractors || null}
              isMobile={isMobile}
              tractorBrands={allTractorBrands}

            />
            {/* <div className="flex gap-4">
              <div className="flex w-full flex-col gap-4 md:w-[calc(50%-.5rem)]">
                <CompareTractorsSection
                  cta={translation?.buttons?.compareTractor || 'Compare Tractors'}
                  viewMode={false}
                  itemsToShow={2}
                  currentTractor={tractorDetail}
                  compareTractor={compareTractors[0] || null}
                  isLeftSection={true}
                />
              </div>
              <div className="flex w-full flex-col gap-4 md:w-[calc(50%-.5rem)]">
                <CompareTractorsSection
                  cta={translation?.buttons?.compareTractor || 'Compare Tractors'}
                  viewMode={false}
                  itemsToShow={2}
                  currentTractor={tractorDetail}
                  compareTractor={compareTractors[1] || null}
                  isLeftSection={false}
                />
              </div>
            </div> */}
          </div>
        </section>
      ) : null}

      {releatedTractors?.length > 0 && (<PopularSection
        heading={`${translation?.common?.similar || 'Related'} ${tractorDetail.brand} ${tractorDetail.model} ${translation?.common?.tractors || 'Tractors'}`}
        popularData={releatedTractors}
        popularDataError={popularTractorsError}
        translation={translation}
        langPrefix={currentLang}
        isMobile={isMobile}
        bgColor="bg-section-gray"
        redirectRoute={'/tractors'}
      />)}

      {/* TODO:: Manage Sell Your Tractor Banner */}
      <SecondHandMiniTractorCards
        heading={`${translation?.common?.similar || 'Similar'} ${tractorDetail.brand} ${tractorDetail.model} ${translation?.footer?.secondHandTractors || 'Second Hand Tractors'}`}
        showEmi={false}
        isMobile={isMobile}
        translation={translation}
        data={similarSecondHandTractors}
        currentLang={currentLang}
      />



      {(dealerStates.length > 0) ?
        <TyreDealersByStates
          title={translation.tractorDetails.tractorDealers.replace('{brandName}', `${tractorDetail.brand}`)}
          translation={translation}
          isMobile={isMobile}
          dealerStates={dealerStates}
          buttonText={
            translation?.tractorOnRoadPrice?.viewAllTractorDealers || 'View All Tractor Dealers'
          }
          prefLang={currentLang}
        />
        : null}
      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={allTractorBrands}
      />

      <TyreFAQs faqs={faqs} translation={translation} headingKey={'tractorfaqs.brandTractors'} isDynamicTitle={true} brandName={tractorDetail.brand + ' ' + tractorDetail.model} />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={'Tractor'}
        isMobile={isMobile}
        preFilledTractorBrand={tractorDetail.brand_name_en}
        preFilledTractorModelId={tractorDetail.id}
      />
    </main>
  );
}
