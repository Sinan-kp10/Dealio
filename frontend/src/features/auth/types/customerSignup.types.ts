export interface CustomerSignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CustomerSignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CustomerSignupResponse {
  status: boolean;
  message: string;
}