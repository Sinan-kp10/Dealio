import { ConflictError, NotFoundError } from "../../../../shared/errors/app-error.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type { UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../dto/customer-profile.dto.js";
import { ICustomerProfileRepository } from "../../domain/repositories/customer-profile.repository.js";

export class UpdateCustomerProfileUseCase implements IUseCase<UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto> {
    constructor(
        private readonly customerProfileRepository: ICustomerProfileRepository
    ) {}

    execute = async (input : UpdateCustomerProfileDto): Promise<UpdatedCustomerProfileFieldsDto> => {
        const { userId } = input;
        const user = await this.customerProfileRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("Account not found.");
        }

        const dataToUpdate: UpdatedCustomerProfileFieldsDto = {};

        if (input.name !== undefined && input.name !== null) {
            dataToUpdate.name = input.name.trim();
        }

        if (input.phone !== undefined) {
            const trimmedPhone = input.phone ? input.phone.trim() : null;

            if (trimmedPhone !== user.phone) {
                if (trimmedPhone) {
                    const isVerified = await this.customerProfileRepository.isPhoneVerified(trimmedPhone);
                    if (isVerified) {
                        throw new ConflictError("Phone number is already registered and verified", "phone");
                    }
                }

                dataToUpdate.phone = trimmedPhone;
                dataToUpdate.phone_verified = false;
            }
        }

        return await this.customerProfileRepository.updateCustomerProfile(userId, dataToUpdate);
    };
}
