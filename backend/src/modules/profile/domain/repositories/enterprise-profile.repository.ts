import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { EnterpriseProfileDto } from "../../application/dto/enterprise-profile.dto";

export interface IEnterpriseProfileRepository extends IBaseRepository<EnterpriseProfileDto> {
    findEnterpriseProfile(id : string) : Promise<EnterpriseProfileDto | null>
}