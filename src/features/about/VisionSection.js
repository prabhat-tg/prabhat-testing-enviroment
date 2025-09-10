import Image from "next/image";
import React from "react";

const VisionSection = ({ isMobile }) => {
  return (
    <>
      {isMobile ? (
        <>
          <section className="relative w-full h-[28rem] md:h-[24rem] mt-48 px-6 md:px-20">
            {/* Background Image */}
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <Image
                src="https://images.tractorgyan.com/uploads/120077/687f60c005960-vision-mobile-bg.webp"
                alt="Vision Background"
                fill
                priority
                className="object-fill"
                title="Vision Background"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-start pt-20 pl-4 justify-start">
                <div className="w-full pt-16 text-black text-left space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Our Vision
                  </h2>
                  <p className="text-base font-normal">
                    To Empower Indian Farmers with Right information
                  </p>

                  <h2 className="text-xl md:text-2xl font-bold">
                    Our Mission
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-base">
                    <p className="font-normal text-black">
                      Making Tractor Gyan – One stop Digital Marketplace for Farmers.
                    </p>
                    <p className="font-semibold text-black">
                      #HelpingIndiaMechanise
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="relative w-full h-[24rem] md:h-[24rem] mt-20 px-6 md:px-20">
            {/* Background Image */}
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <Image
                src="https://images.tractorgyan.com/uploads/120070/687f3a3d4baef-vision-bg.webp"
                alt="Vision Background"
                fill
                priority
                className="object-fill"
                title="Vision Background"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-start pt-5 pl-80 justify-center">
                <div className="w-full pt-16 text-black text-left space-y-4">
                  <h2 className="text-2xl md:text-2xl font-bold">
                    Our Vision
                  </h2>
                  <p className="text-base font-normal">
                    To Empower Indian Farmers with Right information
                  </p>

                  <h2 className="text-2xl md:text-2xl font-bold">
                    Our Mission
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-base">
                    <p className="font-normal text-black">
                      Making Tractor Gyan – One stop Digital Marketplace for Farmers.
                    </p>
                    <p className="font-semibold text-black">
                      #HelpingIndiaMechanise
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
