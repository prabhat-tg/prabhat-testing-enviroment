import { postData } from "../apiMethods";

export async function getBrandWebStoryVideos(url, payload) {
  try {
    const result = await postData(url, payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
