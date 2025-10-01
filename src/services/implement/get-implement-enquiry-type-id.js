import { postData } from '../apiMethods';

export async function getImplementEnquiryTypeId({
    implement_type,
    device_type,
}) {
    try {
        console.log("Fetching implement enquiry type ID with params:", {
            implement_type,
            device_type,
        });

        const result = await postData('/api/implement_enquiry_type_id', {
            implement_type,
            device_type,
        });

        console.log('Implement enquiry type ID result:', result);

        if (result && result.success && result.data && result.data.length > 0) {
            return {
                success: true,
                enquiry_id: result.data[0].enquiry_id,
                enquiry_type_name: result.data[0].enquiry_type_name,
                message: result.message,
            };
        }

        return { success: false, enquiry_id: null, message: result?.message || 'No data found' };
    } catch (error) {
        console.error('Error fetching implement enquiry type ID:', error);
        throw error;
    }
}
