import axiosInstance from "../../../app/lib/axios";
import type {
  ChangePassword,
  ChangePasswordResponse,
  RequestEmailChangePayload,
  RequestEmailChangeResponse,
  ResendEmailChangeOtpResponse,
  VerifyEmailChangePayload,
  VerifyEmailChangeResponse,
  RequestPhoneOtpPayload,
  RequestPhoneOtpResponse,
  VerifyPhoneOtpPayload,
  VerifyPhoneOtpResponse,
  ResendPhoneOtpResponse,
} from "../types/users-account-settings.types";

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

export const requestPhoneOtp = async (payload: RequestPhoneOtpPayload): Promise<RequestPhoneOtpResponse> => {
  const response = await axiosInstance.post<RequestPhoneOtpResponse>("/auth/request-phone-otp", payload);
  return response.data;
}

export const verifyPhoneOtp = async (payload: VerifyPhoneOtpPayload): Promise<VerifyPhoneOtpResponse> => {
  const response = await axiosInstance.post<VerifyPhoneOtpResponse>("/auth/verify-phone-otp", payload);
  return response.data;
}

export const resendPhoneOtp = async (): Promise<ResendPhoneOtpResponse> => {
  const response = await axiosInstance.post<ResendPhoneOtpResponse>("/auth/resend-phone-otp");
  return response.data;
}