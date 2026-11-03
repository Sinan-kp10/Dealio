import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { CategoryListFiltersDto, CategoryListItemDto, PaginatedCategoryDto } from "../../application/dto/category.dto";

export interface ICategoryRepository extends IBaseRepository<CategoryListItemDto> {
    findCategories(filters : CategoryListFiltersDto) : Promise<PaginatedCategoryDto>
}