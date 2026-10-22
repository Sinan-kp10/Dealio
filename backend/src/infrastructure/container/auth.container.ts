
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { RegisterCustomerUseCase } from "../../application/auth/use-cases/register-customer.use-case";
import { RegisterCustomerController } from "../../presentation/http/controllers/auth/register-customer.controller";
import { RegisterEnterpriseUseCase } from "../../application/auth/use-cases/register-enterprise.use-case";
import { emailService, otpService, passwordService } from "./infrastructure.container";
import { PrismaEnterpriseRepository } from "../database/repositories/prisma-enterprise.repository";
import { RegisterEnterpriseController } from "../../presentation/http/controllers/auth/register-enterprise.controller";
import { VerifyCustomerOtpuseCase } from "../../application/auth/use-cases/verify-customer-otp.use-case";
import { VerifyCustomerOtpController } from "../../presentation/http/controllers/auth/verify-customer-otp.controller";

// Customer Signup
const userRepository = new PrismaUserRepository()
const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository,passwordService, otpService, emailService)
export const registerCustomerController = new RegisterCustomerController(registerCustomerUseCase);


// Enterprise Signup
const enterpriseRepository = new PrismaEnterpriseRepository();
const registerEnterpriseUseCase = new RegisterEnterpriseUseCase(enterpriseRepository,passwordService)
export const registerEnterpriseController = new RegisterEnterpriseController(registerEnterpriseUseCase)

//otp


const verifyCustomerOtpUseCase = new VerifyCustomerOtpuseCase(userRepository,otpService)
export const verifyCustomerOtpController = new VerifyCustomerOtpController(verifyCustomerOtpUseCase)