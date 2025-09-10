import { postData } from '../apiMethods';

/**
 * Fetches tractor dealer URLs
 * @param {Object} params - API parameters
 * @param {string} [params.brand_name] - Optional brand name filter
 * @param {string} [params.state] - Optional state name filter
 * @param {string} [params.city] - Optional city name filter
 * @param {string} params.lang - Language (en or hi)
 * @returns {Promise<Array>} Array of dealer URLs with brand and state info
 */
export async function getTractorDealerUrls({
    brand_name = null,
    state = null,
    city = null,
    lang = 'en',
    isStatePage = true,
}) {
    try {
        const payload = {
            lang,
        };

        // Add optional parameters only if provided
        if (brand_name) payload.brand_name = (brand_name.replaceAll(' ', '-')).toLowerCase();
        if (state) payload.state = state;
        if (city) payload.city = city;

        console.log('Payload for tractor dealer URLs API:', payload);

        const result = await postData('/api/all_tractor_dealer_urls', payload);

        if (result && result.success) {
            if (isStatePage) {
                return result.state_urls.map(item => ({
                    brand_name: item.brand_name,
                    brand_logo: item.brand_logo,
                    state_name: item.state_name,
                    state_logo: item.state_logo,
                    images: item.state_logo,
                    page_url: item.page_url,
                }));
            }
            return result.brand_urls.map(item => ({
                brand_name: item.brand_name,
                brand_logo: item.brand_logo,
                state_name: item.state_name,
                state_logo: item.state_logo,
                images: item.state_logo,
                page_url: item.page_url,
            }));
        }

        return [];
    } catch (error) {
        console.error('Error fetching tractor dealer URLs:', error);
        return [];
    }
}
