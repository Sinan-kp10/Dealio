import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { RequestEmailChangeDto, VerifyEmailChangeDto, VerifyEmailChangeResult, ResendEmailChangeOtpDto,} from "../../../application/dto/change-email.dto";
import type { RequestPhoneOtpDto, VerifyPhoneOtpDto, VerifyPhoneOtpResult, ResendPhoneOtpDto } from "../../../application/dto/phone-otp.dto";
import type { RequestEmailChangeInput } from "../validators/request-email-change.schema";
import type { VerifyEmailChangeInput } from "../validators/verify-email-change.schema";
import type { RequestPhoneOtpInput } from "../validators/request-phone-otp.schema";
import type { VerifyPhoneOtpInput } from "../validators/verify-phone-otp.schema";
import { env } from "../../../../../config/env";

export class AccountController {
    constructor(
        private readonly requestEmailChangeUseCase: IUseCase<RequestEmailChangeDto, void>,
        private readonly verifyEmailChangeUseCase: IUseCase<VerifyEmailChangeDto, VerifyEmailChangeResult>,
        private readonly resendEmailChangeOtpUseCase: IUseCase<ResendEmailChangeOtpDto, void>,
        private readonly requestPhoneOtpUseCase: IUseCase<RequestPhoneOtpDto, void>,
        private readonly verifyPhoneOtpUseCase: IUseCase<VerifyPhoneOtpDto, VerifyPhoneOtpResult>,
        private readonly resendPhoneOtpUseCase: IUseCase<ResendPhoneOtpDto, void>,
    ) {}

    requestEmailChange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;
            const { newEmail } = req.body as RequestEmailChangeInput;

            await this.requestEmailChangeUseCase.execute({ userId, newEmail });

            sendResponse(res, "OTP sent to your new email address");
        } catch (error) {
            next(error);
        }
    };

    verifyEmailChange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;
            const { otp } = req.body as VerifyEmailChangeInput;

            const result = await this.verifyEmailChangeUseCase.execute({ userId, otp });

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                secure: env.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
                maxAge: env.auth.accessTokenMaxAgeMs,
            });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: env.nodeEnv === "production",
                sameSite: "lax",
                path: "/",
                maxAge: env.auth.refreshTokenMaxAgeMs,
            });

            sendResponse(res, "Email changed successfully", {
                email: result.email,
            });
        } catch (error) {
            next(error);
        }
    };

    resendEmailChangeOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;

            await this.resendEmailChangeOtpUseCase.execute({ userId });

            sendResponse(res, "Verification OTP has been resent to your new email address");
        } catch (error) {
            next(error);
        }
    };

    requestPhoneOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;
            const { phone } = req.body as RequestPhoneOtpInput;

            await this.requestPhoneOtpUseCase.execute({ userId, phone });

            sendResponse(res, "OTP sent to your phone number");
        } catch (error) {
            next(error);
        }
    };

    verifyPhoneOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;
            const { otp } = req.body as VerifyPhoneOtpInput;

            const result = await this.verifyPhoneOtpUseCase.execute({ userId, otp });

            sendResponse(res, "Phone number verified successfully", result);
        } catch (error) {
            next(error);
        }
    };

    resendPhoneOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;

            await this.resendPhoneOtpUseCase.execute({ userId });

            sendResponse(res, "OTP has been resent to your phone number");
        } catch (error) {
            next(error);
        }
    };
}

