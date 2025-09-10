import { fetchData } from "../apiMethods";

export async function getAllTractorSubsidyStates({ lang = 'en' }) {
  try {
    const result = await fetchData(`/api/subsidy_state_list?lang=${lang}`);
    console.log("Fetched subsidy states:", result);

    return result.data;
  } catch (error) {
    console.error("Error fetching subsidy states:", error);
  }
}
