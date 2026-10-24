import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../validators/auth/register-customer.schema";
import { loginController, registerCustomerController, registerEnterpriseController, resendOtpController, verifyCustomerOtpController, verifyEnterpriseController} from "../../../infrastructure/container/auth.container";
import { registerEnterpriseSchema } from "../validators/auth/register-enterprise.schema";
import { verifyOtpSchema } from "../validators/auth/verify-otp.validator";
import { resendOtpSchema } from "../validators/auth/resend-otp.schema";
import { loginSchema } from "../validators/auth/login.schema";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registerCustomerController.handle)
authRouter.post("/register/enterprise", validateRequest(registerEnterpriseSchema),registerEnterpriseController.handle)
authRouter.post("/customer/verify-email-otp", validateRequest(verifyOtpSchema), verifyCustomerOtpController.handle)
authRouter.post("/enterprise/verify-email-otp", validateRequest(verifyOtpSchema), verifyEnterpriseController.handle)
authRouter.post("/resend-email-otp", validateRequest(resendOtpSchema), resendOtpController.handle)
authRouter.post("/login", validateRequest(loginSchema), loginController.handle)

export { authRouter };