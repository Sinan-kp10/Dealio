import { IBaseRepository } from "../../../../shared/domian/base.repository";
import { SubCategoryDto, SubCategoryStatus } from "../../application/dto/sub-category.dto";

export interface ISubCategoryRepository extends IBaseRepository<SubCategoryDto> {

    findByName(name : string) : Promise<SubCategoryDto | null>
    createSubCategory(name : string,id : string, status : SubCategoryStatus) : Promise<SubCategoryDto>

}