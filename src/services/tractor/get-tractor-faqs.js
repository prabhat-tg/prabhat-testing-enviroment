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

export async function getMiniTractorFAQs(payload) {
  try {
    const result = await postData('/api/brand_wise_mini_faq', payload);
    console.log("FAQ Result for ", payload, result);

    return result;
  } catch (error) {
    console.error('Error fetching tractor faqs:', error);
    throw error;
  }
}
