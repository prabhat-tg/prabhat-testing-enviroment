import Link from 'next/link';
import React from 'react';
import TyreDetailsClientInteractions from './TyreDetailsClientInteractions'; // Import the new client component
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';

const TyreDetailsAndFeatures = ({
  tyreId,
  tyreDetail,
  prefLang,
  isMobile,
  headingTitle,
  translation,
  brandSlug,
}) => {
  if (!tyreDetail) {
    // TODO: Proper loading state or not found component
    return (
      <section className="lg:mt-[144px]">
        <div className="container relative">
          <p>
            {translation?.error_messages?.loadingTyreDetails ||
              'Loading tyre details or tyre not found...'}
          </p>
        </div>
      </section>
    );
  }

  const features = tyreDetail?.feature ? tyreDetail.feature.split('\r\n') : [];

  // Function to render content based on language preference
  const renderAboutContent = () => {
    if (tyreDetail?.about_tyre && tyreDetail.dynamic_content === 'No') {
      return <div>{tyreDetail.about_tyre}</div>;
    }

    if (prefLang === 'hi' && translation?.tyreDetail) {
      // Hindi content
      return (
        <div>
          <p className="mb-3">
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.aboutDescription}
          </p>
          <p className="mb-3">
            {translation.tyreDetail.compatibilityDescription}{' '}
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.compatibilityDescriptionSuffix}{' '}
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`} {translation.tyreDetail.features}{' '}
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`} {translation.tyreDetail.warranty}
          </p>
          <h3 className="mb-3 text-base font-semibold text-secondary">
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.whyBestTyre}
          </h3>
          <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
            <li>
              {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
              {translation.tyreDetail.tractionDescription}
            </li>
            <li>{translation.tyreDetail.heavyLoadDescription}</li>
            <li>
              {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
              {translation.tyreDetail.engineeringDescription}
            </li>
            <li>{translation.tyreDetail.shockAbsorptionDescription}</li>
            <li>
              {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
              {translation.tyreDetail.qualityMaterialsDescription}
            </li>
            <li>{translation.tyreDetail.farmingTasksDescription}</li>
          </ul>
          <h3 className="mb-3 text-base font-semibold text-secondary">
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.priceInIndia}
          </h3>
          <p className="mb-3">
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.priceDescription}{' '}
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.priceDescriptionSuffix}
          </p>
          <h3 className="mb-3 text-base font-semibold text-secondary">
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.featuresAndSpecifications}
          </h3>
          <p className="mb-3">
            {translation.tyreDetail.featuresDescription}{' '}
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.featuresDescriptionSuffix}
          </p>
          <h3 className="mb-3 text-base font-semibold text-secondary">
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.howToMaintain}
          </h3>
          <p className="mb-3">{translation.tyreDetail.maintenanceDescription}</p>
          <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
            <li>{translation.tyreDetail.maintenanceTip1}</li>
            <li>{translation.tyreDetail.maintenanceTip2}</li>
            <li>{translation.tyreDetail.maintenanceTip3}</li>
          </ul>
          <h3 className="mb-3 text-base font-semibold text-secondary">
            {translation.tyreDetail.howTractorGyanHelps}{' '}
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.howTractorGyanHelpsSuffix}
          </h3>
          <p className="mb-3">
            {translation.tyreDetail.tractorGyanDescription}{' '}
            {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}{' '}
            {translation.tyreDetail.tractorGyanDescriptionMiddle}
          </p>
        </div>
      );
    }

    // Default English content
    return (
      <div>
        <p className="mb-3">
          With the help of {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}
          {translation?.tyreDetail?.aboutDescription ||
            ", it's easy for a farmer to move the tractor in a field and use different kinds of implements."}
        </p>
        <p className="mb-3">
          {translation?.tyreDetail?.compatibilityDescription ||
            'This tractor tyre is compatible with leading tractor models of brands like Mahindra, Sonalika, John Deere, New Holland, and many more. It comes at an affordable price and is easily available all over India. Buying this tractor tyre is a great decision for agriculture and commercial farmers. TractorGyan provides updated information related to'}{' '}
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.compatibilityDescriptionSuffix || 'prices,'}{' '}
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.features || 'features, and'}{' '}
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.warranty || 'warranty.'}
        </p>
        <h3 className="mb-3 text-base font-semibold text-secondary">
          Why is {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.whyBestTyre || 'the Best Tyre in India?'}
        </h3>
        <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
          <li>
            {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
            {translation?.tyreDetail?.tractionDescription ||
              'can provide traction that a tractor requires to move and operate in various types of fields like uneven fields and wet farms.'}
          </li>
          <li>
            {translation?.tyreDetail?.heavyLoadDescription ||
              'This tractor tyre is designed to carry heavy loads without any hassle. Farmers can attach compatible implements with the tractor using this tractor tyre and use them.'}
          </li>
          <li>
            {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
            {translation?.tyreDetail?.engineeringDescription ||
              'is prepared using modern engineering and distributes the tractor weight equally. Because of this, soil compaction is low and soil structure is maintained.'}
          </li>
          <li>
            {translation?.tyreDetail?.shockAbsorptionDescription ||
              'This tyre absorbs the shocks from uneven ground and provides a better and more comfortable ride experience.'}
          </li>
          <li>
            {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
            {translation?.tyreDetail?.qualityMaterialsDescription ||
              'is built with premium quality materials and can operate in rough farming conditions without any issues.'}
          </li>
          <li>
            {translation?.tyreDetail?.farmingTasksDescription ||
              'It supports all sorts of farming tasks such as ploughing, seeding, mulching, and harvesting.'}
          </li>
        </ul>
        <h3 className="mb-3 text-base font-semibold text-secondary">
          What is the {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.priceInIndia || 'Price in India in 2024?'}
        </h3>
        <p className="mb-3">
          The {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.priceDescription ||
            'price is affordable and fully justified, seeing the features and benefits it offers to its users. Farmers can check the updated'}{' '}
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.priceDescriptionSuffix ||
            'price in India on TractorGyan. Here, you can learn about tractor tyre prices, their features, and other related information under one roof, saving time & effort.'}
        </p>
        <h3 className="mb-3 text-base font-semibold text-secondary">
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.featuresAndSpecifications || 'Features & Specifications'}
        </h3>
        <p className="mb-3">
          {translation?.tyreDetail?.featuresDescription ||
            'This tractor tyre comes with a strong casing that makes it durable. The tread design of'}{' '}
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.featuresDescriptionSuffix ||
            'is suitable for all farming and commercial-related tasks. It has a mud-shaker feature to keep the tyre clean during operation.'}{' '}
        </p>
        <h3 className="mb-3 text-base font-semibold text-secondary">
          How to Maintain a {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}
          {translation?.tyreDetail?.howToMaintain || '?'}
        </h3>
        <p className="mb-3">
          {translation?.tyreDetail?.maintenanceDescription ||
            'Farmers can increase the life of a tractor tyre if they follow the below-mentioned tractor tyre maintenance tips.'}
        </p>
        <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
          <li>
            {translation?.tyreDetail?.maintenanceTip1 ||
              'Check the tyre regularly and replace or fix it if you see any signs of cuts, damage, and punters.'}
          </li>
          <li>
            {translation?.tyreDetail?.maintenanceTip2 ||
              'The tyre must have proper pressure so that any kind of damage is avoided.'}
          </li>
          <li>
            {translation?.tyreDetail?.maintenanceTip3 ||
              'Never carry the load beyond the recommended limit. Overloading makes tyres easily damaged and increases the risk of blowouts.'}
          </li>
        </ul>
        <h3 className="mb-3 text-base font-semibold text-secondary">
          {translation?.tyreDetail?.howTractorGyanHelps || 'How can TractorGyan help you buy'}{' '}
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.howTractorGyanHelpsSuffix || 'in India?'}
        </h3>
        <p className="mb-3">
          {translation?.tyreDetail?.tractorGyanDescription ||
            'TractorGyan is a leading online platform that provides information on tractors, implements, tyres, and more in India. It also helps farmers to know about updated'}{' '}
          {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{' '}
          {translation?.tyreDetail?.tractorGyanDescriptionMiddle ||
            'prices, features, warranties, and specifications. This information can help you make a wise decision and get an ideal tractor tyre on an affordable budget.'}
        </p>
      </div>
    );
  };

  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0 md:max-h-[468px]">
      <div className="pe-4">
        <h2 className="border-b-3 mb-6 inline-block border-secondary pb-1 text-lg font-semibold lg:text-2xl">
          {prefLang === 'hi' && translation?.tyreDetail
            ? `${tyreDetail.brand_name} ${tyreDetail.model_name} ${translation.tyreDetail.about}`
            : `${translation?.tyreDetail?.about || 'About'} ${tyreDetail.brand_name} ${tyreDetail.model_name}`}
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[340px] overflow-auto pe-4 text-sm font-normal text-gray-dark">
        {renderAboutContent()}
      </div>
    </div>
  );

  return (
    <section className="lg:mt-[144px]">
      <div className="container relative">
        <TittleAndCrumbs
          showBack={true}
          hideTitle={true}
          // title={`${tyreDetail.brand_name}  ${tyreDetail.model_name}`}
          breadcrumbs={[
            {
              label: translation.breadcrubm.home,
              href: prefLang === 'hi' ? '/hi' : '/',
              title: translation.breadcrubm.home,
            },
            {
              label: translation.headerNavbar.tyreHome,
              href: prefLang === 'hi' ? '/hi/tractor-tyre-in-india' : '/tractor-tyre-in-india',
              title: translation.headerNavbar.tyreHome,
            },
            {
              label: translation.breadcrubm.brandTyres.replace('{brand}', tyreDetail.brand_name),
              href: `${prefLang === 'hi' ? '/hi' : ''}/tyre/${brandSlug.split('-')[0]}-tractor-tyre-in-india`,
              title: translation.breadcrubm.brandTyres.replace('{brand}', tyreDetail.brand_name),
            },
            {
              label: `${tyreDetail.brand_name}  ${tyreDetail.model_name}`,
              title: `${tyreDetail.brand_name}  ${tyreDetail.model_name}`,
              isCurrent: true,
            },
          ]}
        />
        {/* Breadcrumbs remain server-rendered */}

        {/* All interactive elements and their layout are now delegated to the client component */}
        <TyreDetailsClientInteractions
          translation={translation}
          tyreId={tyreId}
          tyreDetail={tyreDetail}
          features={features}
          isMobile={isMobile}
          aboutSectionSlot={aboutSectionSlot} // Pass the server-rendered "About" section
        />
      </div>
    </section>
  );
};

export default TyreDetailsAndFeatures;
