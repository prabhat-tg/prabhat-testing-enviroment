"use client"
import React, { useState } from 'react'
import Image from "next/image";
import MainButton from '../tyreComponents/commonComponents/buttons/MainButton';
import SocialMediaFollowBar from './SocialMediaFollowBar';
import TG_Button from '@/src/components/ui/buttons/MainButtons';

const slides = [
  "https://images.tractorgyan.com/uploads/120229/688357be21e52-dealer-people-image.webp",
  "https://images.tractorgyan.com/uploads/120229/688357be21e52-dealer-people-image.webp",
  "https://images.tractorgyan.com/uploads/120229/688357be21e52-dealer-people-image.webp",
];







const DealershipTopSection = ({ isMobile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <>
      <section className='bg-green-lighter md:mt-32 '>
        <div className="container">
          <div className="relative">
            <div className=" mx-auto px-4 md:mt-7 flex flex-col lg:flex-row gap-6">

              <div className="w-full lg:w-1/2 relative flex flex-col items-center">
                {/* Image Slider Container */}
                <div className="relative rounded-lg overflow-hidden w-full max-w-full h-auto">

                  {/* 🔽 Navigation + Dots at Bottom over Image */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex justify-center items-center gap-4  rounded-full px-3 py-1 shadow-md">
                    {/* Previous Arrow */}
                    <button
                      onClick={goToPrev}
                      className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                      aria-label="Previous"
                    >
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                            ? "bg-primary scale-125 border border-primary"
                            : "bg-white border border-gray-light"
                            }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Next Arrow */}
                    <button
                      onClick={goToNext}
                      className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                      aria-label="Next"
                    >
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Image */}
                  <Image
                    src={slides[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    width={682}
                    height={682}
                    className="rounded-[8px] object-cover w-full h-auto "
                  />

                </div>

              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 space-y-4 mt-2 ">
                <div className="flex items-center gap-4">
                  <Image
                    src="https://images.tractorgyan.com/uploads/120230/688357d0aec29-logo-name-image.webp"
                    alt="Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[60px] sm:w-[80px] md:w-[120px] h-auto rounded"
                  />
                  <div>
                    <h2 className="font-inter font-bold text-[18px] sm:text-[24px] md:text-3xl leading-[100%] text-black pb-1">
                      Welcome to Shree Ji Motors
                    </h2>
                    <p className="font-inter font-medium text-[12px] sm:text-[14px] md:text-xs leading-[100%] text-[#848484]">
                      Mahindra tractors dealership in Gwalior
                    </p>
                  </div>
                </div>



                {/* Info Grid */}


                {isMobile ? (
                  <>
                    <div className="flex flex-col lg:flex-row w-full text-sm text-black">

                      {/* Right Column */}
                      <div className="w-full lg:w-1/2 pl-0 lg:pl-6 space-y-4 pt-4 lg:pt-0">
                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120234/688358294c528-green-geo-location-icon.webp"
                            alt="Navigation"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-[500] text-sm sm:text-base leading-[100%]">
                            Gwalior, Madhya Pradesh
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120235/6883585050752-green-location-icon.webp"
                            alt="Location"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <div className="flex flex-col space-y-[2px]">
                            <span className="font-inter font-[500] text-sm sm:text-base leading-[140%]">
                              1/2, Opposite To Hotel Management
                            </span>
                            <span className="font-inter font-[500] text-sm sm:text-base leading-[140%]">
                              College, Airport Road, Gwalior (MP)
                            </span>
                            <span className="font-inter font-[500] text-sm sm:text-base leading-[140%]">
                              400100
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Left Column with Border */}
                      <div className="w-full lg:w-1/2 pr-0 sm:pr-6 border-b lg:border-b-0 lg:border-r border-darkBlack/20 space-y-3 pb-4 mt-3 lg:pb-0">
                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120231/688357e326c18-green-times-icon.webp"
                            alt="Timer"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-medium text-sm sm:text-base leading-[100%]">
                            9:30AM–7PM (Mon–Sat)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120232/688357f73ee32-green-mail-icon.webp"
                            alt="Email"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-medium text-sm sm:text-base leading-[100%]">
                            shreejimotorsgwalior@gmail.com
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120233/688358122b545-green-phone-icon.webp"
                            alt="Phone"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-[500] text-sm sm:text-base leading-[100%]">
                            +91-94XXXXXX67
                          </span>
                        </div>
                        <TG_Button
                          className="w-40 h-11 !rounded-full "
                        >
                          Call Now
                        </TG_Button>

                      </div>


                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col lg:flex-row w-full text-sm text-black">
                      {/* Left Column with Border */}
                      <div className="w-full lg:w-1/2 pr-0 sm:pr-6 border-b lg:border-b-0 lg:border-r border-darkBlack/20 space-y-4 pb-4 lg:pb-0">
                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120231/688357e326c18-green-times-icon.webp"
                            alt="Timer"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-medium text-sm sm:text-base leading-[100%]">
                            9:30AM–7PM (Mon–Sat)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120232/688357f73ee32-green-mail-icon.webp"
                            alt="Email"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-medium text-sm sm:text-base leading-[100%]">
                            shreejimotorsgwalior@gmail.com
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120233/688358122b545-green-phone-icon.webp"
                            alt="Phone"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-[500] text-sm sm:text-base leading-[100%]">
                            +91-94XXXXXX67
                          </span>
                        </div>
                        <TG_Button
                          className="w-40 h-11 !rounded-full "
                        >
                          Call Now
                        </TG_Button>

                      </div>

                      {/* Right Column */}
                      <div className="w-full lg:w-1/2 pl-0 lg:pl-6 space-y-4 pt-4 lg:pt-0">
                        <div className="flex items-center gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120234/688358294c528-green-geo-location-icon.webp"
                            alt="Navigation"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <span className="font-[500] text-sm sm:text-base leading-[100%]">
                            Gwalior, Madhya Pradesh
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120235/6883585050752-green-location-icon.webp"
                            alt="Location"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                          />
                          <div className="flex flex-col space-y-[2px]">
                            <span className="font-inter font-[500] text-sm sm:text-base leading-[140%]">
                              1/2, Opposite To Hotel Management
                            </span>
                            <span className="font-inter font-[500] text-sm sm:text-base leading-[140%]">
                              College, Airport Road, Gwalior (MP)
                            </span>
                            <span className="font-inter font-[500] text-sm sm:text-base leading-[140%]">
                              400100
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}



              </div>
            </div>
            <div className=" sm:px-0  rounded-lg ">
              <SocialMediaFollowBar isMobile={isMobile} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealershipTopSection;
