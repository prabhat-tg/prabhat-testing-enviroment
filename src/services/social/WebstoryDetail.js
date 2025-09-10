import { postData } from "../apiMethods";

export async function getBrandWebStoryDetails(payload) {
  try {
    const result = await postData("/api/webstory_detail", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
