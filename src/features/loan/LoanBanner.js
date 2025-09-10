import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";
import Image from "next/image";
import React from "react";

const LoanBanner = ({ title, page, translation }) => {
  let bannerImageDesktop;
  let bannerImageMobile;
  if (page == "second-hand-tractor-loan") {
    bannerImageDesktop =
      "https://images.tractorgyan.com/uploads/119472/68418c0d405f5-Second-hand-tractor-loan.webp";
    bannerImageMobile =
      "https://images.tractorgyan.com/uploads/119661/6853b167855ef-Second-Hand-Tractor-Loan-Mob.webp";
  } else if (page === "second-hand-tractor-implement-loan") {
    bannerImageDesktop =
      "https://images.tractorgyan.com/uploads/119473/6841923f1ce51-second-hand-implement-loan.webp";
    bannerImageMobile =
      "https://images.tractorgyan.com/uploads/119660/6853b0c5bd816-Second-Hand-Implement-Loan-Mob.webp";
  } else if (page === "tractor-implement-loan") {
    bannerImageDesktop =
      "https://images.tractorgyan.com/uploads/119474/684192ae3f74b-Implemet-loan-banner.webp";
    bannerImageMobile =
      "https://images.tractorgyan.com/uploads/119659/6853b0403cbe8-Implement-Loan-Mob.webp";
  } else if (page === "tractor-emi-calculator") {
    bannerImageDesktop =
      "https://images.tractorgyan.com/uploads/119475/6841981f37356-EMI-Calc---Desktop.webp";
    bannerImageMobile =
      "https://images.tractorgyan.com/uploads/119476/68419d6f6c35c-EMI-Calc---Mobile.webp";
  } else if (page === "loan-against-tractor") {
    bannerImageDesktop =
      "https://images.tractorgyan.com/uploads/119657/6853ad90dea17-Loan-Against-Tractor.webp";
    bannerImageMobile =
      "https://images.tractorgyan.com/uploads/119658/6853af128f2b9-Loan-Against-Tractor-Mob.webp";
  } else {
    bannerImageDesktop =
      "https://images.tractorgyan.com/uploads/119312/68382da76fd3c-Tractor-Loan---Desktop.webp";
    bannerImageMobile =
      "https://images.tractorgyan.com/uploads/119719/6857e22796f57-Tractor-Loan-Mobile.webp";
  }

  return (
    <section className="max-md:pt-3">
      <div className="container relative">
        <TittleAndCrumbs
          title={title}
          breadcrumbs={[
            {
              label: `${translation?.breadcrubm.home}`,
              href: "/",
              title: "Home",
            },
            {
              label: title,
              title: title,
              isCurrent: true,
            },
          ]}
        />
        <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-bottom md:max-h-[245px] md:min-h-[175px]">
          <div className="hidden h-full w-full md:block md:min-h-[175px] 2xl:max-h-[245px] 2xl:min-h-[245px]">
            <Image
              src={bannerImageDesktop}
              height={400}
              width={1000}
              alt={`${page} image`}
              title={`${page} image`}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="h-full max-h-[241px] w-full overflow-hidden rounded-t-2xl sm:max-h-[143px] md:hidden">
            <Image
              src={bannerImageMobile}
              height={180}
              width={620}
              alt={`${page} image`}
              title={`${page} image`}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanBanner;
