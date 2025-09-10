import { postData } from "../apiMethods";

export async function getAllTyreDealerBrands({ brand, state, city, lang }) {
  try {
    const result = await postData(`/api/all_dealer_urls`, {
      brand_name: brand || null,
      state: state || null,
      city: city || null,
      lang: lang || "en",
    });
    return result.brand_urls;
  } catch (error) {
    console.error("Error fetching tyre dealers:", error);
  }
}
