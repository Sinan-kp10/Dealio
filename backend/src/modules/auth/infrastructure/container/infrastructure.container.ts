import { EmailService } from "../../../../infrastructure/email/email.service.js";
import { SmsService } from "../../../../infrastructure/sms/sms.service.js";
import { JwtTokenService } from "../security/jwt-token.service.js";
import { OtpService } from "../security/otp.service.js";
import { PasswordService } from "../security/password.service.js";
import { RefreshTokenService } from "../security/refresh-token.service.js";
import type { IPasswordService } from "../../../../shared/interfaces/IPasswordService.js";
import type { IOtpService } from "../../../../shared/interfaces/IOtpService.js";
import type { IEmailService } from "../../../../shared/interfaces/IEmailService.js";
import type { IJwtTokenService } from "../../../../shared/interfaces/IJwtTokenService.js";
import type { IRefreshTokenService } from "../../../../shared/interfaces/IRefreshTokenService.js";

export const passwordService: IPasswordService = new PasswordService();
export const otpService: IOtpService = new OtpService();
export const emailService: IEmailService = new EmailService();
export const smsService = new SmsService();
export const jwtTokenService: IJwtTokenService = new JwtTokenService();
export const refreshTokenService: IRefreshTokenService = new RefreshTokenService();
