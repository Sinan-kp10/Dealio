import type { Request, Response, NextFunction } from "express";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { CategoryListFiltersDto, PaginatedCategoryDto } from "../../application/dto/category.dto";
import { IApiResponse } from "../../../../shared/application/api-response";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

export class CategoryController {
    constructor(
        private readonly getCategoryUseCase : IUseCase<CategoryListFiltersDto,PaginatedCategoryDto>
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
}