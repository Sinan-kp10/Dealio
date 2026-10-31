
export interface EnterpriseSignupFormData {
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface EnterpriseSignupRequest {
  companyName: string;
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