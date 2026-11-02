import axiosInstance from "../../../app/lib/axios";
import type { ChangePassword, ChangePasswordResponse, RequestEmailChangePayload, RequestEmailChangeResponse, ResendEmailChangeOtpResponse, VerifyEmailChangePayload, VerifyEmailChangeResponse } from "../types/common-profile.types";

export const changePassword = async (payload: ChangePassword): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.post<ChangePasswordResponse>("/auth/change-password", payload);
  return response.data;
}

export const requestEmailChange = async (payload: RequestEmailChangePayload): Promise<RequestEmailChangeResponse> => {
  const response = await axiosInstance.post<RequestEmailChangeResponse>("/auth/request-email-change", payload);
  return response.data;
}

export const verifyEmailChange = async (payload: VerifyEmailChangePayload): Promise<VerifyEmailChangeResponse> => {
  const response = await axiosInstance.post<VerifyEmailChangeResponse>("/auth/verify-email-change", payload);
  return response.data;
}

export const resendEmailChangeOtp = async (): Promise<ResendEmailChangeOtpResponse> => {
  const response = await axiosInstance.post<ResendEmailChangeOtpResponse>("/auth/resend-email-change-otp");
  return response.data;
}