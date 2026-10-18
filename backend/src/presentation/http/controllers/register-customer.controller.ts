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
                status: "success",
                message: "Customer registered successfully",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    created_at: user.created_at,
                },
            });
            
        } catch (error) {
            next(error);
        }

    }

}