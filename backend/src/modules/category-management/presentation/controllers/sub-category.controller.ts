import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import {CreateSubCategoryDto,PaginatedSubCategoryDto,SubCategoryDto,SubCategoryListFiltersDto,SubCategoryStatus,UpdateSubCategoryDto,UpdatedSubCategoryFieldsDto,} from "../../application/dto/sub-category.dto";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../shared/presentation/api-response";

export class SubCategoryController {
    constructor(
        private readonly createSubCategoryUseCase: IUseCase<CreateSubCategoryDto, SubCategoryDto>,
        private readonly getSubCategoryUseCase: IUseCase<SubCategoryListFiltersDto, PaginatedSubCategoryDto>,
        private readonly updateSubCategoryUseCase: IUseCase<UpdateSubCategoryDto, SubCategoryDto>
    ) {}

    getSubCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const subCategories = await this.getSubCategoryUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as SubCategoryStatus | undefined,
                categoryId: req.query.categoryId as string | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 5),
            });

            sendResponse(res, "Sub categories retrieved successfully", subCategories);
        } catch (error) {
            next(error);
        }
    };

    createSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { categoryId, subCategoryName, status } = req.body as CreateSubCategoryDto;

            const subCategory = await this.createSubCategoryUseCase.execute({
                categoryId,
                subCategoryName,
                status,
            });

            sendResponse(res, "Sub category created successfully", subCategory, HttpStatusCode.CREATED);
        } catch (error) {
            next(error);
        }
    };

    updateSubCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const data = req.body as UpdatedSubCategoryFieldsDto;

            const subCategory = await this.updateSubCategoryUseCase.execute({
                id,
                ...data,
            });

            sendResponse(res, "Sub category updated successfully", subCategory);
        } catch (error) {
            next(error);
        }
    };
}
