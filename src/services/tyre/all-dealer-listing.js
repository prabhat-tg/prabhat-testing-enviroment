import { postData } from '../apiMethods';
import { ALL_DEALER_LISTING } from '../constants/api-constants';

export async function getAllDealerListing(slug, payload) {
  try {
    // const result = await postData(`${ALL_DEALER_LISTING}`, payload);
    const result = await postData(`${ALL_DEALER_LISTING}?url_slug=${slug}`, payload);
    console.log('getAllDealerListing result:', slug, payload, result);

    return result;
  } catch (error) {
    console.error('Error fetching dealers:', error);
  }
}
