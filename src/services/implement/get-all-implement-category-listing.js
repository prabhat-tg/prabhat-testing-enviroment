import { postData } from '../apiMethods';

export async function getAllImplementCategoryListing({
    category_slug,
    search_keyword = '',
    start_limit,
    end_limit,
    latest_implement,
    popular_implement,
    brand_name,
    lang,
}) {
    try {
        // console.log("Fetching all implement listing with params:", {
        //     category_slug,
        //     search_keyword,
        //     start_limit,
        //     end_limit,
        //     latest_implement,
        //     popular_implement,
        //     brand_name,
        //     lang,
        // });

        const result = await postData('/api/implement_category_modal_data', {
            category_slug,
            search_keyword,
            start_limit,
            end_limit,
            latest_implement,
            popular_implement,
            brand_name,
            lang,
        });

        // console.log('Implemet listing result::', result.data);

        if (result && result.success) {
            result.data = result.data.map(item => ({
                ...item,
                image: '/' + item.image,
            }));
            return {
                items: result.data || [],
                totalCount: result.count || 0,
            };
        }

        return { items: [], totalCount: 0 };
    } catch (error) {
        console.error('Error fetching all tractors listing:', error);
        throw error;
    }
}
