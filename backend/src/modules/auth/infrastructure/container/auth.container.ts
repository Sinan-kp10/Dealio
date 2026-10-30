import { ForgotPasswordUseCase } from "../../application/use-cases/forgot-password.use-case";
import { GetCurrentUserUseCase } from "../../application/use-cases/get-current-user.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RegisterCustomerUseCase } from "../../application/use-cases/register-customer.use-case";
import { RegisterEnterpriseUseCase } from "../../application/use-cases/register-enterprise.use-case";
import { ResendOtpUseCase } from "../../application/use-cases/resend-otp.use-case";
import { ResetPasswordUseCase } from "../../application/use-cases/reset-password.use-case";
import { VerifyCustomerOtpuseCase } from "../../application/use-cases/verify-customer-otp.use-case";
import { VerifyEnterpriseOtpuseCase } from "../../application/use-cases/verify-enterprise-otp.usecase";
import { VerifyPasswordResetOtpUseCase } from "../../application/use-cases/verify-password-reset-otp.use-case";
import { CurrentUserController } from "../../presentation/http/controllers/current-user.controller";
import { LoginController } from "../../presentation/http/controllers/login.controller";
import { OtpController } from "../../presentation/http/controllers/otp.controller";
import { PasswordResetController } from "../../presentation/http/controllers/password-reset.controller";
import { RegistrationController } from "../../presentation/http/controllers/registration.controller";
import { PrismaEnterpriseRepository } from "../database/repositories/prisma-enterprise.repository";
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { emailService, jwtTokenService, otpService, passwordService } from "./infrastructure.container";


// Registration
const userRepository = new PrismaUserRepository()
const enterpriseRepository = new PrismaEnterpriseRepository();
const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository,passwordService, otpService, emailService)
const registerEnterpriseUseCase = new RegisterEnterpriseUseCase(enterpriseRepository,passwordService, otpService, emailService)
export const registrationController = new RegistrationController(registerCustomerUseCase, registerEnterpriseUseCase)

//otp
const verifyCustomerOtpUseCase = new VerifyCustomerOtpuseCase(userRepository,otpService)
const verifyEnterpriseOtpuseCase = new VerifyEnterpriseOtpuseCase(enterpriseRepository, otpService)
const resendOtpUseCase = new ResendOtpUseCase(otpService, emailService)
export const otpController = new OtpController(verifyCustomerOtpUseCase,verifyEnterpriseOtpuseCase,resendOtpUseCase)

// reset password
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, otpService, emailService)
const verifyPasswordResetOtpUseCase = new VerifyPasswordResetOtpUseCase(userRepository, otpService, jwtTokenService)
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository, passwordService, jwtTokenService)
export const passwordResetController = new PasswordResetController(forgotPasswordUseCase,verifyPasswordResetOtpUseCase, resetPasswordUseCase)

//login
const loginUseCase = new LoginUseCase(userRepository, passwordService, jwtTokenService)
export const loginController = new LoginController(loginUseCase)

const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository)
export const currentUserController = new CurrentUserController(getCurrentUserUseCase)