import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { VerifyOtpDto, ResendOtpInput } from "../../../application/dto/verify-otp.dto";
import type { AuthUserDto } from "../../../application/dto/user.dto";
import type { CreatedEnterpriseResult } from "../../../domain/repositories/enterprise.repository";
import { sendResponse } from "../../../../../shared/presentation/api-response";
import { HttpStatusCode } from "../../../../../shared/enums/http-status-code.enum.js";

export class OtpController {
    constructor(
        private readonly verifyCustomerOtpUseCase: IUseCase<VerifyOtpDto, AuthUserDto>,
        private readonly verifyEnterpriseOtpUseCase: IUseCase<VerifyOtpDto, CreatedEnterpriseResult>,
        private readonly resendOtpUseCase: IUseCase<ResendOtpInput, void>,
    ) {}

    verifyCustomerOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as VerifyOtpDto;

            const user = await this.verifyCustomerOtpUseCase.execute(data);

            sendResponse(res, "Email verified and account created successfully", {
                name: user.name,
                email: user.email,
                role: user.role,
            }, HttpStatusCode.CREATED);
        } catch (error) {
            next(error);
        }
    };

    verifyEnterpriseOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as VerifyOtpDto;

            const result = await this.verifyEnterpriseOtpUseCase.execute(data);

            sendResponse(res, "Email verified and account created successfully", {
                enterpriseName: result.enterprise.name,
                contactPersonName: result.data.name,
                email: result.data.email,
                role: result.data.role,
            }, HttpStatusCode.CREATED);
        } catch (error) {
            next(error);
        }
    };

    resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as ResendOtpInput;

            await this.resendOtpUseCase.execute(data);

            sendResponse(res, "New OTP sent successfully");
        } catch (error) {
            next(error);
        }
    };
}
