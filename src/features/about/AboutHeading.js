"use client";
import Image from "next/image";
import React from "react";

const AboutHeading = ({
  isMobile,
}) => {
  return (
    <>
      {isMobile ? (<>
        <section className="relative h-96 md:h-[28rem] w-full -mt-12">
          {/* Banner Image */}
          <div className="w-full h-full">

            <Image
              src="https://images.tractorgyan.com/uploads/120068/687f21551246b-hero-banner-mobile-image.webp"
              alt="About Us Banner"
              fill
              priority
              className="w-full h-full object-fill"
            />
          </div>

          {/* Overlay with Centered Content */}
          <div className="absolute inset-0 bg-black/50 flex items-start justify-center pt-28 ">

            <div className="text-center text-white space-y-2 max-w-4xl mx-auto">

              <h2 className="text-2xl  lg:text-4xl mx-auto font-bold leading-snug max-w-3xl px-2">
                Tractor Gyan is India’s leading platform for tractor and farm equipment information,
                dedicated to empowering Indian farmers.
              </h2>

              {/* Three Column Section */}
              <div className="grid grid-cols-1  max-w-4xl mx-auto  text-left p-4">
                <div className="bg-white rounded-lg shadow-main ">

                  {/* Card 1 */}
                  <div className=" p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src="https://images.tractorgyan.com/uploads/120055/687e213195fb7-page-view.webp"
                        alt="page view"
                        title="Page View"
                        width={44}
                        height={44}
                        className="w-auto h-full max-h-[44px]"
                      />
                      <div>
                        <span className="mb-1 font-bold text-2xl text-black">
                          27.8<span className="text-primary">Cr+</span>
                        </span>
                        <p className="font-medium text-xs text-black">Yearly Page Views 2024</p>
                      </div>
                    </div>

                    {/* Custom width border-bottom */}
                    <div className="mt-4 h-px w-full mx-auto bg-green-lightest" />
                  </div>

                  {/* Card 2 */}
                  <div className="px-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src="https://images.tractorgyan.com/uploads/120261/68871110e2fec-noun-search-icon.webp"
                        alt="Impressions on Google"
                        title="Impressions on Google"
                        width={44}
                        height={44}
                        className="w-auto h-full max-h-[44px]"
                      />
                      <div className="ml-2">
                        <span className="mb-1 font-bold text-2xl text-black">
                          269<span className="text-primary">Cr+</span>
                        </span>
                        <p className="font-medium text-xs text-black">Yearly Impressions on Google 2024</p>
                      </div>
                    </div>
                    {/* Custom width border-bottom */}
                    <div className="mt-4 h-px w-full mx-auto bg-green-lightest" />
                  </div>
                  {/* Card 3 */}
                  <div className="p-4">

                    <div className="flex items-center gap-5">
                      <Image
                        src="https://images.tractorgyan.com/uploads/120262/688711434862e-noun-sales-icon.webp"
                        alt="leads generation"
                        title="leads generation"
                        width={44}
                        height={44}
                        className="w-auto h-full max-h-[44px]"
                      />
                      <div>
                        <span className="mb-1 font-bold text-2xl text-black">
                          2.35<span className="text-primary">L+</span>
                        </span>
                        <p className="font-medium text-xs text-black">Yearly Leads Generated 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      ) : (
        <>
          <section className="relative h-96 md:h-[24rem] w-full lg:mt-[159px]">
            {/* Banner Image */}
            <Image
              src="https://images.tractorgyan.com/uploads/120058/687e261e658b7-about-us-banner.webp"
              alt="About Us Banner"
              fill
              className="object-cover object-center"
              priority
              title="About Us Banner"
            />
            {/* Overlay with Centered Content */}
            <div className="absolute inset-0 bg-black/50 flex items-start justify-center md:pt-28">
              <div className="text-center text-white space-y-4  max-w-4xl mx-auto">
                <h2 className="text-2xl  lg:text-4xl mx-auto mt-16 font-bold leading-snug max-w-3xl">
                  Tractor Gyan is India’s leading platform for tractor and farm equipment information,
                  dedicated to empowering Indian farmers.
                </h2>
                {/* Three Column Section */}
                <div className="grid grid-cols-1 md:grid-cols-3  max-w-4xl mx-auto bg-white text-center shadow-main rounded-md">
                  {/* Card 1 */}
                  <div className="p-6 rounded-xl border-r md:border-r ">
                    <div className="border-r md:border-r border-green-lightest">
                      <div className="mb-2 flex justify-center">
                        <div className=" h-[34px]">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120055/687e213195fb7-page-view.webp"
                            alt="page view"
                            title="Page View"
                            width={34}
                            height={34}
                            className="w-auto h-full "
                          />
                        </div>
                      </div>

                      <span className="mb-1 font-bold text-2xl text-black">
                        27.8<span className="text-primary">Cr+</span>
                      </span>
                      <p className="font-medium text-xs text-black">Yearly Page Views 2024</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-xl border-r md:border-r ">
                    <div className="border-r md:border-r pr-6 border-green-lightest">
                      <div className="mb-2 flex justify-center">
                        <div className=" h-[34px]">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120261/68871110e2fec-noun-search-icon.webp"
                            alt="page view"
                            title="Page View"
                            width={34}
                            height={34}
                            className="w-auto h-full "
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="mb-1 font-bold text-2xl text-black">
                          269<span className="text-primary">Cr+</span>
                        </span>
                        <p className="font-medium text-xs text-black">Yearly Impressions on Google 2024</p>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="p-6 rounded-xl">
                    <div className="mb-2 flex justify-center">
                      <div className=" h-[34px]">
                        <Image
                          src="https://images.tractorgyan.com/uploads/120262/688711434862e-noun-sales-icon.webp"
                          alt="page view"
                          title="Page View"
                          width={34}
                          height={34}
                          className="w-auto h-full "
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="mb-1 font-bold text-2xl text-black">
                        2.35<span className="text-primary">L+</span>
                      </span>
                      <p className="font-medium text-xs text-black">Yearly Leads Generated 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>


  );
};

export default AboutHeading;
