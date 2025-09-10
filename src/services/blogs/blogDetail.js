import { postData } from "../apiMethods";

export async function getBlogDetails(payload) {
  try {
    const result = await postData("/api/blog_detail", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
