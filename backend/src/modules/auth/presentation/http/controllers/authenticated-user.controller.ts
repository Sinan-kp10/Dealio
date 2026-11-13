import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { AuthUserDto } from "../../../application/dto/user.dto";
import { sendResponse } from "../../../../../shared/presentation/api-response";

export class AuthenticatedUserController {
    constructor(
        private readonly getAuthenticatedUserUseCase: IUseCase<string, AuthUserDto>,
    ) {}

    getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.getAuthenticatedUserUseCase.execute(req.auth!.userId);

            sendResponse(res, "User profile retrieved successfully", { user });
        } catch (error) {
            next(error);
        }
    };
}
