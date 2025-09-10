import { postData } from "../apiMethods";

export async function getTyreFAQs({ slug, langPrefix }) {
  try {
    const result = await postData("/api/tyre_faq", {
      slug,
      lang: langPrefix,
    });
    return result?.data;
  } catch (error) {
    console.error("Error fetching tyre faqs:", error);
    // throw error;
  }
}
