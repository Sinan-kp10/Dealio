import { BaseRepository } from "../../../shared/domian/base.repository";
import { CustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../application/dto/customer-profile.dto";

export interface CustomerProfileRepository extends BaseRepository<CustomerProfileDto>{
    findCustomerProfile(userId : string) : Promise<CustomerProfileDto | null>
    editCustomerProfile(userId : string , data: UpdatedCustomerProfileFieldsDto) : Promise<UpdatedCustomerProfileFieldsDto>
}