import { postData } from "../apiMethods";
import { ALL_IMPLEMENT_ENQUIRY } from "../constants/api-constants";

export async function getPostImplementEnquiry(value) {
  try {
    const result = await postData(`${ALL_IMPLEMENT_ENQUIRY}`, value);
    return result?.data ? result : {};
  } catch (error) {
    console.error("Error fetching districts:", error);
    return {};
  }
}
