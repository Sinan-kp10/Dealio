import { EmailService } from "../../../../infrastructure/email/email.service.js";
import { JwtTokenService } from "../../../../infrastructure/security/jwt-token.service.js";
import { OtpService } from "../../../../infrastructure/security/otp.service.js";
import { PasswordService } from "../../../../infrastructure/security/password.service.js";

export const passwordService = new PasswordService();
export const otpService = new OtpService()
export const emailService = new EmailService()
export const jwtTokenService = new JwtTokenService()