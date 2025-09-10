import { fetchData } from '../apiMethods';

export async function getAllCareerJobListing() {
  try {
    const result = await fetchData('/api/all_job_openings');
    return result;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
}
