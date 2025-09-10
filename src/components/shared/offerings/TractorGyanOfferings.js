import OfferingsCard from '@/src/components/ui/offringsAndQuickLinkCards/OfferingsCard';
import offeringsData from '@/src/data/tyreOfferingsData.json';
import { getSelectedLanguage } from '@/src/services/locale';
import React from 'react';

const TractorGyanOfferings = async ({ translation }) => {
  const currentLang = await getSelectedLanguage();
  return (
    <section>
      <div className="container">
        <h4 className="border-b-3 mb-8 inline-block border-secondary pb-2 text-xl font-bold leading-7 md:text-2xl">
          {translation.tractorgyanOfferings.tractorGyanOfferings}
        </h4>
        <div className="flex flex-wrap items-center justify-around gap-3 sm:justify-center md:gap-4 xl:justify-around 2xl:justify-center 2xl:gap-6">
          {offeringsData?.map((item, index) => (
            <OfferingsCard
              key={index}
              label={item.label}
              text={translation.tractorgyanOfferings[item.label]}
              imgUrl={item.imgUrl}
              link={`${currentLang == 'hi' ? '/hi' : ''}` + item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TractorGyanOfferings;
