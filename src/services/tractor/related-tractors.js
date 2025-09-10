import { postData } from '../apiMethods';

export async function getRelatedTractors({ productId, lang = 'en' }) {
  try {
    const result = await postData('/api/related_tractor_list', {
      product_id: productId,
      lang: lang,
    });

    // Transform the data to match the format expected by RelatedTyres component
    const transformedData =
      result?.data?.map(tractor => ({
        id: tractor.id,
        brand: tractor.brand,
        model: tractor.model,
        title: tractor.model, // for compatibility with tyres
        brandName: tractor.brand, // for compatibility with tyres
        hp: tractor.hp,
        cylinder: tractor.cylinder,
        image: tractor.image,
        imgUrl: tractor.image, // for compatibility with tyres
        lifting_capacity: tractor.lifting_capacity,
        popular_tractor: tractor.popular_tractor,
        popularTyre: tractor.popular_tractor === '1' ? 'Yes' : 'No', // for compatibility with tyres
        new_tractor: tractor.new_tractor,
        page_url: tractor.page_url,
        pageUrl: tractor.page_url, // for compatibility with tyres
        start_price: tractor.start_price,
        total_review: tractor.total_review,
        reviews: tractor.total_review, // for compatibility with tyres
        avg_review: tractor.avg_review,
        rating: tractor.avg_review, // for compatibility with tyres
        created_at: tractor.created_at,
        sno: tractor.sno,
      })) || [];

    return transformedData;
  } catch (error) {
    console.error('Error fetching related tractors:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

/**
 * Get related tractors for a specific tractor based on product ID
 * Returns transformed data compatible with PopularSection component
 * @param {Object} params - Parameters for the API call
 * @param {string|number} params.productId - The ID of the current tractor
 * @param {string} params.lang - Language preference ('en' or 'hi')
 * @returns {Promise<Array>} - Array of related tractor objects formatted for PopularSection
 */
export const getRelatedTractorList = async ({ productId, lang = 'en' }) => {
  try {
    const response = await postData('/api/related_tractor_list', {
      product_id: productId,
      lang: lang,
    });

    if (response.success && response.data) {
      // Transform data to match PopularSection component expectations
      const transformedData = response.data.map(tractor => ({
        ...tractor, // Keep all original fields
        full_image: tractor.image ? `${tractor.image}` : '', // Transform image path for PopularCard
        tyre_url: tractor.page_url, // Map page_url to tyre_url for compatibility
        imgUrl: tractor.image ? `${tractor.image}` : '', // Alternative image field
      }));

      return transformedData;
    }

    return [];
  } catch (error) {
    console.error('Error fetching related tractor list:', error);
    throw error;
  }
};

/**
 * Get compare tractors based on current tractor's HP
 * @param {Object} params - Parameters for the API call
 * @param {string|number} params.productId - The ID of the current tractor
 * @param {string|number} params.hp - The HP of the current tractor
 * @returns {Promise<Array>} - Array of compare tractor objects
 */
export const getCompareTractorsByHP = async ({ productId, hp, lang }) => {
  try {
    console.log('Passed productId:', productId, 'and hp:', hp);
    const response = await postData('/api/compare_tractor_hp_wise', {
      product_id: productId,
      hp: hp,
      lang: lang,
    });

    if (response.success && response.data) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error('Error fetching compare tractors by HP:', error);
    throw error;
  }
};
