export interface ResetPasswordFormData {
    password : string
    confirmPassword : string
}

export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}