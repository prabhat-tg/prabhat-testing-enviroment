"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ReelsDetailsCard = ({ data, detailPage }) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (data?.full_url) {
      router.push(data.full_url);
    }
  };

  return (
    <div
      className={`relative min-h-[330px] rounded-2xl border border-gray-light pb-3 pe-4 ps-4 pt-3 md:min-h-16`}
    >
      <div
        className={`relative mx-auto mb-1 h-full w-full overflow-hidden rounded-2xl bg-gray-lighter md:max-h-[250px] md:w-full md:max-w-[200px] lg:h-full`}
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
          <Link href={data?.full_url} title={data?.title}>
            <Image
              src="https://images.tractorgyan.com/uploads/119240/6834ccff0851e-youtubeButtonIcon_small.webp"
              height={100}
              width={100}
              alt="youtube button image"
              title="youtube button image"
              className="h-7 w-11 cursor-pointer object-cover"
            />
          </Link>
        </div>
        <Image
          src={`https://images.tractorgyan.com/uploads/${data?.image}`}
          height={300}
          width={600}
          alt={data?.title}
          title={data?.title}
          className="h-full w-full"
        />
      </div>
      <div className="w-full md:flex-1">
        <span className="text-sm font-medium text-gray-dark">
          {data?.created_at}
        </span>
        <Link
          href={data?.full_url}
          title={data?.title}
          className="line-clamp-2 cursor-pointer overflow-hidden text-ellipsis pt-[5px] font-semibold text-black hover:underline"
        >
          {data?.title}
        </Link>
      </div>
    </div>
  );
};

export default ReelsDetailsCard;
