import { fetchData } from "../apiMethods";

export async function getAllWebstories() {
    try {
        const endpoint = `api/all_webstory`;
        const result = await fetchData(endpoint);
        console.log("webstories result:", result);


        if (!result?.data) {
            console.warn(`No web story data found`);
            return [];
        }

        result.data = result.data.map(story => ({
            ...story,
            full_url: '/web-story-in-india/' + story.url
        }));
        return result.data;
    } catch (error) {
        console.error(`Error fetching home web stories:`, error);
        return []; // Return empty array instead of throwing to prevent UI crashes
    }
}