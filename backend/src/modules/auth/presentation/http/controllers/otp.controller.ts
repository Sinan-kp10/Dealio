import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { VerifyOtpDto, ResendOtpInput } from "../../../application/dto/verify-otp.dto";
import type { AuthUserDto } from "../../../application/dto/user.dto";
import type { CreatedEnterpriseResult } from "../../../domain/repositories/enterprise.repository";
import type { IApiResponse } from "../../../../../shared/application/api-response";
import { HttpStatusCode } from "../../../../../shared/presentation/enums/http-status-code.enum.js";

export class OtpController {
    constructor(
        private readonly verifyCustomerOtpUseCase: IUseCase<VerifyOtpDto, AuthUserDto>,
        private readonly verifyEnterpriseOtpUseCase: IUseCase<VerifyOtpDto, CreatedEnterpriseResult>,
        private readonly resendOtpUseCase: IUseCase<ResendOtpInput, void>,
    ) {}

    verifyCustomerOtp = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as VerifyOtpDto;

            const user = await this.verifyCustomerOtpUseCase.execute(data);

            res.status(HttpStatusCode.CREATED).json({
                status: true,
                message: "Email verified and account created successfully",
                data: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    verifyEnterpriseOtp = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as VerifyOtpDto;

            const result = await this.verifyEnterpriseOtpUseCase.execute(data);

            res.status(HttpStatusCode.CREATED).json({
                status: true,
                message: "Email verified and account created successfully",
                data: {
                    enterpriseName: result.enterprise.name,
                    contactPersonName: result.data.name,
                    email: result.data.email,
                    role: result.data.role,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    resendOtp = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as ResendOtpInput;

            await this.resendOtpUseCase.execute(data);

            res.status(HttpStatusCode.OK).json({
                status: true,
                message: "New OTP sent successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}
