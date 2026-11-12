export interface ChangePassword {
  currentPassword : string;
  newPassword : string;
  confirmPassword : string
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface RequestEmailChangePayload {
  newEmail: string;
}

export interface RequestEmailChangeResponse {
  success: boolean;
  message: string;
}

export interface VerifyEmailChangePayload {
  otp: string;
}

export interface VerifyEmailChangeResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}

export interface ResendEmailChangeOtpResponse {
  success: boolean;
  message: string;
}

export interface RequestPhoneOtpPayload {
  phone: string;
}

export interface RequestPhoneOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyPhoneOtpPayload {
  otp: string;
}

export interface VerifyPhoneOtpResponse {
  success: boolean;
  message: string;
  data: {
    phone: string;
  };
}

export interface ResendPhoneOtpResponse {
  success: boolean;
  message: string;
}