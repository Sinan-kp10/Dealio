
export interface RegisterCustomerDto {
    name: string;
    email: string;
    password: string;
    phone?: string | null;
}