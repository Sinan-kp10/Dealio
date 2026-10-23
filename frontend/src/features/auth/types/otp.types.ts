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
  };
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