import { postData } from '../apiMethods';

export async function getTractorFAQs({ faq_tag, lang }) {
  try {
    const result = await postData('/api/all_faq', {
      faq_tag,
      lang,
    });
    console.log("FAQ Result for ", {
      faq_tag,
      lang,
    }, result);

    return result;
  } catch (error) {
    console.error('Error fetching tractor faqs:', error);
    throw error;
  }
}
