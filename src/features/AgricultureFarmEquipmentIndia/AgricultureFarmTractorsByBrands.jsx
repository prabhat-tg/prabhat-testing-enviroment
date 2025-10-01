"use client";
import React, { useState } from "react";
import BrandCards from '@/src/features/tyreComponents/components/tractorsByBrands/BrandCards';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import "@/src/features/tractors/models/globals.css";
import TractorBrandToggle from '@/src/components/tractor/TractorBrandToggle';
import MainButton from '../tyreComponents/commonComponents/buttons/MainButton';
import AgricultureFarmTractorBrandToggleSection from "./AgricultureFarmTractorBrandToggleSection";

const AgricultureFarmTractorsByBrands = ({
    heading,
    allTractorBrands = [],
    translation = {},
    langPrefix,
    cta,
    bgColor = 'bg-white',
    toggleView = false,
    isDealerPage = false
}) => {
    const [showAll, setShowAll] = useState(false);

    // number of items to show by default (9 + 9)
    const defaultVisible = 18;
    // helper to build brand / dealer url
    const buildBrandUrl = (item) => {
        const slug = (item?.name || "").toLowerCase().replace(/\s+/g, '-');
        if (isDealerPage) {
            // langPrefix already contains '/hi' or ''
            return `${langPrefix}/tractor-dealers/${slug}`;
        }
        // prefix item.url with langPrefix (item.url usually starts with '/')
        return `${langPrefix}${item?.url || `/${slug}`}`;
    };

    // CTA url for bottom MainButton — use langPrefix directly
    const tractorBrandsUrl = `${langPrefix || ''}/tractor-brands`;

    return (
        <section className={`${bgColor} pb-0`} >
            <div className="container">
                {heading ? (
                    <MainHeadings text={heading} />
                ) : (
                    <MainHeadings text={translation?.headings?.tractorsbyBrands || ''} />
                )}

                {toggleView ? (
                    <>
                        <div id="tractor-brands-grid">
                            {/* Grid with 3 cols on small, 9 cols on md and up — 9 items will fill one row on md */}
                            <div className="gap-4 md:gap-8 grid tractor-brands-grid grid-cols-3 md:grid-cols-9 mb-4">
                                {allTractorBrands?.map((item, index) => {
                                    const isHidden = !showAll && index >= defaultVisible;
                                    return (
                                        <div
                                            key={item?.id ?? index}
                                            className={`${isHidden ? 'tractor-brand-hidden' : ''}`}
                                        >
                                            <BrandCards
                                                imgUrl={item?.image}
                                                name={item?.name}
                                                url={buildBrandUrl(item)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Toggle button (View All / Show Less) */}
                        {allTractorBrands?.length > defaultVisible && (
                            <div className="flex justify-center mb-4">
                                {/* Prefer using your TractorBrandToggle component if it's available */}
                                {typeof TractorBrandToggle !== 'undefined' ? (
                                    <AgricultureFarmTractorBrandToggleSection
                                        translation={translation}
                                        buttonText={cta || translation?.buttons?.viewAllBrands || 'View All Brands'}
                                        onToggle={() => setShowAll(prev => !prev)}
                                        isOpen={showAll}
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setShowAll(prev => !prev)}

                                    >
                                        {showAll
                                            ? (translation.blogs.showLess)
                                            : (cta || translation?.buttons?.viewAllBrands || 'View All Brands')}
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-wrap md:flex-nowrap justify-between -mx-2 md:-mx-4 mb-4 md:mb-8">
                            {allTractorBrands?.slice(0, defaultVisible).map((item, index) => (
                                <div key={item?.id ?? index} className="px-2 md:px-4 md:basis-1/9 basis-1/3">
                                    <BrandCards
                                        imgUrl={item?.image}
                                        name={item?.name}
                                        url={(langPrefix === 'hi' ? '/hi' : '') + (item?.url || `#/brand-${index}`)}
                                    />
                                </div>
                            ))}
                        </div>

                        <MainButton
                            text={cta ? cta : translation?.buttons?.viewAllTractorbrands}
                            linkUrl={tractorBrandsUrl}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default AgricultureFarmTractorsByBrands;
