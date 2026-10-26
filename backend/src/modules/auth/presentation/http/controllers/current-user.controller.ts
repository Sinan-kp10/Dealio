
import type { Request, Response, NextFunction } from "express";
import { GetCurrentUserUseCase } from "../../../application/use-cases/get-current-user.use-case";

export class CurrentUserController {
    constructor(
        private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    ) {}

    handle = async ( req: Request, res: Response, next: NextFunction,): Promise<void> => {
        try {
            const user = await this.getCurrentUserUseCase.execute( req.auth!.userId)

            res.status(200).json({
                success: true,
                data: { user },
            });
        } catch (error) {
            next(error);
        }
    }
}
