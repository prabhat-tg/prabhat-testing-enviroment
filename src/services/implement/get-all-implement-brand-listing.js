import { postData } from '../apiMethods';

export async function getAllImplementBrandListing({
    search_keyword = '',
    start_limit,
    end_limit,
    latest_implement,
    popular_implement,
    brand,
    lang,
    implement_type
}) {
    try {
        // Always include brand
        const payload = { brand };

        // Add other params only if they are defined
        if (search_keyword) payload.search_keyword = search_keyword;
        if (start_limit !== undefined) payload.start_limit = start_limit;
        if (end_limit !== undefined) payload.end_limit = end_limit;
        if (latest_implement !== undefined) payload.latest_implement = latest_implement;
        if (popular_implement !== undefined) payload.popular_implement = popular_implement;
        if (lang) payload.lang = lang;
        if (implement_type) payload.implement_type = (implement_type.replaceAll(' ', '-')).toLowerCase();

        console.log('implements fetch payload ===', payload);


        const result = await postData('/api/implement_brand_common_main_list', payload);
        // const result = await postData('/api/implement_brand_common_main_list', {
        //     brand,
        //     search_keyword,
        //     start_limit,
        //     end_limit,
        //     latest_implement,
        //     popular_implement,
        //     lang,
        // });

        console.log(
            'All implement listing result:',
            // {
            //     brand,
            //     search_keyword,
            //     start_limit,
            //     end_limit,
            //     latest_implement,
            //     popular_implement,
            //     lang,
            // },
            result
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
