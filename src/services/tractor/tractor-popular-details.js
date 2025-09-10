import { postData } from "../apiMethods";

export async function getTractorPopularDetails(lang) {
  try {
    const result = await postData("/api/popular_tractor_details", {
      lang,
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching tractor popular details:", error);
    // throw error; // Rethrow the error to be handled by the caller
  }
}
