import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../../../shared/presentation/api-response.js";
import { IUseCase } from "../../../../shared/application/base.usecase.js";
import {EnterpriseApprovalDetailsDto,PaginatedPendingEnterprisesDto,PendingEnterpriseFiltersDto, RejectVerificationDto,} from "../../application/dto/profile-verification.dto.js";

export class ProfileVerificationController {
    constructor(
        private readonly profileVerificationUseCase: IUseCase<PendingEnterpriseFiltersDto, PaginatedPendingEnterprisesDto>,
        private readonly getEnterpriseApprovalDetailsUseCase: IUseCase<string, EnterpriseApprovalDetailsDto>,
        private readonly verfyEnterpriseKycUseCase : IUseCase<string,void>,
        private readonly rejectEnterpriseKycUseCase: IUseCase<RejectVerificationDto, void>,
        private readonly verifyEnterpriseBankRecordUseCase: IUseCase<string, void>,
        private readonly rejectEnterpriseBankRecordUseCase: IUseCase<RejectVerificationDto, void>
    ) {}

    getPendingEnterprises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.profileVerificationUseCase.execute({
                search: req.query.search as string | undefined,
                category: req.query.category as string | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            });

            sendResponse(res, "Pending enterprises retrieved successfully", result);
        } catch (error) {
            next(error);
        }
    };

    getEnterpriseApprovalDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            const result = await this.getEnterpriseApprovalDetailsUseCase.execute(enterpriseId);

            sendResponse(res, "Enterprise approval details retrieved successfully", result);
        } catch (error) {
            next(error);
        }
    };

    verifyEnterpriseKyc = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            await this.verfyEnterpriseKycUseCase.execute(enterpriseId);

            sendResponse(res, "Enterprise kyc verified successfully");
        } catch (error) {
            next(error);
        }
    };

    rejectEnterpriseKyc = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            const { reason } = req.body as { reason: string };

            await this.rejectEnterpriseKycUseCase.execute({ enterpriseId, reason });

            sendResponse(res, "Enterprise KYC rejected successfully");
        } catch (error) {
            next(error);
        }
    };

    verifyEnterpriseBankRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            await this.verifyEnterpriseBankRecordUseCase.execute(enterpriseId);

            sendResponse(res, "Enterprise bank details verified successfully");
        } catch (error) {
            next(error);
        }
    };

    rejectEnterpriseBankRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const enterpriseId = req.params.enterpriseId as string;
            const { reason } = req.body as { reason: string };

            await this.rejectEnterpriseBankRecordUseCase.execute({ enterpriseId, reason });

            sendResponse(res, "Enterprise bank details rejected successfully");
        } catch (error) {
            next(error);
        }
    };
}
