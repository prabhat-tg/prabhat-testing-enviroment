"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";

/**
 * Single brand/item cell
 */
const ConstructionMachinery = ({ title = "", imgSrc = "", url = "#" }) => {
    return (
        <Link
            href={url || "#"}
            title={title + " image"}
            className="flex flex-col items-center no-underline"
        >
            <div className="max-w-[80px] md:max-w-[100px] aspect-square mb-2 md:mb-4 p-2 flex items-center justify-center overflow-hidden rounded-full border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter">
                {imgSrc ? (
                    <Image
                        src={imgSrc}
                        height={72}
                        width={72}
                        alt={title + " image"}
                        title={title + " image"}
                        className="h-[72px] w-[72px] md:h-[80px] md:w-[80px] object-contain"
                    />
                ) : (
                    <div className="h-[72px] w-[72px] md:h-[80px] md:w-[80px] rounded bg-gray-100" />
                )}
            </div>

            <p className="text-center text-xs md:text-sm font-medium max-w-[80px] md:max-w-[100px] break-words">
                {title}
            </p>
        </Link>
    );
};

/**
 * Brands list with toggle "View All / View Less"
 */
const ConstructionMachineryBrands = ({
    heading,
    allImplementBrands = [],
    bgColor = "bg-white",
    placedInFilter = false,
    prefLang = "en",
    translation = {},
    parent = false,
    toggleView = false,
}) => {
    const defaultVisible = 9;
    const [showAllState, setShowAllState] = useState(false);

    const handleToggle = () => setShowAllState((s) => !s);

    const brands = Array.isArray(allImplementBrands) ? allImplementBrands : [];
    const displayedItems = showAllState ? brands : brands.slice(0, defaultVisible);

    return (
        <section className={bgColor}>
            <div className={`${placedInFilter ? "!px-0" : ""} container`}>
                {heading && <MainHeadings text={heading} />}

                <div
                    className={`${placedInFilter || (toggleView && showAllState)
                            ? "lg:flex-wrap"
                            : "lg:flex-nowrap"
                        } ${toggleView && showAllState
                            ? "justify-between gap-6"
                            : "justify-between gap-4"
                        } flex flex-wrap mb-6`}
                >
                    {!parent &&
                        displayedItems.map((item, index) => {
                            const title =
                                prefLang === "en"
                                    ? item?.name ?? item?.title ?? ""
                                    : item?.name_hi ?? item?.name ?? item?.title ?? "";
                            const imgSrc = item?.image
                                ? `https://images.tractorgyan.com/uploads/${item.image}`
                                : "";
                            const pageUrl = item?.page_url
                                ? prefLang === "hi"
                                    ? `/hi${item.page_url}`.replace("//", "/")
                                    : item.page_url
                                : "#";

                            return (
                                <ConstructionMachinery
                                    key={item?.id ?? item?.page_url ?? index}
                                    title={title}
                                    imgSrc={imgSrc}
                                    url={pageUrl}
                                />
                            );
                        })}

                    {parent &&
                        displayedItems.map((item, index) => {
                            const title = item?.title ?? item?.name ?? "";
                            const imgSrc = item?.imgSrc
                                ? `https://images.tractorgyan.com/uploads${item.imgSrc}`
                                : "";
                            const pageUrl = item?.url
                                ? prefLang === "en"
                                    ? item.url
                                    : `/hi${item.url}`
                                : "#";

                            return (
                                <ConstructionMachinery
                                    key={item?.id ?? item?.url ?? index}
                                    title={title}
                                    imgSrc={imgSrc}
                                    url={pageUrl}
                                />
                            );
                        })}
                </div>

                {/* Show button only if there are more than defaultVisible brands */}
                {toggleView && brands.length > defaultVisible && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleToggle}
                            className="mx-auto block w-fit rounded-lg bg-primary px-4 py-2 text-lg font-medium text-white text-center"
                            aria-expanded={showAllState}
                        >
                            {showAllState
                                ? translation?.blogs?.showLess ?? "Show Less"
                                : translation?.buttons?.viewAllBrands ?? "View All Brands"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ConstructionMachineryBrands;
