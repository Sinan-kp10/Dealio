import type { Request, Response, NextFunction } from "express";
import { GetAuthenticatedUserUseCase } from "../../../application/use-cases/get-authenticated-user.use-case";

export class AuthenticatedUserController {
    constructor(
        private readonly getAuthenticatedUserUseCase: GetAuthenticatedUserUseCase,
    ) {}

    getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.getAuthenticatedUserUseCase.execute(req.auth!.userId);

            res.status(200).json({
                success: true,
                data: { user },
            });
        } catch (error) {
            next(error);
        }
    };
}

