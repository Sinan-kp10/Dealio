import { AppError } from "../../../../shared/errors/app-error";
import { CustomerManagementRepository } from "../../domain/repositories/customer-management.repository";
import { ReactivateAccountDto } from "../dto/suspend-account.dto";

export class ReactivateAccountUseCase {
    constructor(
        private readonly userManagementRepository: CustomerManagementRepository,
    ){}

    execute = async (dto: ReactivateAccountDto): Promise<void> => {
        const { accountId } = dto;

        const user = await this.userManagementRepository.findById(accountId);

        if (!user) {
            throw new AppError("Account not found.", 404);
        }

        if (user.role === "ADMIN") {
            throw new AppError("Admin accounts cannot be reactivated.",403)
        }

        if (user.status === "ACTIVE") {
            throw new AppError("Account is already active.", 409);
        }

        await this.userManagementRepository.reactivateAccount(accountId);
    }
}
