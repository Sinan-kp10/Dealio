import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type {CustomerProfileDto, UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../../application/dto/customer-profile.dto.js";
import { sendResponse } from "../../../../shared/presentation/api-response.js";

export class CustomerProfileController {
    constructor(
        private readonly getCustomerProfileUseCase: IUseCase<string, CustomerProfileDto>,
        private readonly editCustomerProfileUseCase: IUseCase<UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto>
    ) {}

    getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const profile = await this.getCustomerProfileUseCase.execute(userId!);

            sendResponse(res, "Customer profile retrieved successfully", profile);
        } catch (error) {
            next(error);
        }
    };

    updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const { name } = req.body;

            const updatedFields = await this.editCustomerProfileUseCase.execute({
                userId: userId!,
                name,
            });

            sendResponse(res, "Profile updated successfully", updatedFields);
        } catch (error) {
            next(error);
        }
    };
}
