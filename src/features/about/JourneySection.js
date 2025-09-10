import Image from "next/image";
import React from "react";

const timelineData = [
    {
        year: "2016",
        title: "Tractor Gyan was founded",
    },
    {
        year: "2018",
        title: "First video published on YouTube",
    },
    {
        year: "2019",
        title: "Website went live",
        desc: "Became a private limited company.",
    },
    {
        year: "2020",
        title: "New logo launched",
        desc: "YouTube crossed 1 Lakh followers.",
        desc1: "1 Lakh impressions per day on Google.",
    },
    {
        year: "2021",
        title: "Brand Impact Award",
        desc: "1st video reached 3 million views (Toy video).",
        desc1: "50,000 likes on a single reel.",
    },
    {
        year: "2022",
        title: "Paytm video went viral",
    },
    {
        year: "2023",
        title: "PM Narendra Modi mentioned us in a speech",
    },
    {
        year: "2024",
        title: "Major Media Coverage",
        desc: "Featured in TOI, Nai Duniya, Dainik Bhaskar, and Peoples Samachar.",
        desc1: "Navya Nanda spoke about us on CNBC. First video crossed 1 Lakh shares.",
    },
    {
        year: "2024",
        title: "House Gyan Announced",
        desc: "Ankur Gupta joined as Co-founder & CMO.",
    },
    {
        year: "2025",
        title: "100K on Instagram",
        desc: "Built a 10 Lakh+ farmer community across social media.",
    },
];


const JourneySection = ({ isMobile }) => {
    return (
        <>
            {isMobile ? (<>
                <section className=" bg-white px-4 pb-20 relative">
                    <div className="container max-w-full">
                        {/* Heading */}
                        <h2 className="text-xl font-bold text-left mb-2 text-black">
                            Our Journey So Far
                        </h2>
                        <h1 className="text-left font-medium text-base  mb-4 text-black">
                            We have come a long way from where we started, and we have a long way to go! We have come a long way from where we started, and we have a long way to go! We have come a long way from where we started!
                        </h1>

                        <div className="relative ">
                            {/* Center vertical line */}
                            <div className="absolute left-0 top-[50px] bottom-[80px] ml-[20px] w-[6px] bg-green-mid rounded-[80px] z-0" />



                            {/* Timeline content */}
                            <div className="flex flex-col gap-5 z-10 relative">
                                {timelineData.map((item, index) => (
                                    <div key={index} className="relative flex items-center">
                                        {/* Left spacing with icon */}
                                        <div className="w-[60px] relative z-10 flex justify-center">
                                            <div className="w-10 h-10 bg-white flex justify-center items-center rounded-2xl shadow-md">
                                                <Image
                                                    src="https://images.tractorgyan.com/uploads/120078/687f60d703f7c-milestone-icon.webp"
                                                    alt="milestone"
                                                    width={40}
                                                    height={40}
                                                    title="Milestone Icon"
                                                    className="w-10 h-10"
                                                />
                                            </div>
                                        </div>

                                        {/* Right side content */}
                                        <div className="ml-4  w-full">
                                            <div className="border border-green-lightest rounded-2xl p-2 w-full max-w-none text-left">
                                                <span className="text-2xl mt-2 font-bold text-black">{item.year}</span>
                                                <p className="font-semibold text-base text-black">{item.title}</p>
                                                <p className="text-sm font-normal text-black mt-1">{item.desc}</p>
                                                <p className="text-sm font-normal text-black mt-1">{item.desc1}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                    {/* Bottom-left tractor image */}
                    <div className="absolute -bottom-1  block md:hidden z-0">
                        <Image
                            src="https://images.tractorgyan.com/uploads/120170/6880c29077a5c-tractor-gyan-monogram.webp"
                            alt="Tractor"
                            width={110}
                            height={85}
                            title="Tractor Gyan Monogram"
                            className=" w-28 h-20"
                        />
                    </div>
                </section >
            </>) : (
                <>
                    <section className=" bg-white px-12 relative">
                        <div className="container max-w-full">
                            {/* Heading */}
                            <h2 className="text-3xl font-bold text-left mb-2 text-black">
                                Our Journey So Far
                            </h2>
                            <h1 className="text-left font-medium text-base  mb-12 text-black">
                                We have come a long way from where we started, and we have a long way to go! We have come a long way from where we started, and we have a long way to go! We have come a long way from where we started!
                            </h1>

                            <div className="relative ">
                                {/* Center vertical line */}
                                <div className="absolute left-1/2 top-[50px] bottom-[80px] -translate-x-1/2 w-[6px] bg-green-mid rounded-[80px] z-0" />


                                {/* Timeline content */}
                                <div className="flex flex-col z-10 relative">
                                    {timelineData.map((item, index) => {
                                        const isLeft = index % 2 === 0;

                                        return (
                                            <div key={index} className="relative flex flex-col md:flex-row items-center md:justify-between">
                                                {/* Left Side */}
                                                {isLeft ? (
                                                    <>
                                                        <div className="md:w-[45%] flex justify-end">
                                                            <div className="border border-green-lightest rounded-2xl p-3 w-full max-w-none text-right">
                                                                <span className="text-3xl mt-2 font-bold text-black">{item.year}</span>
                                                                <p className="font-semibold text-2xl text-black">{item.title}</p>
                                                                <p className="text-base font-normal text-black mt-1">{item.desc}</p>
                                                                <p className="text-base font-normal text-black mt-1">{item.desc1}</p>
                                                            </div>
                                                        </div>

                                                        {/* Center icon */}
                                                        <div className="z-10 w-10 h-10 bg-white flex justify-center items-center rounded-2xl absolute left-1/2 transform -translate-x-1/2">
                                                            <Image
                                                                src="https://images.tractorgyan.com/uploads/120574/689c68ca342d8-687f60d703f7c-milestone-icon5.webp"
                                                                alt="milestone"
                                                                width={40}
                                                                height={40}
                                                                title="Milestone Icon"
                                                                className="w-10 h-10"

                                                            />
                                                        </div>

                                                        <div className="md:w-[45%]" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="md:w-[45%]" />

                                                        {/* Center icon */}
                                                        <div className="z-10 w-10 h-10 bg-white flex justify-center items-center rounded-2xl   absolute left-1/2 transform -translate-x-1/2">
                                                            <Image
                                                                src="https://images.tractorgyan.com/uploads/120078/687f60d703f7c-milestone-icon.webp"
                                                                alt="milestone"
                                                                width={40}
                                                                height={40}
                                                                title="Milestone Icon"
                                                                className="w-10 h-10"
                                                            />
                                                        </div>

                                                        {/* Right Side */}
                                                        <div className="md:w-[45%] flex justify-start">
                                                            <div className="border border-green-lightest rounded-2xl p-3 w-full max-w-none text-left">
                                                                <span className="text-3xl mt-2 font-bold text-black">{item.year}</span>
                                                                <p className="font-semibold text-2xl text-black">{item.title}</p>
                                                                <p className="text-base font-normal text-black mt-1">{item.desc}</p>
                                                                <p className="text-base font-normal text-black mt-1">{item.desc1}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                        {/* Bottom-left tractor image */}
                        <div className="hidden md:block absolute -bottom-1 left-0 z-10 pointer-events-none">
                            <Image
                                src="https://images.tractorgyan.com/uploads/120170/6880c29077a5c-tractor-gyan-monogram.webp"
                                alt="Tractor"
                                width={280}
                                height={280}
                                title="Tractor Gyan Monogram"
                                className="object-contain"
                            />
                        </div>

                    </section >
                </>
            )}
        </>
    );
};

export default JourneySection;
