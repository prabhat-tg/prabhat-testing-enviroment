'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const awards = [
    {
        title: 'Brand Impact Award Winner 2021',
        subtitle: 'Indian Achievers Forum',
    },
    {
        title: 'Silver Creator Award',
        subtitle: 'Industry’s first tractor aggregator platform',
    },
    // {
    //     title: "Millions of views on Videos/Posts",
    //     subtitle: "Recognized by subscribers organically for creative content.",
    // },
];

// Thumbnail image URLs (can be same or different)
const thumbnails = [
    'https://images.tractorgyan.com/uploads/120140/687f94d9b949a-winner-big.webp',
    'https://images.tractorgyan.com/uploads/Youtube_Silver_Play_button.jpeg',
    // "https://images.tractorgyan.com/uploads/Brand_Impact_Award_tractorgyan.png",
];

const AwardsAndRecognitionsSection = ({ isMobile }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedImage = thumbnails[selectedIndex];

    return (
        <section className={`bg-white md:px-8 md:py-3 ${isMobile ? 'pb-3 pt-0' : ''}`}>
            <div className="container mx-auto mt-12 rounded-xl bg-blue-lighter p-6 md:px-16 md:py-11">
                <div
                    className={`flex flex-col items-start md:flex-row ${isMobile ? 'gap-4 pb-4' : 'gap-10'} `}
                >
                    {/* Left: Award List */}
                    <div className={`w-full md:w-1/2 ${isMobile ? 'my-6' : ''}`}>
                        <h2
                            className={`${isMobile ? 'text-xl' : 'text-3xl'} mb-6 font-bold text-black md:text-3xl`}
                        >
                            Awards & Recognitions
                        </h2>
                        <div className="flex flex-col gap-6">
                            {awards.map((award, index) => (
                                <div key={index} className="shadow-sm flex items-center rounded-full bg-white p-4">
                                    <div className="mr-4 flex h-10 w-10 items-center justify-center">
                                        <Image
                                            src="https://images.tractorgyan.com/uploads/120141/687f94ee9465d-awards-icon.webp"
                                            alt="trophy"
                                            width={20}
                                            height={20}
                                            title="Awards Icon"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-black md:text-base">{award.title}</h4>
                                        <p className="text-xs text-black md:text-sm">{award.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right: Certificate Image + Thumbnails */}
                    <div className="flex w-full flex-col items-center md:w-1/2">
                        {/* Main Image */}
                        <div className="shadow-lg mb-4 max-h-[317px] w-full max-w-[471px] overflow-hidden rounded-xl md:h-[317px]">
                            <Image
                                src={selectedImage}
                                alt="award-certificate"
                                width={600}
                                height={400}
                                title="Award Certificate"
                                className="h-full w-full object-contain md:object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {thumbnails.map((thumb, i) => (
                                <div
                                    key={i}
                                    className={`h-16 w-16 cursor-pointer rounded-md border ${selectedIndex === i ? 'border-2 border-primary' : 'border-transparent'
                                        }`}
                                    onClick={() => setSelectedIndex(i)}
                                >
                                    <Image
                                        src={thumb}
                                        alt={`award-${i + 1}`}
                                        width={60}
                                        height={60}
                                        title={`Award Thumbnail ${i + 1}`}
                                        className="h-16 w-16 rounded-md"
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
