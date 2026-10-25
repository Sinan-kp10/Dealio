import type { Request, Response, NextFunction } from "express";
import { VerifyCustomerOtpuseCase } from "../../../application/use-cases/verify-customer-otp.use-case"; 
import { VerifyEnterpriseOtpuseCase } from "../../../application/use-cases/verify-enterprise-otp.usecase";
import { ResendOtpUseCase } from "../../../application/use-cases/resend-otp.use-case";


export class OtpController {
    constructor(
        private readonly verifyCustomerOtpUseCase: VerifyCustomerOtpuseCase,
        private readonly verifyEnterpriseOtpUseCase: VerifyEnterpriseOtpuseCase,
        private readonly resendOtpUseCase: ResendOtpUseCase,
    ) {}

    verifyCustomerOtp = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, otp } = req.body

            const user = await this.verifyCustomerOtpUseCase.execute(email, otp,);

            res.status(201).json({
                status: "success",
                message: "Email verified and account created successfully",
                data: {
                    name : user.name,
                    email : user.email,
                    role : user.role
                }
            })

        } catch (error) {
            next(error);
        }
    }

    verifyEnterpriseOtp = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const { email, otp } = req.body

            const result = await this.verifyEnterpriseOtpUseCase.execute(email,otp)

            res.status(201).json({
                status: "success",
                message: "Email verified and account created successfully",
                data: {
                    enterpriseName : result.enterprise.name,
                    contactPersonName : result.data.name,
                    email : result.data.email,
                    role : result.data.role
                }
            });
            
        } catch (error) {
            next(error)
        }
    }

    resendOtp = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            await this.resendOtpUseCase.execute(req.body)

            res.status(200).json({
                status: "success",
                message: "New OTP sent successfully"
            })

        } catch (error) {
            next(error);
        }
    };
}