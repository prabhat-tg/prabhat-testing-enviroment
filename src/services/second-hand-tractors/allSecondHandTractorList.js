import { postData } from '@/src/services/apiMethods';

/**
 * Fetch all second hand tractor list (mini-tractor)
 * @param {Object} params - { brand_name, state, district, start_limit, end_limit, search_keyword }
 * @returns {Promise<Object>} - API response
 */
export async function getAllSecondHandTractorList(params = {}) {
    // Always send type: 'mini-tractor' for home page listing
    const payload = { ...params, type: 'mini-tractor' };
    return postData('api/all_second_hand_tractor_list', payload);
}
