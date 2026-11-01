import axiosInstance from "../../../app/lib/axios";
import type {
  ChangeCustomerPassword,
  ChangeCustomerPasswordResponse,
  CustomerProfile,
  CustomerProfileResponse,
  UpdateCustomerProfile,
  UpdateCustomerProfileResponse,
  RequestEmailChangePayload,
  RequestEmailChangeResponse,
  VerifyEmailChangePayload,
  VerifyEmailChangeResponse,
  ResendEmailChangeOtpResponse,
} from "../types/customer.profile.types";

export const getCustomerProfile = async (): Promise<CustomerProfile> => {
  const response = await axiosInstance.get<CustomerProfileResponse>("/customer/profile");
  return response.data.data;
};

export const updateCustomerProfile = async (payload: UpdateCustomerProfile): Promise<UpdateCustomerProfileResponse> => {
  const response = await axiosInstance.patch<UpdateCustomerProfileResponse>("/customer/profile", payload)
  return response.data
}

export const changePassword = async (payload: ChangeCustomerPassword): Promise<ChangeCustomerPasswordResponse> => {
  const response = await axiosInstance.post<ChangeCustomerPasswordResponse>("/auth/change-password", payload);
  return response.data;
};

export const requestEmailChange = async (payload: RequestEmailChangePayload): Promise<RequestEmailChangeResponse> => {
  const response = await axiosInstance.post<RequestEmailChangeResponse>("/auth/request-email-change", payload);
  return response.data;
};

export const verifyEmailChange = async (payload: VerifyEmailChangePayload): Promise<VerifyEmailChangeResponse> => {
  const response = await axiosInstance.post<VerifyEmailChangeResponse>("/auth/verify-email-change", payload);
  return response.data;
};

export const resendEmailChangeOtp = async (): Promise<ResendEmailChangeOtpResponse> => {
  const response = await axiosInstance.post<ResendEmailChangeOtpResponse>("/auth/resend-email-change-otp");
  return response.data;
};
