import { postData } from "../apiMethods";

export async function getTyreBrandNews_db(category) {
  const categories = [
    `Tyre`,
    "Mrf Tyre",
    "Jk Tyre",
    "Apollo Tyre",
    "Ceat Tyre",
  ];

  console.log("Fetching tyre brand nres...");
  try {
    const result = await postData("/api/tyre_brand_news", {
      brand_name: category,
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching tyre brand news:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
