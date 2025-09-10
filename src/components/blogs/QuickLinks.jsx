"use client";
import OfferingsCard from "@/src/components/ui/offringsAndQuickLinkCards/OfferingsCard";
import offeringsData from "@/src/data/tyreOfferingsData.json";
import React from "react";
import { useTranslation } from "react-i18next";
import OffringCard from "../shared/offerings/OffringCard";
// import '../../i18n'

const QuickLinks = ({ translation }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const langPrefix = currentLang === "hi" ? "/hi" : "";
  return (
    <section className="rounded-[16px] bg-green-lighter p-4 md:p-5">
      <h4 className="border-b-3 mb-8 inline-block border-secondary pb-2 text-xl font-bold leading-7 md:text-2xl">
        Quick Links
      </h4>
      <div className="flex flex-wrap items-center justify-around gap-3 sm:justify-center md:gap-3 xl:justify-around 2xl:justify-center 2xl:gap-6">
        {offeringsData?.slice(0, 6)?.map((item, index) => (
          <div className="h-[110px] w-full max-w-[30%] md:h-[150px] md:max-w-[125px] 2xl:max-w-[143px]">
            <OffringCard
              key={index}
              text={translation?.tractorgyanOfferings[item.label]}
              imgUrl={item.imgUrl}
              link={item.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
