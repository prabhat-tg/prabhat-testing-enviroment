import { postData } from "../apiMethods";

export async function getSecondHandTractorPriceList(payload) {
  try {
    const result = await postData("/api/second_hand_price_list", payload);
    console.log('Second Hand Tractor Price List::', result);
    return result?.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
