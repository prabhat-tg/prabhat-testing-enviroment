import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import FooterComponents from '../tyre/FooterComponents';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import TyreFAQs from '../tyre/tyreFAQs/TyreFAQs';
import { getTyreBrands } from '@/src/services/tyre/tyre-brands';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import LoanCalculator from '../loan/loanCalculator/LoanCalculator';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import TyreRatingAndReviews from '../tyreComponents/components/tyreRatingAndReviews/TyreRatingAndReviews';
import RelatedTyres from '../tyre/relatedTyres/RelatedTyres';
import { getRelatedTractors } from '@/src/services/tractor/related-tractors';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../tyre/NavComponents';
import {
  tgb_implement_on_road_price,
  tgb_implement_on_road_price_mobile,
} from '@/src/utils/assets/banners';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import TractorImplementTypes from '@/src/components/shared/tractor-implements/TractorImplementTypes';
import TractorImplementBrands from '@/src/components/shared/tractor-implement-brands/TractorImplementBrands';
import ImplementsCategorySlider from '@/src/components/implements/ImplementsCategorySlider';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import ImplementDetailsCard from './ImplementDetailsCard';
import Link from 'next/link';
import Image from 'next/image';
import { getAllImplementCategories } from '@/src/services/implement/all-implement-categories';
import { getAllImplementBrandsDetail } from '@/src/services/implement/get-all-implement-brands';
import { getAllImplementDetails } from '@/src/services/implement/get-all-implement-details';
import { getDetailsImplementFAQs } from '@/src/services/implement/get-implement-details-faqs';
import { getRelatedImplements } from '@/src/services/implement/get-related-implements';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import { getTractorDetailBrandContent } from '@/src/services/tractor/tractor-detail-brand-content';
import ImplementDetailsSpecs from './ImplementDetailsSpecs';
import './globals.css';

export const dynamic = 'force-dynamic';
export default async function TractorImplementDetailPage({ params }) {
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection

  // const param = await params;
  const param = params;
  const pageSlug = params?.slug;
  const implementType = param?.brand;
  const implementId = pageSlug[1]; // 440
  const pageUrl = `tractor-implements/` + implementType + '/' + pageSlug[0] + '/' + pageSlug[1];

  // const params = await searchParams;
  const headingTitle = 'John Deere Single Bottom MB Plough (MB3001M)';

  const allImplementTypes = await getAllImplementTypes();

  const currentDate = new Date()
    .toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    })
    .replace(/,/g, '');

  let implementCategories;
  try {
    implementCategories = await getAllImplementCategories();
    // console.log('===implementCategories===', implementCategories);
  } catch (error) {
    implementCategories = [];
  }

  let allImplementBrandsWithDetails;
  try {
    allImplementBrandsWithDetails = await getAllImplementBrandsDetail();
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
    allImplementBrandsWithDetails = [];
  }

  // const implementDetail = {
  //   name: 'John Deere Single Bottom MB Plough (MB3001M)',
  //   model_name: 'Single Bottom MB Plough (MB3001M)',
  //   brand_name: 'John Deere',
  //   power: '31.33 kW',
  //   warranty: '2100 Hours or 2 Years',
  //   images: ['113635/66823ed511fcb-john-deere-single-bottom-mb-plough1.webp'],
  //   brand_logo:
  //     'https://images.tractorgyan.com/uploads/115006/66e14394f37e9-john-deere-implement-logo.webp',
  //   features: ['This is a test feature', 'This is another feature', 'Third feature'],
  // };
  let implementDetail;
  try {
    console.log('==params::', param);

    implementDetail = await getAllImplementDetails(param?.brand, pageSlug[1], currentLang);
    implementDetail.brand_name = currentLang === 'en' ? implementDetail.brand_name_en : implementDetail.brand_name_hi;
    implementDetail.model_name = currentLang === 'en' ? implementDetail.model : implementDetail.model_hi;
    // implementDetail = await getAllImplementDetails('plough', 93);
  } catch (error) {
    console.error('Failed to fetch implement brands data:', error);
  }

  const brand = { name: implementDetail?.brand_name || 'Implement Brand' };

  const staticMetadata = {};

  let seoData = null;
  try {
    const seoPayload = {
      page_url: pageUrl,
      page_type: 'implement_detail',
      lang: currentLang,
    };
    const seoRes = await getDetailPageHeaderSEO(seoPayload);
    seoData = seoRes?.data || null;
  } catch (error) {
    console.error('Error fetching SEO data:', error);
  }


  const subModels = [
    {
      size: translation?.implementDetails?.subModelSpecs?.sizeModels?.sixFeet || '6 Feet Model',
      specs: {
        [translation?.implementDetails?.subModelSpecs?.threePtLinkage || '3 Point Linkage']: translation?.implementDetails?.subModelSpecs?.pyramidType || '"Pyramid Type" for Strength',
        [translation?.implementDetails?.subModelSpecs?.typeOfBlade || 'Type of Blade']: translation?.implementDetails?.subModelSpecs?.lTypeJapanese || 'L Type "Japanese Technology"',
        [translation?.implementDetails?.subModelSpecs?.noOfBlades || 'No. Of Blades']: translation?.implementDetails?.subModelSpecs?.bladeNumbers?.fortyTwo || '42',
        [translation?.implementDetails?.subModelSpecs?.rotorShaftPipe || 'Rotor Shaft Pipe']: translation?.implementDetails?.subModelSpecs?.farmPowerPipe || 'FarmPower Uses Only High Grade "Seamless Pipe"',
        [translation?.implementDetails?.subModelSpecs?.suitableTractor || 'Suitable Tractor']: translation?.implementDetails?.subModelSpecs?.tractorHpRanges?.fortyToFifty || '40-50 HP',
      },
    },
    {
      size: translation?.implementDetails?.subModelSpecs?.sizeModels?.sevenFeet || '7 Feet Model',
      specs: {
        [translation?.implementDetails?.subModelSpecs?.threePtLinkage || '3 Point Linkage']: translation?.implementDetails?.subModelSpecs?.pyramidType || '"Pyramid Type" for Strength',
        [translation?.implementDetails?.subModelSpecs?.typeOfBlade || 'Type of Blade']: translation?.implementDetails?.subModelSpecs?.lTypeJapanese || 'L Type "Japanese Technology"',
        [translation?.implementDetails?.subModelSpecs?.noOfBlades || 'No. Of Blades']: translation?.implementDetails?.subModelSpecs?.bladeNumbers?.fortyEight || '48',
        [translation?.implementDetails?.subModelSpecs?.rotorShaftPipe || 'Rotor Shaft Pipe']: translation?.implementDetails?.subModelSpecs?.farmPowerPipe || 'FarmPower Uses Only High Grade "Seamless Pipe"',
        [translation?.implementDetails?.subModelSpecs?.suitableTractor || 'Suitable Tractor']: translation?.implementDetails?.subModelSpecs?.tractorHpRanges?.fortyFiveToFiftyFive || '45-55 HP',
      },
    },
    {
      size: translation?.implementDetails?.subModelSpecs?.sizeModels?.eightFeet || '8 Feet Model',
      specs: {
        [translation?.implementDetails?.subModelSpecs?.threePtLinkage || '3 Point Linkage']: translation?.implementDetails?.subModelSpecs?.pyramidType || '"Pyramid Type" for Strength',
        [translation?.implementDetails?.subModelSpecs?.typeOfBlade || 'Type of Blade']: translation?.implementDetails?.subModelSpecs?.lTypeJapanese || 'L Type "Japanese Technology"',
        [translation?.implementDetails?.subModelSpecs?.noOfBlades || 'No. Of Blades']: translation?.implementDetails?.subModelSpecs?.bladeNumbers?.fiftyFour || '54',
        [translation?.implementDetails?.subModelSpecs?.rotorShaftPipe || 'Rotor Shaft Pipe']: translation?.implementDetails?.subModelSpecs?.farmPowerPipe || 'FarmPower Uses Only High Grade "Seamless Pipe"',
        [translation?.implementDetails?.subModelSpecs?.suitableTractor || 'Suitable Tractor']: translation?.implementDetails?.subModelSpecs?.tractorHpRanges?.fiftyFiveToSixtyFive || '55-65 HP',
      },
    },
  ];  // const relatedTractors = await getRelatedTractors({ implementId });
  let relatedImplements = [];
  try {
    relatedImplements = await getRelatedImplements({
      implement_type: implementType,
      id: implementId,
      lang: currentLang,
    });
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
  }


  let banners = [];
  try {
    const tractorDetailTopContent = await getTractorDetailBrandContent({
      ad_title: pageUrl,
      ad_type_image_lang: currentLang,
      device_type: isMobile ? 'mobile' : 'desktop'
    });
    banners = tractorDetailTopContent?.banner || [];
    console.log("banners : ", banners);
  } catch (error) {
    console.error('Error fetching tyre brands data:', error);
  }


  // TODO:: WIP - Tractor About Section
  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[468px]">
      <div className="pe-4">
        <h2 className="border-b-3 mb-4 inline-block border-secondary pb-1 text-lg font-semibold md:mb-6 lg:text-2xl">
          {currentLang == 'en' ? translation?.implementDetails?.about || 'About' : ''} {` ${implementDetail.brand_name}  ${implementDetail?.model_name}`} {currentLang == 'hi' ? translation?.implementDetails?.about || 'About' : ''}
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[160px] overflow-auto pe-4 text-sm font-normal text-gray-dark md:max-h-[340px]">
        {/* {implementDetail?.aboutabout && implementDetail?.dynamic_content === 'No' ? ( */}
        {implementDetail?.about_us ? (
          <div className='tg-html-content'>
            <div dangerouslySetInnerHTML={{ __html: implementDetail.about_us }} />
          </div>
        ) : (
          <div>
            <p className="mb-3">
              With the help of {`${implementDetail.brand_name} ${implementDetail?.model_name}`}, it's
              easy for a farmer to move the tractor in a field and use different kinds of
              implements.
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <p className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, assumenda
              expedita sunt libero delectus reiciendis omnis laborum aut iste aspernatur modi
              adipisci, necessitatibus quis accusamus at blanditiis? Possimus, sequi officiis?
            </p>
            <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
              <li>
                This tractor tyre is designed to carry heavy loads without any hassle. Farmers can
                attach compatible implements with the tractor using this tractor tyre and use them.
              </li>
            </ul>
            <p className="mb-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non modi nobis perspiciatis
              delectus aliquid velit vero fugit voluptatibus eveniet? Velit veniam minus dolorum
              animi assumenda aspernatur eum laboriosam ipsa pariatur.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const SubModelsTable = () => {
    return (
      <div>
        <div className="rounded-t-xl bg-black py-3 text-center text-lg font-semibold text-white">
          {implementDetail.brand_name === 'John Deere'
            ? (translation?.implementDetails?.johnDeerePloughModels || 'John Deere Plough Models')
            : (translation?.implementDetails?.ploughModels || 'Plough Models')
          }
        </div>
        <div className="rounded-b-xl border border-gray-light">
          {subModels.map((model, idx) => (
            <div key={idx} className="border-t border-gray-light">
              <div className="bg-section-gray px-4 py-2 text-center text-sm font-medium">
                {model.size}
              </div>
              <div>
                {Object.entries(model.specs).map(([label, value], i, arr) => (
                  <div
                    key={i}
                    className={`${i === arr.length - 1 ? '' : 'border-b'} flex border-gray-light px-2 md:px-4`}
                  >
                    <div className="w-2/5 border-r border-gray-light py-2 text-xs font-medium md:text-sm">
                      {label}
                    </div>
                    <div className="w-3/5 py-2 pl-4 text-xs text-gray-description md:text-sm">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // TODO:: API Needed
  let faqs = [];
  try {
    const faqResponse = await getDetailsImplementFAQs({
      implement_type: implementType,
      id: implementId,
      lang: currentLang,
    });
    if (faqResponse && faqResponse.success) {
      faqs = faqResponse.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    faqs = [];
  }

  const tyreBrandsData = await getTyreBrands();

  return (
    <main>
      <SeoHead seo={{}} seoHTMLDescription={seoData} staticMetadata={staticMetadata} />
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      {/* TODO:: Setup Common Layout Class */}
      <div className="container mx-auto !pt-4 md:mt-[164px]">
        <TittleAndCrumbs
          showBack={true}
          breadcrumbs={[
            { label: translation?.breadcrubm?.tractorGyanHome || 'Home', href: '/', title: translation?.breadcrumbs?.home || 'Home' },
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
              isCurrent: true,
            },
          ]}
        />
        {/* TODO:: WIP - Implement Model Detail Section */}
        <div className="gap-8 lg:flex">
          <div className="flex w-full flex-col gap-8 md:w-3/4">
            <ImplementDetailsCard
              implementId={implementId}
              implementDetail={implementDetail}
              currentLang={currentLang}
              isMobile={isMobile}
              translation={translation}
            />
            <div className="hidden lg:block">{aboutSectionSlot}</div>
            {/* <div className="hidden lg:block"><SubModelsTable /></div> */}
          </div>
          <div className="relative h-full w-full md:w-1/4">
            <ImplementDetailsSpecs
              currentLang={currentLang}
              translation={translation}
              implementDetail={implementDetail}
              bannerDetail={{
                imgUrl: banners && banners.length > 0 ? banners[0].image : null,
                imageClasses: 'max-h-[200px]',
                unoptimized: true
              }}
            />
          </div>
          <div className="block lg:hidden">{aboutSectionSlot}</div>
          {/* <div className="block lg:hidden"><SubModelsTable /></div> */}
        </div>
      </div>

      <div className="mt-4 md:mt-10">
        <RelatedTyres
          tyreId={implementId}
          tyres={relatedImplements}
          isMobile={isMobile}
          tyreDetail={implementDetail}
          translation={translation}
          currentLang={currentLang}
          mode={'implement'}
        />
      </div>

      <LoanCalculator
        title={translation?.emiCalcytranslate?.CalculateEMI || 'Calculate EMI'}
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
        allSectionUse={true}
        bgColor={'bg-white'}
      />

      <TyreRatingAndReviews
        reviewData={[]}
        headingTitleKey={'headings.tyreRatingAndReviews'}
        dynamicTitle={` ${implementDetail.brand_name}  ${implementDetail?.model_name}`}
        translation={translation}
        reviewTitleKey={'headings.tyreUserReview'}
        bgColor={'bg-section-gray'}
        brand={brand}
        modelId={implementId}
        model={implementDetail.model_name}
        showUserReviewTitle={isMobile}
        noReviewImg="https://images.tractorgyan.com/uploads/115159/66e7ef5355658-no-review-card-banner.webp"
        // Implement-specific props for payload
        mode="implement"
        implementType={implementType}
        implementBrand={implementDetail.brand_name}
        implementModel={implementDetail?.model_name}
        formPageName="implement_model_detail"
      />

      <div className='my-4 md:my-6'>
        {/* TODO:: Update it to make it generic */}
        <TyrePriceInquireForm
          translation={translation}
          currentLang={currentLang}
          brandName={` ${implementDetail.brand_name}  ${implementDetail?.model_name}`}
          tyreBrands={allImplementBrandsWithDetails}
          type='IMPLEMENT'
          heading={'headings.inquireforTyrePrice'}
          banner={tgb_implement_on_road_price}
          mobileBanner={tgb_implement_on_road_price_mobile}
          submitBtnText={translation?.implementDetails?.sendEnquiry || "Send Enquiry"}
          implementType={implementType}
          pageSource={pageUrl}
          pageName={'implement_details'}
          implementDetail={implementDetail}
          isMobile={isMobile}
        />
      </div>

      <TractorImplementTypes
        heading={translation?.headerNavbar?.implementsByTypes || "Implements By Types"}
        allImplementTypes={allImplementTypes}
        floatingBg={true}
        slider={true}
        isMobile={isMobile}
        currentLang={currentLang}

      />

      <TractorImplementBrands
        bgColor={'bg-section-gray'}
        heading={translation?.headerNavbar?.implementsByBrands || "Implements By Brands"}
        allImplementBrands={allImplementBrandsWithDetails}
        itemsShown={isMobile ? 9 : 12}
        translation={translation}
        prefLang={currentLang}
      />

      <ImplementsCategorySlider
        isMobile={isMobile}
        heading={translation?.headerNavbar?.implementByCategory || "Implement By Category"}
        categories={implementCategories}
      />

      <TyreFAQs faqs={faqs} translation={translation} headingKey={'faqs.implements'} brandName={implementDetail?.brand_name + ' ' + implementDetail?.model_name} isDynamicTitle={true} />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      {/* <AboutTractorGyanServer slug={pageSlug} translation={translation} /> */}

      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        tyreBrands={tyreBrandsData}
        defaultEnquiryType={translation?.headerNavbar?.implement || 'Implement'}
        isMobile={isMobile}
      />
    </main>
  );
}
