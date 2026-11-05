export interface RequestEmailChangeDto {
    userId: string;
    newEmail: string;
}

export interface VerifyEmailChangeDto {
    userId: string;
    otp: string;
}

export interface VerifyEmailChangeResult {
    accessToken: string;
    refreshToken: string;
    email: string;
}

export interface ResendEmailChangeOtpDto {
    userId: string;
}
