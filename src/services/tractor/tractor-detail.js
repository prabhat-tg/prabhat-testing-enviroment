import { postData } from '../apiMethods';

export async function getTractorDetail({ productId, lang }) {
  try {
    const result = await postData('/api/tractor_detail', {
      product_id: productId,
      lang: lang,
    });

    if (result?.data?.[0]) {
      result.data[0].brand_logo = "https://images.tractorgyan.com/uploads" + result.data[0].brand_logo;

      // Combine image_1, image_2, image_3 into single image key
      const images = [];

      if (result.data[0].image) images.push(result.data[0].image);
      if (result.data[0].image_1) images.push(result.data[0].image_1);
      if (result.data[0].image_2) images.push(result.data[0].image_2);
      if (result.data[0].image_3) images.push(result.data[0].image_3);

      if (images.length > 0) {
        result.data[0].images = images.join(',');
      }
    }
    console.log('Tractor detail API response:', productId, lang);

    return result?.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching tractor detail:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
