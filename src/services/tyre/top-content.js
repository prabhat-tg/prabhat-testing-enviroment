import { postData } from '../apiMethods';

export async function getTyreTopContent({ ad_title, currentLang, device_type }) {
  try {
    const result = await postData('/api/tyre_top_content', {
      ad_title,
      ad_type_content_lang: currentLang === 'hi' ? 'hindi' : 'english',
      device_type,
    });
    return result?.data ? result.data : [];
  } catch (error) {
    console.error('Error fetching tyre top content for ' + ad_title + ' :', error);
  }
}
