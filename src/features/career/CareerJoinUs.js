import Image from 'next/image';

const CareerJoinUs = ({ isMobile }) => {
  return (
    <>
      {isMobile ? (
        <div className="relative mt-4 h-[435px] w-full rounded-3xl bg-black">
          <div className="p-4">
            <div className="absolute left-1/2 top-4 w-[90%] -translate-x-1/2 transform">
              <Image
                src={`https://images.tractorgyan.com/uploads/120092/687f76c321a99-image-76.webp`}
                height={275}
                width={640}
                title="frame"
                alt="frame"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="absolute bottom-12 left-[5%] top-[25%] w-[90%] text-white">
              <p className="mb-0 text-sm">JOIN US IN OUR MOVEMENT</p>
              <h2 className="mb-2 text-2xl font-bold">{`#BuldingForBharat`}</h2>
              <p className="text-sm font-light leading-6">
                At TractorGyan, we're on a mission to empower rural India with technology,
                innovation, and knowledge. Our #BuildForBharat movement is about creating impactful
                solutions that uplift farmers and drive real change in the agri-sector. If you're
                passionate about building for the heart of India, this is your calling. Come be part
                of something bigger—where your work truly matters.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mt-12 h-[380px] w-full rounded-3xl bg-black">
          <div className="p-4">
            <div className="absolute right-[3%] top-10">
              <div className="">
                <Image
                  src={`https://images.tractorgyan.com/uploads/120092/687f76c321a99-image-76.webp`}
                  height={275}
                  width={640}
                  title="frame"
                  alt="frame"
                  className="rounded-2xl md:h-[300px] md:max-h-[300px] md:max-w-[290px] md:object-cover lg:h-[300px] lg:max-h-[300px] lg:max-w-[390px] lg:object-cover xl:h-[300px] xl:max-h-[300px] xl:w-[588px] xl:max-w-[588px] xl:object-[unset]"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform md:hidden lg:block">
                <Image
                  src="https://images.tractorgyan.com/uploads/115211/66e80b3c6d9ea-TractorGyan-logo.webp"
                  height={69}
                  width={275}
                  title="frame"
                  alt="frame"
                  className=""
                />
              </div>
            </div>
            <div className="bottom-12 w-[50%] ps-[2%] pt-[2%] text-white">
              <p className="mb-4 text-sm">JOIN US IN OUR MOVEMENT</p>
              <h2 className="mb-4 text-4xl font-bold">{`#BuldingForBharat`}</h2>
              <p className="font-light leading-7 md:text-sm lg:text-base">
                At TractorGyan, we're on a mission to empower rural India with technology,
                innovation, and knowledge. Our #BuildForBharat movement is about creating impactful
                solutions that uplift farmers and drive real change in the agri-sector. If you're
                passionate about building for the heart of India, this is your calling. Come be part
                of something bigger—where your work truly matters.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CareerJoinUs;
