import React from "react";
import { tg_getTittleFromNestedKey } from "@/src/utils";
import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";
import PriceListSection from "@/src/components/shared/price-list/PriceListSection";
import Image from "next/image";
import TG_Banner from "@/src/components/shared/bannners/Banner";
import TyreContentToggle from "../../tyre/tyre-price/TyreContentToggle";

const SecondHandTopSection = ({
  currentLang,
  translation,
  priceList,
  topContent,
  deviceType,
  headingKey,
  headingTitle,
  brandName = "",
  isMobile,
}) => {
  // Ensure currentLang is correct
  const langPrefix = currentLang === "hi" ? "/hi" : "";
  if (!headingTitle)
    headingTitle = tg_getTittleFromNestedKey(translation, headingKey);

  // Prepare content and image URL on server side
  let content = '';

  if (topContent) {
    content = topContent.ad_content || '';
  }

  const currentDate = new Date()
    .toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
      day: "numeric",
    })
    .replace(/,/g, "");

  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <section className="pt-3.5 pb-0 lg:mt-40">
      <div className="container  ">
        <TittleAndCrumbs
          title={isMobile ? "" : headingTitle}
          breadcrumbs={[
            { label: "Home", href: "/", title: "Home" },
            {
              label: translation.secondHandTractors.tractorBrand,
              href: "/second-hand-tractor",
              title: translation.secondHandTractors.tractorBrand,
            },
            {
              label: translation.secondHandTractors.secondHandTractors,
              href: "/second-hand-tractor",
              title: translation.secondHandTractors.secondHandTractors,
              isCurrent: true,
            },
          ]}
        />

        {/* TODO:: Promotion Banner */}
        {/* <TG_Banner imgUrl={topContent?.full_ad_image} /> */}
        {topContent.full_ad_image && (
          <div
            className="rounded-xl overflow-hidden mb-6 border border-gray-light shadow-main"
            dangerouslySetInnerHTML={{ __html: topContent.full_ad_image }}
          />
        )}

        {!isMobile && (
          <>
            <div className="gap-8 flex flex-col lg:flex-row h-full w-full">
              <div className="relative w-full h-[40vh] rounded-2xl overflow-hidden shadow-main">
                {/* Background Image */}
                <Image
                  src="https://images.tractorgyan.com/uploads/119983/68774212445b4-Second-Hand-Home-Desktop-Banner.webp"
                  alt="Second Hand Tractor Enquiry Banner"
                  fill
                  priority
                  className="object-fill"
                />

                {/* Overlay Content - Bottom Right with Padding */}
                <div className="absolute inset-0 flex items-end justify-end px-4 sm:px-6 pb-6">
                  <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-4 sm:p-6 text-gray-dark text-base leading-6">
                    {/* Rendered HTML Content */}
                    {/* <div
                      id="read-more"
                      className="tyre-top-content read-more"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                    <TyreContentToggle deviceType={deviceType} /> */}

                    <div id="tyre-top-content" className="relative">
                      <div
                        className="pointer-events-none absolute inset-0 z-10"
                        aria-hidden="true"
                        style={{ display: "none" }}
                      />
                      <div
                        className="tyre-top-content text-base leading-6"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                      {/* Client-side expand/collapse overlay */}
                      <TyreContentToggle deviceType={deviceType} maxHeight="max-h-24" />
                    </div>

                  </div>
                </div>
              </div>

              <PriceListSection
                langPrefix={langPrefix}
                brandName={brandName}
                currentYear={getCurrentYear()}
                translation={translation}
                priceList={priceList}
                currentDate={currentDate}
                isMobile={isMobile}
                headings={translation.secondHandTractors.priceListHeadings}
              />
            </div>
          </>
        )}
      </div>
      {isMobile && (
        <div className="w-full h-[180px] shadow-main relative mb-44 ">
          {/* Image with Increased Height */}
          <div className="w-full h-full">
            <Image
              src="https://images.tractorgyan.com/uploads/119983/68774212445b4-Second-Hand-Home-Desktop-Banner.webp"
              alt="Second Hand Tractor Enquiry Banner"
              fill
              priority
              className="w-full h-full object-fill"
            />
          </div>

          {/* Content Below the Image */}
          <div className="absolute top-24">
            <div className="mx-4 h-full bg-white rounded-3xl  shadow-card p-4  text-gray-dark  ">
              <TittleAndCrumbs title={headingTitle} />
              <div id="tyre-top-content" className="relative">
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />
                <div
                  className="tyre-top-content text-base leading-6"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                {/* Client-side expand/collapse overlay */}
                <TyreContentToggle deviceType={deviceType} maxHeight="max-h-24" />
              </div>

              {/* <div
                id="read-more"
                className="read-more"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <ReadMoreToggle
                selector="#read-more .read-more"
                collapsedLabel={translation.buttons.readMore}
                expandedLabel={translation.buttons.readLess}
              /> */}
            </div>
          </div>
          <div className="bg-section-gray h-44">

          </div>
        </div>
      )}
      {isMobile && (
        <div className="px-4 pb-5 bg-section-gray">
          <PriceListSection
            langPrefix={langPrefix}
            brandName={brandName}
            currentYear={getCurrentYear()}
            translation={translation}
            priceList={priceList}
            currentDate={currentDate}
            isMobile={isMobile}
            headings={translation.secondHandTractors.priceListHeadings}
          />
        </div>
      )}
    </section>
  );
};

export default SecondHandTopSection;
