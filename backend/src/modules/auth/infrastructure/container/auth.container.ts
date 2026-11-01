import { ChangePasswordUseCase } from "../../application/use-cases/change-password.use-case";
import { ForgotPasswordUseCase } from "../../application/use-cases/forgot-password.use-case";
import { GetAuthenticatedUserUseCase } from "../../application/use-cases/get-authenticated-user.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RefreshTokenUseCase } from "../../application/use-cases/refresh-token.use-case";
import { RegisterCustomerUseCase } from "../../application/use-cases/register-customer.use-case";
import { RegisterEnterpriseUseCase } from "../../application/use-cases/register-enterprise.use-case";
import { RequestEmailChangeUseCase } from "../../application/use-cases/request-email-change.use-case";
import { ResendEmailChangeOtpUseCase } from "../../application/use-cases/resend-email-change-otp.use-case";
import { ResendOtpUseCase } from "../../application/use-cases/resend-otp.use-case";
import { ResetPasswordUseCase } from "../../application/use-cases/reset-password.use-case";
import { VerifyCustomerOtpuseCase } from "../../application/use-cases/verify-customer-otp.use-case";
import { VerifyEmailChangeUseCase } from "../../application/use-cases/verify-email-change.use-case";
import { VerifyEnterpriseOtpuseCase } from "../../application/use-cases/verify-enterprise-otp.usecase";
import { VerifyPasswordResetOtpUseCase } from "../../application/use-cases/verify-password-reset-otp.use-case";
import { AccountController } from "../../presentation/http/controllers/account.controller";
import { AuthenticatedUserController } from "../../presentation/http/controllers/authenticated-user.controller";
import { LoginController } from "../../presentation/http/controllers/login.controller";
import { OtpController } from "../../presentation/http/controllers/otp.controller";
import { PasswordResetController } from "../../presentation/http/controllers/password-reset.controller";
import { RefreshTokenController } from "../../presentation/http/controllers/refresh-token.controller";
import { RegistrationController } from "../../presentation/http/controllers/registration.controller";
import { PrismaEnterpriseRepository } from "../database/repositories/prisma-enterprise.repository";
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { emailService, jwtTokenService, otpService, passwordService, refreshTokenService } from "./infrastructure.container";


// Registration
const userRepository = new PrismaUserRepository();
const enterpriseRepository = new PrismaEnterpriseRepository();
const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository, passwordService, otpService, emailService);
const registerEnterpriseUseCase = new RegisterEnterpriseUseCase(enterpriseRepository, passwordService, otpService, emailService);
export const registrationController = new RegistrationController(registerCustomerUseCase, registerEnterpriseUseCase);

// OTP
const verifyCustomerOtpUseCase = new VerifyCustomerOtpuseCase(userRepository, otpService);
const verifyEnterpriseOtpuseCase = new VerifyEnterpriseOtpuseCase(enterpriseRepository, otpService);
const resendOtpUseCase = new ResendOtpUseCase(otpService, emailService);
export const otpController = new OtpController(verifyCustomerOtpUseCase, verifyEnterpriseOtpuseCase, resendOtpUseCase);

// Reset Password
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, otpService, emailService);
const verifyPasswordResetOtpUseCase = new VerifyPasswordResetOtpUseCase(userRepository, otpService, jwtTokenService);
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository, passwordService, jwtTokenService);
const changePasswordUseCase = new ChangePasswordUseCase(userRepository, passwordService);
export const passwordResetController = new PasswordResetController(forgotPasswordUseCase, verifyPasswordResetOtpUseCase, resetPasswordUseCase, changePasswordUseCase);

// Login & Refresh Token
const loginUseCase = new LoginUseCase(userRepository, passwordService, jwtTokenService, refreshTokenService);
export const loginController = new LoginController(loginUseCase, refreshTokenService);

const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, jwtTokenService, refreshTokenService);
export const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

// Authenticated User (/me)
const getAuthenticatedUserUseCase = new GetAuthenticatedUserUseCase(userRepository);
export const authenticatedUserController = new AuthenticatedUserController(getAuthenticatedUserUseCase);

// Account Security (Email Change)
const requestEmailChangeUseCase = new RequestEmailChangeUseCase(userRepository, otpService, emailService);
const verifyEmailChangeUseCase = new VerifyEmailChangeUseCase(userRepository, otpService, jwtTokenService);
const resendEmailChangeOtpUseCase = new ResendEmailChangeOtpUseCase(userRepository, otpService, emailService);
export const accountController = new AccountController(requestEmailChangeUseCase, verifyEmailChangeUseCase, resendEmailChangeOtpUseCase);
