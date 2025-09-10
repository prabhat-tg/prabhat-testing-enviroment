import { postData } from "../apiMethods";
export async function getBlogFAQs({ slug, langPrefix }) {
  try {
    const result = await postData("/api/all_faq", {
      faq_tag: slug,
    });
    return result?.data;
  } catch (error) {
    console.error("Error fetching tyre faqs:", error);
    // throw error;
  }
}
