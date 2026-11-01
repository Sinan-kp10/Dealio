import { NotFoundError } from "../../../../shared/errors/app-error.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type { CustomerProfileRepository } from "../../domain/customer-profile.repository.js";
import type { CustomerProfileDto } from "../dto/customer-profile.dto.js";

export class GetCustomerProfileUseCase implements IUseCase<string, CustomerProfileDto> {
    constructor(
        private readonly customerProfileRepository: CustomerProfileRepository
    ) {}

    execute = async (userId: string): Promise<CustomerProfileDto> => {
        const profile = await this.customerProfileRepository.findCustomerProfile(userId);

        if (!profile) {
            throw new NotFoundError("Customer profile not found");
        }

        return profile;
    };
}
