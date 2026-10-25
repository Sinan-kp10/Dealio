
export interface RegisterCustomerDto {
    name: string;
    email: string;
    password: string;
}

export interface CustomerRegistrationData {
  name: string;
  email: string;
  passwordHash: string;
}