import { postData } from '../apiMethods';
import { IMAGE_URL } from '../constants/url-constants';

export async function getImplementCategoryFilter({
    implement_type,
    lang,
}) {
    try {
        console.log("Fetching implement category filter with params:", {
            implement_type,
            lang,
        });

        const result = await postData('/api/implement_cat_filter', {
            implement_type,
            lang,
        });

        console.log('Implement category filter result:', result);

        if (result && result.success) {
            // Map the data and prepend CDN_URL to images
            result.data = result.data.map(item => ({
                ...item,
                image: IMAGE_URL + item.image.replace(/^\//, ''), // Remove leading slash and prepend CDN URL
            }));

            return {
                success: true,
                data: result.data || [],
                message: result.message,
            };
        }

        return { success: false, data: [], message: result?.message || 'No data found' };
    } catch (error) {
        console.error('Error fetching implement category filter:', error);
        throw error;
    }
}
