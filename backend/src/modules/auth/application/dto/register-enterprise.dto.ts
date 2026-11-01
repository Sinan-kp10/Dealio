export interface RegisterEnterpriseDto {
  enterpriseName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  password: string;
}

export interface EnterpriseRegistrationData {
  enterpriseName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  passwordHash: string;
}
