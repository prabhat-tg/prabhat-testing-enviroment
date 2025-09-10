import { postData } from '../apiMethods';

export async function getSEOByPage(slug) {
  try {
    const result = await postData(`api/get_page_seo?slug=${slug}`);

    console.log("SEO Result for slug", slug, result); // Debugging line

    return result;
  } catch (error) {
    throw error;
  }
}
