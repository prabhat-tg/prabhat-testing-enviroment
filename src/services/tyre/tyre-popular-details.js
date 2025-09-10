import { postData } from "../apiMethods";

export async function getTyrePopularDetails(lang) {
  try {
    const result = await postData("/api/tyre_popular_tyre_details", {
      lang,
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching tyre popular details:", error);
    // throw error; // Rethrow the error to be handled by the caller
  }
}
