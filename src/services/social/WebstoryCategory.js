import { fetchData } from "../apiMethods";

export async function getAllSocialStoryCategory() {
  try {
    const result = await fetchData("/api/webstory_category");
    return result;
  } catch (error) {
    console.error("Error fetching story categories:", error);
    return null;
  }
}
