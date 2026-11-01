import { NotFoundError, ForbiddenError, ConflictError } from "../../../../shared/errors/app-error";
import { IUserManagementRepository } from "../../domain/repositories/user-management.repository";
import { ReactivateAccountDto } from "../dto/suspend-account.dto";

import type { IUseCase } from "../../../../shared/application/base.usecase";

export class ReactivateAccountUseCase implements IUseCase<ReactivateAccountDto, void> {
    constructor(
        private readonly userManagementRepository: IUserManagementRepository,
    ){}

    execute = async (dto: ReactivateAccountDto): Promise<void> => {
        const { accountId } = dto;

        const user = await this.userManagementRepository.findById(accountId);

        if (!user) {
            throw new NotFoundError("Account not found.");
        }

        if (user.role === "ADMIN") {
            throw new ForbiddenError("Admin accounts cannot be reactivated.")
        }

        if (user.status === "ACTIVE") {
            throw new ConflictError("Account is already active.");
        }

        await this.userManagementRepository.reactivateAccount(accountId);
    }
}
