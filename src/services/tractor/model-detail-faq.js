import { postData } from '../apiMethods';

export async function getModelDetailFAQ(payload) {
    try {
        const result = await postData('api/model_detail_faq', payload);

        console.log('Model detail FAQ API response:', payload, result);

        if (result && result.success) {
            return result.data || [];
        }

        return [];
    } catch (error) {
        console.error('Error fetching model detail FAQ:', error);
        return []; // Return empty array on error
    }
}
