import { UpdateCustomerProfileUseCase } from "../../application/use-cases/update-customer-profile.use-case.js";
import { GetCustomerProfileUseCase } from "../../application/use-cases/get-customer-profile.use-case.js";
import { CustomerProfileController } from "../../presentation/controllers/customer-profile.controller.js";
import { PrismaCustomerProfileRepository } from "../database/repositories/prisma-customer-profile.repository.js";
import { PrismaEnterpriseProfileRepository } from "../database/repositories/prisma-enterprise-profile.repository.js";
import { GetEnterpriseProfileUseCase } from "../../application/use-cases/get-enterprise-profile.use-case.js";
import { EnterpriseProfileController } from "../../presentation/controllers/enterprise-profile.controller.js";

//customer
const customerProfileRepository = new PrismaCustomerProfileRepository();
const getCustomerProfileUseCase = new GetCustomerProfileUseCase(customerProfileRepository);
const editCustomerProfileUseCase = new UpdateCustomerProfileUseCase(customerProfileRepository);
export const customerProfileController = new CustomerProfileController(getCustomerProfileUseCase, editCustomerProfileUseCase);

//enterprise
const enterpriseProfileRepository = new PrismaEnterpriseProfileRepository()
const getEnterpriseProfileUseCase = new GetEnterpriseProfileUseCase(enterpriseProfileRepository)
export const enterpriseProfileController = new EnterpriseProfileController(getEnterpriseProfileUseCase)