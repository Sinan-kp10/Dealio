import { CreateCategoryUseCase } from "../../application/use-cases/create-category.use-case";
import { GetCategoryUseCase } from "../../application/use-cases/get-category.use-case";
import { UpdateCategoryUseCase } from "../../application/use-cases/update-category.use-case";
import { CategoryController } from "../../presentation/controllers/category.controllers";
import { PrismaCategoryRepository } from "../repositories/prisma-category.repository";

const categoryRepository = new PrismaCategoryRepository()
const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
export const categoryController = new CategoryController(getCategoryUseCase, createCategoryUseCase, updateCategoryUseCase)