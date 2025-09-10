import { postData } from "../apiMethods";

export async function getSecondHandByDistrict(payload) {
  try {
    const result = await postData("/api/second_hand_by_district", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
