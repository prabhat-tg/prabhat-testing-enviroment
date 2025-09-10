// import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";
import MainButton from "@/src/features/tyreComponents/commonComponents/buttons/MainButton";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import BrandCards from "@/src/features/tyreComponents/components/tractorsByBrands/BrandCards";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBrands = ({ heading, allTractorBrands, translation, langPrefix }) => {
  return (
    <div className="">
      <MainHeadings text={translation.headings.topTractorBrands} />
      <div className="mb-8 grid grid-cols-3 gap-2 md:gap-2">
        {allTractorBrands?.slice(0, 9).map((item, index) => (
          <>
            <Link
              key={index}
              href={`/${item.url}`}
              aria-label={langPrefix == "hi" ? item.name_hi : item.name}
              title={langPrefix == "hi" ? item.name_hi : item.name}
              className="col-span-1"
            >
              <div className="mb-2 flex h-[65px] items-center justify-center rounded-xl border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter md:mb-4">
                <Image
                  src={item.image}
                  height={300}
                  width={300}
                  alt={langPrefix == "hi" ? item.name_hi : item.name + " image"}
                  title={
                    langPrefix == "hi" ? item.name_hi : item.name + " image"
                  }
                  className="h-auto min-w-[40px] max-w-[70px]"
                />
              </div>
              <p className="mb-2 text-center text-xs font-semibold md:text-xs">
                {langPrefix == "hi" ? item.name_hi : item.name}
              </p>
            </Link>
          </>
        ))}
      </div>
      <MainButton
        text={"view all"}
        linkUrl={`${langPrefix === "hi" ? "/hi" : ""}/tractor-brands`}
      />
    </div>
  );
};

export default TopBrands;
