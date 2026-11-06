import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { CustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../../application/dto/customer-profile.dto";

export interface ICustomerProfileRepository extends IBaseRepository<CustomerProfileDto> {
    findCustomerProfile(userId: string): Promise<CustomerProfileDto | null>;
    updateCustomerProfile(userId: string, data: UpdatedCustomerProfileFieldsDto): Promise<UpdatedCustomerProfileFieldsDto>;
    isPhoneVerified(phone: string): Promise<boolean>;
}
