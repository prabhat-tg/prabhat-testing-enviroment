import apiClient from '@/src/services/apiClient';
import { postData } from '../apiMethods';

/**
 * Get tractor series by brand name
 * @param {Object} params - The parameters for the API call
 * @param {string} params.brand_name - The brand name to fetch series for
 * @returns {Promise<Object>} - The API response with tractor series data
 */
export async function getTractorSeries({ brand_name }) {
  try {
    const response = await postData('api/tractor_series', {
      brand_name,
    });

    if (response && response.success) {
      return response;
    } else {
      console.error('Failed to fetch tractor series:', response.data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching tractor series:', error);
    return null;
  }
}

/**
 * Get all brand series data
 * @param {Object} params - The parameters for the API call
 * @param {string} params.lang - The language code (en/hi)
 * @returns {Promise<Object>} - The API response with all brand series data
 */
export async function getAllBrandSeries({ lang }) {
  try {
    const response = await postData('api/all_brand_series', {
      lang,
    });

    if (response && response.success) {
      return response;
    } else {
      console.error('Failed to fetch all brand series:', response?.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching all brand series:', error);
    return null;
  }
}
