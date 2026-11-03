import type { Request, Response, NextFunction } from "express";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { CategoryListFiltersDto, PaginatedCategoryDto } from "../../application/dto/category.dto";
import { IApiResponse } from "../../../../shared/application/api-response";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { CategoryDto, CreateCategoryDto } from "../../application/dto/create-category.dto";

export class CategoryController {
    constructor(
        private readonly getCategoryUseCase : IUseCase<CategoryListFiltersDto,PaginatedCategoryDto>,
        private readonly createCategoryUseCase : IUseCase<CreateCategoryDto, CategoryDto>
    ){}

    getCategories = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {

        try {

            const categories = await this.getCategoryUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as "ACTIVE" | "INACTIVE" | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            })

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Categories retrieved successfully",
                data: categories,
            });
            

        } catch (error) {
            next(error)
        }
    }

    createCategory = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {

        try {
            
            const {categoryName , status } = req.body as CreateCategoryDto

            const category = await this.createCategoryUseCase.execute({
                categoryName,
                status
            })

            res.status(HttpStatusCode.CREATED).json({
                status: true,
                message: "Categories created successfully",
                data: category,
            })

        } catch (error) {
            next(error)
        }
    }
}