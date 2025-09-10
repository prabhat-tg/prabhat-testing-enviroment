import { postData } from "../apiMethods";

export async function getSecondHandTractorRelatedTractorList(payload) {
  try {
    const result = await postData("/api/second_hand_related_tractor", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
