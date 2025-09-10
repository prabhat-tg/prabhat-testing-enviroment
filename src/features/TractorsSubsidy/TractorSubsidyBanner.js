import TG_Banner from "@/src/components/shared/bannners/Banner";
import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";
import React from "react";

const TractorSubsidyBanner = ({ translation }) => {
  const bannerImageDesktop =
    'https://images.tractorgyan.com/uploads/120835/1756583780TractorSubsidyBanner.webp'
  // "https://images.tractorgyan.com/uploads/120830/68b2a9514a868-tractor-subsidy-banner-(1).webp"; Old Image
  const bannerImageMobile =
    "https://images.tractorgyan.com/uploads/119958/1752495761Tractor Subsidy - Mobile.webp";
  return (
    <section className="lg:mt-[144px]">
      <div className="container relative">
        {/* <div className={isMobile ? `w-[90%] m-auto` : ``}>
        </div> */}
        <TittleAndCrumbs
          title={
            translation?.headings.tractorsSubsidyinIndia ||
            `"Tractors Subsidy in India"`
          }
          breadcrumbs={[
            {
              label: translation?.breadcrubm.tractorGyanHome || "Home",
              href: "/",
              title: translation?.breadcrubm.tractorGyanHome || "Home",
            },
            {
              label:
                translation?.breadcrubm.tractorsSubsidyinIndia ||
                "Tractors Subsidy in India",
              title:
                translation?.breadcrubm.tractorsSubsidyinIndia ||
                "Tractors Subsidy in India",
              isCurrent: true,
            },
          ]}
        />

        {/* Banner with Filter Overlay */}



        <div className="relative mb-4 h-full w-full overflow-hidden rounded-2xl shadow-bottom md:max-h-[350px] md:min-h-[175px] 2xl:max-h-[385px] 2xl:min-h-[370px]">
          {/* Banner Images */}
          <div className="hidden h-full w-full md:block relative">
            <img
              src={bannerImageDesktop}
              height={370}
              width={1260}
              alt="tractor subsidy banner"
              className="h-full w-full object-fill"
            />
            {/* <div className="absolute inset-0 flex flex-col items-center gap-3 pt-10">
              <h1 className="text-4xl font-bold">Looking for subsidy information?</h1>
              <p className="text-2xl font-medium">Choose your State to get more details</p>
            </div> */}
          </div>
          <div className="h-full max-h-[100px] w-full overflow-hidden rounded-t-2xl sm:max-h-[143px] md:hidden">
            <img
              src={bannerImageMobile}
              height={1000}
              width={1000}
              alt="tractor subsidy banner"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TractorSubsidyBanner;
