import { fetchData } from '../apiMethods';

export async function getAllCareerSliderImages() {
  try {
    const result = await fetchData('/api/carrer_page_images');
    return result;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
}
