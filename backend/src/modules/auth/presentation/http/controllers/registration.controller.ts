import { RegisterCustomerDto } from "../../../application/dto/register-customer.dto";
import { RegisterEnterpriseDto } from "../../../application/dto/register-enterprise.dto"; 
import { RegisterCustomerUseCase } from "../../../application/use-cases/register-customer.use-case";
import { RegisterEnterpriseUseCase } from "../../../application/use-cases/register-enterprise.use-case"; 
import type { Request, Response, NextFunction } from "express";

export  class RegistrationController {
    constructor(
        private readonly registerCustomerUseCase: RegisterCustomerUseCase,
        private readonly registerEnterpriseUseCase : RegisterEnterpriseUseCase
    ){}

    registerCustomer = async(req : Request, res : Response, next : NextFunction): Promise<void> => {
    
        try {

            const data = req.body as RegisterCustomerDto

            await this.registerCustomerUseCase.execute(data)

            res.status(200).json({
                success: true,
                message: "OTP sent successfully. Please verify your email",
            });
            
        } catch (error) {
            next(error);
        }

    }

    registerEnterprise = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

        try {

            const data = req.body as RegisterEnterpriseDto

            await this.registerEnterpriseUseCase.execute(data)

            res.status(200).json({
                success: true,
                message: "OTP sent successfully. Please verify your email",
            });
            
        } catch (error) {

            next(error)
            
        }
    }
}