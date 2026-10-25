import type { Request, Response, NextFunction } from "express";
import type { RegisterCustomerUseCase } from "../../../../application/use-cases/register-customer.use-case";
import type { RegisterCustomerDto } from "../../../../application/dto/register-customer.dto";

export class  RegisterCustomerController {

    constructor(private readonly registerCustomerUseCase : RegisterCustomerUseCase){}

    handle= async(req : Request, res : Response, next : NextFunction): Promise<void> => {

        try {

            const data = req.body as RegisterCustomerDto

            await this.registerCustomerUseCase.execute(data)

            res.status(200).json({
                success: true,
                message: "OTP sent successfully. Please verify your email.",
            });
            
        } catch (error) {
            next(error);
        }

    }

}