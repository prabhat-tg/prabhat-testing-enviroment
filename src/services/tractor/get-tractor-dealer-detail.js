import { postData } from "../apiMethods";

export async function getTractorDealerDetail(dealerId) {

    try {
        let response = await postData(`/api/tractor_dealer_detail`, { id: dealerId });
        console.log("Tractor Dealer Detail:", response);
        if (response && response.success) response.data[0] = { ...response.data[0], images: 'https://tractorgyan.com' + response.data[0].images };
        return response;
    } catch (error) {
        console.error('Error fetching tractor dealer detail:', error);
        throw error;
    }
}
