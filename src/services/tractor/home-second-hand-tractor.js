import { fetchData } from '@/src/services/apiMethods';

/**
 * Fetches second-hand tractors data for the home page
 * @param {string} lang - Language code (e.g., 'hi', 'en')
 * @returns {Promise<Array>} - Array of second-hand tractor objects
 */
export const getHomeSecondHandTractors = async (lang = 'en') => {
  try {
    const response = await fetchData(`api/home_second_hand_tractor?lang=${lang}`);

    if (response?.success && response?.data) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error('Error fetching home second hand tractors:', error);
    return [];
  }
};
