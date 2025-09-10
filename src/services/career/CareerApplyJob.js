import { postData } from '../apiMethods';

export async function postCarrerJobApply(payload) {
  try {
    const result = await postData('/api/job_application_store', payload);
    return result;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
}
