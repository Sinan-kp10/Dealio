import { IUseCase } from "../../../../shared/application/base.usecase";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { CategoryListFiltersDto, PaginatedCategoryDto } from "../dto/category.dto";

export class GetCategoryUseCase implements IUseCase<CategoryListFiltersDto, PaginatedCategoryDto> {
    constructor(private readonly categoryRepository : ICategoryRepository){}

    execute = async(input : CategoryListFiltersDto): Promise<PaginatedCategoryDto> => {
        
        return await this.categoryRepository.findCategories(input)
    }
}