import { postData } from '../apiMethods';

export async function getImplementCategoryTopContent({ category_slug, currentLang, device_type }) {
  try {
    const result = await postData('api/category_top_content', {
      category_slug,
      ad_type_content_lang: currentLang === 'hi' ? 'hindi' : 'english',
      device_type,
    });
    console.log('Implement Category Top Content::', result);

    return result?.data ? result.data : [];
  } catch (error) {
    console.error('Error fetching implement category top content for ' + category_slug + ' :', error);
    return []; // Return empty array on error
  }
}
