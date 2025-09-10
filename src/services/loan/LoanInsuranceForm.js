import { postData } from "../apiMethods";

export async function postLoanInsuranceForm(payload) {
  try {
    const result = await postData("/api/loan_insurance_form", payload);
    return result;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
}
