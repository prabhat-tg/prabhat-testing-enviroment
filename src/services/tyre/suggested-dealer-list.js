import { postData } from "../apiMethods";
import { SUGGESTED_DEALER_LIST } from "../constants/api-constants";

export async function getAllSuggestedDealerListing(payload) {
  try {
    const result = await postData(`${SUGGESTED_DEALER_LIST}`, payload);
    return result;
  } catch (error) {
    console.error("Error fetching dealers:", error);
  }
}
