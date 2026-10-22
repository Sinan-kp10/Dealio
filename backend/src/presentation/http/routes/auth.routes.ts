import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../validators/register-customer.schema";
import { registerCustomerController, registerEnterpriseController } from "../../../infrastructure/container/auth.container";
import { registerEnterpriseSchema } from "../validators/register-enterprise.schema";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registerCustomerController.handle)
authRouter.post("/register/enterprise", validateRequest(registerEnterpriseSchema),registerEnterpriseController.handle)


export { authRouter };