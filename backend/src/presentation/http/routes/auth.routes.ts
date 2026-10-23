import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../validators/register-customer.schema";
import { registerCustomerController, registerEnterpriseController, verifyCustomerOtpController, verifyEnterpriseController} from "../../../infrastructure/container/auth.container";
import { registerEnterpriseSchema } from "../validators/register-enterprise.schema";
import { verifyOtpSchema } from "../validators/verify-otp.validator";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registerCustomerController.handle)
authRouter.post("/register/enterprise", validateRequest(registerEnterpriseSchema),registerEnterpriseController.handle)
authRouter.post("/customer/verify-email-otp", validateRequest(verifyOtpSchema), verifyCustomerOtpController.handle)
authRouter.post("/enterprise/verify-email-otp", validateRequest(verifyOtpSchema), verifyEnterpriseController.handle)


export { authRouter };