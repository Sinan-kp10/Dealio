import { AppError } from "../../../../shared/errors/app-error.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type { CustomerProfileRepository } from "../../domain/customer-profile.repository.js";
import type { CustomerEditProfileDto, UpdatedCustomerProfileFieldsDto } from "../dto/customer-profile.dto.js";

export class EditCustomerProfileUseCase implements IUseCase<CustomerEditProfileDto, UpdatedCustomerProfileFieldsDto> {
    constructor(
        private readonly customerProfileRepository: CustomerProfileRepository
    ) {}

    execute = async (dto: CustomerEditProfileDto): Promise<UpdatedCustomerProfileFieldsDto> => {
        const { userId } = dto;
        const user = await this.customerProfileRepository.findById(userId);

        if (!user) {
            throw new AppError("Account not found.", 404);
        }

        const dataToUpdate: UpdatedCustomerProfileFieldsDto = {};

        if (dto.name !== undefined && dto.name !== null) {
            dataToUpdate.name = dto.name.trim();
        }

        if (dto.phone !== undefined) {
            dataToUpdate.phone = dto.phone ? dto.phone.trim() : null;
        }

        return await this.customerProfileRepository.editCustomerProfile(userId, dataToUpdate);
    };
}
