import { postData } from '../apiMethods';

export const getAllTractorDealerListing = async ({
  url_slug = '',
  brand_name = null,
  state = null,
  city = null,
  search_keyword = '',
  start_limit = 0,
  end_limit = 15,
} = {}) => {
  try {
    const payload = {
      url_slug,
      brand_name,
      state,
      city,
      search_keyword,
      start_limit,
      end_limit,
    };

    console.log('Tracto dealer listing response:', payload);
    const response = await postData('/api/tractor_dealer_listing', payload);

    response.data = response.data.map(dealer => ({
      ...dealer,
      images: 'https://images.tractorgyan.com/uploads' + dealer.images,
    }));

    return {
      data: response?.data || [],
      count: response?.count || 0,
      success: response?.success || false,
      brand_name: response?.brand_name || null,
      state: response?.state || null,
      city: response?.city || null,
    };
  } catch (error) {
    console.error('Error fetching tractor dealer listing:', error);
    return {
      data: [],
      count: 0,
      success: false,
      brand_name: null,
      state: null,
      city: null,
    };
  }
};
