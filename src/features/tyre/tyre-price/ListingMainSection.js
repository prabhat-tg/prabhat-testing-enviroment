import React from 'react';
import TyreContentToggle from './TyreContentToggle';
import PriceListToggle from './PriceListToggle';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import TyrePriceBannerClient from './TyrePriceBannerClient';
// import BannerSlider from '@/src/components/shared/bannners/BannerSlider';
import HeightSyncClient from './HeightSyncClient';
import dynamic from 'next/dynamic';
import ClickHereClient from '@/src/components/shared/client/ClickHereClient';
const BannerSlider = dynamic(() => import('@/src/components/shared/bannners/BannerSlider'), {
  loading: () => <div style={{ minHeight: '250px' }} />,
  ssr: true
});

const TyresPriceList = ({
  currentLang,
  translation,
  priceList,
  tyreTopContent,
  deviceType,
  headingKey,
  headingTitle,
  brandName = '',
  breadcrumbs = null,
  showBanner = false,
  tableHeaders = null,
  productType = 'tyre',
  showOutline = false
}) => {
  // Ensure currentLang is correct
  // const langPrefix = currentLang === 'hi' ? '/hi' : '';
  if (!headingTitle) headingTitle = tg_getTittleFromNestedKey(translation, headingKey);

  // Prepare content and image URL on server side
  let content = '';
  let banners = [];
  if (tyreTopContent) {
    content = tyreTopContent?.ad_content || tyreTopContent?.content || '';
    banners = tyreTopContent?.banner || [];
  }

  const currentDate = new Date()
    .toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    })
    .replace(/,/g, '');

  const isMobile = deviceType === 'mobile';

  // Default breadcrumbs if not passed from parent
  const defaultBreadcrumbs = [
    {
      label: translation.breadcrubm.home,
      href: currentLang === 'hi' ? '/hi' : '/',
      title: translation.breadcrubm.home,
    },
    {
      label: translation.headerNavbar.tyreHome,
      href: currentLang === 'hi' ? '/hi/tractor-tyre-in-india' : '/tractor-tyre-in-india',
      title: translation.headerNavbar.tyreHome,
    },
    {
      label: translation.breadcrubm.brandTyres.replace('{brand}', brandName),
      title: translation.breadcrubm.brandTyres.replace('{brand}', brandName),
      isCurrent: true,
    },
  ];

  // Use passed breadcrumbs or fall back to default
  const finalBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

  // Default table headers for tyres (backward compatibility)
  const defaultTableHeaders = [
    {
      key: 'tractorTyreModel',
      width: 'w-[45%]',
      dataKey: item => item.brand_name + ' ' + item.modal_name,
    },
    {
      key: 'tyreSize',
      width: 'w-[20%]',
      dataKey: item => item.size,
    },
    {
      key: 'tyrePrice',
      width: 'w-[35%]',
      dataKey: item => `Rs. ${item.tyre_price}*`,
    },
  ];

  // Use passed table headers or fall back to default
  const finalTableHeaders = tableHeaders || defaultTableHeaders;

  return (
    <section className="pt-4 lg:mt-[144px]">
      <div className="container relative">
        {showBanner && (
          <>
            {/* Use BannerSlider if banners are available from tyreTopContent, otherwise use default TG_Banner */}
            {
              banners && banners.length > 0 && (
                <BannerSlider translation={translation} isMobile={isMobile} banners={banners} additionalClasses="max-h-auto" showOutline={showOutline} />
              )
              // : (
              //   <TG_Banner
              //     imgUrl={'/assets/images/placeholder-banner-01.svg'}
              //     mobileImgUrl={'/assets/images/placeholder-banner-01-mobile.svg'}
              //     additionalClasses="max-h-auto"
              //   />
              // )
            }
          </>
        )}
        <TittleAndCrumbs title={headingTitle} breadcrumbs={finalBreadcrumbs} />
        <div className="flex h-full w-full flex-col gap-8 lg:flex-row lg:items-start">
          <div
            id="left-content"
            className="h-full w-full rounded-2xl p-3 md:p-4 text-sm font-normal text-gray-dark shadow-main lg:max-w-[700px] xl:max-w-[900px]"
          >
            {/* SEO: Render all content for crawlers */}
            <div id="tyre-top-content" className="relative">
              <div
                className="pointer-events-none absolute inset-0 z-10"
                aria-hidden="true"
                style={{ display: 'none' }}
              />
              <div
                className="tyre-top-content text-base leading-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {/* Client-side expand/collapse overlay */}
              <TyreContentToggle deviceType={deviceType}
                {...(productType === 'tractor' ? { maxMobileHeight: 'max-h-24' } : {})}
              />
            </div>
          </div>

          <div className="right-price-container h-auto w-full rounded-lg shadow-main lg:max-w-[Calc(100%_-_700px)] xl:max-w-[Calc(100%_-_778px)]">
            {/* Show image container on desktop when price list is empty - outside of toggle */}
            {!priceList || priceList.length === 0 ? (
              <div className="h-full lg:flex lg:items-stretch">
                <TyrePriceBannerClient currentLang={currentLang} translation={translation} productType={productType === 'tractor' ? "Tractor" : "Tyre"} />
              </div>
            ) : (
              <div
                className="h-full overflow-hidden rounded-b-lg lg:flex lg:flex-col"
                itemScope
                itemType="https://schema.org/Table"
              >
                <PriceListToggle
                  isMobile={isMobile}
                  brandName={brandName}
                  langPrefix={currentLang}
                  productType={productType}
                />

                {/* Price List Content - Always rendered for SEO, hidden on mobile by CSS */}
                <div
                  className={`custom-scroller max-h-0 rounded-b-lg transition-all duration-300 ease-in-out md:max-h-[150px] md:overflow-y-auto lg:min-h-0 lg:overflow-y-auto`}
                  id="price-list-content"
                  style={{
                    maxHeight: isMobile ? undefined : 'calc(100vh - 200px)', // Fallback for desktop
                  }}
                >
                  <table className="w-full bg-white p-2 shadow-main">
                    <thead className="sticky top-0 z-10 bg-white">
                      <tr className="flex gap-2 border-b-[1px] border-gray-light px-2 py-2.5 md:gap-4">
                        {finalTableHeaders.map((header, index) => (
                          <td key={index} className={`${header.width} text-center`}>
                            <span className="text-sm font-bold text-black">
                              {translation.headings[header.key]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="">
                      {priceList?.map((item, index) => (
                        <tr
                          key={index}
                          className="flex gap-2 border-b-[1px] border-gray-light px-2 py-2.5 md:gap-4"
                        >
                          {finalTableHeaders.map((header, headerIndex) => (
                            <td key={headerIndex} className={`${header.width} text-center`}>
                              <span
                                className={
                                  headerIndex === 0
                                    ? 'text-xs font-normal text-gray-dark'
                                    : 'text-sm font-medium text-black'
                                }
                              >
                                {typeof header.dataKey === 'function'
                                  ? header.dataKey(item)
                                  : item[header.dataKey]}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="flex justify-center gap-4 border-b-[1px] border-gray-light px-1.5 py-1.5">
                        <td colSpan={finalTableHeaders.length}>
                          <span className="mx-auto text-[10px] font-medium text-gray-dark grid gap-0 text-center">
                            {/* <span>
                              {translation.headings.dataLastUpdatedOn}: {currentDate}{' '}
                            </span> */}
                            <span>{translation.headings.priceMayVaryFromStateToState} <ClickHereClient translation={translation} currentLang={currentLang} isMobile={isMobile} /> </span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Client-side height synchronization */}
        <HeightSyncClient />
      </div>
    </section>
  );
};

export default TyresPriceList;
