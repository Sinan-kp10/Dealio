import { PrismaUserManagementRepository } from "../database/repositories/prisma-user-management.repository"
import { GetUsersUseCase } from "../../application/use-cases/get-users.use-case"
import { UserManagementController } from "../../presentation/controllers/user-management.controller"
import { SuspendAccountUseCase } from "../../application/use-cases/suspend-account.use-case"
import { ReactivateAccountUseCase } from "../../application/use-cases/reactivate-account.use-case"


const userManagementRepository = new PrismaUserManagementRepository()
const getUsersUseCase = new GetUsersUseCase(userManagementRepository)
const suspendAccountUseCase = new SuspendAccountUseCase(userManagementRepository)
const reactivateAccountUseCase = new ReactivateAccountUseCase(userManagementRepository)

export const userManagementController = new UserManagementController(getUsersUseCase, suspendAccountUseCase, reactivateAccountUseCase)

