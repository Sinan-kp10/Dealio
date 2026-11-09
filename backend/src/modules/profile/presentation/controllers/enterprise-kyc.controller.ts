import type { Request, Response, NextFunction } from "express";
import type { IApiResponse } from "../../../../shared/application/api-response";
import type { IUseCase } from "../../../../shared/application/base.usecase";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import type { CreateEnterpriseKycDto, EnterpriseKycDetailsDto, KycRequestDto, UpdateEnterpriseKycDto } from "../../application/dto/enterprise-kyc.dto";

export class EnterpriseKycController {
    constructor(
        private readonly getEnterpriseKycUseCase: IUseCase<string, EnterpriseKycDetailsDto>,
        private readonly createEnterpriseKycUseCase: IUseCase<CreateEnterpriseKycDto, KycRequestDto>,
        private readonly updateEnterpriseKycUseCase: IUseCase<UpdateEnterpriseKycDto, KycRequestDto>,
    ) {}

    getKyc = async (req: Request, res: Response<IApiResponse<EnterpriseKycDetailsDto>>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const kycDetails = await this.getEnterpriseKycUseCase.execute(userId!);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "KYC details retrieved successfully",
                data: kycDetails,
            });
        } catch (error) {
            next(error);
        }
    };

    addKyc = async (req: Request, res: Response<IApiResponse<KycRequestDto>>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const file = req.file!;

            const kycRecord = await this.createEnterpriseKycUseCase.execute({
                userId: userId!,
                businessType: req.body.businessType,
                fullLegalName: req.body.fullLegalName,
                documentType: req.body.documentType,
                file: {
                    buffer: file.buffer,
                    mimetype: file.mimetype,
                    size: file.size,
                },
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "KYC submitted successfully",
                data: kycRecord,
            });
        } catch (error) {
            next(error);
        }
    };

    updateKyc = async (req: Request, res: Response<IApiResponse<KycRequestDto>>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            const file = req.file
                ? {
                    buffer: req.file.buffer,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                }
                : undefined;

            const kycRecord = await this.updateEnterpriseKycUseCase.execute({
                userId: userId!,
                businessType: req.body.businessType,
                fullLegalName: req.body.fullLegalName,
                documentType: req.body.documentType,
                file,
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "KYC updated successfully",
                data: kycRecord,
            });
        } catch (error) {
            next(error);
        }
    };
}
