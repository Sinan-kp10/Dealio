import type { Request, Response, NextFunction } from "express";
import { VerifyCustomerOtpuseCase } from "../../../../application/auth/use-cases/verify-customer-otp.use-case";


export class VerifyCustomerOtpController {
    constructor(
        private readonly verifyCustomerOtpUseCase: VerifyCustomerOtpuseCase,
    ) {}

    handle = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    };
}