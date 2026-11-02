import type { Request, Response, NextFunction } from "express";
import { IApiResponse } from "../../../../shared/application/api-response";
import { IUseCase } from "../../../../shared/application/base.usecase";
import { EnterpriseProfileDto } from "../../application/dto/enterprise-profile.dto";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

export class EnterpriseProfileController {

    constructor(
        private readonly getEnterpriseProfileUseCase : IUseCase<string, EnterpriseProfileDto>
    ){}


    getProfile = async(req: Request, res: Response<IApiResponse>, next: NextFunction)=> {
        try {

            const userId = req.auth?.userId;

            const profile = await this.getEnterpriseProfileUseCase.execute(userId!)
            
            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Enterprise profile retrieved successfully",
                data: profile,
            });
            
        } catch (error) {
            next(error)
        }
    }
}