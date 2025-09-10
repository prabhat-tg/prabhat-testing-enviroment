"use client";
import Image from "next/image";
import React, { useState } from "react";

const awards = [
    {
        title: "Brand Impact Award Winner 2021",
        subtitle: "Indian Achievers Forum",
    },
    {
        title: "Silver Creator Award",
        subtitle: "Industry’s first tractor aggregator platform",
    },
    {
        title: "Millions of views on Videos/Posts",
        subtitle: "Recognized by subscribers organically for creative content.",
    },

];

// Thumbnail image URLs (can be same or different)
const thumbnails = [
    "https://images.tractorgyan.com/uploads/120140/687f94d9b949a-winner-big.webp",
    "https://images.tractorgyan.com/uploads/Youtube_Silver_Play_button.jpeg",
    "https://images.tractorgyan.com/uploads/Brand_Impact_Award_tractorgyan.png",
];

const AwardsAndRecognitionsSection = ({ isMobile }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedImage = thumbnails[selectedIndex];

    return (
        <section className={`bg-white md:py-3 md:px-8 ${isMobile ? "pb-3 pt-0" : ""}`}>
            <div className="bg-blue-lighter rounded-xl p-6 mt-12 md:py-11 md:px-16 mx-auto container">
                <div className={`flex flex-col md:flex-row items-start ${isMobile ? "gap-4 pb-4" : "gap-10"} `}>
                    {/* Left: Award List */}
                    <div className={`w-full md:w-1/2 ${isMobile ? "my-6" : ""}`}>

                        <h2 className={`${isMobile ? "text-xl" : "text-3xl"} md:text-3xl font-bold text-black mb-6`}>
                            Awards & Recognitions
                        </h2>
                        <div className="flex flex-col gap-6">
                            {awards.map((award, index) => (
                                <div
                                    key={index}
                                    className="bg-white flex items-center p-4 rounded-full shadow-sm"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center mr-4">
                                        <Image
                                            src="https://images.tractorgyan.com/uploads/120141/687f94ee9465d-awards-icon.webp"
                                            alt="trophy"
                                            width={20}
                                            height={20}
                                            title="Awards Icon"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm md:text-base font-bold text-black">
                                            {award.title}
                                        </h4>
                                        <p className="text-black text-xs md:text-sm">
                                            {award.subtitle}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right: Certificate Image + Thumbnails */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        {/* Main Image */}
                        <div className="rounded-xl overflow-hidden shadow-lg mb-4 w-full max-w-[471px] max-h-[317px] md:h-[317px]">
                            <Image
                                src={selectedImage}
                                alt="award-certificate"
                                width={600}
                                height={400}
                                title="Award Certificate"
                                className="w-full h-full md:object-cover object-contain"
                            />
                        </div>



                        {/* Thumbnails */}
                        <div className="flex gap-2 flex-wrap justify-center">
                            {thumbnails.map((thumb, i) => (
                                <div
                                    key={i}
                                    className={`w-16 h-16 rounded-md border cursor-pointer ${selectedIndex === i
                                        ? "border-2 border-primary"
                                        : "border-transparent"
                                        }`}
                                    onClick={() => setSelectedIndex(i)}
                                >
                                    <Image
                                        src={thumb}
                                        alt={`award-${i + 1}`}
                                        width={60}
                                        height={60}
                                        title={`Award Thumbnail ${i + 1}`}
                                        className="rounded-md w-16 h-16"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AwardsAndRecognitionsSection;
