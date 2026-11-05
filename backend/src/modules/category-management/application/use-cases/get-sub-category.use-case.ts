import { IUseCase } from "../../../../shared/application/base.usecase";
import { ISubCategoryRepository } from "../../domain/repositories/sub-category.repository";
import { PaginatedSubCategoryDto, SubCategoryListFiltersDto } from "../dto/sub-category.dto";

export class GetSubCategoryUseCase implements IUseCase<SubCategoryListFiltersDto, PaginatedSubCategoryDto> {
    constructor(private readonly subCategoryRepository: ISubCategoryRepository) {}

    execute = async (input: SubCategoryListFiltersDto): Promise<PaginatedSubCategoryDto> => {
        return await this.subCategoryRepository.findSubCategories(input);
    };
}

