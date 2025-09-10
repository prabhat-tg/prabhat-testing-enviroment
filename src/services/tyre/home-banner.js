import { postData } from "../apiMethods";

export async function getTyreHomeBanner(device_type) {
  try {
    const result = await postData(`/api/tyre_main_banners`, {
      device_type,
    });
    return result?.data ? result.data : [];
  } catch (error) {
    console.error("Error fetching tyre home banner:", error);
  }
}
