// @/src/services/tractor/get-tractor-models-by-brand.js
import { fetchData, postData } from '../apiMethods'; // Adjusted path

/**
 * Fetches tractor models for a given brand name.
 * @param {string} brandName - The name of the tractor brand.
 * @returns {Promise<Array|null>} A promise that resolves to an array of tractor models or null if an error occurs.
 */
export const getTractorModelsByBrand = async brandName => {
  if (!brandName) {
    console.error('getTractorModelsByBrand: brandName is required');
    return null;
  }
  try {
    const endpoint = `api/get_brand_models?brand_name=${encodeURIComponent(brandName)}`;
    const result = await postData(endpoint);
    console.log('getTractorModelsByBrand result:', result);

    if (result) {
      return result.data;
    } else {
      console.error(
        'Error fetching tractor models by brand:',
        result?.message || 'No data returned'
      );
      return null;
    }
  } catch (error) {
    console.error('Error in getTractorModelsByBrand:', error);
    return null;
  }
};
