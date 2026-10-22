
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { RegisterCustomerUseCase } from "../../application/auth/use-cases/register-customer.use-case";
import { RegisterCustomerController } from "../../presentation/http/controllers/register-customer.controller";
import { RegisterEnterpriseUseCase } from "../../application/auth/use-cases/register-enterprise.use-case";
import { passwordService } from "../security/password-service.instance";
import { PrismaEnterpriseRepository } from "../database/repositories/prisma-enterprise.repository";
import { RegisterEnterpriseController } from "../../presentation/http/controllers/register-enterprise.controller";

// Customer Signup
const userRepository = new PrismaUserRepository()
const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository,passwordService)
export const registerCustomerController = new RegisterCustomerController(registerCustomerUseCase);


// Enterprise Signup
const enterpriseRepository = new PrismaEnterpriseRepository();
const registerEnterpriseUseCase = new RegisterEnterpriseUseCase(enterpriseRepository,passwordService)
export const registerEnterpriseController = new RegisterEnterpriseController(registerEnterpriseUseCase)