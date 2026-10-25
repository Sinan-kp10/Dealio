import type { Request, Response, NextFunction } from "express";
import { ResetPasswordUseCase } from "../../../application/use-cases/reset-password.use-case"; 
import { ResetPasswordDto } from "../../../application/dto/reset-password.dto"; 

export class ResetPasswordController {
    constructor(
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
    ) {}

    handle = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {resetToken, newPassword} = req.body as ResetPasswordDto

            await this.resetPasswordUseCase.execute({ resetToken, newPassword});

            res.status(200).json({
                status: "success",
                message: "Password has been reset successfully.",
            })

        } catch (error) {
            next(error);
        }
    };
}