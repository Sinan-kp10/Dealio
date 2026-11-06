export interface ChangePassword {
  currentPassword : string;
  newPassword : string;
  confirmPassword : string
}

export interface ChangePasswordResponse {
  status : boolean,
  message : string
}

export interface RequestEmailChangePayload {
  newEmail: string;
}

export interface RequestEmailChangeResponse {
  status: boolean;
  message: string;
}

export interface VerifyEmailChangePayload {
  otp: string;
}

export interface VerifyEmailChangeResponse {
  status: boolean;
  message: string;
  data: {
    email: string;
  };
}

export interface ResendEmailChangeOtpResponse {
  status: boolean;
  message: string;
}

export interface RequestPhoneOtpPayload {
  phone: string;
}

export interface RequestPhoneOtpResponse {
  status: boolean;
  message: string;
}

export interface VerifyPhoneOtpPayload {
  otp: string;
}

export interface VerifyPhoneOtpResponse {
  status: boolean;
  message: string;
  data: {
    phone: string;
  };
}

export interface ResendPhoneOtpResponse {
  status: boolean;
  message: string;
}