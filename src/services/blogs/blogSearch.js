import { postData } from "../apiMethods";

export async function getBlogSearch(payload) {
  try {
    const result = await postData("/api/blog_search", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
