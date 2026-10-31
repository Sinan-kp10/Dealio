import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { AuthUserDto } from "../../../application/dto/user.dto";
import type { IApiResponse } from "../../../../../shared/application/api-response";

export class AuthenticatedUserController {
    constructor(
        private readonly getAuthenticatedUserUseCase: IUseCase<string, AuthUserDto>,
    ) {}

    getAuthenticatedUser = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const user = await this.getAuthenticatedUserUseCase.execute(req.auth!.userId);

            res.status(200).json({
                status: true,
                message: "User profile retrieved successfully",
                data: { user },
            });
        } catch (error) {
            next(error);
        }
    };
}
