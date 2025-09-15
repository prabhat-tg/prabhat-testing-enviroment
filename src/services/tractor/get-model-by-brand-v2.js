import { fetchData, postData } from '../apiMethods';

export async function getTractorModelsByBrand(brandName, lang = 'en') {
  try {
    const result = await postData(
      `/api/v2/tractor_list_by_brand?brand_name=${brandName}&lang=${lang}`
    );
    return result.data;
  } catch (error) {
    console.error('Error fetching tractor models:', error);
    throw error;
  }
}

export async function getAllModelByBrand(payload) {

  try {
    const result = await postData('/api/v2/all_tractor_models', payload);
    return result.data;
  } catch (error) {
    console.error('Error fetching all models by brand:', error);
    throw error;
  }
} 