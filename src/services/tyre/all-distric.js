import { postData } from "../apiMethods";
import { ALL_DISTRICT_API } from "../constants/api-constants";

export async function getFetchDistricts(selectedState) {
  if (!selectedState) return;
  try {
    const result = await postData(`${ALL_DISTRICT_API}`, {
      state: selectedState,
    });
    return result?.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching districts:", error);
  }
}
