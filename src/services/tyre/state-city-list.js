import { postData } from "../apiMethods";
import { STATE_CITY_LIST } from "../constants/api-constants";

export async function getAllStateCityList(payload) {
  if (!payload) return;
  try {
    const result = await postData(`${STATE_CITY_LIST}`, payload);
    return result;
  } catch (error) {
    console.error("Error fetching dealers:", error);
  }
}
