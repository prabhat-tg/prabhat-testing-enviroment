// "use client";
import BrandCards from "@/src/features/tyreComponents/components/tractorsByBrands/BrandCards";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import React from "react";
import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";
// import { useTranslation } from "react-i18next";

const DesktopTractorsByBrands = ({
  heading,
  allTractorBrands,
  translation,
  langPrefix,
  isMiniTractorPage = false,
}) => {
  return (
    <section className="">
      <div className="container">
        {heading ? (
          <MainHeadings text={heading} />
        ) : (
          <MainHeadings text={translation.headings.tractorsbyBrands} />
        )}

        <div className="flex flex-wrap mb-6 -mx-1.5 md:-mx-2">
          {allTractorBrands?.slice(0, 9).map((item, index) => (
            <div key={index} className="basis-1/3 px-1.5 md:px-2">
              <BrandCards
                imgUrl={item.image}
                name={langPrefix === "hi" ? item.name_hi : item.name}
                url={(langPrefix === "hi" ? "/hi" : "") + (isMiniTractorPage ? item.url.replaceAll("/tractor", "/mini-tractor-in-india") : item.url)}
              />
            </div>
          ))}
        </div>

        <MainButton
          text={translation.buttons.viewAllBrands}
          linkUrl={`${langPrefix === "en" ? "" : "/hi"}/tractor-brands`}
        />
      </div>
    </section>
  );
};

export default DesktopTractorsByBrands;
