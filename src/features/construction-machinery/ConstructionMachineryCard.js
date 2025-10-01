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

        {/* larger, fixed pixel box (responsive) so Next/Image can serve correct size */}
        <div className=" h-[120px] w-[120px] md:h-[160px] md:w-[160px] lg:h-[240px] lg:w-[240px] ">
          <Image
            src={imgUrl}
            alt={`${text} image`}
            title={`${text} image`}
            fill
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
