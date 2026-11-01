import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../shared/application/base.usecase";
import type { CustomerListFiltersDto, PaginatedCustomerDto } from "../../application/dto/customer-list-item.dto";
import type { EnterpriseListFiltersDto, PaginatedEnterprisesDto } from "../../application/dto/enterprise-list-item.dto";
import type { SuspendAccountDto, ReactivateAccountDto } from "../../application/dto/suspend-account.dto";
import type { IApiResponse } from "../../../../shared/application/api-response";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum.js";

export class UserManagementController {
    constructor(
        private readonly getCustomerUseCase : IUseCase<CustomerListFiltersDto, PaginatedCustomerDto>,
        private readonly getEnterpriseUseCase : IUseCase<EnterpriseListFiltersDto, PaginatedEnterprisesDto>,
        private readonly suspendAccountUseCase: IUseCase<SuspendAccountDto, void>,
        private readonly reactivateAccountUseCase: IUseCase<ReactivateAccountDto, void>,
    ){}

    getUsers = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const result = await this.getCustomerUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as "ACTIVE" | "SUSPENDED" | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            });

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Customers retrieved successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

    getEnterprise = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const result = await this.getEnterpriseUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as "ACTIVE" | "SUSPENDED" | undefined,
                category : req.query.category as string | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            });

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Enterprises retrieved successfully",
                data: result,
            });

        } catch (error) {
            next(error);
        }
    };

    suspendAccount = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            await this.suspendAccountUseCase.execute({
                accountId: req.params.accountId as string,
                reason: req.body.reason,
            });

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Account suspended successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    reactivateAccount = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            await this.reactivateAccountUseCase.execute({
                accountId: req.params.accountId as string,
            });

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Account reactivated successfully",
            });
        } catch (error) {
            next(error);
        }
    };

}
