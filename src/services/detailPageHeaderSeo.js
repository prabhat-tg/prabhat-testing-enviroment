import { postData } from './apiMethods';

export async function getDetailPageHeaderSEO(payload) {
  try {

    const result = await postData('/api/detail_page_header_seo', payload);
    console.log('Fetching SEO for payload:', payload, result);
    return result;
  } catch (error) {
    console.error('Error fetching SEO :', error);
    throw error;
  }
}
