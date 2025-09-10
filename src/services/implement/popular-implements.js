import { postData } from "../apiMethods";

export async function getPopularImplements(lang) {
  try {
    const result = await postData("/api/home_implement_popular", {
      lang,
    });
    // console.log('Popular Implements', result);
    const modifiedData = result.data.map((item) => ({
      brand: item.brand_name,
      model: item.model,
      power: item.implement_power || undefined,
      width: item.working_width || undefined,
      warranty: item.warranty || undefined,
      full_image: item.image || undefined,
      pageUrl: item.page_url,
      // Keeping all other original keys if needed
      ...item,
    }));
    // console.log("Popular Implements Modified:", modifiedData);
    return modifiedData;
    // return result.data;
  } catch (error) {
    console.error("Error fetching popular implements:", error);
  }
}
