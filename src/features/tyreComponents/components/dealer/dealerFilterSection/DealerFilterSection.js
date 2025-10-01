import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import DealerListing from '../dealerListing/DealerListing';
import DealerFilterClient from './DealerFilterClient';
import Link from 'next/link';
import Image from 'next/image';

const PAGE_SIZE = 15;

export default async function DealerFilterSection({
  page,
  urlSlug,
  translation,
  isMobile,
  dealerResult,
  currentPage = 1,
  searchParams = {},
  tyreBrands,
  states = [],
  routeSlug = [],
  suggestedDealers,
  currentLang = 'en',
  dealerType = 'tyre', // New prop to distinguish between tyre and tractor dealers
}) {
  // Get filters and pagination from query params
  // const currentPage = Number(searchParams?.page) || 1;
  let selectedBrand = dealerResult?.brand_name || '';
  let selectedState = dealerResult?.state || '';
  let selectedCity = dealerResult?.city || '';
  console.log('Route Slug:', routeSlug);

  // let searchKeyword = searchParams?.search || "";

  // const offset = (currentPage - 1) * PAGE_SIZE;

  // Fetch all data server-side for SEO
  // const [states] = await Promise.all([getAllStates()]);

  // console.log('--dealerResult', dealerResult);

  const dealerDetails = dealerResult?.data || [];
  const totalCount = dealerResult?.count || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Function to generate dynamic title based on page context (similar to FAQ heading logic)
  const getDynamicTitle = () => {
    const hasBrand = selectedBrand;
    const hasState = selectedState;
    const hasCity = selectedCity;

    // Determine if we're in Hindi mode
    const isHindi = currentLang === 'hi';

    // Get dealer type text based on language
    let dealerTypeTextPlural;
    if (page === 'implement') {
      dealerTypeTextPlural = translation?.dealer?.implementDealers || 'Implement Dealers';
    } else if (dealerType === 'tractor') {
      dealerTypeTextPlural = translation?.dealer?.tractorDealers || 'Tractor Dealers';
    } else {
      dealerTypeTextPlural = translation?.dealer?.tyreDealers || 'Tyre Dealers';
    }

    // Generate titles with proper grammar for each language
    if (isHindi) {
      // Hindi grammar patterns
      if (hasBrand && hasState && hasCity) {
        return `${selectedCity}, ${selectedState} में ${selectedBrand} ${dealerTypeTextPlural} खोजें`;
      }
      if (hasBrand && hasState) {
        return `${selectedState} में ${selectedBrand} ${dealerTypeTextPlural} खोजें`;
      }
      if (hasState && hasCity) {
        return `${selectedCity}, ${selectedState} में ${dealerTypeTextPlural} खोजें`;
      }
      if (hasBrand) {
        return `${selectedBrand} ${dealerTypeTextPlural} खोजें`;
      }
      if (hasState) {
        return `${selectedState} में ${dealerTypeTextPlural} खोजें`;
      }
      if (hasCity) {
        return `${selectedCity} में ${dealerTypeTextPlural} खोजें`;
      }
    } else {
      // English grammar patterns
      if (hasBrand && hasState && hasCity) {
        return `Find ${selectedBrand} ${dealerTypeTextPlural} in ${selectedCity}, ${selectedState}`;
      }
      if (hasBrand && hasState) {
        return `Find ${selectedBrand} ${dealerTypeTextPlural} in ${selectedState}`;
      }
      if (hasState && hasCity) {
        return `Find ${dealerTypeTextPlural} in ${selectedCity}, ${selectedState}`;
      }
      if (hasBrand) {
        return `Find ${selectedBrand} ${dealerTypeTextPlural}`;
      }
      if (hasState) {
        return `Find ${dealerTypeTextPlural} in ${selectedState}`;
      }
      if (hasCity) {
        return `Find ${dealerTypeTextPlural} in ${selectedCity}`;
      }
    }

    // Default fallback using existing translations
    return page === 'implement'
      ? translation?.headings?.findImplementDealerNearYou || 'Find Implement Dealer Near You'
      : dealerType === 'tractor'
        ? translation?.tractorDealers?.findDealers || 'Find Tractor Dealers'
        : translation?.headings?.findTyreDealerNearYou || 'Find Tyre Dealer Near You';
  };

  // Banner images
  const bannerImageDesktop =
    page === 'implement'
      ? 'https://images.tractorgyan.com/uploads/118597/67f9091c36751-implement-dealer-desktop-banner.webp'
      : dealerType === 'tractor'
        ? 'https://images.tractorgyan.com/uploads/120980/1757481146Tractor-Dealers-Banner.webp' // Use appropriate tractor banner
        : 'https://images.tractorgyan.com/uploads/117673/67988ae001a95-tyre-dealer-banner-desktop.webp';
  const bannerImageMobile =
    page === 'implement'
      ? 'https://images.tractorgyan.com/uploads/118598/67f90a352f3f4-implement-dealer-mobile-banner.webp'
      : dealerType === 'tractor'
        ? 'https://images.tractorgyan.com/uploads/120679/68a6dd5e4417e-tractor-dealer-banner-mobile.webp' // Use appropriate tractor mobile banner
        : 'https://images.tractorgyan.com/uploads/117674/67988ae896d7f-tyre-dealer-banner-mobile.webp';

  return (
    <section className="container lg:mt-[172px]">
      <div className=" relative">
        {/* <div className={isMobile ? `w-[90%] m-auto` : ``}>
        </div> */}
        <TittleAndCrumbs
          title={getDynamicTitle()}
          breadcrumbs={(() => {
            const breadcrumbs = [
              {
                label:
                  dealerType === 'tractor'
                    ? translation?.breadcrubm?.tractorGyanHome || 'TractorGyan Home'
                    : translation?.breadcrubm?.home || 'Home',
                href: currentLang === 'hi' ? '/hi' : '/',
                title:
                  dealerType === 'tractor'
                    ? translation?.breadcrubm?.tractorGyanHome || 'TractorGyan Home'
                    : translation?.breadcrubm?.home || 'Home',
              },
              {
                label:
                  page === 'implement'
                    ? translation?.breadcrubm?.implementDealers || 'Implement Dealers'
                    : dealerType === 'tractor'
                      ? translation?.breadcrubm?.tractorDealers || 'Tractor Dealers'
                      : translation?.breadcrubm?.tyreDealers || 'Tyre Dealers',
                ...(routeSlug.length > 0
                  ? {
                    href:
                      page === 'implement'
                        ? currentLang === 'hi'
                          ? '/hi/implement-dealers'
                          : '/implement-dealers'
                        : dealerType === 'tractor'
                          ? currentLang === 'hi'
                            ? '/hi/tractor-dealers-in-india'
                            : '/tractor-dealers-in-india'
                          : currentLang === 'hi'
                            ? '/hi/tractor-tyre-dealers-in-india'
                            : '/tractor-tyre-dealers-in-india',
                  }
                  : {}),
                title:
                  page === 'implement'
                    ? translation?.breadcrubm?.implementDealers || 'Implement Dealers'
                    : dealerType === 'tractor'
                      ? translation?.breadcrubm?.tractorDealers || 'Tractor Dealers'
                      : translation?.breadcrubm?.tyreDealers || 'Tyre Dealers',
                ...(routeSlug.length === 0 ? { isCurrent: true } : {}),
              },
            ];

            // Add dynamic breadcrumbs based on route slug and filters
            if (routeSlug[0]) {
              // Handle different URL patterns for all dealer types
              const isStatePattern = routeSlug.length === 1 && !selectedBrand;
              const isBrandPattern = routeSlug.length === 1 && selectedBrand;
              const isCityStatePattern = routeSlug.length === 2 && !selectedBrand;
              const isBrandCityPattern = routeSlug.length === 2 && selectedBrand;
              const isBrandCityStatePattern = routeSlug.length >= 3;

              if (isStatePattern) {
                // State only: "Dealers in Maharashtra"
                breadcrumbs.push({
                  label: `${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[0])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}`,
                  title: `${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[0])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}`,
                  isCurrent: true,
                });
              } else if (isBrandPattern) {
                // Brand only: "MRF Tractor Dealers"
                breadcrumbs.push({
                  label: `${decodeURIComponent(routeSlug[0])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())} ${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers`,
                  title: `${decodeURIComponent(routeSlug[0])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())} ${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers`,
                  isCurrent: true,
                });
              } else if (isCityStatePattern) {
                // City + State: "Dealers in Mumbai, Maharashtra"
                breadcrumbs.push({
                  label: `${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[0])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}, ${decodeURIComponent(routeSlug[1])
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())}`,
                  title: `${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[0])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}, ${decodeURIComponent(routeSlug[1])
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())}`,
                  isCurrent: true,
                });
              } else if (isBrandCityPattern) {
                // Brand + City: "MRF Tractor Dealers in Mumbai"
                breadcrumbs.push({
                  label: `${selectedBrand} ${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[1])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}`,
                  title: `${selectedBrand} ${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[1])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}`,
                  isCurrent: true,
                });
              } else if (isBrandCityStatePattern) {
                // Brand + City + State: "MRF Tractor Dealers in Mumbai, Maharashtra"
                breadcrumbs.push({
                  label: `${selectedBrand || decodeURIComponent(routeSlug[0]).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[routeSlug.length >= 3 ? 1 : routeSlug.length - 1])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}, ${decodeURIComponent(routeSlug[routeSlug.length >= 3 ? 2 : routeSlug.length - 1])
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())}`,
                  title: `${selectedBrand || decodeURIComponent(routeSlug[0]).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${page === 'implement' ? 'Implement' : dealerType === 'tractor' ? 'Tractor' : 'Tyre'} Dealers in ${decodeURIComponent(routeSlug[routeSlug.length >= 3 ? 1 : routeSlug.length - 1])
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}, ${decodeURIComponent(routeSlug[routeSlug.length >= 3 ? 2 : routeSlug.length - 1])
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase())}`,
                  isCurrent: true,
                });
              }
            }

            return breadcrumbs;
          })()}
        />

        {/* Banner with Filter Overlay */}
        <div className="relative mb-4 h-full w-full overflow-hidden rounded-2xl shadow-bottom md:max-h-[245px] md:min-h-[175px]">
          {/* Banner Images */}
          <div className="hidden h-full w-full md:block md:min-h-[175px] 2xl:max-h-[245px] 2xl:min-h-[245px]">
            <Image
              src={bannerImageDesktop}
              height={1000}
              width={1000}
              title="Tyre Price Banner"
              alt="tyre price banner"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="h-full max-h-[100px] w-full overflow-hidden rounded-t-2xl sm:max-h-[143px] md:hidden">
            <Image
              src={bannerImageMobile}
              height={1000}
              width={1000}
              title="Tyre Price Banner"
              alt="tyre price banner"
              className="w-full"
            />
          </div>
          {/* Filter Overlay */}
          <div className="top-0 z-[5px] h-full w-full p-4 md:absolute md:flex md:flex-col md:items-center md:justify-center md:p-0">
            <DealerFilterClient
              page={page}
              urlSlug={urlSlug}
              translation={translation}
              isMobile={isMobile}
              tyreBrands={tyreBrands}
              states={states}
              selectedBrand={selectedBrand}
              selectedState={selectedState}
              selectedCity={selectedCity}
              currentLang={currentLang}
              dealerType={dealerType}
            />
          </div>
        </div>

        {/* Dealer Listing (Server Rendered for SEO) */}
        <DealerListing
          translation={translation}
          dealerDetails={dealerDetails}
          urlSlug={urlSlug}
          suggestedDealers={suggestedDealers}
          dealerType={dealerType}
        />

        {/* Pagination (SEO-friendly with <Link>) */}

        {totalPages > 1 && ( // Show pagination only if there's more than one page
          <div className="mt-8 flex items-center justify-center space-x-4 text-center">
            {currentPage > 1 && (
              <Link
                rel="prev"
                href={`/${page === 'implement'
                  ? currentLang === 'hi'
                    ? 'hi/implement-dealers-in-india'
                    : 'implement-dealers-in-india'
                  : dealerType === 'tractor'
                    ? currentLang === 'hi'
                      ? 'hi/tractor-dealers-in-india'
                      : 'tractor-dealers-in-india'
                    : currentLang === 'hi'
                      ? 'hi/tractor-tyre-dealers-in-india'
                      : 'tractor-tyre-dealers-in-india'
                  }${currentPage - 1 === 1 ? '' : `?page=${currentPage - 1}`}`}
                className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
              >
                {translation?.buttons?.previous || 'Previous'}
              </Link>
            )}
            <span className="text-gray-700 text-lg">
              {translation?.headings?.page || 'Page'} {currentPage}{' '}
              {translation?.headings?.of || 'of'} {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                rel="next"
                href={`/${page === 'implement'
                  ? currentLang === 'hi'
                    ? 'hi/implement-dealers-in-india'
                    : 'implement-dealers-in-india'
                  : dealerType === 'tractor'
                    ? currentLang === 'hi'
                      ? 'hi/tractor-dealers-in-india'
                      : 'tractor-dealers-in-india'
                    : currentLang === 'hi'
                      ? 'hi/tractor-tyre-dealers-in-india'
                      : 'tractor-tyre-dealers-in-india'
                  }?page=${currentPage + 1}`}
                className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
              >
                {translation?.buttons?.next || 'Next'}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
