import { postData } from "../apiMethods";

export async function getSecondHandSimilarTractorList(payload) {
  try {
    const result = await postData("/api/second_hand_similar_tractor", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
