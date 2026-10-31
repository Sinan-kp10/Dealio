import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { EmailDto } from "../../../application/dto/email.dto"; 
import type { VerifyOtpDto } from "../../../application/dto/verify-otp.dto";
import type { ResetPasswordDto } from "../../../application/dto/reset-password.dto";
import type { IApiResponse } from "../../../../../shared/application/api-response";

export class PasswordResetController {

    constructor(
        private readonly forgotPasswordUseCase: IUseCase<EmailDto, void>,
        private readonly verifyPasswordResetOtpUseCase: IUseCase<VerifyOtpDto, { resetToken: string }>,
        private readonly resetPasswordUseCase: IUseCase<ResetPasswordDto, void>,
    ){}

    forgotPassword = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as EmailDto;

            await this.forgotPasswordUseCase.execute(data);
            
            res.status(200).json({
                status: true,
                message: "A password reset code has been sent",
            });
        } catch (error) {
            next(error);
        }
    };

    verifyPasswordResetOtp = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as VerifyOtpDto;

            const result = await this.verifyPasswordResetOtpUseCase.execute(data);

            res.status(200).json({
                status: true,
                message: "OTP verified successfully",
                data: {
                    resetToken: result.resetToken,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    resetPassword = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as ResetPasswordDto;

            await this.resetPasswordUseCase.execute(data);

            res.status(200).json({
                status: true,
                message: "Password reset successful",
            });
        } catch (error) {
            next(error);
        }
    };
}
