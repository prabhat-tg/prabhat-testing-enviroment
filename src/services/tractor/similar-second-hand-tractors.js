import { postData } from '../apiMethods';

/**
 * Fetch similar second hand tractors based on product ID and language
 * @param {Object} params - The parameters for the API call
 * @param {string} params.productId - The product ID to fetch similar tractors for
 * @param {string} params.lang - The language preference (default: 'en')
 * @returns {Promise<Array>} Array of similar second hand tractors
 */
export async function getSimilarSecondHandTractors({ productId, lang = 'en' }) {
  try {
    const result = await postData('/api/similar_second_hand_list', {
      product_id: productId,
      lang: lang,
    });

    if (result && result.success && result.data) {
      return result.data;
    } else {
      console.error('API Error:', result?.message || 'No data found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching similar second hand tractors:', error);
    return [];
  }
}
