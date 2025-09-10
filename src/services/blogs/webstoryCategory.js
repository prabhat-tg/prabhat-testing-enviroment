import { fetchData } from "../apiMethods";

export async function webstoryCategory() {
  try {
    const result = await fetchData("/api/webstory_category");
    return result.data?.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
