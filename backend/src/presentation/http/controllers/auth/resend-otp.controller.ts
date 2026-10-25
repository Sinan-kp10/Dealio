import type { Request, Response, NextFunction } from "express";
import { ResendOtpUseCase } from "../../../../application/auth/use-cases/resend-otp.use-case";

export class ResendOtpController {

    constructor(  private readonly resendOtpUseCase: ResendOtpUseCase) {}

    handle = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            await this.resendOtpUseCase.execute(req.body)

            res.status(200).json({
                status: "success",
                message: "A new OTP has been sent to your email."
            })

        } catch (error) {
            next(error);
        }
    };
}