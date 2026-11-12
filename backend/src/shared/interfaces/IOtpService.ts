export interface IOtpService {
    generateAndStore(email: string, registrationData: unknown): Promise<string>;
    verify(email: string, otp: string): Promise<"valid" | "invalid" | "expired">;
    getRegistrationData<T>(email: string): Promise<T | null>;
    resend(email: string): Promise<string>;
    delete(email: string): Promise<void>;
    generatePasswordResetOtp(email: string): Promise<string>;
    verifyPasswordResetOtp(email: string, otp: string): Promise<"valid" | "invalid" | "expired">;
    resendPasswordResetOtp(email: string): Promise<string>;
    deletePasswordResetOtp(email: string): Promise<void>;
    generateEmailChangeOtp(userId: string, newEmail: string): Promise<string>;
    verifyEmailChangeOtp(userId: string, otp: string): Promise<"valid" | "invalid" | "expired">;
    getPendingEmailChange(userId: string): Promise<string | null>;
    resendEmailChangeOtp(userId: string): Promise<{ otp: string; newEmail: string }>;
    deleteEmailChangeOtp(userId: string): Promise<void>;
    generatePhoneOtp(userId: string, phone: string): Promise<string>;
    verifyPhoneOtp(userId: string, otp: string): Promise<"valid" | "invalid" | "expired">;
    getPendingPhone(userId: string): Promise<string | null>;
    resendPhoneOtp(userId: string): Promise<{ otp: string; phone: string }>;
    deletePhoneOtp(userId: string): Promise<void>;
}

