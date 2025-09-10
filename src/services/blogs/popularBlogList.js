import { postData } from "../apiMethods";

export async function popularBlogList(payload) {
  try {
    const result = await postData(
      "/api/popular_blog_list",
      payload ? payload : {},
    );
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
