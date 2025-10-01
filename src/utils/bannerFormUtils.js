/**
 * Utility functions for Banner Form Modal
 */

/**
 * Check if a banner HTML string contains an enquiry form trigger
 * @param {string} bannerHtml - The HTML content of the banner
 * @returns {boolean} - True if the banner contains class="enquiry_form"
 */
export const hasBannerFormTrigger = (bannerHtml) => {
    if (!bannerHtml || typeof bannerHtml !== 'string') {
        return false;
    }

    // Check for class="enquiry_form" in the HTML
    return bannerHtml.includes('class="enquiry_form"') || bannerHtml.includes("class='enquiry_form'");
};

/**
 * Extract all enquiry form triggers from a banner HTML string
 * @param {string} bannerHtml - The HTML content of the banner
 * @returns {Array} - Array of elements that would trigger the form
 */
export const getBannerFormTriggers = (bannerHtml) => {
    if (!bannerHtml || typeof bannerHtml !== 'string') {
        return [];
    }

    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bannerHtml;

    // Find all elements with class="enquiry_form"
    const triggers = tempDiv.querySelectorAll('.enquiry_form');
    return Array.from(triggers);
};

/**
 * Validate banner data array for form triggers
 * @param {Array} banners - Array of banner objects
 * @returns {Object} - Validation results
 */
export const validateBannersForFormTriggers = (banners) => {
    if (!Array.isArray(banners)) {
        return {
            isValid: false,
            error: 'Banners must be an array',
            triggersFound: 0,
            bannersWithTriggers: []
        };
    }

    const bannersWithTriggers = [];
    let triggersFound = 0;

    banners.forEach((banner, index) => {
        if (banner && banner.image && hasBannerFormTrigger(banner.image)) {
            bannersWithTriggers.push({
                index,
                sno: banner.sno,
                hasTrigger: true
            });
            triggersFound++;
        }
    });

    return {
        isValid: true,
        triggersFound,
        bannersWithTriggers,
        totalBanners: banners.length
    };
};

/**
 * Default translation fallback for the form
 */
export const defaultBannerFormTranslation = {
    enquiryForm: {
        name: 'Name',
        enterName: 'Enter your name',
        mobile: 'Mobile',
        tractorBrand: 'Tractor Brand',
        tractorModel: 'Tractor Model',
        selectBrand: 'Select Brand',
        selectModel: 'Select Model',
        selectState: 'Select State',
        selectDistrict: 'Select District',
        village: 'Village',
        enterVillage: 'Enter village name',
        existingLoan: 'Do you have existing loan?',
        getTractorPrice: 'Get Tractor Price',
        tractorEnquiry: 'Tractor Enquiry',
        termsConditionText: 'I agree to the',
        termsConditionLink: 'Terms & Conditions',
        tractorTextForOtp: 'Get best tractor prices in your area'
    }
};

/**
 * Merge user translation with default fallback
 * @param {Object} userTranslation - User provided translation object
 * @returns {Object} - Merged translation object
 */
export const mergeTranslation = (userTranslation = {}) => {
    return {
        ...defaultBannerFormTranslation,
        ...userTranslation,
        enquiryForm: {
            ...defaultBannerFormTranslation.enquiryForm,
            ...(userTranslation.enquiryForm || {})
        }
    };
};

export default {
    hasBannerFormTrigger,
    getBannerFormTriggers,
    validateBannersForFormTriggers,
    defaultBannerFormTranslation,
    mergeTranslation
};
