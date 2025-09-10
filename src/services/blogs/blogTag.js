import { postData } from "../apiMethods";

export async function getBlogTag(payload) {
  try {
    const result = await postData("/api/blog_tag", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
