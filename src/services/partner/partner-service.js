import { postData } from '../apiMethods';

export async function postPartnerForm(payload) {
  try {
    const result = await postData('/api/enquiry_data_otp_send', payload);
    return result;
  } catch (error) {
    console.error('Error submitting partner form:', error);
    throw error;
  }
}
