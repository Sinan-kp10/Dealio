export interface EnterpriseSignupFormData {
  enterpriseName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface EnterpriseSignupRequest {
  enterpriseName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface EnterpriseSignupResponse {
  status: boolean;
  message: string;
}
