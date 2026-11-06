export interface RequestPhoneOtpDto {
    userId: string;
    phone: string;
}

export interface VerifyPhoneOtpDto {
    userId: string;
    otp: string;
}

export interface VerifyPhoneOtpResult {
    phone: string;
    phoneVerified: boolean;
}

export interface ResendPhoneOtpDto {
    userId: string;
}

