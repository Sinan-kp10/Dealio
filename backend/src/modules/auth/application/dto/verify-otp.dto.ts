import { EmailDto } from "./email.dto";

export interface VerifyOtpDto {
    email: string;
    otp: string;
}

export type ResendOtpPurpose = "REGISTRATION" | "PASSWORD_RESET"

export interface ResendOtpInput extends EmailDto {
    purpose: ResendOtpPurpose;
}