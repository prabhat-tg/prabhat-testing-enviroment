import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import NavComponents from '../tyre/NavComponents';
import { getSelectedLanguage } from '@/src/services/locale';
import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import WhatsAppTopButton from '../tyreComponents/commonComponents/WhatsAppTopButton';
import FooterComponents from '../tyre/FooterComponents';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorsByBrands from '@/src/components/tractor/TractorsByBrands';
import { getAllTractorBrands } from '@/src/services/tractor/all-tractor-brands';
import PopularSection from '@/src/components/shared/popularSection/PopularSection';
import { getTractorPopularDetails } from '@/src/services/tractor/tractor-popular-details';
import { getCompareTractorRecord } from '@/src/services/tractor/compare-tractor-brands';
import CompareTractorsSection from '@/src/components/tractor/CompareTractorsSection';
import Image from 'next/image';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import MainHeadings from '../tyreComponents/commonComponents/MainHeadings';
import CompareTractorsFeaturesSection from '@/src/components/tractor/CompareTractorsFeaturesSection';
import SocialMediaLinksShare from '@/src/components/shared/social-media/SocialMediaShare';
import TyreDealersByStates from '../tyre/TyreDealersByStates/TyreDealersByStates';
import CompareTractorsSlider from '@/src/components/tractor/CompareTractorsSlider';
import { getCompareTractorsList } from '@/src/services/tractor/get-compare-tractors-list';
import { getAllStatesBySlug } from '@/src/services/geo/get-states-by-slug';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';

export default async function CompareTractorsPage({ params }) {
  const param = await params;
  const currentLang = await getSelectedLanguage(); // Server-side language detection
  const translation = await getDictionary(currentLang);

  const isMobile = await isMobileView(); // Server-side mobile detection
  const allTractorBrands = await getAllTractorBrands();
  const popularTractors = await getTractorPopularDetails(currentLang);

  // const payload = {
  //   pageSlug: 'tractor-dealers',
  // };
  // const dealerStates = await getAllTractorSubsidyStates(payload);

  // Check if this is a comparison result page or main selection page
  const isComparisonPage = param && param.length > 0;
  console.log("Is comparison page:", isComparisonPage, param);

  const compareUrl = isComparisonPage ? param[0] : '';

  let seoData = {};
  let seoHtml;
  if (isComparisonPage) {
    seoHtml = await getDetailPageHeaderSEO({
      page_type: "compare-tractor",
      lang: currentLang,
      url_slug: compareUrl
    })
  } else {
    seoData = await getSEOByPage((currentLang == 'hi' ? 'hi/' : '') + "compare-tractors")
  }
  // Fetch comparison data if this is a comparison page
  let comparisonData = null;
  if (isComparisonPage && compareUrl) {
    comparisonData = await getCompareTractorRecord(compareUrl);
    console.log("Fetched comparison data:", comparisonData);
  }

  let dealerStates = [];
  try {
    dealerStates = await getAllStatesBySlug({ pageSlug: 'tractor-dealers' });
  } catch (error) {
    console.error('Error fetching dealer states:', error);
  }

  // Fetch more comparison listif this is a comparison page
  let moreComparisonList = null;
  moreComparisonList = await getCompareTractorsList();
  console.log("Fetched more comparison data:", moreComparisonList);


  // Generate page title based on whether it's comparison or main page
  const generatePageTitle = (url, data) => {
    if (!url) return translation?.headerNavbar?.compareTractor || 'Compare Tractors';

    // If we have comparison data, use the actual tractor names
    if (data && data.tractor_0 && data.tractor_1) {
      return `${data.tractor_0.brand} ${data.tractor_0.model} vs ${data.tractor_1.brand} ${data.tractor_1.model} - Compare Tractors`;
    }

    // Fallback to URL-based title generation
    const parts = url.split('-vs-');
    const tractorNames = parts.map(part =>
      part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );

    return `${tractorNames.join(' vs ')} - ${translation?.headerNavbar?.compareTractor || 'Compare Tractors'}`;
  };

  const pageTitle = generatePageTitle(compareUrl, comparisonData);

  // Generate breadcrumbs based on page type
  const breadcrumbs = [
    {
      label: translation?.breadcrumbs?.home || 'Home',
      href: '/',
      title: translation?.breadcrumbs?.home || 'Home',
    },
    {
      label: translation?.headerNavbar?.compareTractor || 'Compare Tractors',
      href: '/compare-tractors',
      title: translation?.headerNavbar?.compareTractor || 'Compare Tractors',
      isCurrent: !isComparisonPage,
    },
  ];

  if (isComparisonPage) {
    breadcrumbs.push({
      label: pageTitle,
      title: pageTitle,
      isCurrent: true,
    });
  }

  // Format comparison data for features section
  const formatComparisonFeatures = (data) => {
    if (!data || !data.tractor_0 || !data.tractor_1) {
      return [];
    }

    const tractor0 = data.tractor_0;
    const tractor1 = data.tractor_1;
    const tractor2 = data.tractor_2;

    // Define specification categories and their respective fields
    const specCategories = [
      {
        title: 'Engine',
        specs: [
          { key: 'engine_name', label: 'Engine Name' },
          { key: 'hp', label: 'HP' },
          { key: 'displacement_cc', label: 'Displacement' },
          { key: 'cylinder', label: 'Cylinder' },
          { key: 'engine_rated_rpm', label: 'Rated RPM' },
          { key: 'cooling_system', label: 'Cooling System' },
          { key: 'fuel_tank_capacity', label: 'Fuel Tank Capacity' },
          { key: 'air_filter', label: 'Air Filter' },
        ]
      },
      {
        title: 'Transmission',
        specs: [
          { key: 'transmission_name', label: 'Transmission Type' },
          { key: 'number_of_gears', label: 'Number of Gears' },
          { key: 'clutch_type', label: 'Clutch Type' },
          { key: 'clutch_size', label: 'Clutch Size' },
          { key: 'maximum_forward_speed', label: 'Max Forward Speed' },
          { key: 'maximum_reverse_speed', label: 'Max Reverse Speed' },
        ]
      },
      {
        title: 'PTO',
        specs: [
          { key: 'pto_hp', label: 'PTO HP' },
          { key: 'pto_type', label: 'PTO Type' },
          { key: 'pto_speed', label: 'PTO Speed' },
        ]
      },
      {
        title: 'Dimensions & Weight',
        specs: [
          { key: 'length', label: 'Length' },
          { key: 'width', label: 'Width' },
          { key: 'height', label: 'Height' },
          { key: 'wheel_base', label: 'Wheel Base' },
          { key: 'tractor_weight', label: 'Weight' },
          { key: 'ground_clearance', label: 'Ground Clearance' },
          { key: 'turning_radius', label: 'Turning Radius' },
        ]
      },
      {
        title: 'Hydraulics & Steering',
        specs: [
          { key: 'lifting_capacity', label: 'Lifting Capacity' },
          { key: 'hydrolic_control', label: 'Hydraulic Control' },
          { key: 'steering', label: 'Steering' },
          { key: 'brakes', label: 'Brakes' },
          { key: 'point_linkage', label: '3-Point Linkage' },
        ]
      },
      {
        title: 'Other Specifications',
        specs: [
          { key: 'wheel_drive', label: 'Wheel Drive' },
          { key: 'tyre_size', label: 'Tyre Size' },
          { key: 'price_range', label: 'Price Range' },
          { key: 'warrenty', label: 'Warranty' },
          { key: 'series', label: 'Series' },
        ]
      }
    ];

    // Convert to the format expected by CompareTractorsFeaturesSection
    return specCategories.map(category => {
      const features = category.specs
        .filter(spec => tractor0[spec.key] || tractor1[spec.key]) // Only include specs where at least one tractor has data
        .map(spec => ({
          name: spec.label,
          tractor1Value: tractor0[spec.key] || 'N/A',
          tractor2Value: tractor1[spec.key] || 'N/A',
          tractor3Value: tractor2 ? (tractor2?.[spec.key] || 'N/A') : null,
        }));

      return {
        title: category.title,
        headers: [
          'Specification',
          `${tractor0.brand} ${tractor0.model}`,
          `${tractor1.brand} ${tractor1.model}`,
          ...(tractor2 ? [`${tractor2?.brand || ''} ${tractor2?.model || ''}`] : []), // add header only if tractor2 exists
        ],
        features: features,
      };
    }).filter(category => category.features.length > 0); // Only include categories with features
  };

  const compareFeaturesData = comparisonData
    ? formatComparisonFeatures(comparisonData)
    : [
      {
        title: 'Engine',
        headers: ['Specification', 'Tractor 1', 'Tractor 2'],
        features: [
          { name: 'Engine Name', tractor1Value: 'SIMPSONS S325.1 TIII A', tractor2Value: 'SIMPSONS S325.1 TIII A' },
          { name: 'HP', tractor1Value: '30 HP', tractor2Value: '35 HP' },
          { name: 'Cylinder', tractor1Value: '3 Cylinder', tractor2Value: '3 Cylinder' },
          { name: 'Displacement', tractor1Value: '1947 CC', tractor2Value: '2100 CC' },
        ],
      },
      {
        title: 'Transmission',
        headers: ['Specification', 'Tractor 1', 'Tractor 2'],
        features: [
          { name: 'Transmission Type', tractor1Value: 'Constant Mesh', tractor2Value: 'Constant Mesh' },
          { name: 'Number of Gears', tractor1Value: '8 Forward + 4 Reverse', tractor2Value: '12 Forward + 3 Reverse' },
        ],
      },
      {
        title: 'PTO',
        headers: ['Specification', 'Tractor 1', 'Tractor 2'],
        features: [
          { name: 'PTO HP', tractor1Value: '25 HP', tractor2Value: '30 HP' },
          { name: 'PTO Speed', tractor1Value: '540 RPM', tractor2Value: '540 RPM' },
        ],
      },
    ];

  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[468px]">
      <div className="pe-4">
        <h2 className="border-b-3 mb-6 inline-block border-secondary pb-1 text-lg font-semibold lg:text-2xl">
          {comparisonData
            ? `${comparisonData.tractor_0?.brand || 'Tractor 1'} ${comparisonData.tractor_0?.model || ''} 
            v/s ${comparisonData.tractor_1?.brand || 'Tractor 2'} ${comparisonData.tractor_1?.model || ''}`
            + (comparisonData.tractor_2
              ? ` v/s ${comparisonData.tractor_2?.brand || 'Tractor 3'} ${comparisonData.tractor_2?.model || ''}`
              : '')
            : 'Sonalika DI 47 RX v/s New holland 4710 4WD'
          }
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[340px] overflow-auto pe-4 text-sm font-normal text-gray-dark">
        {comparisonData?.description ||
          'Compare these two tractors to find the best match for your farming needs. Detailed specifications, features, and performance comparisons are provided below to help you make an informed decision.'
        }
      </div>
      <button className="text-medium mt-3 flex items-center gap-2 text-sm">
        Read More
        <span>
          <Image
            src="https://images.tractorgyan.com/uploads/117142/676901b0c9bf7-gray-arrow.webp"
            height={20}
            width={20}
            alt="toggle-button-icon"
            title="toggle-button-icon"
            className="h-auto w-3"
          />
        </span>
      </button>
    </div>
  );

  return (
    <main className="pt-4 md:mt-[164px]">
      {/* TODO:: Setup Common Layout Class */}
      <SeoHead
        seo={seoData}
        seoHTMLDescription={seoHtml?.data}
      />
      <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
      <div className="container mx-auto">
        <TittleAndCrumbs title={pageTitle} breadcrumbs={breadcrumbs} />

        {!isComparisonPage && (
          <TG_Banner
            imgUrl={
              'https://images.tractorgyan.com/uploads/120275/1753706468Compare-Tractors-Desktop.webp'
            }
            mobileImgUrl={
              'https://images.tractorgyan.com/uploads/120276/1753706483Compare-Tractors-Mobile.webp'
            }
            title={translation?.headerNavbar?.compareTractor || 'Compare Tractors'}
            additionalClasses={'mb-6 md:mb-10'}
            pageUrl={'/'}
          />
        )}
      </div>

      {/* Conditional Content Based on Page Type */}
      {isComparisonPage ? (
        /* Comparison Results Page with Old UI */
        <>
          {/* Main Comparison Display */}
          <section className="bg-section-gray">
            <div className="justfiy-between container flex">
              <div className="hidden flex-col justify-center gap-4 pr-4 font-medium md:flex">
                Share
                <SocialMediaLinksShare direction="flex-col" />
              </div>
              {comparisonData && comparisonData.tractor_0 && comparisonData.tractor_1 ? (
                <CompareTractorsSection
                  cta="Compare Tractors"
                  bgColor="bg-section-gray"
                  viewMode={true}
                  allowChange={true}
                  currentTractor={comparisonData.tractor_0}
                  compareTractor={comparisonData.tractor_1}
                  compareTractor2={comparisonData.tractor_2 ? comparisonData.tractor_2 : ''}
                  // itemsToShow={comparisonData.tractor_2 ? 3 : 2}
                  itemsToShow={isMobile ? 2 : 3}
                  currentLang={currentLang}
                  tractorbrands={allTractorBrands}
                />
              ) : (
                <div className="flex h-64 items-center justify-center w-full">
                  <div className="text-center">
                    <h2 className="text-gray-600 mb-4 text-xl font-semibold">
                      {translation?.headerNavbar?.noTractorsSelected ||
                        'No comparison data available'}
                    </h2>
                    <p className="text-gray-500">
                      {translation?.headerNavbar?.pleaseSelectTractors ||
                        'Please try again or select tractors from below'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* About Section */}
          {isComparisonPage ? <section className="mt-10">
            <div className="container">{aboutSectionSlot}</div>
          </section> : null}

          {/* Features Comparison Section */}
          {isComparisonPage && compareFeaturesData.length > 0 && (
            <CompareTractorsFeaturesSection comparisionData={compareFeaturesData} />
          )}


        </>
      ) : (
        <>
          {/* <section className="bg-section-gray">
            <div className="justfiy-between container flex">
              <div className="hidden flex-col justify-center gap-4 pr-4 font-medium md:flex">
                Share
                <SocialMediaLinksShare direction="flex-col" />
              </div>
              <CompareTractorsSection
                cta="Compare Tractors"
                bgColor="bg-section-gray"
                viewMode={true}
                allowChange={true}
              />
            </div>
          </section> */}

          {!isComparisonPage ? <section className="bg-section-gray">
            <CompareTractorsSection
              heading="Compare Tractors"
              cta="Compare Tractors"
              bgColor="bg-section-gray"
              currentLang={currentLang}
              tractorbrands={allTractorBrands}

            // allowChange={true}
            />
          </section> : null}

          {/* Compare More Tractors Section */}
          <section className="bg-white">
            <div className="container">
              <MainHeadings text="Compare Tractors" />
              <CompareTractorsSlider
                cta={translation?.buttons?.compareTractor || 'Compare Tractors'}
                compareTractors={moreComparisonList || null}
                isMobile={isMobile}
                isComparisonPage={true}
                tractorBrands={allTractorBrands}
              />

            </div>
          </section>
          {/* About Section */}
          {/* <section className="mt-10">
            <div className="container">{aboutSectionSlot}</div>
          </section> */}

          {/* Sample Features Section for Main Page */}
          {isComparisonPage ? (
            <CompareTractorsFeaturesSection comparisionData={compareFeaturesData} />
          ) : null}
          {/* Compare Examples Section */}
          {/* <section className="bg-white">
            <div className="container">
              <MainHeadings text="Compare Tractors" />
              <div className="flex gap-4">
                <div className="flex w-full flex-col gap-4 md:w-[calc(50%-.5rem)]">
                  <CompareTractorsSection cta="Compare Tractors" viewMode={true} itemsToShow={2} />
                  <CompareTractorsSection cta="Compare Tractors" viewMode={true} itemsToShow={2} />
                </div>
                <div className="hidden w-full flex-col gap-4 md:flex md:w-[calc(50%-.5rem)]">
                  <CompareTractorsSection cta="Compare Tractors" viewMode={true} itemsToShow={2} />
                  <CompareTractorsSection cta="Compare Tractors" viewMode={true} itemsToShow={2} />
                </div>
              </div>
            </div>
          </section> */}
        </>
      )}

      {/* Common Sections for Both Pages */}
      <PopularSection
        langPrefix={currentLang}
        popularData={popularTractors}
        isMobile={isMobile}
        translation={translation}
        bgColor={isComparisonPage ? 'bg-white' : 'bg-section-gray'}
        redirectRoute="/tractors"
      />

      <TractorsByBrands
        translation={translation}
        langPrefix={currentLang}
        allTractorBrands={allTractorBrands}
      />

      <TyreDealersByStates
        translation={translation}
        isMobile={isMobile}
        dealerStates={dealerStates}
        prefLang={currentLang}
        title={translation?.tractorDealers?.title || 'Tractor Dealers in India'}
        buttonText={translation?.buttons?.viewAllStates || 'View All States'}
      />

      <JoinOurCommunityServer translation={translation} currentLang={currentLang} />

      <TractorGyanOfferings translation={translation} />

      <AboutTractorGyanServer slug={(currentLang == 'hi' ? 'hi/' : '') + 'compare-tractors'} translation={translation} />

      <FooterComponents translation={translation} />

      <WhatsAppTopButton
        translation={translation}
        currentLang={currentLang}
        isMobile={isMobile}
      />
    </main>
  );
}
