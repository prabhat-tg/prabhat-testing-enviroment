"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PLAY_ICON =
    "https://images.tractorgyan.com/uploads/119240/6834ccff0851e-youtubeButtonIcon_small.webp";

/** 🔁 Base reusable card */
const BaseReelCard = ({ data, isDetail = false, asLink = true }) => {
    const router = useRouter();

    const navigate = () => {
        if (data?.full_url) router.push(data.full_url);
    };

    const containerClasses = `relative rounded-2xl border border-gray-light p-4 ${isDetail ? "min-h-[330px]" : "pb-[15px]"}`;
    const thumbnailWrapperClasses = `bg-gray-lighter w-full rounded-xl md:rounded-2xl overflow-hidden relative cursor-pointer ${isDetail
        ? "md:max-h-[250px] md:max-w-[200px] mx-auto mb-1 h-full"
        : "max-h-[500px] md:max-h-[400px] mb-2.5 h-full"
        }`;
    const titleClasses = `pt-1.5 font-semibold text-black ${isDetail ? "line-clamp-2" : "block"} md:line-clamp-2 overflow-hidden text-ellipsis`;

    const CardContent = (
        <div className={containerClasses}>
            <div className={thumbnailWrapperClasses} onClick={!asLink ? navigate : undefined}>
                {/* play icon overlay */}
                <Image
                    src={PLAY_ICON}
                    alt="play"
                    height={100}
                    width={100}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-11"
                />
                <Image
                    src={`https://images.tractorgyan.com/uploads/${data?.image}`}
                    alt={data?.title}
                    title={data?.title}
                    height={300}
                    width={600}
                    priority={isDetail}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="w-full md:flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-dark font-medium">{data?.created_at}</span>
                    <div className="flex items-end gap-1">
                        <Image
                            src="https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp"
                            width={20}
                            height={20}
                            alt="views"
                            className="h-5 w-6"
                        />
                        <span className="text-xs font-semibold text-gray-dark">{data?.total_view}</span>
                    </div>
                </div>
                {asLink ? (
                    <h3 className={`${titleClasses} hover:underline`}>
                        {data?.title}
                    </h3>
                ) : (
                    <h3 onClick={navigate} className={`${titleClasses} cursor-pointer`}>
                        {data?.title}
                    </h3>
                )}
            </div>
        </div>
    );

    if (asLink) {
        return (
            <Link href={data?.full_url} title={data?.title} className="block">
                {CardContent}
            </Link>
        );
    }

    return CardContent;
};

/** 🔹 For Listing Page */
export const TG_ReelsCard = ({ data }) => {
    return <BaseReelCard data={data} isDetail={false} />;
};

/** 🔸 For Detail/Sidebar View */
export const TG_ReelsDetailCard = ({ data }) => {
    return <BaseReelCard data={data} isDetail={true} />;
};




// how to use
// <TG_ReelsCard data={reelData} />
// <TG_ReelsDetailCard data={reelData} />