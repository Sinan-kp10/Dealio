import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { CreateSubCategoryDto, PaginatedSubCategoryDto, SubCategoryDto, SubCategoryListFiltersDto, SubCategoryStatus } from "../../application/dto/sub-category.dto";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { IApiResponse } from "../../../../shared/application/api-response";

export class SubCategoryController {
    constructor(
        private readonly createSubCategoryUseCase : IUseCase<CreateSubCategoryDto, SubCategoryDto>,
        private readonly getSubCategoryUseCase : IUseCase<SubCategoryListFiltersDto, PaginatedSubCategoryDto>,
    ){}

    getSubCategories = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const subCategories = await this.getSubCategoryUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as SubCategoryStatus | undefined,
                categoryId: req.query.categoryId as string | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 5),
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Sub categories retrieved successfully",
                data: subCategories,
            });
        } catch (error) {
            next(error);
        }
    }

    createSubCategory = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {

        try {
            
            const {categoryId, subCategoryName , status } = req.body as CreateSubCategoryDto

            const subCategory = await this.createSubCategoryUseCase.execute({
                categoryId,
                subCategoryName,
                status
            })

            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: "Sub category created successfully",
                data: subCategory,
            })

        } catch (error) {
            next(error)
        }
    }


}
