import { BaseRepository } from "../../../shared/domian/base.repository";
import { CustomerProfileDto } from "../application/dto/customer-profile.dto";

export interface CustomerProfileRepository extends BaseRepository<CustomerProfileDto>{
    findCustomerProfile(userId : string) : Promise<CustomerProfileDto | null>
}