import axiosInstance from "../../../app/lib/axios";
import type { CustomerSignupRequest, CustomerSignupResponse } from "../types/customerSignup.types";
import type { EnterpriseSignupRequest, EnterpriseSignupResponse } from "../types/enterpriseSignup.types";
import type { LoginRequest, LoginResponse } from "../types/login.type";
import type { CustomerVerifyOtpResponse, EnterpriseVerifyOtpResponse, ResendOtpRequest, ResendOtpResponse, VerifyOtpRequest} from "../types/otp.types";

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

export const resendEmailOtp = async (payload : ResendOtpRequest) : Promise<ResendOtpResponse> => {

    const response = await axiosInstance.post<ResendOtpResponse>("/auth/resend-email-otp", payload)

    return response.data
}

export const login = async(payload : LoginRequest) : Promise<LoginResponse> => {

    const response = await axiosInstance.post<LoginResponse>("/auth/login", payload)

    return response.data
}