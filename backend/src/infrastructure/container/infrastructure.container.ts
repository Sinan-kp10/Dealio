import { EmailService } from "../email/email.service.js";
import { OtpService } from "../security/otp.service.js";
import { PasswordService } from "../security/password.service.js";

export const passwordService = new PasswordService();
export const otpService = new OtpService()
export const emailService = new EmailService()