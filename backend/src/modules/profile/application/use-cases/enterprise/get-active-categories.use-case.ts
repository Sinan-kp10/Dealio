import { IUseCase } from "../../../../../shared/application/base.usecase";
import { IEnterpriseProfileRepository } from "../../../domain/repositories/enterprise-profile.repository";
import { CategoryOptionDto } from "../../dto/enterprise-profile.dto";


export class GetActiveCategoriesUseCase implements IUseCase<void, CategoryOptionDto[]> {
    constructor(
        private readonly enterpriseRepository: IEnterpriseProfileRepository
    ) {}

    execute = async (): Promise<CategoryOptionDto[]> => {
        return await this.enterpriseRepository.getActiveCategoriesWithSubcategories();
    };
}

