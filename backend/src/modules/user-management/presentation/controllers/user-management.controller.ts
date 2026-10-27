import type { Request, Response, NextFunction } from "express";
import { GetUsersUseCase } from "../../application/use-cases/get-users.use-case";
import { SuspendAccountUseCase } from "../../application/use-cases/suspend-account.use-case";
import { ReactivateAccountUseCase } from "../../application/use-cases/reactivate-account.use-case";

export class UserManagementController {
    constructor(
        private readonly getUsersUseCase : GetUsersUseCase,
        private readonly suspendAccountUseCase: SuspendAccountUseCase,
        private readonly reactivateAccountUseCase: ReactivateAccountUseCase,
    ){}

    getUsers = async (req: Request, res: Response, next: NextFunction,): Promise<void> => {
        try {
            const result = await this.getUsersUseCase.execute({
                search: req.query.search as string | undefined,
                status: req.query.status as "ACTIVE" | "SUSPENDED" | undefined,
                page: Number(req.query.page ?? 1),
                limit: Number(req.query.limit ?? 10),
            });

            res.status(200).json({
                success: true,
                data: result,
            })

        } catch (error) {
            next(error);
        }
    }

    suspendAccount = async ( req: Request, res: Response, next: NextFunction,): Promise<void> => {
        try {
            await this.suspendAccountUseCase.execute({
                accountId: req.params.accountId as string,
                reason: req.body.reason,
            })

            res.status(200).json({
                success: true,
                message: "Account suspended successfully",
            })
        } catch (error) {
            next(error);
        }
    };

    reactivateAccount = async ( req: Request, res: Response, next: NextFunction,): Promise<void> => {
        try {
            await this.reactivateAccountUseCase.execute({
                accountId: req.params.accountId as string
            })

            res.status(200).json({
                success: true,
                message: "Account reactivated successfully",
            })
        } catch (error) {
            next(error);
        }
    };

}

