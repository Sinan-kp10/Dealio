import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { EmailDto } from "../../../application/dto/email.dto"; 
import type { VerifyOtpDto } from "../../../application/dto/verify-otp.dto";
import type { ResetPasswordDto } from "../../../application/dto/reset-password.dto";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { ChangePasswordDto } from "../../../application/dto/change-password.dto";

export class PasswordResetController {

    constructor(
        private readonly forgotPasswordUseCase: IUseCase<EmailDto, void>,
        private readonly verifyPasswordResetOtpUseCase: IUseCase<VerifyOtpDto, { resetToken: string }>,
        private readonly resetPasswordUseCase: IUseCase<ResetPasswordDto, void>,
        private readonly changePasswordUseCase : IUseCase<ChangePasswordDto, void>
    ){}

    forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as EmailDto;

            await this.forgotPasswordUseCase.execute(data);
            
            sendResponse(res, "A password reset code has been sent");
        } catch (error) {
            next(error);
        }
    };

    verifyPasswordResetOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as VerifyOtpDto;

            const result = await this.verifyPasswordResetOtpUseCase.execute(data);

            sendResponse(res, "OTP verified successfully", {
                resetToken: result.resetToken,
            });
        } catch (error) {
            next(error);
        }
    };

    resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as ResetPasswordDto;

            await this.resetPasswordUseCase.execute(data);

            sendResponse(res, "Password reset successful");
        } catch (error) {
            next(error);
        }
    };

    changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const email = req.auth?.email
            const {currentPassword, newPassword} = req.body

            await this.changePasswordUseCase.execute({
                email : email! , currentPassword : currentPassword, newPassword : newPassword 
            })

            sendResponse(res, "Password updated successfully");
            
        } catch (error) {
            next(error)
        }
    }
}
