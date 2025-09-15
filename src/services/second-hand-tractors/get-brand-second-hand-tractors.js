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

export async function getMiniTractorBrandSecondHandTractors(payload) {
  try {
    console.log('Payload for mini tractor brand second hand tractors:', payload);

    const result = await postData('/api/brand_wise_mini_second_hand', payload);
    console.log("Result for mini tractor brand second hand tractors:", result);

    return result;
  } catch (error) {
    console.error('Error fetching brand second hand tractors:', error);
    throw error;
  }
}