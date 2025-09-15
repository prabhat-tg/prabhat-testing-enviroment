import Image from 'next/image';
import React from 'react';

const VisionSection = ({ isMobile }) => {
  return (
    <>
      {isMobile ? (
        <>
          <section className="relative mt-16 h-[30rem] w-full px-4 md:h-[24rem] md:px-20">
            {/* Background Image */}
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.tractorgyan.com/uploads/120077/687f60c005960-vision-mobile-bg.webp"
                alt="Vision Background"
                fill
                priority
                className="object-fill"
                title="Vision Background"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-start justify-start pl-4 pt-20">
                <div className="w-full space-y-4 pt-16 text-left text-black">
                  <h2 className="text-xl font-bold md:text-2xl">Our Vision</h2>
                  <p className="text-base font-normal">
                    To empower Indian Farmers with the Right information
                  </p>

                  <h2 className="text-xl font-bold md:text-2xl">Our Mission</h2>
                  <div className="flex flex-wrap items-center gap-2 text-base">
                    <p className="font-normal text-black">
                      Making Tractor Gyan – One-stop Digital Marketplace for Farmers.
                    </p>
                    <p className="font-semibold text-black">
                      #HelpingIndiaMechanise #buildingForBharat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="relative h-[24rem] w-full px-6 md:h-[24rem] md:px-20">
            {/* Background Image */}
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.tractorgyan.com/uploads/120070/687f3a3d4baef-vision-bg.webp"
                alt="Vision Background"
                fill
                priority
                className="object-fill"
                title="Vision Background"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-start justify-center pl-64 pt-5">
                <div className="w-full space-y-4 pt-16 text-left text-black">
                  <h2 className="text-2xl font-bold md:text-2xl">Our Vision</h2>
                  <p className="text-base font-normal">
                    To empower Indian Farmers with the Right information
                  </p>

                  <h2 className="text-2xl font-bold md:text-2xl">Our Mission</h2>
                  <div className="flex flex-wrap items-center gap-2 text-base">
                    <p className="font-normal text-black">
                      Making Tractor Gyan – One-stop Digital Marketplace for Farmers.
                    </p>
                    <p className="font-semibold text-black">
                      #HelpingIndiaMechanise #buildingForBharat
                    </p>
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

export default VisionSection;
