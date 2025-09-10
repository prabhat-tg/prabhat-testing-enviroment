import { postData } from "../apiMethods";

export async function getSecondTractorListByBrand(payload) {
  try {
    const result = await postData("/api/second_hand_by_brand", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
