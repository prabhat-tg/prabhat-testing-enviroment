import { fetchData } from "../apiMethods";
import { BLOG_CATEGORY } from "../constants/api-constants";

export async function getAllBlogCategory() {
  try {
    const result = await fetchData(`${BLOG_CATEGORY}`);
    return result;
  } catch (error) {
    throw error;
  }
}
