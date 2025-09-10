import { postData } from '../apiMethods';

export async function getAllImplementTypeListing({
    implement_type,
    search_keyword = '',
    start_limit,
    end_limit,
    latest_implement,
    popular_implement,
    brand_name,
    lang,
}) {
    try {

        console.log("Fetching all tractors listing with params:", {
            implement_type,
            search_keyword,
            start_limit,
            end_limit,
            latest_implement,
            popular_implement,
            brand_name,
            lang,
        });

        const result = await postData('/api/implement_type_common_main_list_filter', {
            implement_type,
            search_keyword,
            start_limit,
            end_limit,
            latest_implement,
            popular_implement,
            brand_name,
            lang,
        });

        console.log(
            'All tractors listing result:',
            {
                implement_type,
                search_keyword,
                start_limit,
                end_limit,
                latest_implement,
                popular_implement,
                brand_name,
                lang,
            },
            result.data
        );

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
