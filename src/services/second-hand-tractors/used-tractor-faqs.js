import { postData } from "../apiMethods";

export async function getUsedTractorFAQs({ slug, langPrefix }) {
  try {
    const result = await postData("/api/second_hand_faq", {
      slug,
      lang: langPrefix,
    });
    console.log('Used Tractor FAQs::', result);
    return result?.data;
  } catch (error) {
    console.error("Error fetching used tractor faqs:", error);
    // throw error;
  }
}
