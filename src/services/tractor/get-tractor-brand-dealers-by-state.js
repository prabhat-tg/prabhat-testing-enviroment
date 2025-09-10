import { postData } from '../apiMethods';

export async function getTractorBrandDealersByState(payload) {
  try {
    console.log('Payload for tractor brand dealers by state:', payload);

    const result = await postData('/api/tractor_brand_dealer_by_state', payload);
    return result;
  } catch (error) {
    console.error('Error fetching tractor brand dealers by state:', error);
    throw error;
  }
}
