import { postData } from "../apiMethods";

export async function getTractorDealerFAQs(payload) {
    try {
        const result = await postData("/api/tractor_dealer_faq", payload);
        console.log("Tractor Dealer FAQs Result:", payload, result);

        return result?.data;
    } catch (error) {
        console.error("Error fetching tractor dealer faqs:", error);
        // throw error;
    }
}
