
export interface RegisterEnterpriseDto {
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  password: string;
}

export interface EnterpriseRegistrationData {
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  passwordHash: string;
}
