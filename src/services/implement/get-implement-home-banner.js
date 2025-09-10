import { postData } from '../apiMethods';

export async function getImplementHomeBanner({ device_type }) {
  try {
    const result = await postData('/api/implement_main_banners', {
      device_type
    });
    console.log('Implement Home Banner for', device_type, '::' , result);
    return result.data;
  } catch (error) {
    console.error('Error fetching implement faqs:', error);
    throw error;
  }
}
