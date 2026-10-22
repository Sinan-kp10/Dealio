import { RegisterEnterpriseDto } from "../../../application/auth/dto/register-enterprise.dto";
import { RegisterEnterpriseUseCase } from "../../../application/auth/use-cases/register-enterprise.use-case";
import type { Request, Response, NextFunction } from "express";

export  class RegisterEnterpriseController {
    constructor(private readonly registerEnterpriseUseCase : RegisterEnterpriseUseCase){}

    handle = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

        try {

            const data = req.body as RegisterEnterpriseDto

            const result = await this.registerEnterpriseUseCase.execute(data)

            res.status(201).json({
                status: "success",
                message: "Enterprise registered successfully",
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