import { fetchData, postData } from '@/src/services/apiMethods';

/**
 * Fetches mini tractors data for the home page
 * @param {string} lang - Language code (e.g., 'hi', 'en')
 * @returns {Promise<Array>} - Array of mini tractor objects
 */
export const getHomeMiniTractors = async (lang = 'en') => {
  try {
    const response = await postData(`api/home_mini_tractor?lang=${lang}`);

    console.log('Fetched home mini tractors:', response);

    if (response?.success && response?.data) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error('Error fetching home mini tractors:', error);
    return [];
  }
};
