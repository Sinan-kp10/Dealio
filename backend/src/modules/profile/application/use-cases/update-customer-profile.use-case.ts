import { NotFoundError } from "../../../../shared/errors/app-error.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type { UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../dto/customer-profile.dto.js";
import { ICustomerProfileRepository } from "../../domain/repositories/customer-profile.repository.js";

export class UpdateCustomerProfileUseCase implements IUseCase<UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto> {
    constructor(
        private readonly customerProfileRepository: ICustomerProfileRepository
    ) {}

    execute = async (input: UpdateCustomerProfileDto): Promise<UpdatedCustomerProfileFieldsDto> => {
        const { userId, name } = input;
        const user = await this.customerProfileRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("Account not found.");
        }

        return await this.customerProfileRepository.updateCustomerProfile(userId, { name });
    };
}
