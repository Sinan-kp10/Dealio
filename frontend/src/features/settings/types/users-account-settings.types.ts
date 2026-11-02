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