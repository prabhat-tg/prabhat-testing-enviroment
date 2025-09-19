'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { tg_getUrlByLanguage } from '@/src/utils';
const LatestTractorCard = ({
  cylinder,
  hp,
  lifting_capacity,
  brand,
  model,
  imgUrl,
  pageUrl,
  langPrefix,
  isMobile,
  translation,
  power,
  width,
  warranty,
  type = 'tractor'
}) => {
  const urlPrefix = tg_getUrlByLanguage(langPrefix);
  // const fallback = '/assets/images/PlaceholderImage.png';
  const imageSrc = `https://images.tractorgyan.com/uploads${imgUrl}`;
  // const imageSrc = imgUrl ? `https://images.tractorgyan.com/uploads${imgUrl}` : fallback;
  // const [src, setSrc] = useState(imageSrc);

  const tractorSpecs = [
    {
      icon: 'https://images.tractorgyan.com/uploads/120013/687a3908d589e-horse-power-icon.webp',
      label: translation?.headerNavbar?.hp || 'HP',
      value: hp,
    },
    {
      icon: 'https://images.tractorgyan.com/uploads/120014/687a3a6b9e833-cylinder-icon.webp',
      label: translation?.headerNavbar?.cylinder || 'Cylinder',
      value: cylinder,
    },
    {
      icon: 'https://images.tractorgyan.com/uploads/120015/687a3bb3e1d81-capacity-jcb-icon.webp',
      label: translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity',
      value: lifting_capacity,
    },
  ];

  const implementSpecs = [
    {
      icon: 'https://images.tractorgyan.com/uploads/120378/1754151320latest-implement-power-icon.webp',
      label: translation?.headerNavbar?.power || 'Power',
      value: power,
    },
    {
      icon: 'https://images.tractorgyan.com/uploads/120380/1754151353latest-implement-width-icon.webp',
      label: translation?.headerNavbar?.widthMm || 'Width(mm)',
      value: width,
    },
    {
      icon: 'https://images.tractorgyan.com/uploads/120379/1754151340latest-implement-warranty-icon.webp',
      label: translation?.headerNavbar?.warranty || 'Warranty',
      value: warranty,
    },
  ];

  return (
    <div className="col-span-4 md:col-span-2 xl:col-span-1">
      <div className="shadow-lg max-w-sm rounded-2xl bg-[#0B1A2E] p-4 text-white"
        style={{
          backgroundImage: "url('/assets/images/Latest_Tractor_Background.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        {/* Logo and Title */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold leading-snug min-h-[50px]">
            {brand} {model}
          </h3>
          <div className='bg-white rounded px-2'>
            <img
              src="https://images.tractorgyan.com/uploads/109731/653b884aa08ce-MASSEY-09_small.webp"
              alt="Brand Logo"
              className="h-8 w-8"
            />
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-2 -ml-1">
          <Link href={pageUrl}>
            <button className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-black">
              {translation?.headerNavbar?.viewDetails || 'View Details'}
              <Image
                src={'https://images.tractorgyan.com/uploads/117424/678657747b293-Arrow-Vector.webp'}
                height={50}
                width={50}
                alt="arrow-icon"
                title="arrow-icon"
                className="h-2.5 w-2.5"
              />
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src={imageSrc}
              // onError={() => setSrc(fallback)}
              height={200}
              width={200}
              alt="latest-image"
              title="latest-image"
              className="mx-auto w-[200px]"
            />
            {/* Optional glowing base effect */}
            {/* <div className="bg-cyan-500 absolute bottom-0 left-1/2 h-3 w-36 -translate-x-1/2 transform opacity-70 blur-xl"></div> */}
          </div>
        </div>

        {/* Specs */}
        <div className="mt-5 flex justify-between gap-2 text-black">
          {(type === 'tractor' ? tractorSpecs : implementSpecs).map((spec, index) => (
            <div
              key={index}
              className="flex w-full flex-1 flex-col items-center rounded-lg bg-white p-1 text-center"
            >
              <div className="mx-auto h-5 w-full min-w-4 max-w-8 flex justify-center">
                <img
                  src={spec.icon}
                  alt={`${spec.label}-icon`}
                  title={`${spec.label}-icon`}
                  className="h-full w-auto"
                />
              </div>
              <p className="text-nowrap text-xs font-bold">{spec.label}</p>
              <p className="text-sm overflow-hidden text-nowrap text-ellipsis max-w-[90px] md:max-w-[120px]">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestTractorCard;
