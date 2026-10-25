import type { Request, Response, NextFunction } from "express";
import { VerifyPasswordResetOtpUseCase } from "../../../../application/auth/use-cases/verify-password-reset-otp.use-case";
import { VerifyOtpDto } from "../../../../application/auth/dto/verify-otp.dto";

export class VerifyPasswordResetOtpController {
    constructor(
        private readonly verifyPasswordResetOtpUseCase: VerifyPasswordResetOtpUseCase,
    ) {}

    handle = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
        try {

            const result = await this.verifyPasswordResetOtpUseCase.execute(req.body as VerifyOtpDto)

            res.status(200).json({
                status: "success",
                message: "OTP verified successfully.",
                data: {
                    resetToken: result.resetToken,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}