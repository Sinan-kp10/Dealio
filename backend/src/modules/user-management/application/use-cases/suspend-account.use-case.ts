import { BadRequestError, NotFoundError, ForbiddenError, ConflictError } from "../../../../shared/errors/app-error";
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
            throw new BadRequestError("Suspension reason is required.");
        }

        const user = await this.userManagementRepository.findById(accountId)

        if (!user) {
            throw new NotFoundError("Account not found.");
        }

        if (user.role === "ADMIN") {
            throw new ForbiddenError("Admin accounts cannot be suspended.");
        }

        if (user.status === "SUSPENDED") {
            throw new ConflictError("Account is already suspended.");
        }

        await this.userManagementRepository.suspendAccount(accountId, reason)
        
    }

}