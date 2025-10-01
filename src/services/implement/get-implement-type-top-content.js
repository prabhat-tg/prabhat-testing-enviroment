import { postData } from '../apiMethods';

export async function getImplementTypeTopContent({ ad_title, currentLang, device_type, page_type }) {
    try {
        const result = await postData('api/implement_top_content', {
            ad_title,
            ad_type_content_lang: currentLang === 'hi' ? 'hindi' : 'english',
            device_type,
            page_type
        });
        console.log('Implement type Top Content::', {
            ad_title,
            ad_type_content_lang: currentLang === 'hi' ? 'hindi' : 'english',
            device_type,
            page_type
        }, result);

        return result?.data ? result.data : [];
    } catch (error) {
        console.error('Error fetching tractor brand top content for ' + ad_title + ' :', error);
        return []; // Return empty array on error
    }
}
