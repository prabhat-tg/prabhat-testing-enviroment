import { fetchData } from "../apiMethods";

export async function getAllImplementCategories() {
  try {
    const result = await fetchData("/api/implement_category_list");
    console.log("Fetched Implement Categories", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching Implement Categories", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
