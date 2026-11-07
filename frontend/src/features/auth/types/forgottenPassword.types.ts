export interface ForgottenPasswordFormData {
    email : string
}

export interface ForgottenPasswordRequest {
  email: string;
}

export interface ForgottenPasswordResponse {
  success: boolean;
  message: string
}
