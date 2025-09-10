import { fetchData } from '../apiMethods';

export const getAllTractorReviews = async () => {
  try {
    const response = await fetchData('/api/get_all_tractor_reviews');
    return response;
  } catch (error) {
    console.error('Error fetching tractor reviews:', error);
    throw error;
  }
};
