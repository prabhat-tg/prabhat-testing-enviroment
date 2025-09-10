import { postData } from "../apiMethods";

export async function getAllImplementModelsByBrand(type, brand) {
  try {
    const result = await postData("/api/implement_brand_modals", {
      implement_type: type,
      brand_name: brand,
    });
    console.log(
      "Fetched Implemnt model based on implement brands and Types...",
      result,
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching Implement brands", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
