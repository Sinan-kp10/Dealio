import { IUseCase } from "../../../../shared/application/base.usecase";
import { ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { CategoryDto, UpdateCategoryDto, UpdatedCategoryFieldsDto } from "../dto/category.dto";

export class UpdateCategoryUseCase implements IUseCase<UpdateCategoryDto, CategoryDto> {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    execute = async (input: UpdateCategoryDto): Promise<CategoryDto> => {
        const existingCategory = await this.categoryRepository.findById(input.id);

        if (!existingCategory) {
            throw new NotFoundError("Category not found");
        }

        const dataToUpdate: UpdatedCategoryFieldsDto = {};

        if (input.categoryName !== undefined && input.categoryName !== null) {
            const normalizedName = input.categoryName.trim().toLowerCase();
            const duplicate = await this.categoryRepository.findByName(normalizedName);

            if (duplicate && duplicate.id !== input.id) {
                throw new ConflictError("Category name already exists", "categoryName");
            }

            dataToUpdate.categoryName = normalizedName;
        }

        if (input.status !== undefined && input.status !== null) {
            dataToUpdate.status = input.status;
        }

        return await this.categoryRepository.updateCategory(input.id, dataToUpdate);
    };
}
