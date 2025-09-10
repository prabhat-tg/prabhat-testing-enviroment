import { fetchData } from "../apiMethods";

export async function getAllImplementTypes() {
  try {
    const result = await fetchData("/api/all_implements_type");
    // console.log("All Implement Types::", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching all Implement Types", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
