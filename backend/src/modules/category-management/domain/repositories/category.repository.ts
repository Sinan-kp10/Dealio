import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { CategoryListFiltersDto, CategoryListItemDto, CategoryStatus, PaginatedCategoryDto } from "../../application/dto/category.dto";
import { CategoryDto } from "../../application/dto/create-category.dto";

export interface ICategoryRepository extends IBaseRepository<CategoryListItemDto> {
    findCategories(filters : CategoryListFiltersDto) : Promise<PaginatedCategoryDto>
    findByName(name: string): Promise<CategoryDto | null>;
    createCategory(name : string, status : CategoryStatus) : Promise<CategoryDto>
}