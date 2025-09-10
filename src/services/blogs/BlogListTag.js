import { postData } from "../apiMethods";

export async function getAllBlogList(payload) {
  try {
    const result = await postData("/api/blog_list", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
