import { Request, Response, NextFunction } from "express";
import { GetCustomerProfileUseCase } from "../../application/use-cases/get-customer-profile.use-case";
import { EditCustomerProfileUseCase } from "../../application/use-cases/edit-customer-profile.use-case";


export class CustomerProfileController {

    constructor(
        private readonly getCustomerProfileUseCase : GetCustomerProfileUseCase,
        private readonly editCustomerProfileUseCase : EditCustomerProfileUseCase
    ){}

    getProfile = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
        try {

        const userId = req.auth?.userId

        const profile = await this.getCustomerProfileUseCase.execute(userId!);

        res.status(200).json({
            status: "success",
            data: profile,
        });

        } catch (error) {
            next(error);
        }
    }

    editProfile = async(req: Request,res: Response,next: NextFunction) :Promise<void> => {

        try {

            const userId = req.auth?.userId
            const {name, phone} = req.body

            const updatedFields = await this.editCustomerProfileUseCase.execute({
                userId : userId!,
                name : name,
                phone : phone
            })

            res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: updatedFields
            })

        } catch (error) {
            next(error)
        }
        
    }
}
