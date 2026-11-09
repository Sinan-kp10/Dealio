import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { CategoryOptionDto, EnterpriseProfileDto, UpdatedEnterpriseDetailsDto } from "../../application/dto/enterprise-profile.dto";

export interface IEnterpriseProfileRepository extends IBaseRepository<EnterpriseProfileDto> {
    findEnterpriseProfile(id: string): Promise<EnterpriseProfileDto | null>;
    updateEnterpriseDetails(userId: string, enterpriseId: string, data: UpdatedEnterpriseDetailsDto): Promise<EnterpriseProfileDto>;
    getActiveCategoriesWithSubcategories(): Promise<CategoryOptionDto[]>;
}