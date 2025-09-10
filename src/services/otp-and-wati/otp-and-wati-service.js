import { postData } from '../apiMethods';

//  1. Send OTP
export async function sendOtp(mobile) {
  try {
    const res = await postData('/api/enquiry_sendotp', {
      mobile_name: mobile,
      otp_type: 'otp',
    });
    return res;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

//  2. Verify OTP
export async function verifyOtp({ otp, mobile, main_id }) {
  try {
    const res = await postData('/api/enquiry_verification_otp', {
      out: otp,
      mobile,
      main_id,
      keyup: 'session_verify',
    });
    return res;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}
//  3. Whati api
export async function watiMessageService({ mobile, name }) {
  try {
    const res = await postData('/api/wati_whatsapp_msg_api', {
      mobile: mobile,
      name: name,
    });
    return res;
  } catch (error) {
    console.error('Error calling WhatsApp message API', error);
    throw error;
  }
}
