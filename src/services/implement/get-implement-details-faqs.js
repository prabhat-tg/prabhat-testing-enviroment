import { postData } from '../apiMethods';

export async function getDetailsImplementFAQs({ implement_type, id, lang }) {
  try {
    const result = await postData('/api/implement_detail_faq', {
      implement_type,
      id,
      lang,
    });
    // console.log('Implement FAQ for', implement_type, '::', result);
    return result;
  } catch (error) {
    console.error('Error fetching implement faqs:', error);
    throw error;
  }
}
