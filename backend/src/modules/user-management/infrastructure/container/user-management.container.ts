import { GetCustomerUseCase } from "../../application/use-cases/get-customer.use-case"
import { SuspendAccountUseCase } from "../../application/use-cases/suspend-account.use-case"
import { ReactivateAccountUseCase } from "../../application/use-cases/reactivate-account.use-case"
import { UserManagementController } from "../../presentation/controllers/user-management.controller"
import { GetEnterpriseUseCase } from "../../application/use-cases/get-enterprise.use-case"
import { PrismaUserManagementRepository } from "../repositories/prisma-user-management.repository"


const userManagementRepository = new PrismaUserManagementRepository()
const getUsersUseCase = new GetCustomerUseCase(userManagementRepository)
const getEnterpriseUseCase = new GetEnterpriseUseCase(userManagementRepository)

const suspendAccountUseCase = new SuspendAccountUseCase(userManagementRepository)
const reactivateAccountUseCase = new ReactivateAccountUseCase(userManagementRepository)

export const userManagementController = new UserManagementController(getUsersUseCase, getEnterpriseUseCase, suspendAccountUseCase, reactivateAccountUseCase)

