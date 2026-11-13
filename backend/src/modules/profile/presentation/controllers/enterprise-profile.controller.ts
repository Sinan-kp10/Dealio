import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../../../shared/presentation/api-response";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { CategoryOptionDto, EnterpriseProfileDto, UpdateEnterpriseDetailsDto } from "../../application/dto/enterprise-profile.dto";

export class EnterpriseProfileController {

    constructor(
        private readonly getEnterpriseProfileUseCase : IUseCase<string, EnterpriseProfileDto>,
        private readonly updateEnterpriseDetailsUseCase : IUseCase<UpdateEnterpriseDetailsDto, EnterpriseProfileDto>,
        private readonly getActiveCategoriesUseCase : IUseCase<void, CategoryOptionDto[]>
    ){}

    getProfile = async(req: Request, res: Response, next: NextFunction)=> {
        try {

            const userId = req.auth?.userId;

            const profile = await this.getEnterpriseProfileUseCase.execute(userId!)
            
            sendResponse(res, "Enterprise profile retrieved successfully", profile);
            
        } catch (error) {
            next(error)
        }
    }

    updateDetails = async(req: Request, res: Response, next: NextFunction)=> {
        try {

            const userId = req.auth?.userId

            const updatedDetails = await this.updateEnterpriseDetailsUseCase.execute({
                userId : userId!,
                ...req.body
            })

            sendResponse(res, "Enterprise details updated successfully", updatedDetails);
            
        } catch (error) {
            next(error)
        }
    }

    getCategories = async(_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categories = await this.getActiveCategoriesUseCase.execute();

            sendResponse(res, "Categories retrieved successfully", categories);
        } catch (error) {
            next(error);
        }
    }
}