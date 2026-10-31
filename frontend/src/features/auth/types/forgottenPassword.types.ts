export interface ForgottenPasswordFormData {
    email : string
}

export interface ForgottenPasswordRequest {
  email: string;
}

export interface ForgottenPasswordResponse {
  status: boolean;
  message: string
}
