import { IUseCase } from "../../../../shared/application/base.usecase";
import { ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { ISubCategoryRepository } from "../../domain/repositories/sub-category.repository";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { SubCategoryDto, UpdateSubCategoryDto, UpdatedSubCategoryFieldsDto } from "../dto/sub-category.dto";

export class UpdateSubCategoryUseCase implements IUseCase<UpdateSubCategoryDto, SubCategoryDto> {
    constructor(
        private readonly subCategoryRepository: ISubCategoryRepository,
        private readonly categoryRepository: ICategoryRepository
    ) {}

    execute = async (input: UpdateSubCategoryDto): Promise<SubCategoryDto> => {
        const existingSubCategory = await this.subCategoryRepository.findById(input.id);

        if (!existingSubCategory) {
            throw new NotFoundError("Subcategory not found");
        }

        const category = await this.categoryRepository.findById(input.categoryId);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        const dataToUpdate: UpdatedSubCategoryFieldsDto = {
            categoryId: input.categoryId,
        };

        if (input.subCategoryName !== undefined && input.subCategoryName !== null) {
            const normalizedName = input.subCategoryName.trim().toLowerCase();
            const duplicate = await this.subCategoryRepository.findByName(normalizedName);

            if (duplicate && duplicate.id !== input.id) {
                throw new ConflictError("Sub category name already exists", "subCategoryName");
            }

            dataToUpdate.subCategoryName = normalizedName;
        }

        if (input.status !== undefined && input.status !== null) {
            dataToUpdate.status = input.status;
        }

        return await this.subCategoryRepository.updateSubCategory(input.id, dataToUpdate);
    };
}
