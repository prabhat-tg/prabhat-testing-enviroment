import { CDN_URL } from "@/src/utils/assets/icons";
import { postData } from "../apiMethods";

export async function getAllImplementDetails(type, id, lang) {
  try {
    const result = await postData("/api/implement_details", {
      implement_type: type,
      id: id,
      lang
    });
    result.data.brand_logo = CDN_URL + result.data.brand_logo;
    console.log("Fetched Implement Details", type, id, lang, result);
    return result.data;
  } catch (error) {
    console.error("Error fetching Implement Details", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
