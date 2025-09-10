import { fetchData } from '../apiMethods';
import { ALL_STATE_API } from '../constants/api-constants';

export async function getAllStates() {
  try {
    const result = await fetchData(`${ALL_STATE_API}`);
    return result?.data ? result.data : [];
  } catch (error) {
    console.error('Error fetching states:', error);
  }
}
