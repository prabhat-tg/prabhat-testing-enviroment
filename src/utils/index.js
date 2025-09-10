import { getAllTyreListing } from '../services/tyre/all-tyre-listing';
import { getAllTractorListing } from '../services/tractor/all-tractor-listing';
import { getHpWiseTractorListing } from '../services/tractor/hp-wise-tractor-listing';
import { getBrandSeriesListing } from '../services/tractor/brand-series-listing';
import { getAllTractorsListing } from '../services/tractor/get-all-tractors-listing';
import { getTractorHPs } from '../services/tractor/get-tractor-hps';

const { headers } = require('next/headers');

export const isMobileView = async () => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  console.log('Is Mobile View:', isMobile);
  console.log('User Agent:', userAgent);
  return isMobile;
};

export const tractorgyan_share = async ({ title, url, message }) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: message,
        url: url,
      });
      console.log('Successfully shared!');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    alert('Sharing is not supported on this browser.');
  }
};

export const tg_getTittleFromNestedKey = (obj, path) => {
  if (!path.includes('.')) {
    return obj ? obj[path] : undefined;
  }
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

export const tg_getAlltyreSizes = translation => {
  return [
    `${translation?.buttons?.front}-6.00x16`,
    `${translation?.buttons?.front}-6.50x16`,
    `${translation?.buttons?.front}-7.50x16`,
    `${translation?.buttons?.front}-6.50x20`,
    `${translation?.buttons?.rear}-12.4x28`,
    `${translation?.buttons?.rear}-13.6x28`,
    `${translation?.buttons?.rear}-14.9x28`,
    `${translation?.buttons?.rear}-12.4x24`,
    `${translation?.buttons?.rear}-16.9x28`,
  ].filter(size => !size.includes('undefined')); // Filter out sizes with undefined parts
};

export const prepareTractorListingComponent = async ({
  param,
  searchParamsObj,
  pageSlug,
  prefLang,
  translation,
  showBrandFilter,
  showTractorHPFilter,
  isMobile,
  ITEMS_PER_PAGE = 16,
  tractorBrands,
  basePathFromUrl,
  isSeriesListing = false, // New parameter to determine if this is series listing
  seriesName = null, // Series name for series listing
  hpRange = null, // HP range parameter for HP-wise listing
  page_url = null
}) => {
  const currentPage = parseInt(searchParamsObj?.page) || 1;

  const activeFilters = {
    brand: showBrandFilter ? param?.brand || searchParamsObj?.brand || null : null,
    sortBy: searchParamsObj?.sortBy || null,
    search: searchParamsObj?.search || null,
    lang: prefLang,
    hpRange: showTractorHPFilter ? searchParamsObj?.hpRange || null : null,
  };

  // Choose appropriate API call based on listing type
  let tractorListingResult;
  if (hpRange) {
    // Use HP-wise listing API
    tractorListingResult = await getHpWiseTractorListing(
      ITEMS_PER_PAGE,
      currentPage,
      hpRange, // HP slug like "below-20hp-tractors-in-india"
      activeFilters.search,
      activeFilters.sortBy === translation?.headings?.popularity ? 'yes' : null,
      activeFilters.sortBy === translation?.headings?.latestLaunches ? 'yes' : null,
      prefLang,
      activeFilters.brand
    );
  } else if (isSeriesListing && seriesName) {
    // Convert series slug to proper series name (e.g., "atom-series" -> "Atom Series")
    const formattedSeriesName = seriesName
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    // Use series listing API
    tractorListingResult = await getBrandSeriesListing(
      ITEMS_PER_PAGE,
      currentPage,
      activeFilters.brand || param?.brand || searchParamsObj?.brand,
      formattedSeriesName,
      activeFilters.search,
      activeFilters.sortBy === translation?.headings?.popularity ? 'yes' : null,
      activeFilters.sortBy === translation?.headings?.latestLaunches ? 'yes' : null,
      activeFilters.hpRange,
      prefLang
    );
  } else {
    // Use regular tractor listing API
    tractorListingResult = await getAllTractorListing(
      ITEMS_PER_PAGE,
      currentPage,
      activeFilters.brand || param?.brand || searchParamsObj?.brand,
      activeFilters.search,
      activeFilters.sortBy === translation?.headings?.popularity ? 'yes' : null,
      activeFilters.sortBy === translation?.headings?.latestLaunches ? 'yes' : null,
      activeFilters.hpRange,
      prefLang,
      page_url
    );
  }

  // Extract tractors and reel from API response
  let tractorsArr = [];
  let reel = null;
  if (Array.isArray(tractorListingResult?.items)) {
    tractorsArr = tractorListingResult.items.filter(item => !item.url_of_video);
    reel = tractorListingResult.items.find(item => item.url_of_video);
    console.log("reel : ", reel);

  } else {
    // fallback to items property if present
    tractorsArr = tractorListingResult.items || [];
  }
  const totalTractorsCount = tractorListingResult?.count || tractorListingResult?.totalCount || tractorsArr.length;

  const tractorListingClientProps = {
    initialActiveFilters: activeFilters,
    tyreBrands: tractorBrands, // Use tractorBrands for consistency
    currentLang: prefLang,
    translation,
    showBrandFilter,
    showSizeFilter: false, // Tractors don't use size filter
    showTyreBrandsSection: false,
    showImplementBrandsSection: false,
    showImplementTypesSection: false,
    showTractorHPFilter,
    isMobileViewProp: isMobile,
    brandName: activeFilters.brand,
    basePath: basePathFromUrl,
    pageOrigin: 'tractorsByBrand',
  };

  // Add HP ranges for tractor pages
  if (showTractorHPFilter) {
    try {
      const tractorHPs = await getTractorHPs();
      tractorListingClientProps.tractorHPs = tractorHPs;
    } catch (error) {
      console.error('Error fetching tractor HPs:', error);
      tractorListingClientProps.tractorHPs = [];
    }
  }

  const currentDate = new Date()
    .toLocaleDateString(prefLang === 'hi' ? 'hi-IN' : 'en-GB', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    })
    .replace(/,/g, '');

  const tractorListingProps = {
    initialTyres: tractorsArr, // Keep naming for backward compatibility with TractorListing component
    totalTyresCount: totalTractorsCount,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    activeFilters,
    tyreBrands: tractorBrands,
    translation,
    currentLang: prefLang,
    currentDate,
    brandName: activeFilters.brand,
    basePath: basePathFromUrl,
    pageType: 'tractors',
    pageOrigin: 'tractorsByBrand',
    // Add pagination info
    hasNextPage: currentPage < Math.ceil(totalTractorsCount / ITEMS_PER_PAGE),
    totalPages: Math.ceil(totalTractorsCount / ITEMS_PER_PAGE),
    totalItems: totalTractorsCount,
    reel, // Pass the reel object if present
  };

  return { tractorListingClientProps, tractorListingProps };
};

export const prepareAllTractorsListingComponent = async ({
  param,
  searchParamsObj,
  pageSlug,
  prefLang,
  translation,
  showBrandFilter,
  showTractorHPFilter,
  isMobile,
  ITEMS_PER_PAGE = 16,
  tractorBrands,
  basePathFromUrl,
  sectionName,
}) => {
  const currentPage = parseInt(searchParamsObj?.page) || 1;

  const activeFilters = {
    brand: showBrandFilter ? param?.brand || searchParamsObj?.brand || null : null,
    sortBy: searchParamsObj?.sortBy || null,
    search: searchParamsObj?.search || null,
    lang: prefLang,
    hpRange: showTractorHPFilter ? searchParamsObj?.hpRange || null : null,
  };

  const startLimit = (currentPage - 1) * ITEMS_PER_PAGE;
  const endLimit = currentPage * ITEMS_PER_PAGE;

  // Use all tractors listing API
  const { items: initialTractors, totalCount: totalTractorsCount } = await getAllTractorsListing({
    lang: prefLang,
    start_limit: startLimit,
    end_limit: endLimit,
    search_keyword: activeFilters.search || '',
    popular_tractor: activeFilters.sortBy === translation?.headings?.popularity ? 'yes' : null,
    latest_tractor: activeFilters.sortBy === translation?.headings?.latestLaunches ? 'yes' : null,
    hp_range_filter: activeFilters.hpRange,
    brand_name: activeFilters.brand,
    sectionName,
  });

  const tractorListingClientProps = {
    initialActiveFilters: activeFilters,
    tyreBrands: tractorBrands, // Use tractorBrands for consistency
    currentLang: prefLang,
    translation,
    showBrandFilter,
    showSizeFilter: false, // Tractors don't use size filter
    showTyreBrandsSection: false,
    showImplementBrandsSection: false,
    showImplementTypesSection: false,
    showTractorHPFilter,
    isMobileViewProp: isMobile,
    brandName: activeFilters.brand,
    basePath: basePathFromUrl,
    pageOrigin: 'allTractors',
  };

  // Add HP ranges for tractor pages
  if (showTractorHPFilter) {
    try {
      const tractorHPs = await getTractorHPs();
      tractorListingClientProps.tractorHPs = tractorHPs;
    } catch (error) {
      console.error('Error fetching tractor HPs:', error);
      tractorListingClientProps.tractorHPs = [];
    }
  }

  const currentDate = new Date()
    .toLocaleDateString(prefLang === 'hi' ? 'hi-IN' : 'en-GB', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    })
    .replace(/,/g, '');

  const tractorListingProps = {
    initialTyres: initialTractors, // Keep naming for backward compatibility with TractorListing component
    totalTyresCount: totalTractorsCount,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    activeFilters,
    tyreBrands: tractorBrands,
    translation,
    currentLang: prefLang,
    currentDate,
    brandName: activeFilters.brand,
    basePath: basePathFromUrl,
    pageType: 'tractors',
    pageOrigin: 'allTractors',
    // Add pagination info
    hasNextPage: currentPage < Math.ceil(totalTractorsCount / ITEMS_PER_PAGE),
    totalPages: Math.ceil(totalTractorsCount / ITEMS_PER_PAGE),
    totalItems: totalTractorsCount,
  };

  return { tractorListingClientProps, tractorListingProps };
};

export const prepareTyreListingComponent = async ({
  param,
  searchParamsObj,
  pageType,
  pageSlug,
  prefLang,
  translation,
  allImplementTypes,
  showBrandFilter,
  showSizeFilter,
  showTyreBrandsSection,
  showImplementBrandsSection,
  showImplementTypesSection,
  showLocationFilter,
  subcategories,
  showTractorHPFilter,
  filterBySize,
  isMobile,
  ITEMS_PER_PAGE = 14,
  tyreBrands,
  brandPageUrl,
  basePathFromUrl,
}) => {
  const currentPage = parseInt(searchParamsObj?.page) || 1;

  const activeFilters = {
    brand: showBrandFilter ? param?.brand || searchParamsObj?.brand || null : null,
    size: showSizeFilter ? searchParamsObj?.size || null : null,
    sortBy: searchParamsObj?.sortBy || null,
    search: searchParamsObj?.search || null,
    lang: prefLang,
  };

  // Use tyre listing API
  const { items: initialTyres, totalCount: totalTyresCount } = await getAllTyreListing(
    ITEMS_PER_PAGE,
    currentPage,
    param?.pageType || pageType,
    param?.pageName || pageSlug,
    activeFilters.brand || param?.brand || searchParamsObj?.brand,
    activeFilters.size,
    activeFilters.sortBy === translation?.headings?.popularity ? 'yes' : null,
    activeFilters.sortBy === translation?.headings?.latestLaunches ? 'yes' : null,
    activeFilters.search,
    prefLang
  );

  const tyresListingClientProps = {
    initialActiveFilters: activeFilters,
    tyreBrands: tyreBrands,
    allSize: tg_getAlltyreSizes(translation),
    allImplementTypes: allImplementTypes,
    currentLang: prefLang,
    translation,
    showBrandFilter,
    showSizeFilter,
    showTyreBrandsSection,
    showImplementBrandsSection,
    showImplementTypesSection,
    showLocationFilter,
    subcategories,
    showTractorHPFilter,
    filterBySize,
    isMobileViewProp: isMobile,
    brandName: activeFilters.brand,
    basePath: basePathFromUrl,
    pageOrigin: 'tyre',
  };

  const currentDate = new Date()
    .toLocaleDateString(prefLang === 'hi' ? 'hi-IN' : 'en-GB', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    })
    .replace(/,/g, '');

  const tyresListingProps = {
    initialTyres: initialTyres,
    totalTyresCount: totalTyresCount,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    activeFilters,
    tyreBrands: tyreBrands,
    translation,
    currentLang: prefLang,
    currentDate,
    brandName: activeFilters.brand,
    tyreSize: activeFilters.size,
    basePath: basePathFromUrl,
    pageType,
    pageOrigin: 'tyre',
    // Add pagination info
    hasNextPage: currentPage < Math.ceil(totalTyresCount / ITEMS_PER_PAGE),
    totalPages: Math.ceil(totalTyresCount / ITEMS_PER_PAGE),
    totalItems: totalTyresCount,
  };

  return { tyresListingClientProps, tyresListingProps };
};
export const modifiedSubsCount = number => {
  const num = Number(number);

  if (isNaN(num)) return '0';

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return num.toString();
};

export const tg_getUrlByLanguage = (url, lang) => {
  if (!url) return lang === 'hi' ? '/hi' : '/';

  // Remove leading slash if present to avoid double slashes
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

  console.log('Clean URL:', cleanUrl, 'Language:', lang);

  // Return URL with language prefix for Hindi, without prefix for English
  return lang === 'hi' ? `/hi/${cleanUrl}` : `/${cleanUrl}`;
};

export function handleOtpInputChange(e, setState) {
  const value = e.target.value;
  if (/^\d*$/.test(value)) {
    setState(value);
  }
}
