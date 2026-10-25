import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../validators/auth/register-customer.schema";
import { forgotPasswordController, loginController, registerCustomerController, registerEnterpriseController, resendOtpController, resetPasswordController, verifyCustomerOtpController, verifyEnterpriseController, verifyPasswordResetOtpController} from "../../../infrastructure/container/auth.container";
import { registerEnterpriseSchema } from "../validators/auth/register-enterprise.schema";
import { verifyOtpSchema } from "../validators/auth/verify-otp.validator";
import { loginSchema } from "../validators/auth/login.schema";
import { emailSchema } from "../validators/auth/email.schema";
import { resetPasswordSchema } from "../validators/auth/reset-password.schema";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registerCustomerController.handle)
authRouter.post("/register/enterprise", validateRequest(registerEnterpriseSchema),registerEnterpriseController.handle)
authRouter.post("/customer/verify-email-otp", validateRequest(verifyOtpSchema), verifyCustomerOtpController.handle)
authRouter.post("/enterprise/verify-email-otp", validateRequest(verifyOtpSchema), verifyEnterpriseController.handle)
authRouter.post("/resend-email-otp", validateRequest(emailSchema), resendOtpController.handle)
authRouter.post("/login", validateRequest(loginSchema), loginController.handle)
authRouter.post("/forgot-password", validateRequest(emailSchema), forgotPasswordController.handle)
authRouter.post("/verify-password-reset-otp", validateRequest(verifyOtpSchema), verifyPasswordResetOtpController.handle)
authRouter.post("/reset-password",validateRequest(resetPasswordSchema),resetPasswordController.handle,)

export { authRouter };