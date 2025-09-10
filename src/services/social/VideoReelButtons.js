import { postData } from "../apiMethods";

export async function postVideoReelButtons(payload) {
  try {
    const result = await postData("/api/video_reels_btn_function", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
