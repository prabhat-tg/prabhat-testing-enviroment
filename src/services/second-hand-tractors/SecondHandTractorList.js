import { postData } from "../apiMethods";

export async function getSecondHandTractorList(payload) {
  try {
    const result = await postData("/api/all_second_hand_tractor_list", payload);
    console.log('Second Hand Tractor List::', result);
    return result.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
