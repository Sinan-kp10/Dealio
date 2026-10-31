import { EditCustomerProfileUseCase } from "../../application/use-cases/edit-customer-profile.use-case.js";
import { GetCustomerProfileUseCase } from "../../application/use-cases/get-customer-profile.use-case.js";
import { CustomerProfileController } from "../../presentation/controllers/customer-profile.controller.js";
import { PrismaCustomerProfileRepository } from "../database/repositories/prisma-customer-profile.repository.js";

const customerProfileRepository = new PrismaCustomerProfileRepository();
const getCustomerProfileUseCase = new GetCustomerProfileUseCase(customerProfileRepository);
const editCustomerProfileUseCase = new EditCustomerProfileUseCase(customerProfileRepository);
export const customerProfileController = new CustomerProfileController(getCustomerProfileUseCase, editCustomerProfileUseCase);
