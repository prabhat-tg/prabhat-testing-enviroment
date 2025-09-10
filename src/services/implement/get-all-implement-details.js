import { postData } from "../apiMethods";

export async function getAllImplementDetails(type, id) {
  try {
    const result = await postData("/api/implement_details", {
      implement_type: type,
      id: id,
    });
    console.log("Fetched Implement Details", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching Implement Details", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
