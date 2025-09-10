import { postData } from "../apiMethods";

export async function getUniqueTyreSize() {
  console.log("Fetching tyre unique tyre size...");
  try {
    const result = await postData("/api/all_unique_tyre_size");
    return result;
  } catch (error) {
    console.error("Error fetching unique tyre size:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
