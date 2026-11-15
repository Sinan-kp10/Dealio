import { IUseCase } from "../../../../shared/application/base.usecase";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { ActiveCategoryDto } from "../dto/category.dto";

export class GetActiveCategoriesUseCase implements IUseCase<void, ActiveCategoryDto[]> {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    execute = async (): Promise<ActiveCategoryDto[]> => {
        return await this.categoryRepository.findActiveCategories();
    };
}

