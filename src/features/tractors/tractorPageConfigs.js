// Configuration helper for tractor pages
export const tractorPageConfigs = {
  tractors: {
    sectionName: "tractors",
    basePath: '/tractors',
    headingTitleKey: 'tractorPages.allTractors',
    faqTag: 'tractors',
    seoPageKey: 'tractors',
    breadcrumbKey: 'tractorPages.allTractors',
    headingPopularTableKey: null
  },
  latestTractors: {
    sectionName: 'latest_tractor',
    basePath: '/latest-tractors-in-india',
    headingTitleKey: 'tractorPages.latestTractors',
    faqTag: 'latest-tractors',
    seoPageKey: 'latest-tractors-in-india',
    breadcrumbKey: 'tractorPages.latestTractors',
    brandNameKey: 'tractorBrandNames.latest',
  },
  miniTractors: {
    sectionName: 'mini_tractor',
    basePath: '/mini-tractors-in-india',
    headingTitleKey: 'footer.miniTractors',
    faqTag: 'mini-tractors',
    seoPageKey: 'mini-tractors-in-india',
    breadcrumbKey: 'footer.miniTractors',
    brandNameKey: 'tractorBrandNames.mini',
  },
  acTractors: {
    sectionName: 'ac',
    basePath: '/ac-tractors-in-india',
    headingTitleKey: 'tractorPages.acTractors',
    faqTag: 'ac-tractors',
    seoPageKey: 'ac-tractors-in-india',
    breadcrumbKey: 'tractorPages.acTractors',
    brandNameKey: 'tractorBrandNames.ac',
  },
  cngTractors: {
    sectionName: 'cng',
    basePath: '/cng-tractors-in-india',
    headingTitleKey: 'tractorPages.cngTractors',
    faqTag: 'cng-tractors',
    seoPageKey: 'cng-tractors-in-india',
    breadcrumbKey: 'tractorPages.cngTractors',
    brandNameKey: 'tractorBrandNames.cng',
  },
  fourWDTractors: {
    sectionName: '4wd',
    basePath: '/4wd-tractors-in-india',
    headingTitleKey: 'tractorPages.fourWDTractors',
    faqTag: '4wd-tractors',
    seoPageKey: '4wd-tractors-in-india',
    breadcrumbKey: 'tractorPages.fourWDTractors',
    brandNameKey: 'tractorBrandNames.fourWD',
  },
  twoWDTractors: {
    sectionName: '2wd',
    basePath: '/2wd-tractors-in-india',
    headingTitleKey: 'tractorPages.twoWDTractors',
    faqTag: '2wd-tractors',
    seoPageKey: '2wd-tractors-in-india',
    breadcrumbKey: 'tractorPages.twoWDTractors',
    brandNameKey: 'tractorBrandNames.twoWD',
  },
  electricTractors: {
    sectionName: 'electric',
    basePath: '/electric-tractors-in-india',
    headingTitleKey: 'tractorPages.electricTractors',
    faqTag: 'electric-tractors',
    seoPageKey: 'electric-tractors-in-india',
    breadcrumbKey: 'tractorPages.electricTractors',
    brandNameKey: 'tractorBrandNames.electric',
  },
  tremIVTractors: {
    sectionName: 'trem_4',
    basePath: '/trem-iv-tractors-in-india',
    headingTitleKey: 'tractorPages.tremIVTractors',
    faqTag: 'trem-iv-tractors',
    seoPageKey: 'trem-iv-tractors-in-india',
    breadcrumbKey: 'tractorPages.tremIVTractors',
    brandNameKey: 'tractorBrandNames.tremIV',
  },
};

/**
 * Helper function to get translated brand name
 * @param {Object} translation - Translation object
 * @param {string} brandNameKey - Translation key for brand name
 * @returns {string} Translated brand name with fallback
 */
export const getTranslatedBrandName = (translation, brandNameKey) => {
  if (!brandNameKey || !translation) return '';

  const keys = brandNameKey.split('.');
  let value = translation;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Fallback to English if translation is missing
      const fallbacks = {
        'tractorBrandNames.latest': 'Latest',
        'tractorBrandNames.mini': 'Mini',
        'tractorBrandNames.ac': 'AC',
        'tractorBrandNames.cng': 'CNG',
        'tractorBrandNames.fourWD': '4WD',
        'tractorBrandNames.twoWD': '2WD',
        'tractorBrandNames.electric': 'Electric',
        'tractorBrandNames.tremIV': 'Trem IV',
      };
      return fallbacks[brandNameKey] || '';
    }
  }

  return value || '';
};

/**
 * Helper function to get configuration for a specific tractor page type with translations
 * @param {string} pageType - The type of tractor page
 * @param {Object} translation - Translation object (optional)
 * @returns {Object} Configuration object for the page with resolved brandName
 *
 * @example
 * // Using with page type string and translations
 * export default async function Page({ params, searchParams }) {
 *   const translation = await getDictionary(currentLang);
 *   const config = getTractorPageConfig('latestTractors', translation);
 *   console.log(config.brandName); // Returns "Latest" in English or "लेटेस्ट" in Hindi
 * }
 *
 * // Using without translation (fallback to English)
 * export default async function Page({ params, searchParams }) {
 *   const config = getTractorPageConfig('latestTractors');
 *   console.log(config.brandName); // Returns "Latest"
 * }
 */
export const getTractorPageConfig = (pageType, translation = null) => {
  const baseConfig = tractorPageConfigs[pageType] || tractorPageConfigs.tractors;

  // If there's a brandNameKey, resolve the translated brand name
  if (baseConfig.brandNameKey) {
    return {
      ...baseConfig,
      brandName: getTranslatedBrandName(translation, baseConfig.brandNameKey),
    };
  }

  return baseConfig;
};
