import type { Request, Response, NextFunction } from "express";
import { IApiResponse } from "../../../../shared/application/api-response";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { CategoryOptionDto, EnterpriseProfileDto, UpdateEnterpriseDetailsDto } from "../../application/dto/enterprise-profile.dto";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

export class EnterpriseProfileController {

    constructor(
        private readonly getEnterpriseProfileUseCase : IUseCase<string, EnterpriseProfileDto>,
        private readonly updateEnterpriseDetailsUseCase : IUseCase<UpdateEnterpriseDetailsDto, EnterpriseProfileDto>,
        private readonly getActiveCategoriesUseCase : IUseCase<void, CategoryOptionDto[]>
    ){}

    getProfile = async(req: Request, res: Response<IApiResponse>, next: NextFunction)=> {
        try {

            const userId = req.auth?.userId;

            const profile = await this.getEnterpriseProfileUseCase.execute(userId!)
            
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Enterprise profile retrieved successfully",
                data: profile,
            });
            
        } catch (error) {
            next(error)
        }
    }

    updateDetails = async(req: Request, res: Response<IApiResponse>, next: NextFunction)=> {
        try {

            const userId = req.auth?.userId

            const updatedDetails = await this.updateEnterpriseDetailsUseCase.execute({
                userId : userId!,
                ...req.body
            })

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Enterprise details updated successfully",
                data: updatedDetails,
            });
            
        } catch (error) {
            next(error)
        }
    }

    getCategories = async(_req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const categories = await this.getActiveCategoriesUseCase.execute();

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Categories retrieved successfully",
                data: categories,
            });
        } catch (error) {
            next(error);
        }
    }
}