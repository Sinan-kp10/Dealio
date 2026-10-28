import { AppError } from "../../../../shared/errors/app-error";
import { CustomerProfileRepository } from "../../domain/customer-profile.repository";
import { CustomerProfileDto } from "../dto/customer-profile.dto";

export class GetCustomerProfileUseCase {
    constructor(
        private readonly customerProfileRepository : CustomerProfileRepository
    ){}

    execute = async(userId : string) : Promise<CustomerProfileDto> => {

        const profile = await this.customerProfileRepository.findCustomerProfile((userId))

        if (!profile) {
            throw new AppError("Customer profile not found", 404);
        }

        return profile;
    }
}