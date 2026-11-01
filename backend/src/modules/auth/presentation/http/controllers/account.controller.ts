import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum";
import type { IApiResponse } from "../../../../../shared/application/api-response";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { RequestEmailChangeDto, VerifyEmailChangeDto, VerifyEmailChangeResult, ResendEmailChangeOtpDto,} from "../../../application/dto/change-email.dto";
import type { RequestEmailChangeInput } from "../validators/request-email-change.schema";
import type { VerifyEmailChangeInput } from "../validators/verify-email-change.schema";
import { env } from "../../../../../config/env";

export class AccountController {
    constructor(
        private readonly requestEmailChangeUseCase: IUseCase<RequestEmailChangeDto, void>,
        private readonly verifyEmailChangeUseCase: IUseCase<VerifyEmailChangeDto, VerifyEmailChangeResult>,
        private readonly resendEmailChangeOtpUseCase: IUseCase<ResendEmailChangeOtpDto, void>
    ) {}

    requestEmailChange = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;
            const { newEmail } = req.body as RequestEmailChangeInput;

            await this.requestEmailChangeUseCase.execute({ userId, newEmail });

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "OTP sent to your new email address",
            });
        } catch (error) {
            next(error);
        }
    };

    verifyEmailChange = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
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

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Email changed successfully",
                data: {
                    email: result.email,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    resendEmailChangeOtp = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth!.userId;

            await this.resendEmailChangeOtpUseCase.execute({ userId });

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "Verification OTP has been resent to your new email address",
            });
        } catch (error) {
            next(error);
        }
    };
}

