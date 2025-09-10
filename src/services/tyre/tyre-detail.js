import { postData } from '../apiMethods';

export async function getTyreDetail({ tyreId, lang = 'en' }) {
  console.log('Fetching tyre details...');
  try {
    const result = await postData('/api/tyre_detail', { id: tyreId, lang: lang });
    let tyreDetail = null;

    if (result && result.data && result.data.length > 0) {
      tyreDetail = result.data[0];
    } else {
      console.log('Tyre detail not found for id:', tyreId);
    }
    return tyreDetail;
  } catch (error) {
    console.error('Error fetching tyre details in page.js:', error);
  }
}
