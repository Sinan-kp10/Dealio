
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { RegisterCustomerUseCase } from "../../application/auth/use-cases/register-customer.use-case";
import { RegisterCustomerController } from "../../presentation/http/controllers/auth/register-customer.controller";
import { RegisterEnterpriseUseCase } from "../../application/auth/use-cases/register-enterprise.use-case";
import { emailService, otpService, passwordService } from "./infrastructure.container";
import { PrismaEnterpriseRepository } from "../database/repositories/prisma-enterprise.repository";
import { RegisterEnterpriseController } from "../../presentation/http/controllers/auth/register-enterprise.controller";
import { VerifyCustomerOtpuseCase } from "../../application/auth/use-cases/verify-customer-otp.use-case";
import { VerifyCustomerOtpController } from "../../presentation/http/controllers/auth/verify-customer-otp.controller";
import { VerifyEnterpriseOtpuseCase } from "../../application/auth/use-cases/verify-enterprise-otp.usecase";
import { VerifyEnterpriseOtpController } from "../../presentation/http/controllers/auth/verify-enterprise-otp.controller";
import { ResendOtpUseCase } from "../../application/auth/use-cases/resend-otp.use-case";
import { ResendOtpController } from "../../presentation/http/controllers/auth/resend-otp.controller";

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
