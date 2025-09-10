import Image from 'next/image';

const CareerStayUpdated = ({ isMobile }) => {
  return (
    <>
      <div className="pt-8">
        <div className="container">
          <div className="relative">
            {isMobile ? (
              <div>
                <Image
                  src={`https://images.tractorgyan.com/uploads/120173/6880cff92571c-Frame-1000006124-(1).webp`}
                  width={1184}
                  height={188}
                  title="Stay updated with TractorGyan"
                  alt="Stay updated with TractorGyan"
                  className="relative"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h2 className="mb-3 text-base font-bold leading-tight text-white lg:mb-4">
                    Stay updated with TractorGyan
                  </h2>
                  <a
                    href="https://www.linkedin.com/company/tractorgyan"
                    target="_"
                    title="Follow Tractor Gyan on LinkedIn"
                    aria-label="Follow Tractor Gyan on LinkedIn"
                  >
                    <button className='flex gap-2 bg-blue-linkedInBlue px-4 py-2 rounded-lg'>
                      <Image src={"https://images.tractorgyan.com/uploads/120831/68b2bc9a5a6ab-Layer-2.webp"} width={20} height={20} title="Follow us on LinkedIn"
                        alt="Follow us on LinkedIn"
                        className="max-h-[33px] max-w-[33px]" />
                      <span className='whitespace-nowrap text-white font-semibold'>Follow us on LinkedIn</span>
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <Image
                  src={`https://images.tractorgyan.com/uploads/120172/6880cfdd1f23d-Frame-1000006124.webp`}
                  width={1184}
                  height={188}
                  title="Stay updated with TractorGyan"
                  alt="Stay updated with TractorGyan"
                  className="relative"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h2 className="mb-3 text-xl font-bold leading-tight text-white md:text-3xl lg:mb-4">
                    Stay updated with TractorGyan
                  </h2>
                  <a
                    href="https://www.linkedin.com/company/tractorgyan"
                    target="_"
                    title="Follow Tractor Gyan on LinkedIn"
                    aria-label="Follow Tractor Gyan on LinkedIn"
                    className="max-h-[45px] min-h-[45px] min-w-[300px] max-w-[300px]"
                  >
                    <button className='flex gap-2 bg-blue-linkedInBlue px-4 py-2 rounded-lg items-center'>
                      <Image src={"https://images.tractorgyan.com/uploads/120831/68b2bc9a5a6ab-Layer-2.webp"} width={17} height={18} title="Follow us on LinkedIn"
                        alt="Follow us on LinkedIn"
                        className="h-[18px] w-[17px]" />
                      <span className='whitespace-nowrap text-white font-semibold'>Follow us on LinkedIn</span>
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CareerStayUpdated;
