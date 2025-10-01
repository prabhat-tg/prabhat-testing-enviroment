import { fetchData } from "../apiMethods";

export async function getConstructionMachineryBrand() {
    try {
        const result = await fetchData("/api/construction_machinery_brand_list");
        console.log("Fetched construction machinery brands", result);
        return result.data;
    } catch (error) {
        console.error("Error fetching construction machinery brands", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
