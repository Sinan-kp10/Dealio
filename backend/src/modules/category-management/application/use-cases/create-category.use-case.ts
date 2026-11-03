import { IUseCase } from "../../../../shared/application/base.usecase";
import { ConflictError } from "../../../../shared/errors/app-error";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { CategoryDto, CreateCategoryDto } from "../dto/create-category.dto";

export class CreateCategoryUseCase implements IUseCase<CreateCategoryDto, CategoryDto> {

    constructor(private readonly categoryRepository : ICategoryRepository){}

    execute = async (input : CreateCategoryDto): Promise<CategoryDto> => {

        const categoryName = input.categoryName.trim().toLowerCase()

        const isExist = await this.categoryRepository.findByName(categoryName)

        if(isExist){
            throw new ConflictError("Category name already exist")
        }

        const category = await this.categoryRepository.createCategory(categoryName,input.status)

        return category

    }
}