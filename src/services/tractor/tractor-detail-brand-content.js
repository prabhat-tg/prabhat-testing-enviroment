import { postData } from '../apiMethods';

export async function getTractorDetailBrandContent(payload) {
    try {
        const result = await postData('api/tractor_detail_brand_content', payload);

        // console.log('Tractor Detail Brand Content:', payload, result);

        if (result && result.success) {
            return result.data || [];
        }

        return [];
    } catch (error) {
        console.error('Error fetching Tractor Detail Brand Content:', error);
        return []; // Return empty array on error
    }
}
