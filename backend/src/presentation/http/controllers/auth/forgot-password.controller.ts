import type { Request, Response, NextFunction } from "express";
import { ForgotPasswordUseCase } from "../../../../application/auth/use-cases/forgot-password.use-case";
import { EmailDto } from "../../../../application/auth/dto/email.dto";

export class  ForgotPasswordController {

    constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase){}

    handle= async(req : Request, res : Response, next : NextFunction): Promise<void> => {

        try {

            const data = req.body as EmailDto

            await this.forgotPasswordUseCase.execute(data)
            
            res.status(200).json({
                success: "success",
                message: "A password reset code has been sent."
            })
            
        } catch (error) {
            next(error);
        }

    }

}