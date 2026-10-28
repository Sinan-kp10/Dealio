import { GetCustomerProfileUseCase } from "../../application/use-cases/get-customer-profile.use-case";
import { CustomerProfileController } from "../../presentation/controllers/customer-profile.controller";
import { PrismaCustomerProfileRepository } from "../database/repositories/prisma-customer-profile.repository";

const customerProfileRepository = new PrismaCustomerProfileRepository()
const getCustomerProfileUseCase = new GetCustomerProfileUseCase(customerProfileRepository)
export const customerProfileController = new CustomerProfileController(getCustomerProfileUseCase)