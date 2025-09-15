import { postData } from '../apiMethods';

export async function getImplementBrandFAQs({ faq_tag, faq_lang }) {
    try {
        const result = await postData('/api/implement_faq', {
            faq_tag,
            faq_lang,
        });
        console.log('Implement FAQ for', faq_tag, '::', result);
        return result;
    } catch (error) {
        console.error('Error fetching implement faqs:', error);
        throw error;
    }
}
