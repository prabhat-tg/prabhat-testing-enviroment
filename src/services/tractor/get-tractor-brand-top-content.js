import { postData } from '../apiMethods';

export async function getTractorBrandTopContent(payload) {
  try {
    console.log("Top Content for ", payload);
    const result = await postData('api/tractor_brand_top_content', payload);
    console.log(" ", result);


    return result?.data ? result.data : [];
  } catch (error) {
    console.error('Error fetching tractor brand top content for ', error);
    return []; // Return empty array on error
  }
}
