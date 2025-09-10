import React from "react";
import { tg_getTittleFromNestedKey } from "@/src/utils";
import TyreContentToggle from "@/src/features/tyre/tyre-price/TyreContentToggle";

const ListingHeroSection = ({
  currentLang,
  translation,
  priceList,
  topContent,
  deviceType,
  headingKey,
  headingTitle,
  category,
  brandName = "",
}) => {
  // Ensure currentLang is correct
  const langPrefix = currentLang === "hi" ? "/hi" : "";
  if (!headingTitle)
    headingTitle = tg_getTittleFromNestedKey(translation, headingKey);

  // Prepare content and image URL on server side
  let content = "";
  if (topContent) {
    content = topContent.ad_content;
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
    <div className="mt-6 relative">
      <div className="flex h-full w-full flex-col gap-8 lg:flex-row">
        <div className="h-full w-full rounded-2xl p-4 text-sm font-normal text-gray-dark shadow-main lg:max-w-[700px] xl:max-w-[900px]">
          {/* SEO: Render all content for crawlers */}
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
            <TyreContentToggle deviceType={deviceType} />
          </div>
        </div>

        <div className="h-auto w-full rounded-lg shadow-main lg:max-w-[Calc(100%_-_700px)] xl:max-w-[Calc(100%_-_778px)]">
          <div className="h-full overflow-hidden rounded-b-lg">
            <div className="flex w-full items-center justify-center gap-2 rounded-t-lg bg-green-mid p-2 text-base font-semibold text-secondary shadow-main md:cursor-auto md:text-lg">
              <h3>
                {langPrefix == "/hi"
                  ? `भारत में लोकप्रिय ${brandName} टायर प्राइस लिस्ट ${getCurrentYear()}`
                  : `Popular ${brandName} ${category} Price List ${getCurrentYear()} in India`}{" "}
              </h3>
            </div>
            {/* Always render price list table for SEO */}
            <div className="custom-scroller max-h-[150px] overflow-y-scroll rounded-b-lg">
              <table className="w-full bg-white p-2 shadow-main">
                <thead>
                  <tr className="flex gap-2 border-b-[1px] border-gray-light px-2 py-2.5 md:gap-4">
                    <td className="w-[45%] text-center">
                      <span className="text-sm font-bold text-black">
                        {translation.headings.tractorTyreModel}
                      </span>
                    </td>
                    {priceList?.some(item => item?.size) && (
                      <td className="w-[20%] text-center">
                        <span className="text-sm font-bold text-black">
                          {translation.headings.tyreSize}
                        </span>
                      </td>
                    )}

                    {priceList?.some(item => item?.implement_power) && (
                      <td className="w-[20%] text-center">
                        <span className="text-sm font-bold text-black">
                          {translation.headings.implementPower}
                        </span>
                      </td>
                    )}

                    {/* {priceList?.some(item => item?.size) && (
                      <td className="w-[20%] text-center">
                        <span className="text-sm font-bold text-black">
                          {translation.headings.tyreSize}
                        </span>
                      </td>
                    )} */}

                    <td className="w-[35%] text-center">
                      <span className="text-sm font-bold text-black">
                        {translation.headings.tyrePrice}
                      </span>
                    </td>
                  </tr>
                </thead>
                <tbody className="">
                  {priceList?.map((item, index) => (
                    <tr
                      key={index}
                      className="flex gap-2 border-b-[1px] border-gray-light px-2 py-2.5 md:gap-4"
                    >
                      <td className="w-[45%] text-center">
                        <span className="text-xs font-normal text-gray-dark">
                          {currentLang === "en" ? item.brand_name : item.brand_name_hi + " " + item.modal_name}
                        </span>
                      </td>
                      {item?.size && (<td className="w-[20%] text-center">
                        <span className="text-sm font-medium text-black">
                          {item.size}
                        </span>
                      </td>)}

                      {item?.implement_power && (<td className="w-[20%] text-center">
                        <span className="text-sm font-medium text-black">
                          {item.implement_power}
                        </span>
                      </td>)}

                      <td className="w-[35%] text-center">
                        <span className="text-sm font-medium text-black">
                          Rs. {item.tyre_price}*
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="flex justify-center gap-4 border-b-[1px] border-gray-light px-2 py-2.5">
                    <td colSpan={3}>
                      <span className="mx-auto text-xs font-medium text-gray-dark">
                        <span>
                          {translation.headings.dataLastUpdatedOn}:{" "}
                          {currentDate}{" "}
                        </span>
                        <br />
                        <span>
                          {translation.headings.priceMayVaryFromStateToState}
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHeroSection;
