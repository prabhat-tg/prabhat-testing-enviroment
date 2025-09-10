'use client';

import { useState } from 'react';
import Image from 'next/image';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';

const upcomingSlides = [
  {
    image:
      'https://images.tractorgyan.com/uploads/120249/6884a7bbbc34b-upcoming-events-background.webp',
    title: 'New Year Tractor Bonanza Is Live Now!',
    description:
      'We are committed to providing our customers with exceptional service.',
  },
  {
    image:
      'https://images.tractorgyan.com/uploads/120249/6884a7bbbc34b-upcoming-events-background.webp',
    title: 'Rainy Season Offers!',
    description:
      'Get ready for the rainy season with exclusive offers on farming tools and tractors.',
  },
  {
    image:
      'https://images.tractorgyan.com/uploads/120249/6884a7bbbc34b-upcoming-events-background.webp',
    title: 'Pre-Monsoon Event Specials',
    description:
      'Exclusive discounts on selected equipment to prep your farm before monsoon.',
  },
];

const OffersEventsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? upcomingSlides.length - 1 : prev - 1
    );
  const goToNext = () =>
    setCurrentIndex((prev) =>
      prev === upcomingSlides.length - 1 ? 0 : prev + 1
    );

  return (
    <section >
      <div className="container ">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Offers Block */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-main p-6">
           

            <TittleAndCrumbs
                               title={"Offers and Events"}
                             />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {[1, 2].map((_, i) => (
    <div
      key={i}
      className="w-72  bg-white rounded-xl overflow-hidden border border-gray-lightest shadow-sm mx-auto"
    >
      {/* Image section */}
      <div className="relative w-full h-56">
        <Image
          src="https://images.tractorgyan.com/uploads/120248/6884a7a25cf28-offers-and-events-banner.webp"
          alt="Tractor Offer"
          fill
          className="object-cover"
        />
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-darkBlack mb-1 leading-[100%]">
            Year end sale is live on Sonalika tractors for XT1234 and QW120. Book your today!
          </h3>
          <p className="text-sm text-black/80 font-normal mb-2 font-Roboto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
          <div className=" text-center bg-blue-lightBlue rounded mb-2 ">
            <span className='text-black/60 text-[11px] font-normal'>

            Offer valid from 10 Aug 2024 till 24 Aug 2024
            </span>
          </div>
        </div>
        {/* <button className="bg-[#46AA48] text-white text-xs font-medium py-1 rounded w-full">
          View Details
        </button> */}
        <TG_Button className="!rounded-lg">
             View Details
        </TG_Button>
        
      </div>
    </div>
  ))}
</div>


            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center items-center gap-3">
              <button
                className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sliderIcon"
                aria-label="Previous"
              >
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === 0
                        ? "bg-primary scale-125 border border-primary"
                            : "bg-white border border-gray-light"
                    }`}
                  ></span>
                ))}
              </div>

              <button
                className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sliderIcon"
                aria-label="Next"
              >
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Upcoming Events Slider */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-main p-6">
            {/* <h2 className="text-xl font-bold text-[#0F172A] border-b-4 border-[#00522E] inline-block mb-6">
              
            </h2> */}

             <TittleAndCrumbs
                               title={"Upcoming Events"}
                             />

            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={upcomingSlides[currentIndex].image}
                alt={upcomingSlides[currentIndex].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    {upcomingSlides[currentIndex].title}
                  </h3>
                  <p className="text-sm mb-5">
                    {upcomingSlides[currentIndex].description}
                  </p>
                  <button className="bg-white text-[#050B20] font-semibold text-sm px-5 py-2 rounded hover:bg-gray-100 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-center items-center gap-3">
              <button
                onClick={goToPrev}
                className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sliderIcon"
                aria-label="Previous"
              >
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex gap-2">
                {upcomingSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      currentIndex === index
                       ? "bg-primary scale-125 border border-primary"
                            : "bg-white border border-gray-light"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sliderIcon"
                aria-label="Next"
              >
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersEventsSection;
