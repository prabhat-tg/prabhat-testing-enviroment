import { postData } from '../apiMethods';

export async function getSuggestedImplements({
    brand_name,
    product_id,
    otp_verified = 'yes',
    implement_type,
}) {
    try {
        console.log("Fetching suggested implements with params:", {
            brand_name,
            product_id,
            otp_verified,
            implement_type,
        });

        const result = await postData('/api/suggested_implement', {
            brand_name,
            product_id,
            otp_verified,
            implement_type,
        });

        console.log('Suggested implements result:', result);

        if (result && result.success) {
            return {
                success: true,
                data: result.data || [],
                price_range: result.price_range || 'NA',
                message: result.message,
            };
        }

        return {
            success: false,
            data: [],
            price_range: 'NA',
            message: result?.message || 'No data found'
        };
    } catch (error) {
        console.error('Error fetching suggested implements:', error);
        throw error;
    }
}
