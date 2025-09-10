import { postData } from '../apiMethods';

export async function getTyreBrands() {
  try {
    const result = await postData('/api/all_tyre_brands');
    return result.data;
  } catch (error) {
    console.error('Error fetching tyre brands:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
