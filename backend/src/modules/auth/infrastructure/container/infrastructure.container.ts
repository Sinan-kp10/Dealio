import { EmailService } from "../../../../infrastructure/email/email.service.js";
import { JwtTokenService } from "../security/jwt-token.service.js";
import { OtpService } from "../security/otp.service.js";
import { PasswordService } from "../security/password.service.js";
import { RefreshTokenService } from "../security/refresh-token.service.js";

export const passwordService = new PasswordService();
export const otpService = new OtpService();
export const emailService = new EmailService();
export const jwtTokenService = new JwtTokenService();
export const refreshTokenService = new RefreshTokenService();
