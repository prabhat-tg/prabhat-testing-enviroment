import React from "react";
import DetailsClientInteractions from "./DetailsClientInteractions";
import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";

const DetailsAndFeatures = ({ tyreId, tyreDetail,isMobile,translation,  currentLang }) => {
  if (!tyreDetail) {
    // TODO: Proper loading state or not found component
    return (
      <section className="lg:mt-[144px]">
        <div className="container relative">
          <p>Loading tyre details or tyre not found...</p>
        </div>
      </section>
    );
  }

  const features = tyreDetail?.feature ? tyreDetail.feature.split("\r\n") : [];

  const aboutSectionSlot = (
    <div className="rounded-2xl border-[1px] border-gray-light p-4 pe-0">
      <div className="pe-4">
        <h2 className="border-b-3 mb-3 inline-block border-secondary pb-1 text-lg font-semibold lg:text-2xl">
          About Old Swaraj 744 XT in Barddhaman West Bengal
        </h2>
      </div>
      <div className="custom-scroller h-full max-h-[160px] overflow-auto pe-4 text-sm font-normal text-gray-dark">
        {tyreDetail?.about_tyre && tyreDetail.dynamic_content === "No" ? (
          <div>{tyreDetail.about_tyre}</div>
        ) : (
          <div>
            <p className="mb-3">
              With the help of{" "}
              {`${tyreDetail.brand_name} ${tyreDetail.model_name}`}, it's easy
              for a farmer to move the tractor in a field and use different
              kinds of implements.
            </p>
            <p className="mb-3">
              This tractor tyre is compatible with leading tractor models of
              brands like Mahindra, Sonalika, John Deere, New Holland, and many
              more. It comes at an affordable price and is easily available all
              over India. Buying this tractor tyre is a great decision for
              agriculture and commercial farmers. TractorGyan provides updated
              information related to{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} prices,{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} features,
              and {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}{" "}
              warranty.
            </p>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              Why is {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} the
              Best Tyre in India?
            </h3>
            <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
              <li>
                {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} can
                provide traction that a tractor requires to move and operate in
                various types of fields like uneven fields and wet farms.
              </li>
              <li>
                This tractor tyre is designed to carry heavy loads without any
                hassle. Farmers can attach compatible implements with the
                tractor using this tractor tyre and use them.
              </li>
              <li>
                {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} is
                prepared using modern engineering and distributes the tractor
                weight equally. Because of this, soil compaction is low and soil
                structure is maintained.
              </li>
              <li>
                This tyre absorbs the shocks from uneven ground and provides a
                better and more comfortable ride experience.
              </li>
              <li>
                {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} is built
                with premium quality materials and can operate in rough farming
                conditions without any issues.
              </li>
              <li>
                It supports all sorts of farming tasks such as ploughing,
                seeding, mulching, and harvesting.
              </li>
            </ul>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              What is the{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} Price in
              India in 2024?
            </h3>
            <p className="mb-3">
              The {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} price
              is affordable and fully justified, seeing the features and
              benefits it offers to its users. Farmers can check the updated{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} price in
              India on TractorGyan. Here, you can learn about tractor tyre
              prices, their features, and other related information under one
              roof, saving time & effort.
            </p>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} Features &
              Specifications
            </h3>
            <p className="mb-3">
              This tractor tyre comes with a strong casing that makes it
              durable. The tread design of{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} is
              suitable for all farming and commercial-related tasks. It has a
              mud-shaker feature to keep the tyre clean during operation.{" "}
            </p>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              How to Maintain a{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`}?
            </h3>
            <p className="mb-3">
              Farmers can increase the life of a tractor tyre if they follow the
              below-mentioned tractor tyre maintenance tips.
            </p>
            <ul className="mb-3 flex list-disc flex-col gap-3 ps-4">
              <li>
                Check the tyre regularly and replace or fix it if you see any
                signs of cuts, damage, and punters.
              </li>
              <li>
                The tyre must have proper pressure so that any kind of damage is
                avoided.
              </li>
              <li>
                Never carry the load beyond the recommended limit. Overloading
                makes tyres easily damaged and increases the risk of blowouts.
              </li>
            </ul>
            <h3 className="mb-3 text-base font-semibold text-secondary">
              How can TractorGyan help you buy{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} in India?
            </h3>
            <p className="mb-3">
              TractorGyan is a leading online platform that provides information
              on tractors, implements, tyres, and more in India. It also helps
              farmers to know about updated{" "}
              {` ${tyreDetail.brand_name}  ${tyreDetail.model_name}`} prices,
              features, warranties, and specifications. This information can
              help you make a wise decision and get an ideal tractor tyre on an
              affordable budget.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="lg:mt-[159px]">
      <div className="container relative">
        <TittleAndCrumbs
          title="Second Hand Swaraj 744 XT"
          breadcrumbs={[
            { label: "Home", href: "/", title: "Home" },
            {
              label: "Second Hand Tractor",
              href: "/second-hand-tractor",
              title: "Second Hand Tractor",
            },
            {
              label: "Barddhaman West Bengal",
              href: "/second-hand-tractor",
              title: "Barddhaman West Bengal",
            },
            {
              label: "Swaraj Tractor",
              href: "/second-hand-tractor",
              title: "Swaraj Tractor",
            },
            {
              label:  "744 XT",
              href: "/second-hand-tractor",
              title: "744 XT",
              isCurrent: true,
            },
          ]}
        />
        
        <DetailsClientInteractions
          tyreId={tyreId}
          tyreDetail={tyreDetail}
          translation={translation}
          currentLang={currentLang}
          isMobile={isMobile}
          features={features}
          aboutSectionSlot={aboutSectionSlot} // Pass the server-rendered "About" section
        />
      </div>
    </section>
  );
};

export default DetailsAndFeatures;
