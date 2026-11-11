import type { Request, Response, NextFunction } from "express";
import { IApiResponse } from "../../../../shared/application/api-response.js";
import { IUseCase } from "../../../../shared/application/base.usecase.js";
import {EnterpriseApprovalDetailsDto,PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto, RejectVerificationDto,} from "../../application/dto/profile-verification.dto.js";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum.js";

export class ProfileVerificationController {
    constructor(
        private readonly profileVerificationUseCase: IUseCase<PendingEnterpriseFiltersDto, PaginatedPendingEnterprisesDto>,
        private readonly getEnterpriseApprovalDetailsUseCase: IUseCase<string, EnterpriseApprovalDetailsDto>,
        private readonly verfyEnterpriseKycUseCase : IUseCase<string,void>,
        private readonly rejectEnterpriseKycUseCase: IUseCase<RejectVerificationDto, void>,
        private readonly rejectEnterpriseBankRecordUseCase: IUseCase<RejectVerificationDto, void>
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

    getEnterpriseApprovalDetails = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            const result = await this.getEnterpriseApprovalDetailsUseCase.execute(enterpriseId);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Enterprise approval details retrieved successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    verifyEnterpriseKyc = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            await this.verfyEnterpriseKycUseCase.execute(enterpriseId);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Enterprise kyc verified successfully",
            })
            
        } catch (error) {
            next(error);
        }
    };

    rejectEnterpriseKyc = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            const { reason } = req.body as { reason: string };

            await this.rejectEnterpriseKycUseCase.execute({ enterpriseId, reason });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Enterprise KYC rejected successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    rejectEnterpriseBankRecord = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            const { reason } = req.body as { reason: string };

            await this.rejectEnterpriseBankRecordUseCase.execute({ enterpriseId, reason });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Enterprise bank details rejected successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}
