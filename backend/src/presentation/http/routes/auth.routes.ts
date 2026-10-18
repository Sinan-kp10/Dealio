import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../../../application/auth/validation/register-customer.schema";
import { registerCustomerController } from "../container/auth.container";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registerCustomerController.handle)


export { authRouter };