import axiosInstance from "../../../app/lib/axios";
import type { CustomerSignupRequest, CustomerSignupResponse } from "../types/customerSignup.types";
import type { EnterpriseSignupRequest, EnterpriseSignupResponse } from "../types/enterpriseSignup.types";
import type { CustomerVerifyOtpResponse, EnterpriseVerifyOtpResponse, VerifyOtpRequest} from "../types/otp.types";

export const registerCustomer = async(payload : CustomerSignupRequest) : Promise<CustomerSignupResponse> => {

    const response = await axiosInstance.post<CustomerSignupResponse>("/auth/register/customer", payload)

    return response.data

}

export const registerEnterprise = async (payload : EnterpriseSignupRequest) : Promise<EnterpriseSignupResponse> => {

    const response = await axiosInstance.post<EnterpriseSignupResponse>("/auth/register/enterprise", payload)

    return response.data
}

export const verifyCustomerOtp = async (payload : VerifyOtpRequest) : Promise<CustomerVerifyOtpResponse> => {

    const response = await axiosInstance.post<CustomerVerifyOtpResponse>("/auth/customer/verify-email-otp", payload)

    return response.data
}

export const verifyEnterpriseOtp = async (payload : VerifyOtpRequest) : Promise<EnterpriseVerifyOtpResponse> => {

    const response = await axiosInstance.post<EnterpriseVerifyOtpResponse>("/auth/enterprise/verify-email-otp", payload)

    return response.data
}
