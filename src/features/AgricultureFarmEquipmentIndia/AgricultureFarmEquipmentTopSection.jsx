

import React from 'react'
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs'
import TyreContentToggle from "@/src/features/tyre/tyre-price/TyreContentToggle";

const AgricultureFarmEquipmentTopSection = ({
    isMobile,
    translation,
    currentLang,
    topContent,
    deviceType,
    tyreTopContent,
    heading,
    parent,
    parentHeading,
}) => {
    // pick content from tyreTopContent first, then override with topContent if present
    let content = '';
    let banners = [];
    if (tyreTopContent) {
        content = tyreTopContent?.ad_content || tyreTopContent?.content || '';
        banners = tyreTopContent?.banner || [];
    }

    if (topContent) {
        content = topContent?.ad_content ?? topContent?.content ?? content;
    }

    // normalize content for dangerouslySetInnerHTML
    const safeContent =
        content && typeof content === 'object' && content.__html
            ? content
            : { __html: String(content || '') };

    const hasHtml = (safeContent?.__html || '').toString().trim().length > 0;

    // compute breadcrumbs once
    const breadcrumbs = [
        {
            label: translation?.breadcrubm.home || 'Home',
            href: currentLang == 'hi' ? '/hi' : '/',
            title: translation?.breadcrubm.home || 'Home',
        },

        {
            label:
                heading || translation.headings.AgricultureandFarmEquipmentinIndia,
            title:
                heading || translation.headings.AgricultureandFarmEquipmentinIndia,
            href: currentLang == 'hi' ? '/hi/agriculture-and-farm-equipment-in-india' : '/agriculture-and-farm-equipment-in-india',
            isCurrent: true,
        },
    ];

    return (
        <>
            <section className="lg:mt-40 pt-3.5 pb-0">
                <div className="relative container">
                    {/* Title + Breadcrumbs */}
                    <TittleAndCrumbs
                        title={
                            heading ||
                            translation.headings.AgricultureandFarmEquipmentinIndia
                        }
                        breadcrumbs={breadcrumbs}
                    />
                    {/* Content + Ads */}
                    <div className="flex lg:flex-row flex-col gap-8 w-full">
                        {/* Left side */}
                        {hasHtml && (
                            <div className="shadow-main p-4 rounded-2xl w-full font-normal text-gray-dark text-sm">
                                <div id="tyre-top-content" className="relative">
                                    <div
                                        className="z-10 absolute inset-0 pointer-events-none"
                                        aria-hidden="true"
                                        style={{ display: "none" }}
                                    />
                                    <div
                                        className="tyre-top-content text-base leading-6"
                                        dangerouslySetInnerHTML={safeContent}
                                    />
                                    <TyreContentToggle deviceType={deviceType} />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default AgricultureFarmEquipmentTopSection;