import { postData } from '../apiMethods';

/**
 * Submit sell old tractor form data
 * @param {Object} payload - Form data payload
 * @returns {Promise<Object>} API response
 */
export async function submitSellOldTractorForm(payload) {
  try {
    const result = await postData('/api/v2/sell_old_tractor_form', payload);
    return result;
  } catch (error) {
    console.error('Error submitting sell old tractor form:', error);
    throw error;
  }
}

/**
 * Submit sell old tractor form with images (FormData)
 * @param {FormData} formData - Form data with files
 * @returns {Promise<Object>} API response
 */
export async function submitSellOldTractorFormWithImages(formData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'https://staging.tractorgyan.com'}/api/v2/sell_old_tractor_form`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();
    console.log('Response from API:', result);

    return result;
  } catch (error) {
    console.error('Error submitting sell old tractor form with images:', error);
    throw error;
  }
}
