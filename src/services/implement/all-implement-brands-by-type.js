import { postData } from "../apiMethods";

export async function getAllImplementBrandsByType(implement_type) {
  try {
    const result = await postData("/api/implement_brand", {
      slug: implement_type,
    });
    console.log("Fetched Implemnt brands based on implement Types...", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching Implement brands", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
