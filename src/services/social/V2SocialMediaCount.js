import { postData } from "../apiMethods";

export async function getV2SocialMediaCount(payload) {
  try {
    const result = await postData("/api/v2/social_media_count", payload);
    return result?.data;
  } catch (error) {
    console.error("Error fetching result:", error);
    throw error;
  }
}
