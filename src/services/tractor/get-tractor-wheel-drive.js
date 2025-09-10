import apiClient from '@/src/services/apiClient';

/**
 * Get tractor wheel drive data (2WD/4WD) by brand name
 * @param {Object} params - The parameters for the API call
 * @param {string} params.brand_name - The brand name to fetch wheel drive data for
 * @returns {Promise<Object>} - The API response with wheel drive data
 */
export async function getTractorWheelDrive({ brand_name }) {
  try {
    const response = await apiClient.post('/api/tractor_brand_2wd_4wd', {
      brand_name,
    });

    if (response.data && response.data.success) {
      return response.data;
    } else {
      console.error('Failed to fetch tractor wheel drive data:', response.data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching tractor wheel drive data:', error);
    return null;
  }
}
