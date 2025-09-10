"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

const mediaSlides = [
    {
        logo: "https://images.tractorgyan.com/uploads/120138/687f949353162-patrika-icon.webp",
        quote: "“ट्रैक्टर ज्ञान' पर मिलेगी ट्रैक्टर की ए-टू-जेड जानकारी, किसान भी कर रहे पसंद”",
    },
    {
        logo: "https://images.tractorgyan.com/uploads/120137/687f94768b6c4-times-of-india-icon.webp",
        quote: "“In tractor-crazy North, these influencers are in the driver’s seat”",
    },
    {
        logo: "https://images.tractorgyan.com/uploads/120136/687f94627d925-dainik-bhaskar-icon.webp",
        quote: "“टेक्नोलॉजी की मदद से किसानों को अपडेट कर आमदनी बढ़वा रहा शहर के युवा का स्टार्टअप”",
    },
    {
        logo: "https://images.tractorgyan.com/uploads/120135/687f9444f1632-nai-duniya-icon.webp",
        quote: "“किसानों की समझी समस्या, तो समाधान बना स्टार्टअप”",
    },
    {
        logo: "https://images.tractorgyan.com/uploads/120134/687f941e288de-news18-icon.webp",
        quote: "“एक स्टार्टअप ने बदल दी किसानों की जिंदगी, 'ट्रैक्टर ज्ञान' से आई तकनीकी समझ और खरीददारी का तरीका”",
    },
    {
        logo: "https://images.tractorgyan.com/uploads/120291/68888b2151000-people's-news-icon.webp",
        quote: "“घर बैठे ही मिल रही ट्रैक्टर के फीचर्स की जानकारी”",
    },
];

const NewsAndMediaSection = ({ isMobile }) => {

    const VISIBLE_COUNT = isMobile ? 2 : 5;
    const TOTAL = mediaSlides.length;
    const [currentSlide, setCurrentSlide] = useState(VISIBLE_COUNT);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const extendedSlides = [
        ...mediaSlides.slice(-VISIBLE_COUNT),
        ...mediaSlides,
        ...mediaSlides.slice(0, VISIBLE_COUNT),
    ];

    const goToNext = () => {
        setCurrentSlide((prev) => prev + 1);
    };

    const goToPrev = () => {
        setCurrentSlide((prev) => prev - 1);
    };

    useEffect(() => {
        const timer = setInterval(goToNext, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (currentSlide === TOTAL + VISIBLE_COUNT) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentSlide(VISIBLE_COUNT);
            }, 300);
        } else if (currentSlide === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentSlide(TOTAL);
            }, 300);
        } else {
            setIsTransitioning(true);
        }
    }, [currentSlide]);

    const transitionClass = isTransitioning
        ? "transition-transform duration-500 ease-in-out"
        : "";

    const translatePercent = `-${(100 / extendedSlides.length) * currentSlide}%`;
    const sliderWidth = `${(extendedSlides.length * 100) / VISIBLE_COUNT}%`;

    return (
        <section className="py-4 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className={`${isMobile ? "text-xl mb-4" : "text-3xl mb-10"} md:text-3xl sm:text-xl font-bold text-start text-black `}>
                    News and Media
                </h2>

                <div className="relative mx-auto">

                    {isMobile ? (<>
                        <div className="overflow-hidden">
                            <div
                                className={`flex gap-2 ${transitionClass}`}
                                style={{
                                    transform: `translateX(${translatePercent})`,
                                    width: sliderWidth,
                                }}
                            >
                                {extendedSlides.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{ width: `${100 / (extendedSlides.length / VISIBLE_COUNT)}%` }}
                                        className="px-2"

                                    >
                                        <div className="rounded-xl border p-1 border-gray-light shadow-sm text-center  bg-white h-full">
                                            <div className="my-1 flex justify-center">
                                                <Image
                                                    src={item.logo}
                                                    alt={`Media ${index + 1}`}
                                                    width={64}
                                                    height={64}
                                                    className="object-contain h-16 w-16"
                                                    quality={90}
                                                    title={`Media ${index + 1} Logo`}
                                                />
                                            </div>
                                            <p className="text-xs text-black font-medium leading-relaxed">
                                                {item.quote}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>) : (<>

                        <div className="overflow-hidden">
                            <div
                                className={`flex gap-8 ${transitionClass}`}
                                style={{
                                    transform: `translateX(${translatePercent})`,
                                    width: sliderWidth,
                                }}
                            >
                                {extendedSlides.map((item, index) => (
                                    <div
                                        key={index}
                                    >
                                        <div className="rounded-xl py-1 border border-gray-light px-6  shadow-sm text-center bg-white w-64">
                                            <div className=" my-1 flex justify-center">
                                                <Image
                                                    src={item.logo}
                                                    alt={`Media ${index + 1}`}
                                                    width={60}
                                                    height={60}
                                                    title={`Media ${index + 1} Logo`}
                                                    className="object-contain h-12"
                                                />
                                            </div>
                                            <p className="text-xs text-black font-medium leading-relaxed">
                                                {item.quote}
                                            </p>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </>)}

                    {/* Arrows and Dots */}
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button
                            onClick={goToPrev}
                            className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                            aria-label="Previous slide"
                        >
                            <svg
                                className="w-4 h-4 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <div className="flex gap-2">
                            {mediaSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index + VISIBLE_COUNT)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index + VISIBLE_COUNT === currentSlide
                                        ? "bg-primary scale-125 border border-primary"
                                        : "bg-white border border-gray-light"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={goToNext}
                            className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                            aria-label="Next slide"
                        >
                            <svg
                                className="w-4 h-4 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsAndMediaSection;
