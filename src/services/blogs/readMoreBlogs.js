import { postData } from "../apiMethods";

export async function getReadMoreBlogs(payload) {
  try {
    const result = await postData("/api/read_more_blogs", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
