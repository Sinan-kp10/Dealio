export interface OtpFormData {
  otp: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface CustomerVerifyOtpResponse {
  success: "success";
  message: string;
  data?: {
    email: string;
    role: string;
  }
}

export interface EnterpriseVerifyOtpResponse {
  success: "success";
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
  purpose: "REGITRATION" | "PASSWORD_RESET"
}

export interface ResendOtpResponse {
  status: "success";
  message: string;
}

export interface VerifyPasswordResetOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyPasswordResetOtpResponse {
  status: "success";
  message: string;
  data: {
    resetToken: string;
  }
}