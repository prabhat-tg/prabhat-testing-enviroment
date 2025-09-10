import { postData } from '../apiMethods';

export async function getRelatedTyres({ tyreId, lang = 'en' }) {
  console.log('Fetching related tyres...');
  try {
    const result = await postData('/api/tyre_related', {
      id: tyreId,
      lang,
    });
    return result?.data;
  } catch (error) {
    console.error('Error fetching related tyre:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
