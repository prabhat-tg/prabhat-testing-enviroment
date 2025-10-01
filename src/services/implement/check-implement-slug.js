import { fetchData, postData } from "../apiMethods";

export async function checkImplementSlug(payload) {
    try {
        const result = await postData("/api/check_implement_slug", payload);
        // console.log("All Implement Types::", result);
        return result.data;
    } catch (error) {
        console.error("Error checking", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
