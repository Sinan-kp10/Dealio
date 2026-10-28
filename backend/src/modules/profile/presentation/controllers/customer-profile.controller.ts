import { Request, Response, NextFunction } from "express";
import { GetCustomerProfileUseCase } from "../../application/use-cases/get-customer-profile.use-case";


export class CustomerProfileController {

    constructor(
        private readonly getCustomerProfileUseCase : GetCustomerProfileUseCase
    ){}
    getProfile = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
        try {

        const userId = req.auth?.userId

        if (!userId) {
                res.status(401).json({
                status: "error",
                message: "Authentication required",
            });
            return;
        }

        const profile = await this.getCustomerProfileUseCase.execute(userId);

        res.status(200).json({
            status: "success",
            data: profile,
        });

        } catch (error) {
            next(error);
        }
    }
}