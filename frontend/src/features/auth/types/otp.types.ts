export interface OtpFormData {
  otp: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface CustomerVerifyOtpResponse {
  status: boolean;
  message: string;
  data?: {
    email: string;
    role: string;
  }
}

export interface EnterpriseVerifyOtpResponse {
  status: boolean;
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
  status: boolean;
  message: string;
}

export interface VerifyPasswordResetOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyPasswordResetOtpResponse {
  status: boolean;
  message: string;
  data: {
    resetToken: string;
  }
}