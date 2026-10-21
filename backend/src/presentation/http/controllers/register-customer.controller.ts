import type { Request, Response, NextFunction } from "express";
import type { RegisterCustomerUseCase } from "../../../application/auth/use-cases/register-customer.use-case";
import type { RegisterCustomerDto } from "../../../application/auth/dto/register-customer.dto";

export class  RegisterCustomerController {

    constructor(private readonly registerCustomerUseCase : RegisterCustomerUseCase){}

    handle= async(req : Request, res : Response, next : NextFunction): Promise<void> => {

        try {

            const data = req.body as RegisterCustomerDto

            const user = await this.registerCustomerUseCase.execute(data)

            res.status(201).json({
                success: true,
                message: "Customer registered successfully",
                data: {
                    email: user.email,
                    role: user.role
                },
            });
            
        } catch (error) {
            next(error);
        }

    }

}