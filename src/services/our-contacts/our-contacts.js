import { postData } from '../apiMethods';

export async function postOurContactForm(payload) {
  try {
    const result = await postData('/api/enquiry_data_otp_send', payload);
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}
