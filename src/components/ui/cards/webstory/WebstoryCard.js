import Image from "next/image";
import Link from "next/link";
import React from "react";

const WebstoryCard = ({ data, translation }) => {
  return (
    <div className="relative min-h-[580px] rounded-2xl border border-gray-light p-3">
      <div className="relative mb-2.5 h-full max-h-[413px] w-full overflow-hidden rounded-2xl bg-gray-lighter md:h-[420px] md:max-h-[420px]">
        <div className="absolute left-2 top-2">
          {/* <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={`https://images.tractorgyan.com/uploads/${data?.image}`}
                height={100}
                width={100}
                alt="user avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-white">
              <h6 className="text-sm font-semibold">Name</h6>
              <span className="text-xs">Sponsored</span>
            </div>
          </div> */}
        </div>
        <Link
          href={data?.full_url}
          title={data?.title}
          aria-label={data?.title}
          target="_blank"
        >
          <Image
            src={`https://images.tractorgyan.com/uploads/${data?.image}`}
            height={100}
            width={100}
            alt={data?.title}
            title={data?.title}
            className="h-full w-full"
          />
        </Link>
      </div>
      <div className="mb-3.5">
        <span className="font-medium text-gray-dark">{data?.publish_date}</span>
        <Link
          href={data?.full_url}
          title={data?.title}
          aria-label={data?.title}
          target="_blank"
        >
          <p className="line-clamp-2 overflow-hidden text-ellipsis pt-1.5 text-lg font-medium text-black hover:underline">
            {data?.title}
          </p>
        </Link>
      </div>
      <div className="absolute bottom-3 right-3 flex justify-end">
        {/* <Link
          href={`https://tractorgyan.com${data?.full_url}`}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-dark rounded-full border border-gray-lighter px-3 py-2"
        >
          <span>View Story</span>
          <Image
            src="https://images.tractorgyan.com/uploads/119737/685a8b0fd06e2-read-more-rounded_small.webp"
            height={25}
            width={25}
            alt="arrow icon"
            className="w-4 h-4"
          />
        </Link> */}
        <Link
          href={data?.full_url}
          title={data?.title}
          aria-label={data?.title}
          target="_blank"
          className="flex items-center gap-1.5 rounded-full border border-gray-lighter px-3 py-2 text-sm font-medium text-gray-dark"
        >
          <span>{translation?.buttons.ViewStory}</span>
          <Image
            src="https://images.tractorgyan.com/uploads/119737/685a8b0fd06e2-read-more-rounded_small.webp"
            height={50}
            width={50}
            alt="arrow icon"
            className="h-4 w-4"
          />
        </Link>
        {/* <Link
          href={`/amp-pets-story/pets-completed.html`}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-dark rounded-full border border-gray-lighter px-3 py-2"
        >
          <span>View Story</span>
          <Image
            src="https://images.tractorgyan.com/uploads/119737/685a8b0fd06e2-read-more-rounded_small.webp"
            height={25}
            width={25}
            alt="arrow icon"
            className="w-4 h-4"
          />
        </Link> */}
      </div>
    </div>
  );
};

export default WebstoryCard;
