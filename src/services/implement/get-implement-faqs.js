import { postData } from '../apiMethods';

export async function getImplementFAQs({ category_slug, lang }) {
  try {
    const result = await postData('/api/implement_category_faq', {
      category_slug,
      lang,
    });
    console.log('Implement FAQ for',category_slug, '::' , result);
    return result;
  } catch (error) {
    console.error('Error fetching implement faqs:', error);
    throw error;
  }
}
