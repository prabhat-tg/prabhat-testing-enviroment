'use client';
import Image from 'next/image';
import React from 'react';

const AboutHeading = ({ isMobile }) => {
  return (
    <>
      {isMobile ? (
        <>
          <section className="relative -mt-12 h-96 w-full md:h-[28rem]">
            {/* Banner Image */}
            <div className="h-full w-full">
              <Image
                src="https://images.tractorgyan.com/uploads/120068/687f21551246b-hero-banner-mobile-image.webp"
                alt="About Us Banner"
                fill
                priority
                className="h-full w-full object-fill"
              />
            </div>

            {/* Overlay with Centered Content */}
            <div className="absolute inset-0 flex items-start justify-center bg-black/50 pt-28">
              <div className="mx-auto max-w-4xl space-y-2 text-center text-white">
                <h2 className="mx-auto max-w-3xl px-2 text-2xl font-bold leading-snug lg:text-4xl">
                  India’s most impactful Agri-tech voice
                </h2>

                {/* Three Column Section */}
                <div className="mx-auto grid max-w-4xl grid-cols-1 p-4 text-left">
                  <div className="rounded-lg bg-white shadow-main">
                    {/* Card 1 */}
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src="https://images.tractorgyan.com/uploads/120055/687e213195fb7-page-view.webp"
                          alt="page view"
                          title="Page View"
                          width={44}
                          height={44}
                          className="h-full max-h-[44px] w-auto"
                        />
                        <div>
                          <span className="mb-1 text-2xl font-bold text-black">
                            2.78<span className="text-primary">Cr+</span>
                          </span>
                          <p className="text-xs font-medium text-black"> Yearly Page Views</p>
                        </div>
                      </div>

                      {/* Custom width border-bottom */}
                      <div className="mx-auto mt-4 h-px w-full bg-green-lightest" />
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
                          className="h-full max-h-[44px] w-auto"
                        />
                        <div className="ml-2">
                          <span className="mb-1 text-2xl font-bold text-black">
                            26.9<span className="text-primary">Cr+</span>
                          </span>
                          <p className="text-xs font-medium text-black">
                            Yearly Impressions on Google
                          </p>
                        </div>
                      </div>
                      {/* Custom width border-bottom */}
                      <div className="mx-auto mt-4 h-px w-full bg-green-lightest" />
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
                          className="h-full max-h-[44px] w-auto"
                        />
                        <div>
                          <span className="mb-1 text-2xl font-bold text-black">
                            2.35<span className="text-primary">L+</span>
                          </span>
                          <p className="text-xs font-medium text-black"> Yearly Leads Generated</p>
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
          <section className="relative h-96 w-full md:h-[24rem] lg:mt-[159px]">
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
            <div className="absolute inset-0 flex items-start justify-center bg-black/50 md:pt-28">
              <div className="mx-auto max-w-4xl space-y-4 text-center text-white">
                <h2 className="mx-auto mt-16 max-w-3xl text-2xl font-bold leading-snug lg:text-4xl">
                  India’s most impactful Agri-tech voice
                </h2>
                {/* Three Column Section */}
                <div className="mx-auto grid max-w-4xl grid-cols-1 rounded-md bg-white text-center shadow-main md:grid-cols-3">
                  {/* Card 1 */}
                  <div className="rounded-xl border-r p-6 md:border-r">
                    <div className="border-r border-green-lightest md:border-r">
                      <div className="mb-2 flex justify-center">
                        <div className="h-[34px]">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120055/687e213195fb7-page-view.webp"
                            alt="page view"
                            title="Page View"
                            width={34}
                            height={34}
                            className="h-full w-auto"
                          />
                        </div>
                      </div>

                      <span className="mb-1 text-2xl font-bold text-black">
                        2.78<span className="text-primary">Cr+</span>
                      </span>
                      <p className="text-xs font-medium text-black"> Yearly Page Views</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-xl border-r p-6 md:border-r">
                    <div className="border-r border-green-lightest pr-6 md:border-r">
                      <div className="mb-2 flex justify-center">
                        <div className="h-[34px]">
                          <Image
                            src="https://images.tractorgyan.com/uploads/120261/68871110e2fec-noun-search-icon.webp"
                            alt="page view"
                            title="Page View"
                            width={34}
                            height={34}
                            className="h-full w-auto"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="mb-1 text-2xl font-bold text-black">
                          26.9<span className="text-primary">Cr+</span>
                        </span>
                        <p className="text-xs font-medium text-black">
                          Yearly Impressions on Google
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="rounded-xl p-6">
                    <div className="mb-2 flex justify-center">
                      <div className="h-[34px]">
                        <Image
                          src="https://images.tractorgyan.com/uploads/120262/688711434862e-noun-sales-icon.webp"
                          alt="page view"
                          title="Page View"
                          width={34}
                          height={34}
                          className="h-full w-auto"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="mb-1 text-2xl font-bold text-black">
                        2.35<span className="text-primary">L+</span>
                      </span>
                      <p className="text-xs font-medium text-black"> Yearly Leads Generated</p>
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
