import { postData, fetchData } from '@/src/services/apiMethods';

/**
 * Fetch all tractor brands for comparison
 * @returns {Promise<Array>} Array of tractor brands
 */
export const getCompareTractorBrands = async () => {
  try {
    const response = await fetchData('api/all_tractor_brands');

    if (response.success && response.data) {
      return response.data.map(brand => ({
        id: brand.id,
        name: brand.name,
        image_logo: brand.image_logo,
        image: brand.image,
        url: brand.url,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching compare tractor brands:', error);
    return [];
  }
};

/**
 * Fetch tractor models by brand for comparison
 * @param {string} brandName - The brand name
 * @param {string} selectedModelIds - Previously selected model IDs separated by comma
 * @returns {Promise<Array>} Array of tractor models
 */
export const getCompareTractorModels = async (brandName, selectedModelIds = '') => {
  try {
    const response = await postData('api/compare_tractor_model_list', {
      brand_name: brandName,
      model_id: selectedModelIds,
    });

    if (response.success && response.data) {
      return response.data.map(model => ({
        id: model.id,
        name: model.name,
        model: model.name, // For compatibility with existing components
        image: model.image,
        brandName: brandName,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching compare tractor models:', error);
    return [];
  }
};

/**
 * Fetch tractor comparison details by URL slug
 * @param {string} url - The comparison URL slug (e.g., "force-orchard-deluxe-vs-farmtrac-60-epi-t20")
 * @returns {Promise<Object>} Comparison data object
 */
export const getCompareTractorRecord = async url => {
  try {
    console.log("Fetching comparison record for URL:", url);

    const response = await postData('api/compare_tractor_record', {
      url: url,
    });

    if (response.success && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching compare tractor record:', error);
    return null;
  }
};
