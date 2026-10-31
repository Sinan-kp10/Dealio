import { AppError } from "../../../../shared/errors/app-error";
import { IUserManagementRepository } from "../../domain/repositories/user-management.repository";
import { SuspendAccountDto } from "../dto/suspend-account.dto";

import type { IUseCase } from "../../../../shared/application/base.usecase";

export class SuspendAccountUseCase implements IUseCase<SuspendAccountDto, void> {

    constructor(
        private readonly userManagementRepository: IUserManagementRepository,
    ){}

    execute = async( dto : SuspendAccountDto) : Promise<void> => {

        const {accountId} = dto
        const reason = dto.reason.trim()

        if (!reason){
            throw new AppError("Suspension reason is required.", 400);
        }

        const user = await this.userManagementRepository.findById(accountId)

         if (!user) {
            throw new AppError("Account not found.", 404);
        }

        if (user.role === "ADMIN") {
            throw new AppError("Admin accounts cannot be suspended.", 403);
        }

        if (user.status === "SUSPENDED") {
            throw new AppError("Account is already suspended.", 409);
        }

        await this.userManagementRepository.suspendAccount(accountId, reason)
        
    }

}