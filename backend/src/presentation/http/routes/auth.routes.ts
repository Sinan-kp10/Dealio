import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../validators/register-customer.schema";
import { registerCustomerController, registerEnterpriseController, verifyCustomerOtpController} from "../../../infrastructure/container/auth.container";
import { registerEnterpriseSchema } from "../validators/register-enterprise.schema";
import { verifyCustomerOtpSchema } from "../validators/verify-customer-otp.validator";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registerCustomerController.handle)
authRouter.post("/register/enterprise", validateRequest(registerEnterpriseSchema),registerEnterpriseController.handle)
authRouter.post("/verify-email-otp", validateRequest(verifyCustomerOtpSchema), verifyCustomerOtpController.handle)

export { authRouter };