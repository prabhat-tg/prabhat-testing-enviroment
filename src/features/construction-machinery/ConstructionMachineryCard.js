import React from "react";
import Image from "next/image";
import Link from "next/link";

const ConstructionMachineryCard = ({ imgUrl, text, link, label, cardBg }) => {
  return (
    <Link
      href={link || "/"}
      title={text}
      aria-label={`Learn more about ${text} in India`}
      className="flex h-[120px] w-full max-w-[30%] flex-col items-center justify-center rounded-xl border-2 border-transparent bg-white p-2 shadow-main hover:border-secondary hover:bg-green-lighter md:h-[180px] md:max-w-[180px] md:p-4 2xl:max-w-[160px]"
    >
      <div className="relative flex h-full w-full items-center justify-center md:mb-2 rounded-lg p-2 overflow-hidden">
        {/* {cardBg && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={cardBg}
              alt={`${text} background`}
              title={`${text} background`}
              fill
              sizes="(max-width: 768px) 60px, 100px"
              className="object-contain opacity-40"
            />
          </div>
        )} */}

        <div className="relative h-[95%] w-[95%] z-10">
          <Image
            src={imgUrl}
            alt={`${text} image`}
            title={`${text} image`}
            fill
            sizes="(max-width: 768px) 120px, 180px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center text-xs font-semibold text-black md:text-sm mt-2">
        {text}
      </div>
    </Link>
  );
};

export default ConstructionMachineryCard;
