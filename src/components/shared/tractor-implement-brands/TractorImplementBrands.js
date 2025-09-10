import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';

const currentLang = 'en';

const ImplementBrandCard = ({ title, imgSrc, url }) => {

  return (
    <Link
      href={url}
      title={title + " image"}
    >
      {/* TODO: Refactor Shadow and Setup Global Classes */}
      <div className="max-w-[80px] md:max-w-[100px] aspect-square mb-2 md:mb-4 p-2 flex items-center justify-center overflow-hidden rounded-full border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter">
        <Image
          src={imgSrc}
          height={72}
          width={72}
          alt={title + " image"}
          title={title + " image"}
          className="h-[72px] w-[72px] md:h-[80px] md:w-[80px] object-contain"
        />
      </div>
      <p className="text-center text-xs md:text-sm font-medium max-w-[80px] md:max-w-[100px]">
        {title}
      </p>
    </Link>
  )
}

const TractorImplementBrands = ({
  heading,
  allImplementBrands,
  itemsShown = 9,
  bgColor = 'bg-white',
  placedInFilter = false,
  showAll = false,
  prefLang,
  translation,
  parent
}) => {

  return (
    <section className={bgColor}>
      <div className={`${placedInFilter ? '!px-0' : ''} container`}>
        {heading && (
          <MainHeadings text={heading} />
        )}

        <div className={`${placedInFilter || showAll ? 'lg:flex-wrap' : 'lg:flex-nowrap'} ${showAll ? 'justify-between gap-6' : 'justify-between gap-4'} flex flex-wrap mb-6`}>
          {!parent && (showAll ? allImplementBrands : allImplementBrands?.slice(0, itemsShown))?.map((item, index) => (
            <ImplementBrandCard
              key={index}
              title={prefLang == "en" ? item.name : item?.name_hi}
              imgSrc={`https://images.tractorgyan.com/uploads/${item.image}` || ''}
              url={item.page_url || ''}
            />
          ))}

          {parent && (showAll ? allImplementBrands : allImplementBrands?.slice(0, itemsShown))?.map((item, index) => (
            <ImplementBrandCard
              key={index}
              title={item.title}
              imgSrc={`https://images.tractorgyan.com/uploads${item.imgSrc}` || ''}
              url={item.url || ''}
            />
          ))}
        </div>
        {parent != "brand-leading" && !showAll && (
          <MainButton
            text={translation.buttons.viewAllBrands}
            linkUrl={`${currentLang == "en" ? "" : currentLang}/tractor-implements-brands-in-india`}
          />
        )}
        {parent === "brand-leading" && !showAll && (
          <MainButton
            text={translation.buttons.viewAllBrands}
            linkUrl={`${currentLang == "en" ? "" : currentLang}/tractor-brands`}
          />
        )}
      </div>
    </section>
  );
};

export default TractorImplementBrands;
