
import { PrismaUserRepository } from "../../../infrastructure/database/repositories/prisma-user.repository";
import { RegisterCustomerUseCase } from "../../../application/auth/use-cases/register-customer.use-case";
import { RegisterCustomerController } from "../controllers/register-customer.controller";


const userRepository = new PrismaUserRepository()
const registerCustomerUseCase = new RegisterCustomerUseCase(userRepository)
export const registerCustomerController = new RegisterCustomerController(registerCustomerUseCase);