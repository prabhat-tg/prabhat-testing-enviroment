import { postData } from '../apiMethods';

export async function getBrandSecondHandTractors(payload) {
  try {
    console.log('Payload for brand second hand tractors:', payload);

    const result = await postData('/api/brand_second_hand_tractor', payload);
    return result;
  } catch (error) {
    console.error('Error fetching brand second hand tractors:', error);
    throw error;
  }
}
