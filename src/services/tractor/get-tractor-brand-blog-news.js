import { postData } from '../apiMethods';

/**
 * Get tractor brand blog news by brand name
 * @param {Object} params - The parameters for the API call
 * @param {string} params.brand_name - The brand name to fetch blog news for
 * @returns {Promise<Object>} - The API response with blog news data
 */
export async function getTractorBrandBlogNews({ brand_name }) {
  try {
    console.log("Tractor brand blog news API response:", { brand_name });
    const response = await postData('/api/tractor_brand_blog_news', {
      brand_name,
    });


    if (response && response.success) {
      return response;
    } else {
      console.error('Failed to fetch tractor brand blog news:', response.data?.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching tractor brand blog news:', error);
    return null;
  }
}
