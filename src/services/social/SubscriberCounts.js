import { fetchData } from "../apiMethods";

export async function getSocialMediaSubsCount() {
  try {
    const result = await fetchData("api/social_media_count");
    return result.data[0];
  } catch (error) {
    throw error;
  }
}
