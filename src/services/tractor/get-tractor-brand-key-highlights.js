import { postData } from '../apiMethods';

export async function getTractorBrandKeyHighlights({ brand_name: brandName, lang: currentLang }) {
  try {
    const result = await postData('api/tractor_brand_key_highlight', {
      brand_name: brandName,
      lang: currentLang,
    });

    return result || null;
  } catch (error) {
    console.error('Error fetching tractor brand key highlights:', error);
    return null; // Return null on error
  }
}
