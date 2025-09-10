import { fetchData } from '../apiMethods';

export async function getAllTractorBrands() {
  try {
    const result = await fetchData('/api/all_tractor_brands');
    return result.data;
  } catch (error) {
    console.error('Error fetching all tractor brands:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
