import { postData } from "../apiMethods";

export async function getBrandVideos(payload) {
  try {
    const result = await postData("/api/tyre_brand_videos", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
