import { postData } from "../apiMethods";

export async function getLatestTractors(lang) {
  try {
    const result = await postData("/api/home_latest_tractor", {
      lang,
    });
    console.log("Latest Tractors::", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching latest tractors:", error);
  }
}
