import { postData } from "../apiMethods";

export async function postVideoReelDetails(payload) {
  try {
    const result = await postData("/api/video_reel_detail", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
