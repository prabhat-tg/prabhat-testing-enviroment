'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import TG_Button from '../../buttons/MainButtons';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import TG_LinkButton from '../../buttons/TgLinkButton';
import Slider from 'react-slick';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const SecondHandMiniTractorCards = ({
  langPrefix = '',
  data = [],
  isMobile = false,
  heading,
  buttonText,
  showEmi = true,
  bgColor = 'bg-white',
  translation,
  currentLang,
  buttonRedirectUrl
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  const itemsLength = data?.length || 0; // Use actual data length
  let slidesToShow = 4; // Default for desktop

  // Determine slides to show based on window width
  if (windowWidth <= 440) slidesToShow = 1.2;
  else if (windowWidth <= 600) slidesToShow = 1.5;
  else if (windowWidth <= 768) slidesToShow = 1.8;
  else if (windowWidth <= 970) slidesToShow = 2.2;
  else if (windowWidth <= 1150) slidesToShow = 3.1;
  else if (windowWidth <= 1280) slidesToShow = 3.5;
  else slidesToShow = 4;

  // Calculate total dots needed based on actual items and slides to show
  let totalDots = 0;
  if (itemsLength > Math.ceil(slidesToShow)) {
    totalDots = Math.ceil(itemsLength - slidesToShow) + 1;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const settings = {
    dots: totalDots > 0 ? true : false,
    centerMode: true,
    className: "center",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: totalDots > 0 ? true : false,
    centerPadding: "32px",
    infinite: false,
    afterChange: index => {
      console.log('index=>', index);
      console.log('index=>', Math.ceil(index));
    },
  };

  // Use dynamic data or fallback to empty array
  const tractors = data || [];

  const TractorCard = (tractor, showEmi, buttonType = 'fill') => {
    // Transform API data to component format
    const tractorName =
      `${tractor.manufacture || tractor.manufacture_en || ''} ${tractor.model || ''}`.trim();
    const tractorImage = tractor.show_image
      ? `https://images.tractorgyan.com/uploads/${tractor.show_image}`
      : 'https://images.tractorgyan.com/uploads/120269/68876242d4937-buy-used-tractor.webp';
    const location = `${tractor.tahsil || ''}, ${tractor.state || ''}`.replace(/^, |, $/, '');
    const formattedPrice = tractor.price
      ? `₹ ${parseInt(tractor.price).toLocaleString('en-IN')}`
      : translation?.secondHandTractors?.priceOnRequest || 'Price on request';

    const tractorUrl = (currentLang == 'hi' ? '/hi/' : '') + tractor.page_url;

    return (
      <Link href={tractorUrl} className="block h-full">
        <div className="boxShadow-main hover:shadow-xl hover:bg-green-lighter relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-bottom transition-shadow transition-transform hover:scale-[1.02]">
          <div className="absolute left-0 top-5 w-[200px]">
            <div className="shadow-md absolute -left-12 -top-1 z-10 h-[43px] w-[180px] rotate-[-45deg] bg-gradient-to-r from-[#015401] via-[#46AA48] to-[#015401] py-3 text-center text-sm font-bold text-white">
              {translation?.secondHandTractors?.forSell || 'For Sell'}
            </div>
          </div>

          <div className="mb-4 flex h-full flex-col justify-between">
            <div className="relative h-52 w-full">
              <Image src={tractorImage} alt={tractorName} fill className="object-cover" />
            </div>

            <div className="px-3 pt-2">
              {/* Location */}
              <div className="flex items-center gap-1 text-[14px] font-medium text-[#4CAF50]">
                <Image
                  src="https://images.tractorgyan.com/uploads/120270/688762588d9aa-blue-location-icon.webp"
                  height={50}
                  width={50}
                  alt="share-icon"
                  title="share-icon"
                  className="-ml-1 h-4 w-4 object-contain md:h-5 md:w-5"
                />
                <span className="text-gray-dark">{location}</span>
              </div>
            </div>
            <span className="font-roboto mb-1 line-clamp-2 min-h-[50px] px-3 pt-2 text-[18px] font-bold text-black">
              {tractorName}
            </span>

            <div className="mx-auto flex w-full justify-between pb-2 text-center text-[#182C3D] md:py-2">
              <div className="flex w-[50%] flex-col items-center gap-[2px] px-4">
                <div className="text-xs text-[#595959]">
                  {translation?.secondHandTractors?.year || 'Year'}
                </div>
                <div className="text-md font-semibold">
                  {tractor.year_of_purchase || translation?.secondHandTractors?.na || 'NA'}
                </div>
              </div>
              <div className="flex w-[50%] flex-col items-center gap-[2px] border-l border-[#46AA48] px-4">
                <div className="text-xs text-[#595959]">
                  {translation?.secondHandTractors?.price || 'Price'}
                </div>
                <div className="text-md font-semibold">{formattedPrice}</div>
              </div>
            </div>

            <div className="mt-2 flex w-full justify-end px-3">
              {buttonType === 'FILL' ? (
                <div
                  onClick={(e) => e.preventDefault()}
                  className="w-full"
                >
                  <TG_LinkButton
                    href={tractorUrl}
                    icon={tgi_arrow_right_white}
                    iconPosition="right"
                    className="mt-2 w-full"
                  >
                    {translation?.secondHandTractors?.viewTractorDetails || 'View Tractor Details'}
                  </TG_LinkButton>
                </div>
              ) : (
                <div onClick={(e) => e.preventDefault()}>
                  <TG_LinkButton
                    iconSrc="https://images.tractorgyan.com/uploads/117424/678657747b293-Arrow-Vector.webp"
                    iconPosition="right"
                    className="!mt-0 w-auto !py-1"
                    iconClass="w-3"
                    href={tractorUrl}
                  >
                    {translation?.secondHandTractors?.viewDetails || 'View Details'}
                  </TG_LinkButton>
                </div>
              )}
            </div>

            {showEmi && (
              <div className="mt-2 flex w-full flex-col items-center">
                <label className="text-sm text-green-lightest">
                  {translation?.secondHandTractors?.emiStarts || 'EMI Starts'}: ₹ 19,251*
                </label>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const MobileSlider = ({ items, showEmi }) => (
    <>
      <Slider ref={sliderRef} {...settings} className="custom-slider h-full py-2 -ml-8">
        {items.map((item, index) => (
          <div key={item.id || index} className="w-full px-2 pb-2">
            {TractorCard(item, showEmi)}
          </div>
        ))}
      </Slider>
    </>
  );

  return (
    <>
      <section className={bgColor}>
        <div className="container">
          <div className="my-3 flex items-center justify-between">
            <div>
              <MainHeadings marginBottom={'mb-2 md:mb-8'} text={heading} />
            </div>
            {!isMobile && (
              <Link
                href={(currentLang == 'hi' ? '/hi' : '') + '/sell-old-tractor'}
                className="hidden md:block"
              >
                <TG_Button>
                  {translation?.secondHandTractors?.sellYourTractor || 'Sell Your Tractor'}
                </TG_Button>
              </Link>
            )}
          </div>

          {tractors.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                {translation?.secondHandTractors?.noTractorsAvailable ||
                  'No second-hand tractors available at the moment.'}
              </p>
            </div>
          ) : (
            <>
              {!isMobile && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {tractors.map(tractor => (
                    <div key={tractor.id}>{TractorCard(tractor, showEmi)}</div>
                  ))}
                </div>
              )}

              {isMobile && (
                <div className={`updates-section ${totalDots > 0 ? 'mb-12' : '-mb-2'}`}>
                  <MobileSlider items={tractors} showEmi={showEmi} />
                </div>
              )}
            </>
          )}

          {buttonText && tractors.length > 0 && (
            <div className="mt-8 flex justify-center">
              <MainButton
                text={buttonText}
                linkUrl={buttonRedirectUrl ? buttonRedirectUrl : (currentLang == 'hi' ? '/hi' : '') + '/second-hand-tractor'}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SecondHandMiniTractorCards;