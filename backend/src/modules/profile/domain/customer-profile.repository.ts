import { IBaseRepository } from "../../../shared/domian/base.repository.js";
import { CustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../application/dto/customer-profile.dto.js";

export interface CustomerProfileRepository extends IBaseRepository<CustomerProfileDto> {
    findCustomerProfile(userId: string): Promise<CustomerProfileDto | null>;
    updateCustomerProfile(userId: string, data: UpdatedCustomerProfileFieldsDto): Promise<UpdatedCustomerProfileFieldsDto>;
}
