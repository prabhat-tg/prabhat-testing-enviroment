import { postData } from "../apiMethods";

export async function getSecondHandTractorMiniTractor(payload) {
  try {
    const result = await postData("/api/second_hand_mini_tractor", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
