import { postData } from "../apiMethods";

export async function getLatestImplements(lang) {
  try {
    const result = await postData("/api/home_implement_latest", { lang });
    // console.log('Latest Implements', result);
    // return result.data
    const modifiedData = result.data.map((item) => ({
      brand: item.brand_name,
      power: item.implement_power || undefined,
      width: item.working_width || undefined,
      warranty: item.warranty || undefined,
      pageUrl: item.page_url,
      // Keeping all other original keys if needed
      ...item,
      image: `/${item.image}` || undefined, // image → full URL
    }));

    // console.log("Latest Implements Modified:", modifiedData);
    return modifiedData;
  } catch (error) {
    console.error("Error fetching popular implements:", error);
  }
}
