import { Router } from "express";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../validators/register-customer.schema";
import { forgotPasswordController, loginController, registerCustomerController, registerEnterpriseController, resendOtpController, resetPasswordController, verifyCustomerOtpController, verifyEnterpriseController, verifyPasswordResetOtpController} from "../../../infrastructure/container/auth.container";
import { registerEnterpriseSchema } from "../validators/register-enterprise.schema";
import { verifyOtpSchema } from "../validators/verify-otp.validator";
import { loginSchema } from "../validators/login.schema";
import { emailSchema } from "../validators/email.schema";
import { resetPasswordSchema } from "../validators/reset-password.schema";
import { resendOtpSchema } from "../validators/resend-otp.schema";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registerCustomerController.handle)
authRouter.post("/register/enterprise", validateRequest(registerEnterpriseSchema),registerEnterpriseController.handle)
authRouter.post("/customer/verify-email-otp", validateRequest(verifyOtpSchema), verifyCustomerOtpController.handle)
authRouter.post("/enterprise/verify-email-otp", validateRequest(verifyOtpSchema), verifyEnterpriseController.handle)
authRouter.post("/resend-email-otp", validateRequest(resendOtpSchema), resendOtpController.handle)
authRouter.post("/login", validateRequest(loginSchema), loginController.handle)
authRouter.post("/forgot-password", validateRequest(emailSchema), forgotPasswordController.handle)
authRouter.post("/verify-password-reset-otp", validateRequest(verifyOtpSchema), verifyPasswordResetOtpController.handle)
authRouter.post("/reset-password",validateRequest(resetPasswordSchema),resetPasswordController.handle,)

export { authRouter };