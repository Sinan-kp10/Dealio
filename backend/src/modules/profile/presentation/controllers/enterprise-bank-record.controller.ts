import type { Request, Response, NextFunction } from "express";
import type { IApiResponse } from "../../../../shared/application/api-response.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum.js";
import type { BankRecordRequestDto, CreateEnterpriseBankRecordDto, EnterpriseBankrecordDto, UpdateEnterpriseBankRecordDto} from "../../application/dto/enterprise-bank-details.dto.js";

export class EnterpriseBankRecordController {
    constructor(
        private readonly getEnterpriseBankRecordUseCase: IUseCase<string, EnterpriseBankrecordDto>,
        private readonly createEnterpriseBankRecordUseCase: IUseCase<CreateEnterpriseBankRecordDto, BankRecordRequestDto>,
        private readonly updateEnterpriseBankRecordUseCase: IUseCase<UpdateEnterpriseBankRecordDto, BankRecordRequestDto>,
    ) {}

    getBankRecord = async (req: Request, res: Response<IApiResponse<EnterpriseBankrecordDto>>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const bankRecord = await this.getEnterpriseBankRecordUseCase.execute(userId!);

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Bank record retrieved successfully",
                data: bankRecord,
            });
        } catch (error) {
            next(error);
        }
    };

    addBankRecord = async (req: Request, res: Response<IApiResponse<BankRecordRequestDto>>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const bankRecord = await this.createEnterpriseBankRecordUseCase.execute({
                userId: userId!,
                AccountHolderName: req.body.AccountHolderName ?? req.body.accountHolderName,
                BankAccountNumber: req.body.BankAccountNumber ?? req.body.bankAccountNumber ?? req.body.accountNumber,
                ifscCode: req.body.ifscCode,
                accountType: req.body.accountType,
                upiId: req.body.upiId,
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Bank record submitted successfully",
                data: bankRecord,
            });
        } catch (error) {
            next(error);
        }
    };

    updateBankRecord = async (req: Request, res: Response<IApiResponse<BankRecordRequestDto>>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const bankRecord = await this.updateEnterpriseBankRecordUseCase.execute({
                userId: userId!,
                AccountHolderName: req.body.AccountHolderName ?? req.body.accountHolderName,
                BankAccountNumber: req.body.BankAccountNumber ?? req.body.bankAccountNumber ?? req.body.accountNumber,
                ifscCode: req.body.ifscCode,
                accountType: req.body.accountType,
                upiId: req.body.upiId,
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Bank record updated successfully",
                data: bankRecord,
            });
        } catch (error) {
            next(error);
        }
    };
}

