
import { ForgotPasswordUseCase } from "../../application/use-cases/forgot-password.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RegisterCustomerUseCase } from "../../application/use-cases/register-customer.use-case";
import { RegisterEnterpriseUseCase } from "../../application/use-cases/register-enterprise.use-case";
import { ResendOtpUseCase } from "../../application/use-cases/resend-otp.use-case";
import { ResetPasswordUseCase } from "../../application/use-cases/reset-password.use-case";
import { VerifyCustomerOtpuseCase } from "../../application/use-cases/verify-customer-otp.use-case";
import { VerifyEnterpriseOtpuseCase } from "../../application/use-cases/verify-enterprise-otp.usecase";
import { VerifyPasswordResetOtpUseCase } from "../../application/use-cases/verify-password-reset-otp.use-case";
import { ForgotPasswordController } from "../../presentation/http/controllers/forgot-password.controller";
import { LoginController } from "../../presentation/http/controllers/login.controller";
import { RegisterCustomerController } from "../../presentation/http/controllers/register-customer.controller";
import { RegisterEnterpriseController } from "../../presentation/http/controllers/register-enterprise.controller";
import { ResendOtpController } from "../../presentation/http/controllers/resend-otp.controller";
import { ResetPasswordController } from "../../presentation/http/controllers/reset-password.controller";
import { VerifyCustomerOtpController } from "../../presentation/http/controllers/verify-customer-otp.controller";
import { VerifyEnterpriseOtpController } from "../../presentation/http/controllers/verify-enterprise-otp.controller";
import { VerifyPasswordResetOtpController } from "../../presentation/http/controllers/verify-password-reset-otp.controller";
import { PrismaEnterpriseRepository } from "../database/repositories/prisma-enterprise.repository";
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { emailService, jwtTokenService, otpService, passwordService } from "./infrastructure.container";


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
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository, passwordService, jwtTokenService)
export const resetPasswordController = new ResetPasswordController(resetPasswordUseCase)