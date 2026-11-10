import type { Request, Response, NextFunction } from "express";
import { IApiResponse } from "../../../../shared/application/api-response.js";
import { IUseCase } from "../../../../shared/application/base.usecase.js";
import {PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto,} from "../../application/dto/profile-verification.dto.js";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum.js";

export class ProfileVerificationController {
    constructor(
        private readonly profileVerificationUseCase: IUseCase<PendingEnterpriseFiltersDto, PaginatedPendingEnterprisesDto>
    ) {}

    getPendingEnterprises = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const result = await this.profileVerificationUseCase.execute({
                search: req.query.search as string | undefined,
                category: req.query.category as string | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Pending enterprises retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };
}
