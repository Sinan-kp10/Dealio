import type { Request, Response, NextFunction } from "express";
import { GetUsersUseCase } from "../../application/use-cases/get-users.use-case";

export class UserManagementController {
    constructor(
        private readonly getUsersUseCase : GetUsersUseCase
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
    };
}

