import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { PaginatedSubCategoryDto, SubCategoryDto, SubCategoryListFiltersDto, SubCategoryStatus } from "../../application/dto/sub-category.dto";

export interface ISubCategoryRepository extends IBaseRepository<SubCategoryDto> {

    findByName(name : string) : Promise<SubCategoryDto | null>
    createSubCategory(name : string,id : string, status : SubCategoryStatus) : Promise<SubCategoryDto>
    findSubCategories(filters : SubCategoryListFiltersDto) : Promise<PaginatedSubCategoryDto>

}
