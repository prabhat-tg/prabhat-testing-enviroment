import { getSocialMediaSubsCount } from "@/src/services/social/SubscriberCounts";
import { modifiedSubsCount } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const YoutubeSubscribeButton = async ({ translation }) => {
  const response = await getSocialMediaSubsCount();
  const youtubeCount = response.youtube_count;

  return (
    <div className="flex w-fit gap-3 rounded-3xl bg-red-subBg p-1 max-md:mx-auto">
      <div className="flex cursor-pointer items-center justify-center gap-2">
        <Link
          target="_blank"
          title={translation?.footer?.VisitTractorsGyanYouTubechannel}
          aria-label={
            translation?.footer?.VisittheofficialYouTubechannelofTractorsGyan
          }
          href="https://www.youtube.com/@TractorGyan"
          className="rounded-full bg-red-subscribe px-4 py-1 text-sm text-white"
        >
          <span>{translation?.social?.subscribe}</span>
        </Link>
        <Image
          src="https://images.tractorgyan.com/uploads/119244/6835a9d8d41db-Bell-icon_small.webp"
          height={30}
          width={30}
          alt={translation?.social?.bellIconAlt}
          title={translation?.social?.bellIconTitle}
          className="h-7 w-7"
        />
      </div>
      <div className="flex flex-col border-s-[1px] border-gray-main px-5">
        <span className="text-base font-bold leading-4 text-black">
          {modifiedSubsCount(youtubeCount)} +
        </span>
        <span className="text-[10px] font-medium">
          {translation?.social?.onYoutubePrefix}
          <span className="text-primary">{translation?.social?.gyan}</span>{" "}
          {translation?.social?.onYoutubeSuffix}
        </span>
      </div>
    </div>
  );
};

export default YoutubeSubscribeButton;
