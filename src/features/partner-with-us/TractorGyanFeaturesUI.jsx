"use client";
import Image from 'next/image';
import React from 'react';

const TractorGyanFeaturesUI = ({
    statsData,
    brandLogos = [],
    title,
    description,
    leftImageSrc,
    leftImageAlt,
    rightImageSrc,
    rightImageAlt,
    brandHeading,
    bgGray = false,
}) => {

    const duplicatedLogos = Array.isArray(brandLogos) ? [...brandLogos, ...brandLogos] : [];

    return (
        <section className={`md:py-3 border-gray-light max-md:border-b-[1px] ${bgGray ? 'bg-section-gray' : ''}`}>
            <div className="container">
                <div className="sm:px-4 lg:px-0 md:py-4 md:border md:border-gray-light rounded-lg">
                    <div className="gap-2 grid grid-cols-4">
                        <div className="flex justify-center items-center order-last md:order-first col-span-2 md:col-span-1 w-auto h-full">
                            <div className="w-full max-w-[200px] h-full max-h-[300px]">
                                <Image
                                    src={leftImageSrc}
                                    alt={leftImageAlt}
                                    title={leftImageAlt}
                                    width={165}
                                    height={300}
                                    className="w-auto h-full"
                                />
                            </div>
                        </div>

                        <div className="max-md:order-first col-span-4 md:col-span-2 w-full">
                            <div className="mx-auto md:max-w-xl">
                                <div className="mx-auto text-center">
                                    <h2 className="mb-2.5 font-bold text-black text-xl sm:text-2xl">{title}</h2>
                                    <p className="text-sm">{description}</p>
                                </div>
                                <div className="gap-2 md:gap-4 grid grid-cols-2 md:my-6 mt-6 mb-4">
                                    {statsData.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 sm:gap-2 md:gap-4 bg-white shadow-main p-1.5 md:p-2 rounded-full"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="flex justify-center items-center bg-primary p-1 md:p-2 rounded-full w-7 md:w-10 min-w-7 h-7 md:h-10">
                                                    <Image
                                                        src="https://images.tractorgyan.com/uploads/120071/687f3f45211ce-achievement-icon_small.webp"
                                                        alt="Trophy Icon"
                                                        title="Trophy Icon"
                                                        width={24}
                                                        height={24}
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-black text-sm lg:text-lg">
                                                    {stat.number}
                                                </div>
                                                <div className="font-medium text-[10px] text-black md:text-xs text-nowrap">
                                                    {stat.title}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Brand Logos Section */}
                            {/* {brandLogos &&
                                <div>
                                    <p className='mt-2 mb-1 font-bold text-black text-base md:text-lg text-center'>{brandHeading}</p>

                                    <div className="flex justify-start max-w-full overflow-auto no-scrollbar">
                                        <div className="flex justify-center items-center gap-3 mx-auto max-md:my-6 md:px-4 md:py-2">
                                            {brandLogos.length &&
                                                brandLogos.map((brand, index) => (
                                                    <div key={index} className="flex-shrink-0">
                                                        <div className="bg-white shadow-card px-2 py-1 rounded-lg w-24 h-20">
                                                            <Image
                                                                src={brand.url}
                                                                alt={`${brand.name} Logo`}
                                                                title={`${brand.name} Logo`}
                                                                width={120}
                                                                height={40}
                                                                className="mx-auto w-full h-full min-h-[40px] object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            } */}
                            {duplicatedLogos.length > 0 &&
                                <div>
                                    <p className='mt-2 mb-1 font-bold text-black text-base md:text-lg text-center'>{brandHeading}</p>

                                    <div className="relative w-full overflow-hidden bg-gray-50 py-6">
                                        <div className="flex w-max animate-slide">
                                            {duplicatedLogos.map((brand, index) => (
                                                <div
                                                    key={index}
                                                    className="flex-shrink-0 mx-3 bg-white shadow-card px-2 py-1 rounded-lg w-24 h-20 flex items-center justify-center"
                                                >
                                                    <Image
                                                        src={brand.url}
                                                        alt={`${brand.name} Logo`}
                                                        title={`${brand.name} Logo`}
                                                        width={120}
                                                        height={40}
                                                        className="mx-auto w-full h-full min-h-[40px] object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <style jsx>{`
                                            @keyframes slide {
                                            from {
                                                transform: translateX(0);
                                            }
                                            to {
                                                transform: translateX(-50%);
                                            }
                                            }
                                            .animate-slide {
                                            display: flex;
                                            animation: slide 20s linear infinite;
                                            }
                                        `}
                                        </style>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex justify-center items-center order-last col-span-2 md:col-span-1 w-auto">
                            <div className="w-full max-w-[200px] h-full max-h-[300px]">
                                <Image
                                    src={rightImageSrc}
                                    alt={rightImageAlt}
                                    title={rightImageAlt}
                                    width={165}
                                    height={300}
                                    className="w-auto h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TractorGyanFeaturesUI;
