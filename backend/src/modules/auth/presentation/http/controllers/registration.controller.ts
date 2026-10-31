import type { RegisterCustomerDto } from "../../../application/dto/register-customer.dto";
import type { RegisterEnterpriseDto } from "../../../application/dto/register-enterprise.dto"; 
import type { IUseCase } from "../../../../../shared/application/base.usecase";
import type { Request, Response, NextFunction } from "express";

export class RegistrationController {
    constructor(
        private readonly registerCustomerUseCase: IUseCase<RegisterCustomerDto, void>,
        private readonly registerEnterpriseUseCase: IUseCase<RegisterEnterpriseDto, void>
    ){}

    registerCustomer = async(req : Request, res : Response, next : NextFunction): Promise<void> => {
        try {
            const data = req.body as RegisterCustomerDto;

            await this.registerCustomerUseCase.execute(data);

            res.status(200).json({
                success: true,
                message: "OTP sent successfully. Please verify your email",
            });
        } catch (error) {
            next(error);
        }
    };

    registerEnterprise = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {
        try {
            const data = req.body as RegisterEnterpriseDto;

            await this.registerEnterpriseUseCase.execute(data);

            res.status(200).json({
                success: true,
                message: "OTP sent successfully. Please verify your email",
            });
        } catch (error) {
            next(error);
        }
    };
}
