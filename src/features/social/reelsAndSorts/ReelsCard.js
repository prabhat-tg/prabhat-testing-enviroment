"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const ReelsCard = ({ data, detailPage }) => {
  return (
    <div
      className={`relative rounded-2xl border border-gray-light pb-[15px] pe-4 ps-4 pt-3 ${
        detailPage ? `min-h-[220px]` : ``
      }`}
    >
      <Link href={data?.full_url} title={data?.title} aria-label={data?.title}>
        <div
          // onClick={handleNavigate}
          className={`${
            detailPage
              ? "mb-1 md:max-h-[220px] lg:max-h-[220px]"
              : "mb-2.5 max-h-[500px] w-full md:max-h-[400px]"
          } relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-lighter`}
        >
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
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-center">
            <Image
              src="https://images.tractorgyan.com/uploads/119240/6834ccff0851e-youtubeButtonIcon_small.webp"
              height={100}
              width={100}
              alt="youtube button image"
              title="youtube button image"
              className="h-7 w-11"
            />
          </div>
          <Image
            src={`https://images.tractorgyan.com/uploads/${data?.image}`}
            height={296}
            width={500}
            title={data?.title}
            alt={data?.title}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <div className="">
        <span className="font-medium text-gray-dark">{data?.created_at}</span>
        <Link
          href={data?.full_url}
          title={data?.title}
          aria-label={data?.title}
        >
          <h3 className="cursor-pointer overflow-hidden text-ellipsis pt-1.5 font-semibold text-black hover:underline md:line-clamp-2">
            {data?.title}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default ReelsCard;
