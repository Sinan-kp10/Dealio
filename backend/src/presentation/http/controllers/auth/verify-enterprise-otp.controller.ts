import { VerifyEnterpriseOtpuseCase } from "../../../../application/auth/use-cases/verify-enterprise-otp.usecase";
import type { Request, Response, NextFunction } from "express";

export class VerifyEnterpriseOtpController {
    constructor(private readonly verifyEnterpriseUseCase : VerifyEnterpriseOtpuseCase){}

    handle = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const { email, otp } = req.body

            const result = await this.verifyEnterpriseUseCase.execute(email,otp)

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
}