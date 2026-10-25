import { RegisterEnterpriseDto } from "../../../../application/dto/register-enterprise.dto";
import { RegisterEnterpriseUseCase } from "../../../../application/use-cases/register-enterprise.use-case";
import type { Request, Response, NextFunction } from "express";

export  class RegisterEnterpriseController {
    constructor(private readonly registerEnterpriseUseCase : RegisterEnterpriseUseCase){}

    handle = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

        try {

            const data = req.body as RegisterEnterpriseDto

            await this.registerEnterpriseUseCase.execute(data)

            res.status(200).json({
                success: true,
                message: "OTP sent successfully. Please verify your email.",
            });
            
        } catch (error) {

            next(error)
            
        }
    }
}