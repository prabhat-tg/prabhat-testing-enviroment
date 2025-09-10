import { postData } from "../apiMethods";
import { FETCH_TYRE_MODAL_API } from "../constants/api-constants";

export async function getTyreModal(category) {
  console.log("Fetching tyre brand nres...");
  try {
    const result = await postData(`${FETCH_TYRE_MODAL_API}`, {
      brand_name: category,
    });
    return result?.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching tyre brand news:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
