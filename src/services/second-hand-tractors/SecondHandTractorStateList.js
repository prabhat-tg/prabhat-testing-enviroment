import { postData } from "../apiMethods";

export async function getSecondHandTractorStateList(payload) {
  try {
    const result = await postData("/api/second_hand_by_state", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
