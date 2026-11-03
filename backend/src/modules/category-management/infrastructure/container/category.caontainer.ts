import { GetCategoryUseCase } from "../../application/use-cases/get-category.use-case";
import { CategoryController } from "../../presentation/controllers/category.controllers";
import { PrismaCategoryRepository } from "../repositories/prisma-category.repository";

const categoryRepository = new PrismaCategoryRepository()
const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)
export const categoryController = new CategoryController(getCategoryUseCase)