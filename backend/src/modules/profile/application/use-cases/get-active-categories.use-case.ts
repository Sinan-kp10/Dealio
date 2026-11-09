import { IUseCase } from "../../../../shared/application/base.usecase.js";
import { IEnterpriseProfileRepository } from "../../domain/repositories/enterprise-profile.repository.js";
import { CategoryOptionDto } from "../dto/enterprise-profile.dto.js";

export class GetActiveCategoriesUseCase implements IUseCase<void, CategoryOptionDto[]> {
    constructor(
        private readonly enterpriseRepository: IEnterpriseProfileRepository
    ) {}

    execute = async (): Promise<CategoryOptionDto[]> => {
        return await this.enterpriseRepository.getActiveCategoriesWithSubcategories();
    };
}

