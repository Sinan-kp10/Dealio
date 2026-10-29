import { AppError } from "../../../../shared/errors/app-error";
import { CustomerProfileRepository } from "../../domain/customer-profile.repository";
import { CustomerEditProfileDto, UpdatedCustomerProfileFieldsDto } from "../dto/customer-profile.dto";

export class EditCustomerProfileUseCase {
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
