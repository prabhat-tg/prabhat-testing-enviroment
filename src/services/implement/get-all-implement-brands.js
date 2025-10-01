import { postData } from "../apiMethods";

export async function getAllImplementBrandsDetail(payload) {
  try {
    const result = await postData("/api/implement_brand", payload);
    console.log("Fetched Implement brands", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching Implement brands", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
