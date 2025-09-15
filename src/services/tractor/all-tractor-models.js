import { fetchData, postData } from "../apiMethods";

export async function getAllTractorModels(brand_name) {
  try {
    const result = await postData("/api/all_tractor_models", { brand_name });
    console.log("Fetched all tractor models...", result);

    return result.data;
  } catch (error) {
    console.error("Error fetching all tractor models:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
