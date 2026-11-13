import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../shared/application/base.usecase";
import type { CustomerListFiltersDto, PaginatedCustomerDto } from "../../application/dto/customer-list-item.dto";
import type { EnterpriseListFiltersDto, PaginatedEnterprisesDto } from "../../application/dto/enterprise-list-item.dto";
import type { SuspendAccountDto, ReactivateAccountDto } from "../../application/dto/suspend-account.dto";
import { sendResponse } from "../../../../shared/presentation/api-response";

export class UserManagementController {
    constructor(
        private readonly getCustomerUseCase : IUseCase<CustomerListFiltersDto, PaginatedCustomerDto>,
        private readonly getEnterpriseUseCase : IUseCase<EnterpriseListFiltersDto, PaginatedEnterprisesDto>,
        private readonly suspendAccountUseCase: IUseCase<SuspendAccountDto, void>,
        private readonly reactivateAccountUseCase: IUseCase<ReactivateAccountDto, void>,
    ){}

    getCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.getCustomerUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as "ACTIVE" | "SUSPENDED" | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            });

            sendResponse(res, "Customers retrieved successfully", result);
        } catch (error) {
            next(error);
        }
    };

    getEnterprise = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.getEnterpriseUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as "ACTIVE" | "SUSPENDED" | undefined,
                category : req.query.category as string | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            });

            sendResponse(res, "Enterprises retrieved successfully", result);
        } catch (error) {
            next(error);
        }
    };

    suspendAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.suspendAccountUseCase.execute({
                accountId: req.params.accountId as string,
                reason: req.body.reason,
            });

            sendResponse(res, "Account suspended successfully");
        } catch (error) {
            next(error);
        }
    };

    reactivateAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.reactivateAccountUseCase.execute({
                accountId: req.params.accountId as string,
            });

            sendResponse(res, "Account reactivated successfully");
        } catch (error) {
            next(error);
        }
    };

}
