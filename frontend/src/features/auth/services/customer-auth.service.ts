import axiosInstance from "../../../app/lib/axios";
import type { CustomerSignupRequest, CustomerSignupResponse } from "../types/customerSignup.types";

export const registerCustomer = async(payload : CustomerSignupRequest) : Promise<CustomerSignupResponse> => {

    const response = await axiosInstance.post<CustomerSignupResponse>("/auth/register/customer", payload)

    return response.data

}

