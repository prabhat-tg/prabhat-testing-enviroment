'use client';
import Link from 'next/link';
import Image from 'next/image';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import { useState } from 'react';

const OfferCardContainer = () => {
  const [isIntrested, setIsIntrested] = useState(false);

  const handleIntrested = () => {
    setIsIntrested(!isIntrested);
  };

  return (
    <>
      <div className="mb-6 grid justify-between gap-6 md:flex">
        <div className="shadow-sm hover:shadow-md relative rounded-2xl border border-gray-light transition-all">
          <div className="flex flex-col gap-1">
            <div
              onClick={handleIntrested}
              className="mb-2 h-52 w-full overflow-hidden rounded-[10px] lg:h-52 2xl:h-52"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/120279/6888589e19598-best-swaraj-xt-series-tractor-models.webp"
                alt="Best Swaraj XT Series Tractor Models"
                title="Best Swaraj XT Series Tractor Models"
                width={452}
                height={240}
                className="h-full w-full rounded-[10px] object-fill"
                loading="lazy"
              />
            </div>
            <h3
              onClick={handleIntrested}
              className="line-clamp-2 cursor-pointer px-4 text-base font-semibold text-black hover:underline md:h-[60px] md:text-lg"
            >
              Year end sale is live on Sonalika tractors for XT1234 and QW120. Book your today!
            </h3>
            <div className="mb-2 me-4 ms-4 grid justify-center rounded-md bg-[#9BD39D30] p-2">
              <p className="text-black">Offer available in Madhya Pradesh, Maharashtra</p>
            </div>
            <div className="mb-2 line-clamp-3 overflow-hidden px-4 text-sm text-gray-main">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="mb-2 me-4 ms-4 flex justify-between">
              <button className="flex items-center gap-2 rounded-2xl bg-[#EA3E26] px-4 py-1 text-white">
                <Image
                  src={`https://images.tractorgyan.com/uploads/120307/6889d0b71e19e-clock_icon.webp`}
                  width={8}
                  height={8}
                  title="Limited Time Offer icon"
                  alt="Limited Time Offer icon"
                  className="h-4 w-4"
                />
                <span>Limited Time Offer</span>
              </button>
              <p className="text-sm text-gray-main">24 Aug 2024</p>
            </div>
            <TG_Button className="mb-4 me-4 ms-4">I’m interested! Tell me more</TG_Button>
          </div>
        </div>
        <div className="shadow-sm hover:shadow-md relative rounded-2xl border border-gray-light transition-all">
          <div className="flex flex-col gap-1">
            <div className="mb-2 h-52 w-full overflow-hidden rounded-[10px] lg:h-52 2xl:h-52">
              <Link href={`blogUrl`} title={`title`} aria-label={`title`}>
                <Image
                  src="https://images.tractorgyan.com/uploads/120279/6888589e19598-best-swaraj-xt-series-tractor-models.webp"
                  alt="Best Swaraj XT Series Tractor Models"
                  title="Best Swaraj XT Series Tractor Models"
                  width={452}
                  height={240}
                  className="h-full w-full rounded-[10px] object-fill"
                  loading="lazy"
                />
              </Link>
            </div>
            <h3 className="line-clamp-2 cursor-pointer px-4 text-base font-semibold text-black hover:underline md:h-[60px] md:text-lg">
              <Link href={`blogUrl`} title={`title`} aria-label={`title`}>
                Year end sale is live on Sonalika tractors for XT1234 and QW120. Book your today!
              </Link>
            </h3>
            <div className="mb-2 me-4 ms-4 grid justify-center rounded-md bg-[#9BD39D30] p-2">
              <p className="text-black">Offer available in Madhya Pradesh, Maharashtra</p>
            </div>
            <div className="mb-2 line-clamp-3 overflow-hidden px-4 text-sm text-gray-main">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="mb-2 me-4 ms-4 flex justify-between">
              <button className="flex items-center gap-2 rounded-2xl bg-[#EA3E26] px-4 py-1 text-white">
                <Image
                  src={`https://images.tractorgyan.com/uploads/120307/6889d0b71e19e-clock_icon.webp`}
                  width={8}
                  height={8}
                  title="Limited Time Offer icon"
                  alt="Limited Time Offer icon"
                  className="h-4 w-4"
                />
                <span>Limited Time Offer</span>
              </button>
              <p className="text-sm text-gray-main">24 Aug 2024</p>
            </div>
            <TG_Button className="mb-4 me-4 ms-4">I’m interested! Tell me more</TG_Button>
          </div>
        </div>
      </div>

      <div className="mb-6 grid justify-between gap-6 md:flex">
        <div className="shadow-sm hover:shadow-md relative rounded-2xl border border-gray-light transition-all">
          <div className="flex flex-col gap-1">
            <div
              onClick={handleIntrested}
              className="mb-2 h-52 w-full overflow-hidden rounded-[10px] lg:h-52 2xl:h-52"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/120279/6888589e19598-best-swaraj-xt-series-tractor-models.webp"
                alt="Best Swaraj XT Series Tractor Models"
                title="Best Swaraj XT Series Tractor Models"
                width={452}
                height={240}
                className="h-full w-full rounded-[10px] object-fill"
                loading="lazy"
              />
            </div>
            <h3
              onClick={handleIntrested}
              className="line-clamp-2 cursor-pointer px-4 text-base font-semibold text-black hover:underline md:h-[60px] md:text-lg"
            >
              Year end sale is live on Sonalika tractors for XT1234 and QW120. Book your today!
            </h3>
            <div className="mb-2 me-4 ms-4 grid justify-center rounded-md bg-[#9BD39D30] p-2">
              <p className="text-black">Offer available in Madhya Pradesh, Maharashtra</p>
            </div>
            <div className="mb-2 line-clamp-3 overflow-hidden px-4 text-sm text-gray-main">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="mb-2 me-4 ms-4 flex justify-between">
              <button className="flex items-center gap-2 rounded-2xl bg-[#EA3E26] px-4 py-1 text-white">
                <Image
                  src={`https://images.tractorgyan.com/uploads/120307/6889d0b71e19e-clock_icon.webp`}
                  width={8}
                  height={8}
                  title="Limited Time Offer icon"
                  alt="Limited Time Offer icon"
                  className="h-4 w-4"
                />
                <span>Limited Time Offer</span>
              </button>
              <p className="text-sm text-gray-main">24 Aug 2024</p>
            </div>
            <TG_Button className="mb-4 me-4 ms-4">I’m interested! Tell me more</TG_Button>
          </div>
        </div>
        <div className="shadow-sm hover:shadow-md relative rounded-2xl border border-gray-light transition-all">
          <div className="flex flex-col gap-1">
            <div className="mb-2 h-52 w-full overflow-hidden rounded-[10px] lg:h-52 2xl:h-52">
              <Link href={`blogUrl`} title={`title`} aria-label={`title`}>
                <Image
                  src="https://images.tractorgyan.com/uploads/120279/6888589e19598-best-swaraj-xt-series-tractor-models.webp"
                  alt="Best Swaraj XT Series Tractor Models"
                  title="Best Swaraj XT Series Tractor Models"
                  width={452}
                  height={240}
                  className="h-full w-full rounded-[10px] object-fill"
                  loading="lazy"
                />
              </Link>
            </div>
            <h3 className="line-clamp-2 cursor-pointer px-4 text-base font-semibold text-black hover:underline md:h-[60px] md:text-lg">
              <Link href={`blogUrl`} title={`title`} aria-label={`title`}>
                Year end sale is live on Sonalika tractors for XT1234 and QW120. Book your today!
              </Link>
            </h3>
            <div className="mb-2 me-4 ms-4 grid justify-center rounded-md bg-[#9BD39D30] p-2">
              <p className="text-black">Offer available in Madhya Pradesh, Maharashtra</p>
            </div>
            <div className="mb-2 line-clamp-3 overflow-hidden px-4 text-sm text-gray-main">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="mb-2 me-4 ms-4 flex justify-between">
              <button className="flex items-center gap-2 rounded-2xl bg-[#EA3E26] px-4 py-1 text-white">
                <Image
                  src={`https://images.tractorgyan.com/uploads/120307/6889d0b71e19e-clock_icon.webp`}
                  width={8}
                  height={8}
                  title="Limited Time Offer icon"
                  alt="Limited Time Offer icon"
                  className="h-4 w-4"
                />
                <span>Limited Time Offer</span>
              </button>
              <p className="text-sm text-gray-main">24 Aug 2024</p>
            </div>
            <TG_Button className="mb-4 me-4 ms-4">I’m interested! Tell me more</TG_Button>
          </div>
        </div>
      </div>

      {isIntrested && (
        <>
          <div className="animate-fadeOverlay fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="shadow-sm hover:shadow-md relative mx-auto w-[90%] rounded-2xl border border-gray-light transition-all lg:w-[800px]">
              <div className="rounded-2xl bg-white lg:flex">
                <div className="mb-2 h-[350px] w-full overflow-hidden rounded-2xl md:w-[350px] lg:h-[388px] 2xl:h-[388px]">
                  <Link href={`blogUrl`} title={`title`} aria-label={`title`}>
                    <Image
                      src="https://images.tractorgyan.com/uploads/120405/689080ff1c5dd-ride-it-off-banner.webp"
                      alt="Ride It Off Banner"
                      title="Ride It Off Banner"
                      width={452}
                      height={240}
                      className="h-full w-full rounded-[10px] object-fill"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className="pb-1 lg:w-[55%] lg:p-4">
                  <h3 className="line-clamp-2 w-full cursor-pointer px-4 text-base font-semibold text-black hover:underline md:h-[60px] md:text-lg">
                    <Link href={`blogUrl`} title={`title`} aria-label={`title`}>
                      Year end sale is live on Sonalika tractors for XT1234 and QW120. Book your
                      today!
                    </Link>
                  </h3>
                  <div className="mb-3 me-4 ms-4 mt-2 grid justify-center rounded-md bg-[#9BD39D30] p-1 md:p-2">
                    <p className="md:text-md text-sm text-black">
                      Offer available in Madhya Pradesh
                    </p>
                  </div>
                  <div className="mb-3 line-clamp-3 overflow-hidden px-4 text-sm text-gray-main">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna.
                    </p>
                  </div>
                  <div className="mb-4 me-4 ms-4 flex justify-between">
                    <button className="md:text-md flex items-center gap-2 rounded-2xl bg-[#EA3E26] px-4 py-1 text-xs text-white">
                      <Image
                        src={`https://images.tractorgyan.com/uploads/120307/6889d0b71e19e-clock_icon.webp`}
                        width={8}
                        height={8}
                        title="Limited Time Offer icon"
                        alt="Limited Time Offer icon"
                        className="h-4 w-4"
                      />
                      <span>Limited Time Offer</span>
                    </button>
                    <p className="text-xs text-gray-main md:text-sm">24 Aug 2024</p>
                  </div>
                </div>
                <button
                  onClick={handleIntrested}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-secondary bg-white text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OfferCardContainer;
