import React from 'react'
import GoogleAdHorizontalClientWrapper from '../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper'
import GoogleAdVerticalClientWrapper from '../social/GoogleAdVertical/GoogleAdVerticalClientWrapper'
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs'
import TyreContentToggle from "@/src/features/tyre/tyre-price/TyreContentToggle";
import ConstructionMachineryType from './ConstructionMachineryType';

const ConstructionMachineryTopSection = ({ isMobile, translation, currentLang,
    topContent,
    deviceType,
    tyreTopContent,
}) => {

    let content = '';
    let banners = [];
    if (tyreTopContent) {
        content = tyreTopContent?.ad_content || tyreTopContent?.content || '';
        banners = tyreTopContent?.banner || [];
    }

    if (topContent) {
        content = topContent.ad_content;
    }


    return (
        <>
            <section className="lg:mt-40 pt-3.5 pb-0">
                <div className="relative container">
                    {/* Title + Breadcrumbs */}
                    <TittleAndCrumbs
                        title="Construction Machinery and Equipment in India"
                        breadcrumbs={[
                            { label: "Home", href: "/", title: "Home" },
                            {
                                label: "Construction Machinery and Equipment in India",
                                title: "Construction Machinery and Equipment in India",
                                isCurrent: true,
                            },
                        ]}
                    />

                    {/* Content + Ads */}
                    <div className="flex lg:flex-row flex-col gap-8 w-full">
                        {/* Left side (Content + Construction Types) */}
                        <div className="flex flex-col flex-[2]">
                            {/* Left Content */}
                            <div

                                className="shadow-main p-4 rounded-2xl w-full font-normal text-gray-dark text-sm"
                            >
                                <div id="tyre-top-content" className="relative">
                                    <div
                                        className="z-10 absolute inset-0 pointer-events-none"
                                        aria-hidden="true"
                                        style={{ display: "none" }}
                                    />
                                    <div

                                        className="tyre-top-content text-base leading-6"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    />
                                    <TyreContentToggle deviceType={deviceType} />

                                </div>

                            </div>

                            {/* Construction Types */}
                            <div className="mt-8">
                                <ConstructionMachineryType translation={translation} />
                            </div>
                        </div>

                        {/* Right side (Ads) */}
                        <div className="flex-1 lg:max-w-[300px]">
                            {isMobile ? (
                                <GoogleAdHorizontalClientWrapper />
                            ) : (
                                <GoogleAdVerticalClientWrapper />
                            )}
                        </div>
                    </div>



                </div>
            </section>


        </>
    )
}

export default ConstructionMachineryTopSection

