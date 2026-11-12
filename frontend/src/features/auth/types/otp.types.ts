export interface OtpFormData {
  otp: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface CustomerVerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    role: string;
  }
}

export interface EnterpriseVerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    enterpriseName : string
    contactPersonName : string
    email : string
    role : string
  };
}

export interface ResendOtpRequest {
  email: string;
  purpose: "REGISTRATION" | "PASSWORD_RESET"
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyPasswordResetOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyPasswordResetOtpResponse {
  success: boolean;
  message: string;
  data: {
    resetToken: string;
  }
}