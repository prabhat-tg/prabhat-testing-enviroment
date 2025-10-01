import React from 'react'
import GoogleAdHorizontalClientWrapper from '../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper'
import GoogleAdVerticalClientWrapper from '../social/GoogleAdVertical/GoogleAdVerticalClientWrapper'
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs'
import TyreContentToggle from "@/src/features/tyre/tyre-price/TyreContentToggle";
import ConstructionMachineryType from './ConstructionMachineryType';

const ConstructionMachineryTopSection = ({
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
            href: '/',
            title: translation?.breadcrubm.home || 'Home',
        },
        ...((parentHeading === 'Escorts Kubota' ||
            parentHeading === 'एस्कॉर्ट्स कुबोटा' ||
            parentHeading === 'Tafe' ||
            parentHeading === 'टैफे' ||
            parentHeading === 'Mahindra' ||
            parentHeading === 'महिंद्रा' ||
            parentHeading === 'आईटीएल' ||
            parentHeading === 'itl')
            ? [
                {
                    label: translation.headings.TractorBrands,
                    href: `/${currentLang === 'hi' ? 'hi/' : ''}tractor-brands`,
                    title: translation.headings.TractorBrands,
                },
            ]
            : []),
        {
            label:
                heading || translation.headings.ConstructionMachineryandEquipmentinIndia,
            title:
                heading || translation.headings.ConstructionMachineryandEquipmentinIndia,
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
                            translation.headings.ConstructionMachineryandEquipmentinIndia
                        }
                        breadcrumbs={breadcrumbs}
                    />

                    {/* Content + Ads */}
                    <div className="flex lg:flex-row flex-col items-start gap-0 lg:gap-8 w-full">
                        <div className="flex flex-col flex-[2] space-y-4 last:mb-0">
                            {/* Left Content (only show if content exists) */}
                            {hasHtml && (
                                <div className="shadow-main p-4 rounded-2xl w-full font-normal text-gray-dark text-sm">
                                    <div id="tyre-top-content" className="relative">
                                        <div
                                            className="z-10 absolute inset-0 pointer-events-none"
                                            aria-hidden="true"
                                            style={{ display: 'none' }}
                                        />
                                        <div
                                            className="tyre-top-content text-base leading-6"
                                            dangerouslySetInnerHTML={safeContent}
                                        />
                                        <TyreContentToggle deviceType={deviceType} />
                                    </div>
                                </div>
                            )}

                            {/* Construction Types (always visible) */}
                            <div className="last:mb-0">

                                <ConstructionMachineryType
                                    translation={translation}
                                    parent={parent}
                                    hasHtml={hasHtml}
                                    parentHeading={parentHeading}
                                    currentLang={currentLang}
                                />
                            </div>
                        </div>

                        {/* Right side (Ads only if content exists) */}
                        {hasHtml && (
                            <div className="flex-1 lg:max-w-[300px]">
                                {!isMobile && (
                                    <GoogleAdVerticalClientWrapper />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section >
        </>
    );
};

export default ConstructionMachineryTopSection;
