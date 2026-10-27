import { PrismaCustomerManagementRepository } from "../database/repositories/prisma-customer-management.repository"
import { GetCustomerUseCase } from "../../application/use-cases/get-customer.use-case"
import { SuspendAccountUseCase } from "../../application/use-cases/suspend-account.use-case"
import { ReactivateAccountUseCase } from "../../application/use-cases/reactivate-account.use-case"
import { CustomerManagementController } from "../../presentation/controllers/user-management.controller"


const userManagementRepository = new PrismaCustomerManagementRepository()
const getUsersUseCase = new GetCustomerUseCase(userManagementRepository)
const suspendAccountUseCase = new SuspendAccountUseCase(userManagementRepository)
const reactivateAccountUseCase = new ReactivateAccountUseCase(userManagementRepository)

export const customerManagementController = new CustomerManagementController(getUsersUseCase, suspendAccountUseCase, reactivateAccountUseCase)

