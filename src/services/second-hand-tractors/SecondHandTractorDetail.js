import { postData } from "../apiMethods";

export async function getSecondHandTractorDetail(payload) {
  try {
    const result = await postData("/api/second_hand_tractor_detail", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
