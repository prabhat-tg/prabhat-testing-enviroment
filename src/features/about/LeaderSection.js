"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const leaders = [
    {
        name: "Shivankur Gupta",
        role: "Founder & CEO",
        image: "https://images.tractorgyan.com/uploads/120073/687f519cd9f66-team-shivankur.webp",
        linkedin: "https://www.linkedin.com/in/sshivankur/",
        instagram: "https://www.instagram.com/shivankur.gupta/",
    },
    {
        name: "Ankur Gupta",
        role: "Co-Founder & CMO",
        image: "https://images.tractorgyan.com/uploads/120075/687f51c408334-team-ankur.webp",
        linkedin: "https://www.linkedin.com/in/ankurgahoi/",
        instagram: "https://www.instagram.com/ankur_connects/",
    },
    {
        name: "Pallavi Gupta",
        role: "Director & Host",
        image: "https://images.tractorgyan.com/uploads/120074/687f51b2d1fbf-team-pallavi.webp",
        linkedin: "https://www.linkedin.com/in/pallavi-gupta-2b6bb432b/",
        instagram: "https://www.instagram.com/precious__pallavi/",
    },
];

const LeaderSection = ({ isMobile }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? leaders.length - 1 : prev - 1));
    const goToNext = () => setCurrentIndex((prev) => (prev === leaders.length - 1 ? 0 : prev + 1));

    return (
        <section className="bg-white pt-0">
            <div className={`container mx-auto ${isMobile ? "px-2" : "px-4"} text-center`}>
                {/* Heading */}
                <h2 className={`${isMobile ? "text-xl" : "text-3xl"} font-bold mb-2`}>Meet Our Leaders</h2>
                <p className={`text-base font-medium ${isMobile ? "mb-4" : "mb-10"}`}>
                    <span>Tractor</span>&nbsp;
                    <span className="text-primary">Gyan</span> is lead by a group of visionaries
                </p>

                {!isMobile ? (
                    // Desktop View
                    <div className="flex flex-wrap justify-center gap-8">
                        {leaders.map((leader, idx) => (
                            <div key={idx} className="bg-blue-lighter w-[283px] rounded-lg p-2 flex flex-col items-center">
                                <div className="h-80 w-[267px] relative mb-4 rounded-lg shadow-main overflow-hidden">
                                    <Image src={leader.image} alt={leader.name} fill className="object-fill"
                                        title={leader.name} />
                                </div>
                                <h3 className="text-2xl font-bold text-black">{leader.name}</h3>
                                <p className="text-xs text-black font-semibold my-2">{leader.role}</p>
                                <div className="flex gap-2">
                                    <Link href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src="https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp"
                                            alt="LinkedIn"
                                            width={47}
                                            height={47}
                                            title="LinkedIn Icon"
                                            className="w-12 h-12"
                                        />
                                    </Link>
                                    <Link href={leader.instagram} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src="https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp"
                                            alt="Instagram"
                                            width={47}
                                            title="Instagram Icon"
                                            height={47}
                                            className="w-12 h-12"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Mobile View
                    <div className="relative w-full flex flex-col">
                        <div className="bg-blue-lighter w-full rounded-lg p-4 flex flex-col items-center">
                            <div className="h-96 w-full relative mb-4 rounded-lg shadow-main overflow-hidden">
                                <Image
                                    src={leaders[currentIndex].image}
                                    alt={leaders[currentIndex].name}
                                    fill
                                    className="object-cover"
                                    title={`Leader Image ${currentIndex + 1}`}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-black">{leaders[currentIndex].name}</h3>
                            <p className="text-xs text-black font-semibold my-2">{leaders[currentIndex].role}</p>
                            <div className="flex gap-2">
                                <Link href={leaders[currentIndex].linkedin} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp"
                                        alt="LinkedIn"
                                        width={47}
                                        height={47}
                                        className="w-12 h-12"
                                        title="LinkedIn Icon"
                                    />
                                </Link>
                                <Link href={leaders[currentIndex].instagram} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp"
                                        alt="Instagram"
                                        width={47}
                                        height={47}
                                        title="Instagram Icon"
                                        className="w-12 h-12"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Arrows & Dots */}
                        <div className="mt-6 flex justify-center items-center gap-4">
                            <button
                                onClick={goToPrev}
                                className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                                aria-label="Previous"
                            >
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="flex gap-2">
                                {leaders.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
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
                                aria-label="Next"
                            >
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LeaderSection;
