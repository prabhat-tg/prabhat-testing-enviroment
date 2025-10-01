"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
const ImplementTypeCard = ({ title, imgSrc, url, placedInFilter }) => {
    return (
        <Link
            href={url}
            title={title + " image"}
            className={`${placedInFilter ? 'md:col-span-3 xl:col-span-3' : 'md:col-span-2 xl:col-span-1'} col-span-3 md:col-span-2 xl:col-span-1`}
        >
            {/* TODO: Refactor Shadow and Setup Global Classes */}
            <div className="flex flex-col justify-center items-center bg-white hover:bg-green-lighter shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] mb-2 md:mb-4 p-2 border-[2px] hover:border-secondary border-transparent rounded-xl min-h-[124px]">
                <Image
                    src={imgSrc}
                    height={300}
                    width={300}
                    alt={title + " image"}
                    title={title + " image"}
                    className="min-w-[40px] max-w-[72px] md:max-w-[80px] h-auto max-h-[72px]"
                />
                <p className="min-h-10 font-medium text-sm text-center">
                    {title}
                </p>
            </div>
        </Link>
    )
}

const ArrowButton = ({ onClick, position, rotate = false, alt }) => {
    return (
        <div
            className={`absolute bottom-[-1.5rem] ${position} h-7 w-7 transform translate-x-1/2 cursor-pointer overflow-hidden rounded-full z-10`}
            onClick={onClick}
        >
            <Image
                src="https://images.tractorgyan.com/uploads/113917/6699f70b8b797-carousleRightArrow.webp"
                alt={alt}
                title={alt}
                height={50}
                width={50}
                className={`h-full w-full ${rotate ? 'rotate-180' : ''}`}
            />
        </div>
    );
};

const NextArrow = ({ onClick }) => (
    <ArrowButton onClick={onClick} position="right-[20%] md:right-[40%]" alt="next-button-icon" />
);

const PrevArrow = ({ onClick }) => (
    <ArrowButton onClick={onClick} position="left-[15%] md:left-[40%]" rotate alt="previous-button-icon" />
);

const settings = {
    dots: true,
    // dots: isMobile,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 9,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 8,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
    ],
};

const AgricultureFarmTractorImplementTypes = ({
    heading,
    cta,
    allImplementTypes = [],
    itemsShown = 18,
    bgColor = 'bg-white',
    isMobile,
    floatingBg = false,
    slider = false,
    placedInFilter = false,
    currentLang = currentLang,
    translation = {},
}) => {
    const [showAll, setShowAll] = useState(false);

    // choose items to render depending on toggle
    const visibleItems = showAll ? allImplementTypes : (allImplementTypes || []).slice(0, itemsShown);

    // CTA link fallback (kept as-is)
    const tractorBrandsUrl = currentLang === "en" ? "/tractor-implements-in-india" : `/${currentLang}/tractor-implements-in-india`;

    // handler that intercepts clicks on MainButton (capture phase)
    const handleToggleCapture = (e) => {
        // prevent navigation by preventing default in capture phase
        e.preventDefault();
        // stop other handlers if needed
        e.stopPropagation();
        setShowAll(prev => !prev);
    };

    // keyboard support for accessibility if user presses Enter/Space
    const handleKeyDownToggle = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowAll(prev => !prev);
        }
    };

    return (
        <section className={`${bgColor} relative pt-0`}>
            {floatingBg && (
                <div className="top-0 right-0 left-0 absolute bg-primary rounded-b-2xl h-[140px] md:h-[164px]"></div>
            )}
            <div className={`${floatingBg ? 'relative z-2' : ''} container`}>
                {heading && (
                    <MainHeadings text={heading} extraCss={floatingBg ? 'text-white border-white' : 'text-black'} />
                )}

                {/* For Normal UI */}
                {!slider && (
                    <div className={`${placedInFilter ? 'mb-4 md:gap-4' : 'mb-4 md:gap-8'} grid grid-cols-9 md:grid-cols-9 gap-4`}>
                        {visibleItems.map((item, index) => (
                            <ImplementTypeCard
                                key={item?.id ?? index}
                                title={currentLang == 'hi' ? item.name_hi : item.name}
                                imgSrc={`https://images.tractorgyan.com/uploads/${item.image}`}
                                url={item.url}
                                placedInFilter={placedInFilter}
                            />
                        ))}
                    </div>
                )}

                {/* For Slider UI */}
                {slider && (
                    <Slider {...settings} className="custom-gap-slider mb-4 md:mb-6 pb-4">
                        {isMobile ? (
                            // Mobile: Show items in pairs using visibleItems
                            visibleItems.reduce((acc, _, i) => {
                                if (i % 2 === 0) {
                                    const pair = visibleItems.slice(i, i + 2);
                                    acc.push(pair);
                                }
                                return acc;
                            }, []).map((pair, index) => (
                                <div key={index}>
                                    {pair.map((item, subIndex) => (
                                        <ImplementTypeCard
                                            key={`${index}-${subIndex}`}
                                            title={currentLang == 'hi' ? item.name_hi : item.name}
                                            imgSrc={`https://images.tractorgyan.com/uploads/${item.image}`}
                                            url={item.url}
                                        />
                                    ))}
                                </div>
                            ))
                        ) : (
                            // Desktop: show one item per slide using visibleItems
                            visibleItems.map((item, index) => (
                                <div key={index}>
                                    <ImplementTypeCard
                                        title={currentLang == 'hi' ? item.name_hi : item.name}
                                        imgSrc={`https://images.tractorgyan.com/uploads/${item.image}`}
                                        url={item.url}
                                    />

                                </div>

                            ))
                        )}
                    </Slider>
                )}

                {/* Toggle button (View All) - keep MainButton but intercept clicks */}
                {allImplementTypes?.length > itemsShown && (
                    <div
                        className="flex justify-center"
                        // capture phase handler prevents Link navigation inside MainButton
                        onClickCapture={handleToggleCapture}
                        // allow keyboard toggling when div is focused
                        role="button"
                        tabIndex={0}
                        onKeyDown={handleKeyDownToggle}
                        aria-pressed={showAll}
                    >
                        <MainButton
                            text={
                                showAll
                                    ? (translation.blogs.showLess || "Show Less")
                                    : (cta || translation?.buttons?.ViewAllImplements || "View All Implements")
                            }
                        // keep linkUrl as-is so visual style remains consistent
                        // linkUrl={tractorBrandsUrl}
                        />
                    </div>
                )}

            </div>
        </section>
    );
};

export default AgricultureFarmTractorImplementTypes;
