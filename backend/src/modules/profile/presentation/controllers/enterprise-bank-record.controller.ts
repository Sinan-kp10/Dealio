import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../../../shared/presentation/api-response.js";
import type { IUseCase } from "../../../../shared/application/base.usecase.js";
import type { BankRecordRequestDto, CreateEnterpriseBankRecordDto, EnterpriseBankrecordDto, UpdateEnterpriseBankRecordDto} from "../../application/dto/enterprise-bank-details.dto.js";

export class EnterpriseBankRecordController {
    constructor(
        private readonly getEnterpriseBankRecordUseCase: IUseCase<string, EnterpriseBankrecordDto>,
        private readonly createEnterpriseBankRecordUseCase: IUseCase<CreateEnterpriseBankRecordDto, BankRecordRequestDto>,
        private readonly updateEnterpriseBankRecordUseCase: IUseCase<UpdateEnterpriseBankRecordDto, BankRecordRequestDto>,
    ) {}

    getBankRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const bankRecord = await this.getEnterpriseBankRecordUseCase.execute(userId!);

            sendResponse(res, "Bank record retrieved successfully", bankRecord);
        } catch (error) {
            next(error);
        }
    };

    addBankRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const bankRecord = await this.createEnterpriseBankRecordUseCase.execute({
                userId: userId!,
                accountHolderName: req.body.accountHolderName,
                bankAccountNumber: req.body.bankAccountNumber,
                ifscCode: req.body.ifscCode,
                accountType: req.body.accountType,
                upiId: req.body.upiId,
            });

            sendResponse(res, "Bank record submitted successfully", bankRecord);
        } catch (error) {
            next(error);
        }
    };

    updateBankRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;

            const bankRecord = await this.updateEnterpriseBankRecordUseCase.execute({
                userId: userId!,
                accountHolderName: req.body.accountHolderName,
                bankAccountNumber: req.body.bankAccountNumber,
                ifscCode: req.body.ifscCode,
                accountType: req.body.accountType,
                upiId: req.body.upiId,
            });

            sendResponse(res, "Bank record updated successfully", bankRecord);
        } catch (error) {
            next(error);
        }
    };
}

