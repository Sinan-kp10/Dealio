import { PrismaUserManagementRepository } from "../database/repositories/prisma-user-management.repository"
import { GetUsersUseCase } from "../../application/use-cases/get-users.use-case"
import { UserManagementController } from "../../presentation/controllers/user-management.controller"


const userManagementRepository = new PrismaUserManagementRepository()
const getUsersUseCase = new GetUsersUseCase(userManagementRepository)
export const userManagementController = new UserManagementController(getUsersUseCase)