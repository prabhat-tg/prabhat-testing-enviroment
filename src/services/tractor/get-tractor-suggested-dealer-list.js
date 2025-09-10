import { postData } from '../apiMethods';

export async function getTractorSuggestedDealerList(payload) {
    try {
        const result = await postData('api/tractor_suggested_dealer_list', payload);

        console.log('Tractor suggested dealer list API response:', payload, result);

        if (result && result.success) {
            return {
                data: result.data || [],
                count: result.data?.length || 0,
                success: true
            };
        }

        return {
            data: [],
            count: 0,
            success: false
        };
    } catch (error) {
        console.error('Error fetching tractor suggested dealer list:', error);
        return {
            data: [],
            count: 0,
            success: false
        };
    }
}
