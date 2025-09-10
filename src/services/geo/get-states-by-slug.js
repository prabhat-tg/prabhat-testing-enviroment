import { postData } from '../apiMethods';

export async function getAllStatesBySlug({ pageSlug, lang = 'en' }) {
  try {
    const result = await postData(`/api/all_state_detail`, {
      page_slug: pageSlug,
      lang: lang,
    });
    return result.data;
  } catch (error) {
    console.error('Error fetching dealers:', error);
  }
}
