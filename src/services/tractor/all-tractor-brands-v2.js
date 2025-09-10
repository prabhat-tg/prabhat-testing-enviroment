import { fetchData, postData } from '../apiMethods';

export async function getTractorBrands(lang = 'en') {
  try {
    const result = await postData(`/api/v2/all_tractor_brands?lang=${lang}`);
    result.data = result.data.map(item => ({
      ...item,
      name_hi: item.name,
    }));
    console.log("all tractor brand v2", result);

    return result.data;
  } catch (error) {
    console.error('Error fetching tractor brandsssss:', error);
    throw error;
  }
}
