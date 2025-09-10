import { fetchData } from '../apiMethods';

export async function getTractorHPs() {
  try {
    const result = await fetchData('/api/tractor_hp_listing');
    // console.log('Fetched tractor HPs::', result);
    return result.data;
  } catch (error) {
    console.error('Error fetching tractor HPs:', error);
    throw error;
  }
}
