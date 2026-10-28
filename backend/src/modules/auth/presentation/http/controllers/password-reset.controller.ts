import type { Request, Response, NextFunction } from "express";
import { ForgotPasswordUseCase } from "../../../application/use-cases/forgot-password.use-case";
import { EmailDto } from "../../../application/dto/email.dto"; 
import { VerifyPasswordResetOtpUseCase } from "../../../application/use-cases/verify-password-reset-otp.use-case";
import { ResetPasswordUseCase } from "../../../application/use-cases/reset-password.use-case";
import { VerifyOtpDto } from "../../../application/dto/verify-otp.dto";
import { ResetPasswordDto } from "../../../application/dto/reset-password.dto";

export class PasswordResetController {

    constructor(
        private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
        private readonly verifyPasswordResetOtpUseCase: VerifyPasswordResetOtpUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
    ){}

    forgotPassword = async(req : Request, res : Response, next : NextFunction): Promise<void> => {

        try {

            const data = req.body as EmailDto

            await this.forgotPasswordUseCase.execute(data)
            
            res.status(200).json({
                success: "success",
                message: "A password reset code has been sent"
            })
            
        } catch (error) {
            next(error);
        }

    }

    verifyPasswordResetOtp = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
        try {

            const result = await this.verifyPasswordResetOtpUseCase.execute(req.body as VerifyOtpDto)

            res.status(200).json({
                status: "success",
                message: "OTP verified successfully",
                data: {
                    resetToken: result.resetToken,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    resetPassword = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {resetToken, newPassword} = req.body as ResetPasswordDto

            await this.resetPasswordUseCase.execute({ resetToken, newPassword});

            res.status(200).json({
                status: "success",
                message: "Password reset successful",
            })

        } catch (error) {
            next(error);
        }
    };

}