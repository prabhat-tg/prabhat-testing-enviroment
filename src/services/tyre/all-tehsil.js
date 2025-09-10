import { postData } from "../apiMethods";
import { ALL_TEHSIL_API } from "../constants/api-constants";

export async function getFetchTehsil(selectedDistrict) {
  if (!selectedDistrict) return;
  try {
    const result = await postData(`${ALL_TEHSIL_API}`, {
      district: selectedDistrict,
    });
    return result?.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching districts:", error);
  }
}
