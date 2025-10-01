// Tractor Implement Brand/SubType Page
import React from 'react';

import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { isMobileView, prepareTyreListingComponent } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';

import TyresPriceList from '@/src/features/tyre/tyre-price/ListingMainSection';
import TyresListingClient from '@/src/features/tyre/allTyreListing/tyresListing/TyresListingClient';
import TyrePageHeader from '@/src/features/tyre/allTyreListing/tyresListing/TyrePageHeader';
import UpdatesSection from '@/src/features/tyreComponents/components/updatesAbouteTyre/UpdatesSection';
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import {
    getTyreReels,
    getTyreVideos,
    getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import NavComponents from '@/src/features/tyre/NavComponents';
import FooterComponents from '@/src/features/tyre/FooterComponents';
import AboutTractorGyanServer from '@/src/components/shared/about/AboutTractorGyanServer';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import TractorListing from '@/src/features/tractors/listing/TractorListing';
import NewsSection from '@/src/features/tyre/tyreNews/NewsSection';
import Link from 'next/link';
import TyrePriceInquireForm from '../tyreComponents/components/forms/InquireForm';
import {
    tgb_implement_on_road_price,
    tgb_implement_on_road_price_mobile,
} from '@/src/utils/assets/banners';
import { getAllImplementTypes } from '@/src/services/implement/all-implement-types';
import SubCategoryTabs from '@/src/components/shared/sub-category-tabs/SubCategoryTabs';
import { getImplementNews } from '@/src/services/implement/implement-news';
import { getAllImplementBrandsByType } from '@/src/services/implement/all-implement-brands-by-type';
import { getImplementBrandFAQs } from '@/src/services/implement/get-all-implement-brand-faqs';
import { getImplementTypeTopContent } from '@/src/services/implement/get-implement-type-top-content';
import { getSEOByPage } from '@/src/services/seo/get-page-seo';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { checkImplementSubTypeOrBrand } from '@/src/services/implement/check-implement-sub-type-or-brand';
import { getImplementTypeCommonList } from '@/src/services/implement/implement-type-common-list';
import { getImplementCategoryFilter } from '@/src/services/implement/get-implement-category-filter';
import ImplementsCategorySlider from '@/src/components/implements/ImplementsCategorySlider';
import { getAllImplementCategories } from '@/src/services/implement/all-implement-categories';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';

export const dynamic = 'force-dynamic';

export default async function TractorImplementBrandSubTypePage({ params, searchParams }) {
    const param = await params;
    const searchParamObj = await searchParams;
    const currentLang = await getSelectedLanguage();
    const translation = await getDictionary(currentLang);

    const isMobile = await isMobileView();

    const pageSlug = `tractor-implements-in-india/${param.slug}/${param.subSlug}`;

    let pageData = null;
    let implementType = '', implementTypeHi = '';
    let brandName = '', brandNameHi = '';
    let subTypeName = '', subTypeNameHi = '';
    let displayName = '';
    let type_id = null;

    // Check if the subSlug is a brand or sub-type
    try {
        const checkResponse = await checkImplementSubTypeOrBrand(`?implement_check_slug=${pageSlug}&lang=${currentLang === 'hi' ? 'hi' : 'en'}`);

        console.log("Check Implement SubType or Brand Response:", `?implement_check_slug=${pageSlug}&lang=${currentLang === 'hi' ? 'hi' : 'en'}`, checkResponse);

        if (checkResponse && checkResponse.success && checkResponse.data && checkResponse.data[0]) {
            pageData = checkResponse.data[0];
            implementType = pageData.implement_type;
            implementTypeHi = pageData.implement_type_hi;
            brandName = pageData.brand;
            brandNameHi = pageData.brand_hi;
            subTypeName = pageData.sub_type;
            subTypeNameHi = pageData?.sub_type_hi;

            // Determine display name based on whether it's a brand or sub-type
            if (brandName) {
                displayName = currentLang == 'hi' ? brandNameHi : brandName;
                // Set type_id for brand pages
                type_id = isMobile ? 117 : 116; // 116 for brand + type desktop, 117 for brand + type mobile
            } else if (subTypeName) {
                displayName = currentLang == 'hi' ? subTypeNameHi : subTypeName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                // Set type_id for sub-type pages
                type_id = isMobile ? 119 : 118; // 118 for implement type + sub type desktop, 119 for implement type + sub type mobile
            }
        }
    } catch (error) {
        console.error('Error checking implement sub type or brand:', error);
        // Handle error - maybe redirect or show 404
    }

    // Fetch type_id for enquiry form
    // try {
    //     const enquiryTypeResponse = await getImplementEnquiryTypeId({
    //         implement_type: param.slug,
    //         device_type: isMobile ? 'mobile' : 'desktop',
    //     });
    //     if (enquiryTypeResponse && enquiryTypeResponse.success) {
    //         type_id = enquiryTypeResponse.enquiry_id;
    //     }
    // } catch (error) {
    //     console.error('Failed to fetch enquiry type ID:', error);
    //     type_id = null;
    // }

    // Fetch listing data using the new API
    let listingData = [];
    let totalCount = 0;
    const currentPage = parseInt(searchParamObj.page) || 1;
    const ITEMS_PER_PAGE = 16;
    const startLimit = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const listingPayload = {
            implement_type: param.slug,
            search_keyword: searchParamObj.search || '',
            start_limit: startLimit,
            end_limit: ITEMS_PER_PAGE,
            latest_implement: searchParamObj.latest === 'yes' ? 'yes' : 'no',
            popular_implement: searchParamObj.popular === 'yes' ? 'yes' : 'no',
            lang: currentLang === 'hi' ? 'hi' : 'en',
        };

        // Add brand_name or category_name based on the type
        if (brandName) {
            listingPayload.brand_name = brandName;
        } else if (subTypeName) {
            listingPayload.category_name = subTypeName;
        }

        const listingResponse = await getImplementTypeCommonList(listingPayload);

        if (listingResponse && listingResponse.success) {
            listingData = listingResponse.data || [];
            totalCount = listingResponse.count_data || 0;
            listingData = listingData.map(item => ({
                ...item,
                image: '/' + item.image,
            }));
        }
    } catch (error) {
        console.error('Error fetching listing data:', error);
        listingData = [];
        totalCount = 0;
    }

    // Calculate pagination
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const hasNextPage = currentPage < totalPages;

    let news = [];
    try {
        news = await getImplementNews(`${param.slug}`);
    } catch (error) {
        news = [];
    }

    // Create proper heading titles based on brand vs sub-type
    let headingTitle = '';
    if (brandName) {
        // For brand pages: "Agrizone Plough Implement in India"
        headingTitle = `${(translation.headings.allImplementsByBrand).replace('{brand}', currentLang == 'hi' ? brandNameHi : brandName)} ${currentLang == 'hi' ? implementTypeHi : implementType}`;
    } else if (subTypeName) {
        // For sub-type pages: "Laser leveler Tractor Laser Land Leveler Implements"
        const formattedSubType = currentLang == 'hi' ? subTypeNameHi : subTypeName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const formattedImplementType = currentLang == 'hi' ? implementTypeHi : implementType.replace(/\b\w/g, l => l.toUpperCase());
        headingTitle = `${(translation.headings.allImplementsByBrand).replace('{brand}', formattedSubType)}`;
    } else {
        // Fallback
        headingTitle = `${currentLang == 'hi' ? implementTypeHi : implementType} ${displayName} ${translation.whatsappPopup.implements}`;
    }

    const category = 'Implements';

    let implementCategories = [];
    try {
        implementCategories = await getAllImplementCategories();
    } catch (error) {
        implementCategories = [];
    }

    const [videos, reels, webstories] = await Promise.all([
        getTyreVideos(pageSlug),
        getTyreReels(pageSlug),
        getTyreWebstories(pageSlug),
    ]);

    let topContent;
    try {
        topContent = await getImplementTypeTopContent({
            ad_title: pageSlug,
            ad_type_content_lang: currentLang,
            device_type: isMobile ? 'mobile' : 'desktop',
            page_type: 'implement_type_brand_page'
        });
    } catch (error) {
        console.error('Failed to fetch implement top content:', error);
        topContent = null;
    }

    let allImplementBrands = [];
    try {
        allImplementBrands = await getAllImplementBrandsByType(`${param.slug}`);
    } catch (error) {
        console.error('Failed to fetch implement brands data:', error);
        allImplementBrands = [];
    }

    const allImplementTypes = await getAllImplementTypes();

    let faqs = [];
    try {
        const faqResponse = await getImplementBrandFAQs({
            faq_tag: pageSlug,
            faq_lang: currentLang,
        });
        if (faqResponse && faqResponse.success) {
            faqs = faqResponse.data || [];
        }
    } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        faqs = [];
    }

    let subcategories = [];
    try {
        const categoryFilterResponse = await getImplementCategoryFilter({
            implement_type: param.slug,
            lang: currentLang,
        });
        if (categoryFilterResponse && categoryFilterResponse.success) {
            subcategories = categoryFilterResponse.data.map(item => ({
                name: item.name,
                name_en: item.name_en,
                img: item.image,
                url: item.url,
                sr_no: item.sr_no,
            }));
        }
    } catch (error) {
        console.error('Failed to fetch subcategories:', error);
    }

    // Prepare listing component props
    const { tyresListingClientProps, tyresListingProps } = await prepareTyreListingComponent({
        param: param,
        searchParamsObj: searchParamObj,
        pageType: 'implements',
        pageSlug,
        prefLang: currentLang,
        translation,
        allImplementTypes: allImplementTypes,
        showBrandFilter: false, // Hide brand filter if we're already filtering by brand
        showSizeFilter: false,
        showTyreBrandsSection: false,
        showImplementBrandsSection: !brandName,
        showImplementTypesSection: true,
        showLocationFilter: false,
        subcategories: subcategories,
        showTractorHPFilter: false,
        filterBySize: false,
        isMobile,
        ITEMS_PER_PAGE: ITEMS_PER_PAGE,
        tyreBrands: allImplementBrands,
        brandPageUrl: null,
        basePathFromUrl: null,
        basePath: `${currentLang === 'hi' ? '/hi' : ''}/tractor-implements-in-india/${param.slug}/${param.subSlug}`,
        customListingData: listingData,
        customTotalCount: totalCount,
        customCurrentPage: currentPage,
        customTotalPages: totalPages,
        customHasNextPage: hasNextPage,
    });

    // Generate URLs for pagination
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tractorgyan.com';
    const langPrefix = currentLang === 'hi' ? '/hi' : '';
    const pageUrl = `${langPrefix}/tractor-implements-in-india/${param.slug}/${param.subSlug}`;

    const canonicalUrl = currentPage > 1 ? `${baseUrl}${pageUrl}?page=${currentPage}` : `${baseUrl}${pageUrl}`;
    const prevUrl = currentPage > 1
        ? currentPage === 2
            ? `${baseUrl}${pageUrl}`
            : `${baseUrl}${pageUrl}?page=${currentPage - 1}`
        : null;
    const nextUrl = hasNextPage ? `${baseUrl}${pageUrl}?page=${currentPage + 1}` : null;


    let seoData, seoHtml;

    if (brandName) {
        seoHtml = await getDetailPageHeaderSEO({
            page_type: 'implement_brand_type_page',
            brand_slug: brandName,
            implement_slug: param.slug,
            lang: currentLang
        })
    } else {
        seoData = await getSEOByPage((currentLang === 'hi' ? 'hi/' : '') + pageSlug);
    }

    return (
        <main>
            <SeoHead
                seo={seoData}
                staticMetadata={{}}
                paginationLinks={{
                    canonical: canonicalUrl,
                    prev: prevUrl,
                    next: nextUrl,
                }}
                seoHTMLDescription={seoHtml?.data}
            />
            <NavComponents translation={translation} isMobile={isMobile} prefLang={currentLang} />
            <div className="lg:mt-[159px]">
                <TyresPriceList
                    showBanner={true}
                    headingTitle={headingTitle}
                    currentLang={currentLang}
                    translation={translation}
                    priceList={listingData}
                    tyreTopContent={topContent}
                    brandName={displayName}
                    category={category}
                    showOutline={true}
                    tableHeaders={[
                        {
                            key: `implementModel`,
                            width: 'w-[40%]',
                            dataKey: item => (
                                <Link
                                    href={(currentLang === 'hi' ? '/hi' : '') + (item.page_url || '#')}
                                    className="hover:text-primary-dark font-bold text-primary transition-colors duration-200"
                                    title={`${item.brand_name} ${item.model}`}
                                >
                                    {`${item.brand_name} ${item.model}`}
                                </Link>
                            ),
                        },
                        {
                            key: `implementPower`,
                            width: 'w-[20%]',
                            dataKey: item => item.implement_power,
                        },
                        {
                            key: `implementPrice`,
                            width: 'w-[40%]',
                            dataKey: item => item.price,
                        },
                    ]}
                    breadcrumbs={[
                        {
                            label: translation.breadcrubm.tractorGyanHome,
                            href: (currentLang === 'hi' ? '/hi' : '') + '/',
                            title: translation.breadcrubm.tractorGyanHome
                        },
                        {
                            label: translation.headerNavbar.tractorImplements,
                            href: (currentLang === 'hi' ? '/hi' : '') + '/tractor-implements-in-india',
                            title: translation.headerNavbar.tractorImplements,
                        },
                        {
                            label: `${translation.common.tractor} ${currentLang == 'hi' ? implementTypeHi : implementType} ${translation.headerNavbar.implement}`,
                            href: (currentLang === 'hi' ? '/hi' : '') + `/tractor-implements-in-india/${param.slug}`,
                            title: `${translation.common.tractor} ${currentLang == 'hi' ? implementTypeHi : implementType} ${translation.headerNavbar.implement}`,
                        },
                        {
                            label: `${currentLang == 'hi' ? implementTypeHi : implementType} ${displayName}`,
                            title: `${currentLang == 'hi' ? implementTypeHi : implementType} ${displayName}`,
                            isCurrent: true,
                        },
                    ]}
                    deviceType={isMobile ? 'mobile' : 'desktop'}
                    productType="implement"
                />
            </div>

            <section className="bg-section-gray py-6 md:py-8 lg:py-10">
                <div className="container mx-auto">
                    <TyrePageHeader
                        isMobile={isMobile}
                        brandName={displayName}
                        translation={translation}
                        heading={brandName ? translation?.headings?.allImplementsByBrand : `${currentLang == 'hi' ? implementTypeHi : implementType} ${currentLang == 'hi' ? subTypeNameHi : subTypeName}`}
                        activeFilters={tyresListingProps.activeFilters}
                        tyresListingClientProps={tyresListingClientProps}
                        searchPlaceholder={translation.placeholder.SearchForImplements}
                        searchParam={pageUrl}
                    />

                    {(subcategories.length && isMobile) ? (
                        <SubCategoryTabs
                            heading={translation.headerNavbar.combineHarvesterByCategory}
                            subcategories={subcategories}
                            currentLang={currentLang}
                        />
                    ) : null}

                    <div className="flex flex-col gap-6 md:flex-row lg:gap-2 xl:gap-6">
                        {!isMobile && (
                            <div className="md:w-[32%] lg:w-[24%] xl:w-[30%]">
                                <TyresListingClient {...tyresListingClientProps} basePath={`${currentLang === 'hi' ? '/hi' : ''}/tractor-implements-in-india/${param.slug}/${param.subSlug}`} />
                            </div>
                        )}

                        <div className="flex-1">
                            <TractorListing {...tyresListingProps} basePath={`${currentLang === 'hi' ? '/hi' : ''}/tractor-implements-in-india/${param.slug}/${param.subSlug}`} />
                        </div>
                    </div>
                </div>
            </section>

            <TyrePriceInquireForm
                bgColor="bg-green-lighter"
                formTitle={`${(translation.enquiryForm.getImplementPriceByType).replace('{type}', displayName)}`}
                tyreBrands={allImplementBrands}
                translation={translation}
                currentLang={currentLang}
                banner={tgb_implement_on_road_price}
                mobileBanner={tgb_implement_on_road_price_mobile}
                isMobile={isMobile}
                implementTypeId={type_id}
                preFilledBrand={brandName || ''}
                type='IMPLEMENT'
                pageName={brandName ? 'implement_brand' : 'implement_subtype'}
                pageSource={`/tractor-implements-in-india/${param.slug}/${param.subSlug}`}
                implementType={implementType}
            />

            <ImplementsCategorySlider
                bgColor='bg-section-gray'
                isMobile={isMobile}
                heading={translation.headerNavbar.implementByCategory}
                categories={implementCategories}
                currentLang={currentLang}
            />

            <NewsSection
                translation={translation}
                langPrefix={currentLang}
                news={news}
                title={`${displayName} ${translation.headings.ImplementBlogsNews}`}
                bgColor={'bg-section-white'}
                showFilter={false}
            />

            <UpdatesSection
                bgColor={'bg-section-gray'}
                videos={videos}
                reels={reels}
                webstories={webstories}
                translation={translation}
                slug={'tractor-implements-in-india'}
                moduleType={'implement'}
                brandName={displayName}
                linkUrls={{
                    videos: `${currentLang === 'hi' ? '/hi' : ''}/tractor-videos`,
                    webstories: `${currentLang === 'hi' ? '/hi' : ''}/web-story-in-india`,
                    reels: `${currentLang === 'hi' ? '/hi' : ''}/tractor-reels-and-shorts`,
                }}
            />

            <TyreFAQs
                faqs={faqs}
                translation={translation}
                headingKey={'faqs.implements'}
                brandName={displayName}
                isDynamicTitle={true}
                bgColor="bg-white"
            />

            <JoinOurCommunityServer translation={translation} currentLang={currentLang} />
            <TractorGyanOfferings translation={translation} />
            <AboutTractorGyanServer
                slug={`${currentLang === 'hi' ? 'hi/' : ''}tractor-implements-in-india/${param.slug}/${param.subSlug}`}
                translation={translation}
            />
            <FooterComponents translation={translation} />
            <WhatsAppTopButton
                translation={translation}
                currentLang={currentLang}
                defaultEnquiryType={'Implement'}
                isMobile={isMobile}
            />
        </main>
    );
}
