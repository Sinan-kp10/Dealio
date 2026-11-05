import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { CreateSubCategoryDto, SubCategoryDto } from "../../application/dto/sub-category.dto";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { IApiResponse } from "../../../../shared/application/api-response";

export class SubCategoryController {
    constructor(
        private readonly createSubCategoryUseCase : IUseCase<CreateSubCategoryDto, SubCategoryDto>,
    ){}

    createSubCategory = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {

        try {
            
            const {categoryId, subCategoryName , status } = req.body as CreateSubCategoryDto

            const subCategory = await this.createSubCategoryUseCase.execute({
                categoryId,
                subCategoryName,
                status
            })

            res.status(HttpStatusCode.CREATED).json({
                status: true,
                message: "Sub category created successfully",
                data: subCategory,
            })

        } catch (error) {
            next(error)
        }
    }


}