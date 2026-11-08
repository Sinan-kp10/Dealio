import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type {CustomerProfileDto, UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto } from "../../application/dto/customer-profile.dto.js";
import type { IApiResponse } from "../../../../shared/application/api-response.js";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum.js";

export class CustomerProfileController {
    constructor(
        private readonly getCustomerProfileUseCase: IUseCase<string, CustomerProfileDto>,
        private readonly editCustomerProfileUseCase: IUseCase<UpdateCustomerProfileDto, UpdatedCustomerProfileFieldsDto>
    ) {}

    getProfile = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const profile = await this.getCustomerProfileUseCase.execute(userId!);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Customer profile retrieved successfully",
                data: profile,
            });
        } catch (error) {
            next(error);
        }
    };

    updateProfile = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const { name } = req.body;

            const updatedFields = await this.editCustomerProfileUseCase.execute({
                userId: userId!,
                name,
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Profile updated successfully",
                data: updatedFields,
            });
        } catch (error) {
            next(error);
        }
    };
}
