import React from "react";
import Image from "next/image";
import { getV2SocialMediaCount } from "@/src/services/social/V2SocialMediaCount";

// Utility to format numbers
function formatCount(count) {
    const num = parseInt(count, 10);
    if (isNaN(num)) return count;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(".0", "") + "M+";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(".0", "") + "K+";
    return num.toString();
}

const baseSocialStats = [
    {
        id: 1,
        label: "YouTube",
        count: "239K+",
        icon: "https://images.tractorgyan.com/uploads/120204/6881e5a950880-transparent-youtube-icon.webp",
        bgColor: "bg-red-viewsBG",
        textColor: "text-white",
        mobilePosition: "top-[5%] left-[10%]",
        desktopPosition: "top-[3%] left-[5%]",
        size: "w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40",
    },
    {
        id: 2,
        label: "Instagram",
        count: "73K+",
        icon: "https://images.tractorgyan.com/uploads/120206/6881e5cfd45df-transparent-instagram-icon.webp",
        bgColor: "bg-purple-main",
        textColor: "text-white",
        mobilePosition: "top-[6%] left-[43%]",
        desktopPosition: "top-[0%] left-[50%] -translate-x-1/2",
        size: "w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36",
    },
    {
        id: 3,
        label: "Facebook",
        count: "636K+",
        icon: "https://images.tractorgyan.com/uploads/120201/6881e56347447-transparent-facebook-icon.webp",
        bgColor: "bg-blue-skyBlue",
        textColor: "text-white",
        mobilePosition: "top-[32%] right-[7%]",
        desktopPosition: "top-[35%] right-[0%]",
        size: "w-28 h-28 sm:w-26 sm:h-36 md:w-52 md:h-52",
    },
    {
        id: 4,
        label: "LinkedIn",
        count: "8K+",
        icon: "https://images.tractorgyan.com/uploads/120203/6881e58c38811-transparent-linkedin-icon.webp",
        bgColor: "bg-blue-darkBlue",
        textColor: "text-white",
        mobilePosition: "top-[45%] left-[5%]",
        desktopPosition: "top-[45%] left-[0%]",
        size: "w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44",
    },
    {
        id: 5,
        label: "Threads",
        count: "6K+",
        icon: "https://images.tractorgyan.com/uploads/120200/6881e5508e2d3-transparent-threads-icon.webp",
        bgColor: "bg-darkBlack",
        textColor: "text-white",
        mobilePosition: "bottom-[5%] left-[43%]",
        desktopPosition: "bottom-[0%] left-[50%] -translate-x-1/2",
        size: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32",
    },
    {
        id: 6,
        label: "Twitter",
        count: "1K+",
        icon: "https://images.tractorgyan.com/uploads/120197/6881e52d1709c-transparent-twitter-icon.webp",
        bgColor: "bg-black",
        textColor: "text-white",
        mobilePosition: "top-[38%] left-[35%]",
        desktopPosition: "top-[40%] left-[49%] -translate-x-1/2",
        size: "w-20 h-20 sm:w-20 sm:h-20 md:w-32 md:h-32",
    },
];

const ExtendedSection = async ({ isMobile, currentLang }) => {
    let response = [];
    const payload = { lang: currentLang };

    try {
        response = await getV2SocialMediaCount(payload);
    } catch (error) {
        console.error("Failed to fetch social media counts:", error);
    }

    const countMap = {};
    response.forEach((entry) => {
        const key = entry.name?.toLowerCase();
        if (key) countMap[key] = entry.count;
    });

    const finalStats = baseSocialStats.map((item) => {
        const dynamicCount = countMap[item.label.toLowerCase()];
        return {
            ...item,
            count: dynamicCount ? formatCount(dynamicCount) : item.count,
        };
    });

    return (
        <section className="sm:pt-4 md:pt-10  px-4 md:px-12 bg-white">
            <div className={`container mx-auto flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-between gap-y-4 md:gap-x-10`}>
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-just">
                    <div className="max-w-xl">
                        <h2 className={`font-bold text-black ${isMobile ? "text-xl mb-2" : "text-3xl mb-4"}`}>
                            Our Extended Family
                        </h2>

                        <p className="text-black font-medium leading-relaxed text-base md:text-lg text-justify">
                            At <span className="text-primary  font-semibold">Tractor Gyan</span>, we don’t just see our users as followers—we see you as part of our extended family.
                        </p>

                        <p className="text-black font-medium mt-2  md:mt-3 leading-relaxed text-base md:text-lg text-justify">

                            Since our journey began, our goal has been to simplify and empower Indian agriculture through accurate, unbiased, and up-to-date tractor and farming information. Over time, this mission has grown stronger, thanks to the incredible community that supports, interacts, and grows with us every day.
                        </p>
                    </div>
                </div>

                {/* Right Circles with Background Image */}
                <div className={`w-full ${!isMobile ? "md:w-1/2" : ""} flex justify-center`}>
                    <div className={`relative ${isMobile ? "w-[380px] h-[340px]" : "w-[320px] h-[320px] md:w-[569px] md:h-[480px]"}`}>
                        <Image
                            src="https://images.tractorgyan.com/uploads/120216/6881f95344904-social-media-stats-1.webp"
                            alt="Social Media Stats"
                            fill
                            title="Social Media Stats"
                            className="object-contain z-0"
                        />

                        {finalStats.map((item) => {
                            const platformIconMap = {
                                YouTube: "https://images.tractorgyan.com/uploads/118002/67b46ff35f214-Youtube.webp",
                                Instagram: "https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp",
                                Facebook: "https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp",
                                LinkedIn: "https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp",
                                Threads: "https://images.tractorgyan.com/uploads/120200/6881e5508e2d3-transparent-threads-icon.webp", // fallback to your existing one
                                Twitter: "https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp",
                            };

                            const unifiedGradient = "linear-gradient(135deg, #2e2e2e, #4f4f4f)";


                            const iconClass = isMobile
                                ? "w-[20px] h-[20px]"
                                : "w-[42px] h-[42px] md:w-[46px] md:h-[46px]";

                            const textColor = ["Instagram", "Threads"].includes(item.label) ? "text-white" : "text-white";

                            return (
                                <div
                                    key={item.id}
                                    className={`absolute ${isMobile ? item.mobilePosition : item.desktopPosition} ${item.size} flex flex-col items-center justify-center rounded-full ${textColor} shadow-lg z-10`}
                                    style={{
                                        background: unifiedGradient,
                                    }}
                                >

                                    <Image
                                        src={platformIconMap[item.label]}
                                        alt={`${item.label} Icon`}
                                        width={48}
                                        height={48}
                                        title={`${item.label} Icon`}
                                        unoptimized={true}
                                        className={`mb-1 ${iconClass} object-contain`}
                                    />

                                    <span className={`${isMobile ? "text-xl" : "md:text-3xl"} font-semibold`}>
                                        {item.count}
                                    </span>
                                    <span className={`${isMobile ? "text-[9px]" : "text-[10px] md:text-sm"} font-medium mt-1`}>
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExtendedSection;
