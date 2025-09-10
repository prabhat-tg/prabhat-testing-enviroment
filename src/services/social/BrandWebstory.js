import { postData } from "../apiMethods";

export async function getBrandWebStory(payload) {
  try {
    const result = await postData("/api/tyre_brand_webstory", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
