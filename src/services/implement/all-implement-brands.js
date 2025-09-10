import { postData } from "../apiMethods";

export async function getAllImplementBrands(implement_type) {
  try {
    const result = await postData("/api/implement_brand_list", {
      implement_type,
    });
    console.log("Fetched Implement brands", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching Implement brands", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
