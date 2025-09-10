"use client";
import { useState } from "react";
import Image from "next/image";

const mediaSlides1 = [
    "https://images.tractorgyan.com/uploads/120153/6880905f0b319-life-at-tractorgyan-1.webp",
    "https://images.tractorgyan.com/uploads/120154/68809074f3619-life-at-tractorgyan-2.webp",
    "https://images.tractorgyan.com/uploads/120829/68b2a7e5c049e-SPR01011-(1)-(1).webp",
    "https://images.tractorgyan.com/uploads/120156/6880909bd90f1-life-at-tractorgyan-4.webp",
    "https://images.tractorgyan.com/uploads/120157/688090c296a87-life-at-tractorgyan-5.webp",
    "https://images.tractorgyan.com/uploads/120158/688090d5d128f-life-at-tractorgyan-6.webp",
    "https://images.tractorgyan.com/uploads/120159/688090f63dc9a-life-at-tractorgyan-7.webp",
    "https://images.tractorgyan.com/uploads/120160/6880910ab92ce-life-at-tractorgyan-8.webp",
];

const mediaSlides2 = [
    "https://images.tractorgyan.com/uploads/120158/688090d5d128f-life-at-tractorgyan-6.webp",
    "https://images.tractorgyan.com/uploads/120159/688090f63dc9a-life-at-tractorgyan-7.webp",
    "https://images.tractorgyan.com/uploads/120160/6880910ab92ce-life-at-tractorgyan-8.webp",
    "https://images.tractorgyan.com/uploads/120153/6880905f0b319-life-at-tractorgyan-1.webp",
    "https://images.tractorgyan.com/uploads/120154/68809074f3619-life-at-tractorgyan-2.webp",
    "https://images.tractorgyan.com/uploads/120829/68b2a7e5c049e-SPR01011-(1)-(1).webp",
    "https://images.tractorgyan.com/uploads/120157/688090c296a87-life-at-tractorgyan-5.webp",
    "https://images.tractorgyan.com/uploads/120156/6880909bd90f1-life-at-tractorgyan-4.webp",
];

const LifeAtTractorGyan = ({ isMobile }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1); // 1 for mediaSlides1, 2 for mediaSlides2

    const getCurrentSlides = () => {
        return currentSet === 1 ? mediaSlides1 : mediaSlides2;
    };

    const goToNext = () => {
        if (currentSet === 1) {
            setCurrentSet(2);
            setSlideIndex(0);
        } else {
            setCurrentSet(1);
            setSlideIndex(0);
        }
    };

    const goToPrev = () => {
        if (currentSet === 1) {
            setCurrentSet(2);
            setSlideIndex(0);
        } else {
            setCurrentSet(1);
            setSlideIndex(0);
        }
    };

    const currentSlides = getCurrentSlides();

    const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
    const mobileSlides = [...mediaSlides1]; // Use single flat array

    const goToNextMobile = () => {
        setMobileSlideIndex((prev) => (prev + 1) % mobileSlides.length);
    };

    const goToPrevMobile = () => {
        setMobileSlideIndex((prev) => (prev - 1 + mobileSlides.length) % mobileSlides.length);
    };


    const renderImageRow = (start, end, gridCols) => (
        <div className={`grid ${gridCols} gap-6 ${start !== 0 ? "my-6" : ""}`}>
            {currentSlides.slice(start, end).map((img, index) => (
                <div key={start + index} className="overflow-hidden rounded-2xl">
                    <Image
                        src={img}
                        alt={`Life at Tractor Gyan ${start + index + 1}`}
                        width={442}
                        height={280}
                        title={`Life at Tractor Gyan ${start + index + 1}`}
                        className="w-full h-[200px] md:h-[270px] object-fill rounded-2xl"
                        placeholder="empty"
                        quality={100}

                    />
                </div>
            ))}
        </div>
    );

    return (
        <>
            {
                isMobile ? (
                    <>
                        <section>
                            <div className="container">

                                <div className="flex justify-start items-start mb-4 px-3 ">
                                    <h2 className="text-xl font-bold text-black">
                                        Life At Tractor
                                        <span className="text-primary ml-2">Gyan</span>
                                    </h2>
                                </div>

                                <div className="px-2">

                                    {renderImageRow(mobileSlideIndex, mobileSlideIndex + 1, "grid-cols-1")}


                                    {/* Arrows and Dots */}
                                    <div className="mt-4 flex justify-center items-center gap-4">
                                        <button
                                            onClick={goToPrevMobile}
                                            className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                                            aria-label="Previous slide"
                                        >
                                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <div className="flex gap-2">
                                            {mobileSlides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setMobileSlideIndex(index)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${mobileSlideIndex === index
                                                        ? "bg-primary scale-125 border border-primary"
                                                        : "bg-white border border-gray-light"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={goToNextMobile}
                                            className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                                            aria-label="Next slide"
                                        >
                                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </>
                ) :
                    (<>
                        <section>

                            <div className="flex justify-center items-center mb-12 ">
                                <h2 className="text-2xl font-bold text-black">
                                    Life At Tractor
                                    <span className="text-primary ml-2">Gyan</span>
                                </h2>
                            </div>

                            <div className="px-6">
                                {/* Row 1: 3 images */}
                                {renderImageRow(0, 3, "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3")}
                                {/* Row 2: 2 images */}
                                {renderImageRow(3, 5, "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2")}
                                {/* Row 3: 3 images */}
                                {renderImageRow(5, 8, "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3")}

                                {/* Arrows and Dots */}
                                {/* <div className="mt-8 flex justify-center items-center gap-4">
                                    <button
                                        onClick={goToPrev}
                                        className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                                        aria-label="Previous slide"
                                    >
                                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <div className="flex gap-2">
                                        {[1, 2].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => {
                                                    setCurrentSet(num);
                                                    setSlideIndex(0);
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSet === num
                                                    ? "bg-primary scale-125 border border-primary"
                                                    : "bg-white border border-gray-light"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={goToNext}
                                        className="bg-white hover:bg-opacity-70 rounded-full p-2 shadow-sliderIcon"
                                        aria-label="Next slide"
                                    >
                                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div> */}
                            </div>

                        </section>
                    </>)
            }
        </>

    );
};

export default LifeAtTractorGyan;
