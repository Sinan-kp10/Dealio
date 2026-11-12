import { CreateCategoryUseCase } from "../../application/use-cases/create-category.use-case";
import { CreateSubCategoryUseCase } from "../../application/use-cases/create-sub-category.use-case";
import { GetActiveCategoriesUseCase } from "../../application/use-cases/get-active-categories.use-case";
import { GetCategoryUseCase } from "../../application/use-cases/get-category.use-case";
import { GetSubCategoryUseCase } from "../../application/use-cases/get-sub-category.use-case";
import { UpdateCategoryUseCase } from "../../application/use-cases/update-category.use-case";
import { CategoryController } from "../../presentation/controllers/category.controller";
import { SubCategoryController } from "../../presentation/controllers/sub-category.controller";
import { PrismaCategoryRepository } from "../repositories/prisma-category.repository";
import { PrismaSubCategoryRepository } from "../repositories/prisma-sub-category.repository";

const categoryRepository = new PrismaCategoryRepository()
const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
const getActiveCategoriesUseCase = new GetActiveCategoriesUseCase(categoryRepository)
export const categoryController = new CategoryController(getCategoryUseCase,createCategoryUseCase,updateCategoryUseCase,getActiveCategoriesUseCase)

//subcategory
const subCategoryRepository = new PrismaSubCategoryRepository()
const createSubCategoryUseCase = new CreateSubCategoryUseCase(subCategoryRepository, categoryRepository)
const getSubCategoryUseCase = new GetSubCategoryUseCase(subCategoryRepository)
export const subCategoryController = new SubCategoryController(createSubCategoryUseCase, getSubCategoryUseCase)
