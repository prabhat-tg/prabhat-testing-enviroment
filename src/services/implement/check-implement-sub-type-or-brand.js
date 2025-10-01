import { fetchData, postData } from "../apiMethods";

export async function checkImplementSubTypeOrBrand(payload) {
    try {
        const result = await fetchData("api/check_implement_sub_type_or_brand" + payload);
        return result;
    } catch (error) {
        console.error("Error checking implement sub type or brand:", error);
        throw error;
    }
}
