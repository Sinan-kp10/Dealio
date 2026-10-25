
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { RegisterCustomerUseCase } from "../../application/auth/use-cases/register-customer.use-case";
import { RegisterCustomerController } from "../../presentation/http/controllers/auth/register-customer.controller";
import { RegisterEnterpriseUseCase } from "../../application/auth/use-cases/register-enterprise.use-case";
import { emailService, jwtTokenService, otpService, passwordService } from "./infrastructure.container";
import { PrismaEnterpriseRepository } from "../database/repositories/prisma-enterprise.repository";
import { RegisterEnterpriseController } from "../../presentation/http/controllers/auth/register-enterprise.controller";
import { VerifyCustomerOtpuseCase } from "../../application/auth/use-cases/verify-customer-otp.use-case";
import { VerifyCustomerOtpController } from "../../presentation/http/controllers/auth/verify-customer-otp.controller";
import { VerifyEnterpriseOtpuseCase } from "../../application/auth/use-cases/verify-enterprise-otp.usecase";
import { VerifyEnterpriseOtpController } from "../../presentation/http/controllers/auth/verify-enterprise-otp.controller";
import { ResendOtpUseCase } from "../../application/auth/use-cases/resend-otp.use-case";
import { ResendOtpController } from "../../presentation/http/controllers/auth/resend-otp.controller";
import { LoginUseCase } from "../../application/auth/use-cases/login.use-case";
import { LoginController } from "../../presentation/http/controllers/auth/login.controller";
import { ForgotPasswordUseCase } from "../../application/auth/use-cases/forgot-password.use-case";
import { ForgotPasswordController } from "../../presentation/http/controllers/auth/forgot-password.controller";
import { VerifyPasswordResetOtpUseCase } from "../../application/auth/use-cases/verify-password-reset-otp.use-case";
import { VerifyPasswordResetOtpController } from "../../presentation/http/controllers/auth/verify-password-reset-otp.controller";
import { ResetPasswordUseCase } from "../../application/auth/use-cases/reset-password.use-case";
import { ResetPasswordController } from "../../presentation/http/controllers/auth/reset-password.controller";

// Customer Signup
const userRepository = new PrismaUserRepository()
const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository,passwordService, otpService, emailService)
export const registerCustomerController = new RegisterCustomerController(registerCustomerUseCase);

const verifyCustomerOtpUseCase = new VerifyCustomerOtpuseCase(userRepository,otpService)
export const verifyCustomerOtpController = new VerifyCustomerOtpController(verifyCustomerOtpUseCase)

// Enterprise Signup
const enterpriseRepository = new PrismaEnterpriseRepository();
const registerEnterpriseUseCase = new RegisterEnterpriseUseCase(enterpriseRepository,passwordService, otpService, emailService)
export const registerEnterpriseController = new RegisterEnterpriseController(registerEnterpriseUseCase)

const verifyEnterpriseOtpuseCase = new VerifyEnterpriseOtpuseCase(enterpriseRepository, otpService)
export const verifyEnterpriseController = new VerifyEnterpriseOtpController(verifyEnterpriseOtpuseCase)

//resend OTP
const resendOtpUseCase = new ResendOtpUseCase(otpService, emailService)
export const resendOtpController = new ResendOtpController(resendOtpUseCase)


//login
const loginUseCase = new LoginUseCase(userRepository, passwordService, jwtTokenService)
export const loginController = new LoginController(loginUseCase)

//forgotten password
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, otpService, emailService)
export const forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase)

//verify reset password otp
const verifyPasswordResetOtpUseCase = new VerifyPasswordResetOtpUseCase(userRepository, otpService, jwtTokenService)
export const verifyPasswordResetOtpController = new VerifyPasswordResetOtpController(verifyPasswordResetOtpUseCase)

//update password 
const resetPasswordUseCase = new ResetPasswordUseCase (userRepository, passwordService, jwtTokenService)
export const resetPasswordController = new ResetPasswordController(resetPasswordUseCase)