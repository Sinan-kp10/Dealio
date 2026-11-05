import { IUseCase } from "../../../../shared/application/base.usecase";
import { ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { ISubCategoryRepository } from "../../domain/repositories/sub-category.repository";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { CreateSubCategoryDto, SubCategoryDto } from "../dto/sub-category.dto";

export class CreateSubCategoryUseCase implements IUseCase<CreateSubCategoryDto, SubCategoryDto> {

    constructor(
        private readonly subCategoryRepository : ISubCategoryRepository,
        private readonly categoryRepository : ICategoryRepository
    ){}

    execute = async (input : CreateSubCategoryDto): Promise<SubCategoryDto> => {

        const category = await this.categoryRepository.findById(input.categoryId);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        const subCategoryName = input.subCategoryName.trim().toLowerCase()

        const isExist = await this.subCategoryRepository.findByName(subCategoryName)

        if(isExist){
            throw new ConflictError("Sub category name already exists", "subCategoryName")
        }

        const subCategory = await this.subCategoryRepository.createSubCategory(subCategoryName,input.categoryId, input.status)

        return subCategory

    }
}
