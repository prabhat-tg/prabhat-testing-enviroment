import { fetchData, postData } from "../apiMethods";

export async function getImplementTypeCommonList(payload) {
    try {
        console.log("Fetching implement type common list with payload:", payload);

        const result = await postData("/api/implement_type_common_main_list_filter", payload);
        return result;
    } catch (error) {
        console.error("Error fetching implement type common list:", error);
        throw error;
    }
}
