import Image from "next/image";
import Link from "next/link";
import React from "react";
// import '../../i18n'
// import { useTranslation } from "react-i18next";
const CommunityCard = ({
  linkUrl,
  imgUrl,
  title,
  followers,
  text,
  followersText,
  translation,
}) => {
  // const { t, i18n } = useTranslation();
  // const currentLang = i18n.language;
  // const langPrefix = currentLang === "hi" ? "/hi" : "";
  return (
    <Link
      href={linkUrl || "/"}
      className={` ${
        title === "Facebook" ? "w-[98%]" : "w-[48%]"
      } rounded-lg bg-white p-1 shadow-card sm:p-3 md:w-full md:min-w-[180px] md:max-w-[280px] lg:min-w-[280px] lg:max-w-[300px]`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 md:gap-2">
          <div className="w-full max-w-7 lg:max-w-10">
            <Image
              src={imgUrl}
              height={100}
              width={100}
              alt={title}
              title={title}
              className="h-auto w-auto"
            />
          </div>
          <div>
            <p className="mb-0 text-[10px] font-medium leading-3">
              {translation?.community[text]}
            </p>
            <p
              className={`${
                title === "Facebook" ? "text-xl" : "text-xs sm:text-base"
              } text-nowrap font-bold text-black md:text-lg md:leading-7 lg:text-xl`}
            >
              {translation?.community[title]}
            </p>
          </div>
        </div>
        <div className="w-full max-w-[54px] border-s-[1px] border-gray-light text-center lg:max-w-[90px]">
          <span className="text-sm font-bold lg:text-lg">{followers}</span>
          <p className=":leading-4 text-[10px] font-medium text-black md:text-xs">
            {translation?.community[followersText]}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
